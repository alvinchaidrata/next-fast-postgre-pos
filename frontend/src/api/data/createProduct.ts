import axios from 'axios'
import { Product, PostData } from '../interfaces/product'

export async function createProduct(data: PostData): Promise<Product> {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/products`,
			data,
		)
		return response.data
	} catch (error) {
		console.error('Error creating product:', error)
		throw error
	}
}
