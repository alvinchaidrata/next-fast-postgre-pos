import { SessionOptions } from 'iron-session'

export const sessionOptions: SessionOptions = {
	password: process.env.SESSION_PASSWORD ?? '',
	cookieName: 'iron-examples-app-router-server-component-and-action',
	cookieOptions: {
		// secure only works in `https` environments
		secure: process.env.NODE_ENV === 'production',
	},
}
