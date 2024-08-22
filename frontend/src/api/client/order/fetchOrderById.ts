import axios from 'axios'
import { Order } from '@/interfaces/order'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function fetchOrderById(order_id: string): Promise<Order> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/orders/${order_id}`,
				{ headers: { Authorization: bearer } },
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
