import axios from 'axios'
import { User, PostData } from '@/interfaces/user'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function updateUserById(
	user_id: string,
	updateData: PostData,
): Promise<User> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`,
				updateData,
				{ headers: { Authorization: bearer } },
			)
			return response.data
		} else {
			console.error('Unauthorized')
			throw Error
		}
	} catch (error) {
		console.error('Error updating user:', error)
		throw error
	}
}
