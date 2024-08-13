import axios, { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { ServerSession } from '@/api/interfaces/session'
import { API_URL, SESSION_PASSWORD } from '../../../../config'

export async function POST(req: Request) {
	const formData = await req.formData()

	try {
		const tokens = await axios.post(`${API_URL}/login`, formData)
		const session = await getIronSession<ServerSession>(cookies(), {
			password: SESSION_PASSWORD ?? '',
			cookieName: 'user',
		})
		session.jwt_token = tokens.data.access_token
		session.refresh_token = tokens.data.refresh_token
		await session.save()

		return NextResponse.json({ detail: 'Success', status: 200 })
	} catch (error) {
		//// error.status can't be read even when it is present in error obj
		// if (error instanceof AxiosError) {
		// 	if (error.status == 401) {
		// 		return NextResponse.json({
		// 			detail: 'Unauthorized',
		// 			status: 401,
		// 		})
		// 	} else {
		// 		return NextResponse.json({
		// 			detail: error.message,
		// 			status: 500,
		// 		})
		// 	}
		// }

		return NextResponse.json({ detail: 'Unauthorized', status: 401 })
	}
}
