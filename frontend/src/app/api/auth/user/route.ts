import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'
import { AccessToken, AuthSession } from '@/interfaces/auth'
import { jwtDecode } from 'jwt-decode'

export async function GET() {
	try {
		const session = await getIronSession<AuthSession>(cookies(), {
			password: process.env.SESSION_PASSWORD ?? '',
			cookieName: 'user',
		})
		const token: AccessToken | null =
			session.access_token ? jwtDecode(session.access_token) : null

		return NextResponse.json(token ? JSON.parse(token.sub ?? '{}') : null)
	} catch (error) {
		return NextResponse.json(error, {
			status: 500,
			statusText: 'Server error',
		})
	}
}
