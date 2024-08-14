import axios from 'axios'
import { PaginatedProduct, ProductQuery } from '../interfaces/product'

export async function fetchProducts(
	query: ProductQuery | null = null,
	page: number = 1,
	size: number = 1,
): Promise<PaginatedProduct> {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/products`,
			{
				params: { page: page, size: size, ...query },
			},
		)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		throw error
	}
}
