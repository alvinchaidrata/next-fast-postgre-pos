import axios from 'axios'

export async function deleteUser(user_id: string): Promise<null> {
	try {
		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`,
		)
		return response.data
	} catch (error) {
		console.error('Error deleting user:', error)
		throw error
	}
}
