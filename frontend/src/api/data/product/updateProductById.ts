import axios from 'axios'
import { Product, PostData } from '../../interfaces/product'

export async function updateProductById(
	product_id: number,
	updateData: PostData,
): Promise<Product> {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}`,
			updateData,
		)
		return response.data
	} catch (error) {
		console.error('Error updating product:', error)
		throw error
	}
}
