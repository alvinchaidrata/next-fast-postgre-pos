import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { AccessToken, AuthSession } from '@/interfaces/auth'
import { jwtDecode } from 'jwt-decode'
import { NextURL } from 'next/dist/server/web/next-url'
import { User } from './interfaces/user'

const redirectTo = (to: string, from: string, url: NextURL) => {
	if (to !== from) {
		url.pathname = to
		return NextResponse.redirect(url)
	}
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const url = request.nextUrl.clone()

	const session = await getIronSession<AuthSession>(cookies(), {
		password: process.env.SESSION_PASSWORD ?? '',
		cookieName: 'user',
	})

	const token: AccessToken | null =
		session.access_token ? jwtDecode(session.access_token) : null

	const userRoutes = ['/', '/shop', '/orders', '/products']

	if (token) {
		const user: User = JSON.parse(token.sub)

		if (new Date().getTime() <= token.exp) {
			return redirectTo('/', pathname, url)
		}

		if (pathname === '/') {
			return redirectTo('/shop', pathname, url)
		}

		if (user.role === 'User' && !userRoutes.includes(pathname)) {
			return redirectTo('/not-found', pathname, url)
		}
	} else {
		return redirectTo('/', pathname, url)
	}
}

export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
