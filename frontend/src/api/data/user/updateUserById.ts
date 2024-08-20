import axios from 'axios'
import { User, PostData } from '../../interfaces/user'

export async function updateUserById(
	user_id: string,
	updateData: PostData,
): Promise<User> {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`,
			updateData,
		)
		return response.data
	} catch (error) {
		console.error('Error updating user:', error)
		throw error
	}
}
