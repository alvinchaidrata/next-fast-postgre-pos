import axios from 'axios'
import { Product, PostData } from '@/interfaces/product'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function createProduct(data: PostData): Promise<Product> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/products`,
				data,
				{ headers: { Authorization: bearer } },
			)
			return response.data
		} else {
			console.error('Unauthorized')
			throw Error
		}
	} catch (error) {
		console.error('Error creating product:', error)
		throw error
	}
}
