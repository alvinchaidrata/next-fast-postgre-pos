'use client'

import React from 'react'
import { useFormikContext, FormikContextType } from 'formik'

import ImageInput from './Inputs/Image'
import UsernameInput from './Inputs/Username'
import PasswordInput from './Inputs/Password'
import PasswordConfirm from './Inputs/PasswordConfirm'
import RoleInput from './Inputs/Role'
import Footer from './Footer'
import { UserForm } from '@/api/interfaces/user'

interface Props {
	isLoading: boolean
	closeModal: Function
	handleDelete?: Function
}

export default function Form({ isLoading, closeModal, handleDelete }: Props) {
	const {
		values,
		errors,
		setFieldValue,
		handleSubmit,
	}: FormikContextType<UserForm> = useFormikContext()

	return (
		<form
			className="flex flex-col gap-y-4"
			onSubmit={handleSubmit}
		>
			<div className="flex w-full gap-x-8">
				<ImageInput
					image={values.image}
					error={errors.image}
					temp_image_path={values.temp_image_path}
					setFieldValue={setFieldValue}
				/>

				<div className="flex w-full flex-col gap-y-4">
					<UsernameInput
						id={values.id}
						error={errors.id}
						setFieldValue={setFieldValue}
						disabled={handleDelete ? true : false}
					/>
					<PasswordInput
						password={values.password}
						error={errors.password}
						setFieldValue={setFieldValue}
					/>
					<PasswordConfirm
						password_confirm={values.password_confirm}
						error={errors.password_confirm}
						setFieldValue={setFieldValue}
					/>
					<RoleInput
						role={values.role}
						error={errors.role}
						setFieldValue={setFieldValue}
					/>
					{handleDelete && (
						<button
							type="button"
							className="ml-auto text-sm font-medium text-black/30 underline decoration-dotted underline-offset-2 transition-all hover:text-red-600"
							onClick={() => handleDelete()}
						>
							Delete
						</button>
					)}
				</div>
			</div>

			<Footer
				isLoading={isLoading}
				closeModal={closeModal}
			/>
		</form>
	)
}
