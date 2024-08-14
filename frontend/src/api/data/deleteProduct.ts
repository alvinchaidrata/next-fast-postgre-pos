import axios from 'axios'

export async function deleteProduct(product_id: number): Promise<null> {
	try {
		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}`,
		)
		return response.data
	} catch (error) {
		console.error('Error deleting product:', error)
		throw error
	}
}
