import { OrderProduct } from './order'

export interface ServerSession {
	jwt_token: string
	refresh_token: string
}

export interface Cart {
	subtotal: number
	tax: number
	total: number
	products: OrderProduct[]
}
