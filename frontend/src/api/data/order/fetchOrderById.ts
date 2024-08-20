import axios from 'axios'
import { Order } from '../../interfaces/order'

export async function fetchOrderById(order_id: string): Promise<Order> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000))
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/orders/${order_id}`,
		)
		return response.data
	} catch (error) {
		console.error('Error fetching orders:', error)
		throw error
	}
}
