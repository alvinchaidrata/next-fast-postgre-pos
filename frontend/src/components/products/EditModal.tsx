'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from 'antd'
import { Formik } from 'formik'
import { updateProductById } from '@/api/client/product/updateProductById'
import { deleteProduct } from '@/api/client/product/deleteProduct'
import { Product, ProductForm } from '@/interfaces/product'
import {
	getInitialData,
	validateData,
	parseForm,
	uploadImage,
} from '@/utils/form-helpers/product'
import FormInputs from './FormInputs/Core'

interface Props {
	product: Product
	open: boolean
	closeModal: Function
	showSuccessMsg: Function
	showErrorMsg: Function
}

export default function EditProductModal({
	product,
	open,
	closeModal,
	showSuccessMsg,
	showErrorMsg,
}: Props) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const done = (message: string) => {
		setIsLoading(false)
		closeModal()
		showSuccessMsg(message)
	}

	// Next.js suspense doesn't work on app refresh
	// this part ensures that data have been refetched before modal closes
	useEffect(() => {
		if (isLoading) {
			done('Product has been updated')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product])

	const submitModal = async (values: ProductForm) => {
		setIsLoading(true)

		// If product image is updated, handle the image upload first, then update product's db
		if (values.image_file && values.new_image_path) {
			try {
				await uploadImage(values.image_file, values.new_image_path)
			} catch (e) {
				if (e instanceof Error) {
					showErrorMsg(e.message)
					setIsLoading(false)
					return
				}
			}
		}

		try {
			await updateProductById(product.id, parseForm(values))
			router.refresh()
		} catch (e) {
			if (e instanceof Error) {
				showErrorMsg(e.message)
				setIsLoading(false)
			}
		}
	}

	const handleDelete = async () => {
		try {
			await deleteProduct(product.id)
			router.refresh()
			done('Product has been deleted')
		} catch (e) {
			if (e instanceof Error) {
				showErrorMsg(e.message)
				setIsLoading(false)
			}
		}
	}

	return (
		<Modal
			open={open}
			closable={false}
			width={'820px'}
			footer={null}
		>
			<Formik
				initialValues={getInitialData(product)}
				onSubmit={submitModal}
				validate={validateData}
				validateOnChange={false}
			>
				<FormInputs
					isLoading={isLoading}
					closeModal={closeModal}
					handleDelete={handleDelete}
				/>
			</Formik>
		</Modal>
	)
}
