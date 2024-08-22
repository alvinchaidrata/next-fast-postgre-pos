import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'

export async function POST() {
	try {
		const session = await getIronSession(cookies(), {
			password: process.env.SESSION_PASSWORD ?? '',
			cookieName: 'user',
		})
		session.destroy()
		return NextResponse.json({ detail: 'Success', status: 200 })
	} catch (error) {
		return NextResponse.json(error, {
			status: 500,
			statusText: 'Server error',
		})
	}
}
