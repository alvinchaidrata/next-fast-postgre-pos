import axios from 'axios'
import { PaginatedOrder, OrderQuery } from '../../interfaces/order'

export async function fetchOrders(
	query: OrderQuery | null = null,
	page: number = 1,
	size: number = 12,
): Promise<PaginatedOrder> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000))
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/orders`,
			{ params: { page: page, size: size, ...query } },
		)
		return response.data
	} catch (error) {
		console.error('Error fetching orders:', error)
		throw error
	}
}
