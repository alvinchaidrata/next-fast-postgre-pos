import axios from 'axios'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { NextRequest, NextResponse } from 'next/server'
import { AuthSession } from '@/interfaces/auth'
import { UserQuery } from '@/interfaces/user'

export async function GET(req: NextRequest) {
	const query: UserQuery = await req.json()

	try {
		const session = await getIronSession<AuthSession>(cookies(), {
			password: process.env.SESSION_PASSWORD ?? '',
			cookieName: 'user',
		})

		if (session.access_token) {
			const AuthStr = `Bearer ${session.access_token}`
			console.log(AuthStr)

			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users`,
				{ headers: { Authorization: AuthStr }, params: query },
			)
			return NextResponse.json(response.data)
		} else {
		}
	} catch (error) {
		return NextResponse.json(error, {
			status: 500,
			statusText: 'Server error',
		})
	}
}
