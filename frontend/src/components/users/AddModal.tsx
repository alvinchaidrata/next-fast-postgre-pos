'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from 'antd'
import { Formik } from 'formik'
import { createUser } from '@/api/client/user/createUser'
import {
	getInitialData,
	validateData,
	parseForm,
	uploadImage,
} from '@/utils/form-helpers/user'
import { UserForm } from '@/interfaces/user'
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

	const submitModal = async (values: UserForm) => {
		setIsLoading(true)

		// If user image is updated, handle the image upload first, then update product's db
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

		createUser(parseForm(values))
			.then(() => {
				router.refresh()
				setIsLoading(false)
				closeModal()
				showSuccessMsg()
			})
			.catch((e) => {
				showErrorMsg(e.response.data.detail)
				setIsLoading(false)
			})
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
