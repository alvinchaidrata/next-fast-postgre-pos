'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from 'antd'
import { Formik } from 'formik'
import { createProduct } from '@/api/data/createProduct'
import { ProductForm } from '@/api/interfaces/product'
import {
	getInitialData,
	validateData,
	parseForm,
	uploadImage,
} from '@/api/form_helpers/product'
import FormInputs from './FormInputs/Core'

interface Props {
	open: boolean
	closeModal: Function
	showSuccessMsg: Function
	showErrorMsg: Function
}

export default function AddModal({
	open,
	closeModal,
	showSuccessMsg,
	showErrorMsg,
}: Props) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(false)

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
			await createProduct(parseForm(values))
			router.refresh()
			setIsLoading(false)
			closeModal()
			showSuccessMsg()
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
				initialValues={getInitialData()}
				onSubmit={submitModal}
				validate={validateData}
				validateOnChange={false}
			>
				<FormInputs
					isLoading={isLoading}
					closeModal={closeModal}
				/>
			</Formik>
		</Modal>
	)
}
