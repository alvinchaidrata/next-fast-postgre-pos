'use server'

import axios from 'axios'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { PaginatedUser, UserQuery } from '@/interfaces/user'
import { AuthSession } from '@/interfaces/auth'

export async function fetchUsers(
	query: UserQuery | null = null,
	page: number = 1,
	size: number = 12,
): Promise<PaginatedUser> {
	try {
		const session = await getIronSession<AuthSession>(cookies(), {
			password: process.env.SESSION_PASSWORD ?? '',
			cookieName: 'user',
		})
		const token: string | null =
			session.access_token ? session.access_token : null

		if (token) {
			const AuthStr = `Bearer ${token}`
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users`,
				{
					headers: { Authorization: AuthStr },
					params: { page: page, size: size, ...query },
				},
			)
			return response.data
		} else {
			throw Error
		}
	} catch (error) {
		console.error('Error fetching users:', error)
		throw error
	}
}
