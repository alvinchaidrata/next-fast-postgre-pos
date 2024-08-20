import axios from 'axios'
import { PaginatedUser, UserQuery } from '../../interfaces/user'

export async function fetchUsers(
	query: UserQuery | null = null,
	page: number = 1,
	size: number = 12,
): Promise<PaginatedUser> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000))
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/users`,
			{ params: { page: page, size: size, ...query } },
		)
		return response.data
	} catch (error) {
		console.error('Error fetching users:', error)
		throw error
	}
}
