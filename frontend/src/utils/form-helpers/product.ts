import axios from 'axios'
import {
	Product,
	ProductForm,
	ProductError,
	PostData,
	ProductQuery,
} from '@/interfaces/product'
import { numberWithCommas } from '@/utils/numbers/numberWithCommas'
import { convertToNumber } from '@/utils/numbers/convertToNumber'

export const getInitialData = (product: Product | null = null): ProductForm => {
	const form: ProductForm = {
		name: '',
		description: '',
		price: '0',
		stock: '0',
		image: '',
		image_file: null,
		temp_image_path: null,
		new_image_path: null,
	}

	if (product) {
		form.name = product.name
		form.description = product.description
		form.price = numberWithCommas(product.price)
		form.stock = numberWithCommas(product.stock)
		form.image = product.image
	}

	return form
}

export const parseForm = (values: ProductForm): PostData => {
	return {
		...values,
		price: convertToNumber(values.price),
		stock: convertToNumber(values.stock),
		image: values.new_image_path ?? values.image,
	}
}

export const validateData = (values: ProductForm): ProductError => {
	const errors: ProductError = {}

	// Name field validation
	if (!values.name || values.name === '') {
		errors.name = 'This field is required.'
	}

	// Price field validation
	if (!values.price) {
		errors.price = 'This field is required.'
	}
	if (convertToNumber(values.price) <= 0) {
		errors.price = 'Price must be greater than 0.'
	}

	// Stock field validation
	if (!values.stock) {
		errors.stock = 'This field is required.'
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

export const getQueryObj = (pageParams?: { search?: string }): ProductQuery => {
	const query: ProductQuery = {}

	if (pageParams) {
		if (pageParams.search) {
			query.search = pageParams.search
		}
	}

	return query
}
