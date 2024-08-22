import axios from 'axios'
import { User, PostData } from '@/interfaces/user'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function createUser(data: PostData): Promise<User> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/users`,
				data,
				{ headers: { Authorization: bearer } },
			)
			return response.data
		} else {
			console.error('Unauthorized')
			throw Error
		}
	} catch (error) {
		console.error('Error creating user:', error)
		throw error
	}
}
