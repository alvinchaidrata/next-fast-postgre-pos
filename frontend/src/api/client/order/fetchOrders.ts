import axios from 'axios'
import { PaginatedOrder, OrderQuery } from '@/interfaces/order'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function fetchOrders(
	query: OrderQuery | null = null,
	page: number = 1,
	size: number = 12,
): Promise<PaginatedOrder> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/orders`,
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
		console.error('Error fetching orders:', error)
		throw error
	}
}
