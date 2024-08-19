import { Cart } from '@/api/interfaces/session'
import { OrderProduct } from '@/api/interfaces/order'

export default function (cart: Cart): Cart {
	let subtotal = 0
	let tax = 0

	cart.products.forEach((product: OrderProduct) => {
		product.total = product.quantity * product.data.price
		subtotal += product.total
		tax += product.total * 0.1
	})

	cart.subtotal = subtotal
	cart.tax = tax
	cart.total = cart.subtotal + cart.total

	return cart
}
