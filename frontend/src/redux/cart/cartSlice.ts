import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderProduct } from '@/api/interfaces/order'
import { Product } from '@/api/interfaces/product'

export interface CartState {
	subtotal: number
	tax: number
	total: number
	products: OrderProduct[]
}

const value = localStorage.getItem('cart')

const initialState: CartState =
	value ?
		JSON.parse(value)
	:	{
			subtotal: 0,
			tax: 0,
			total: 0,
			products: [],
		}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		updateQuantity: (
			state,
			action: PayloadAction<{ delta: number; product: Product }>,
		) => {
			const idx = state.products.findIndex(
				(product: OrderProduct) =>
					product.data.id === action.payload.product.id,
			)

			const cart = JSON.parse(JSON.stringify(state))
			if (idx >= 0) {
				if (cart.products[idx].quantity + action.payload.delta > 0) {
					cart.products[idx].quantity =
						cart.products[idx].quantity + action.payload.delta
					cart.products[idx].total =
						cart.products[idx].quantity *
						cart.products[idx].data.price
				} else {
					cart.products.splice(idx, 1)
				}
			} else {
				cart.products.push({
					quantity: 1,
					total: action.payload.product.price,
					data: action.payload.product,
				})
			}
			cart.subtotal = 0
			cart.products.forEach((product: OrderProduct) => {
				cart.subtotal += product.total
			})
			cart.tax = cart.subtotal * 0.1
			cart.total = cart.subtotal + cart.tax

			localStorage.setItem('cart', JSON.stringify(cart))
			return { ...cart }
		},
	},
})

export const { updateQuantity } = cartSlice.actions
export default cartSlice.reducer
