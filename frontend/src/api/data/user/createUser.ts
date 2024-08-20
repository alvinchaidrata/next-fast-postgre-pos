import axios from 'axios'
import { User, PostData } from '../../interfaces/user'

export async function createUser(data: PostData): Promise<User> {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/users`,
			data,
		)
		return response.data
	} catch (error) {
		console.error('Error creating user:', error)
		throw error
	}
}
