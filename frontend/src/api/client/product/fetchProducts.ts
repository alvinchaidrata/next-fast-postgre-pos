import axios from 'axios'
import { PaginatedProduct, ProductQuery } from '@/interfaces/product'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function fetchProducts(
	query: ProductQuery | null = null,
	page: number = 1,
	size: number = 12,
): Promise<PaginatedProduct> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/products`,
				{
					headers: { Authorization: bearer },
					params: { page: page, size: size, ...query },
				},
			)
			return response.data
		} else {
			console.error('Unauthorized')
			throw Error
		}
	} catch (error) {
		console.error('Error fetching products:', error)
		throw error
	}
}
