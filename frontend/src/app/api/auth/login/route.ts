import axios from 'axios'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'
import { AuthSession } from '@/interfaces/auth'

export async function POST(req: Request) {
	const formData = await req.formData()

	try {
		const session = await getIronSession<AuthSession>(cookies(), {
			password: process.env.SESSION_PASSWORD ?? '',
			cookieName: 'user',
			ttl: 60 * 60 * 24, // expire in a day
		})

		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/login`,
			formData,
		)
		session.access_token = res.data.access_token
		session.refresh_token = res.data.refresh_token
		await session.save()

		return NextResponse.json({ detail: 'Success', status: 200 })
	} catch (error) {
		return NextResponse.json(error, {
			status: 500,
			statusText: 'Server error',
		})
	}
}
