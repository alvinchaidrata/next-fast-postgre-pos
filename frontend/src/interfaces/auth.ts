export interface LoginForm {
	username: string
	password: string
}

export interface LoginFormError {
	username?: string
	password?: string
}

export interface AuthSession {
	access_token: string
	refresh_token: string
}

export interface AccessToken {
	exp: number
	sub: string
}
