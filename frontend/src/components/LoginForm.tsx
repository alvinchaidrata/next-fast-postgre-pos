'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Formik } from 'formik'
import { LoginForm, LoginFormError } from '@/interfaces/auth'
import Spinner from './global/Spinner'
import UsernameInput from './UsernameInput'
import PasswordInput from './PasswordInput'

export default function LoginFormComponent() {
	const router = useRouter()
	const [dbError, setDbError] = useState<null | string>(null)

	const submitModal = async (values: LoginForm) => {
		const formData = new FormData()
		formData.append('username', values.username)
		formData.append('password', values.password)

		await axios
			.post(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, formData)
			.then(() => {
				setDbError(null)
				router.push('/shop')
			})
			.catch((err) => {
				if (err.response.data.status === 401) {
					setDbError('Username or password is wrong.')
				} else {
					setDbError('Internal server error.')
				}
			})
	}

	const validateData = (values: LoginForm): LoginFormError => {
		const errors: LoginFormError = {}

		// Name field validation
		if (!values.username || values.username === '') {
			errors.username = 'This field is required.'
		}

		// Name field validation
		if (!values.password || values.password === '') {
			errors.password = 'This field is required.'
		}

		return errors
	}

	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			onSubmit={submitModal}
			validate={validateData}
			validateOnChange={false}
		>
			{({
				values,
				errors,
				setFieldValue,
				handleSubmit,
				isSubmitting,
			}) => {
				return (
					<form
						onSubmit={handleSubmit}
						className="my-auto flex w-full flex-col items-center justify-center"
					>
						<div className="flex w-full max-w-sm flex-col items-center justify-center gap-y-2">
							<UsernameInput
								username={values.username}
								error={errors.username}
								setFieldValue={setFieldValue}
							/>
							<PasswordInput
								password={values.password}
								error={errors.password}
								setFieldValue={setFieldValue}
							/>
						</div>
						{dbError && (
							<span className="mt-2 text-xs text-red-500">
								{dbError}
							</span>
						)}
						<button
							type="submit"
							className={`${isSubmitting ? 'opacity-50' : ''} mt-8 flex items-center gap-x-2 rounded-md bg-black px-10 py-2 text-sm font-medium text-white`}
							disabled={isSubmitting}
						>
							<span className="font-medium text-white">Save</span>
							{isSubmitting && (
								<Spinner className="h-4 w-4 border-white" />
							)}
						</button>
					</form>
				)
			}}
		</Formik>
	)
}
