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
}

export interface OrderQuery {
	search?: string
}

export interface PostData extends Omit<Order, 'id'> {}

export interface PaginatedOrder extends PaginationObj {
	items: Order[]
}
