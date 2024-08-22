import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'
import { AuthSession } from '@/interfaces/auth'

export async function GET() {
	try {
		const session = await getIronSession<AuthSession>(cookies(), {
			password: process.env.SESSION_PASSWORD ?? '',
			cookieName: 'user',
		})
		const token: string | null =
			session.access_token ? session.access_token : null

		return NextResponse.json(token)
	} catch (error) {
		return NextResponse.json(error, {
			status: 500,
			statusText: 'Server error',
		})
	}
}
