import axios from 'axios'
import { Order, PostData } from '../../interfaces/order'

export async function createOrder(data: PostData): Promise<Order> {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/orders`,
			data,
		)
		return response.data
	} catch (error) {
		console.error('Error creating order:', error)
		throw error
	}
}
