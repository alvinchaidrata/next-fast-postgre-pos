import { PaginationObj } from './pagination'
import { Product } from './product'

export interface OrderProduct {
	quantity: number
	total: number
	data: Product
}

export interface Order {
	id: string
	subtotal: number
	tax: number
	total: number
	products: OrderProduct[]
	created_at: string
}

export interface OrderQuery {
	search?: string
}

export interface PostData extends Omit<Order, 'id' | 'created_at'> {}

export interface PaginatedOrder extends PaginationObj {
	items: Order[]
}
