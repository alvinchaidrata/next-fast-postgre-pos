import axios from 'axios'
import { getAuthHeader } from '../auth/getAuthHeader'

export async function deleteUser(user_id: string): Promise<null> {
	try {
		const bearer = await getAuthHeader()
		if (bearer) {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`,
				{ headers: { Authorization: bearer } },
			)
			return response.data
		} else {
			console.error('Unauthorized')
			throw Error
		}
	} catch (error) {
		console.error('Error deleting user:', error)
		throw error
	}
}
