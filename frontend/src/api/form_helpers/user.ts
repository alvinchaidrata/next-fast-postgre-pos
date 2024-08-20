import axios from 'axios'
import {
	User,
	UserForm,
	PostData,
	UserError,
	UserQuery,
} from '../interfaces/user'

export const getInitialData = (user: User | null = null): UserForm => {
	const form: UserForm = {
		id: '',
		password: '',
		password_confirm: '',
		role: 'User',
		image: '',
		image_file: null,
		temp_image_path: null,
		new_image_path: null,
	}

	if (user) {
		form.id = user.id
		form.role = user.role
		form.image = user.image
	}

	return form
}

export const parseForm = (values: UserForm): PostData => {
	return {
		...values,
		image: values.new_image_path ?? values.image,
	}
}

export const validateData = (values: UserForm): UserError => {
	const errors: UserError = {}

	// Name field validation
	if (!values.id || values.id === '') {
		errors.id = 'This field is required.'
	}

	// Password field validation
	if (!values.password) {
		errors.password = 'This field is required.'
	} else {
		if (values.password.length < 8) {
			errors.password = 'Password must be at least 8 characters long.'
		}
		if (values.password != values.password_confirm) {
			errors.password_confirm =
				'Make sure your this field matches password field.'
		}
	}

	// Image validation
	if (values.image_file) {
		const supportedFormats = ['jpg', 'jpeg', 'webp', 'png']
		if (
			!supportedFormats.includes(
				values.image_file.name.split('.').pop() ?? '',
			)
		) {
			errors.image = 'Only .jpg/jpeg/webp/png is supported.'
		}

		if (values.image_file.size > 5242880) {
			errors.image = 'File size must be under 5mb.'
		}
	}

	return errors
}
export const validateUpdateData = (values: UserForm): UserError => {
	const errors: UserError = {}

	// Name field validation
	if (!values.id || values.id === '') {
		errors.id = 'This field is required.'
	}

	// Password field validation
	if (values.password) {
		if (values.password.length < 8) {
			errors.password = 'Password must be at least 8 characters long.'
		}
		if (values.password != values.password_confirm) {
			errors.password_confirm =
				'Make sure your this field matches password field.'
		}
	}

	// Image validation
	if (values.image_file) {
		const supportedFormats = ['jpg', 'jpeg', 'webp', 'png']
		if (
			!supportedFormats.includes(
				values.image_file.name.split('.').pop() ?? '',
			)
		) {
			errors.image = 'Only .jpg/jpeg/webp/png is supported.'
		}

		if (values.image_file.size > 5242880) {
			errors.image = 'File size must be under 5mb.'
		}
	}

	return errors
}

export const uploadImage = async (
	file: File,
	path: string,
): Promise<undefined> => {
	const imageForm = new FormData()
	imageForm.append('file', file)
	imageForm.append('path', path)
	await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/images`, imageForm)
}

export const getQueryObj = (pageParams?: { search?: string }): UserQuery => {
	const query: UserQuery = {}

	if (pageParams) {
		if (pageParams.search) {
			query.search = pageParams.search
		}
	}

	return query
}
