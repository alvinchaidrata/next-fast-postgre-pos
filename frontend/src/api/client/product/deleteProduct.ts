import axios from 'axios'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function deleteProduct(product_id: number): Promise<null> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}`,
				{ headers: { Authorization: bearer } },
			)
			return response.data
		} else {
			console.error('Unauthorized')
			throw Error
		}
	} catch (error) {
		console.error('Error deleting product:', error)
		throw error
	}
}
