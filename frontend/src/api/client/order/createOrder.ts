import axios from 'axios'
import { Order, PostData } from '@/interfaces/order'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function createOrder(data: PostData): Promise<Order> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/orders`,
				data,
				{ headers: { Authorization: bearer } },
			)
			return response.data
		} else {
			console.error('Unauthorized')
			throw Error
		}
	} catch (error) {
		console.error('Error creating order:', error)
		throw error
	}
}
