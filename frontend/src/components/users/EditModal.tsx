'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from 'antd'
import { Formik } from 'formik'
import { deleteUser } from '@/api/client/user/deleteUser'
import { updateUserById } from '@/api/client/user/updateUserById'
import {
	getInitialData,
	validateUpdateData,
	parseForm,
	uploadImage,
} from '@/utils/form-helpers/user'
import { UserForm, User } from '@/interfaces/user'
import FormInputs from './FormInputs/Core'

interface Props {
	user: User
	open: boolean
	closeModal: Function
	showSuccessMsg: Function
	showErrorMsg: Function
}

export default function EditUserModal({
	user,
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
			done('User has been updated')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

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

		updateUserById(values.id, parseForm(values))
			.then(() => {
				router.refresh()
			})
			.catch((e) => {
				showErrorMsg(e)
				setIsLoading(false)
			})
	}

	const handleDelete = async () => {
		try {
			await deleteUser(user.id)
			router.refresh()
			done('User has been deleted')
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
				initialValues={getInitialData(user)}
				onSubmit={submitModal}
				validate={validateUpdateData}
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
