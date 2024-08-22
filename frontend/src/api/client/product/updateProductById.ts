import axios from 'axios'
import { Product, PostData } from '@/interfaces/product'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function updateProductById(
	product_id: number,
	updateData: PostData,
): Promise<Product> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}`,
				updateData,
				{ headers: { Authorization: bearer } },
			)
			return response.data
		} else {
			console.error('Unauthorized')
			throw Error
		}
	} catch (error) {
		console.error('Error updating product:', error)
		throw error
	}
}
