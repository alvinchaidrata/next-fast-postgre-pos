import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'

export async function GET() {
	const session = await getIronSession(cookies(), {
		password: '...',
		cookieName: '...',
	})

	if (session) {
		return NextResponse.json({ user: null })
	} else {
		return NextResponse.json({ user: null })
	}
}
