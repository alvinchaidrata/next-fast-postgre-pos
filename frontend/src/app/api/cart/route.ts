import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { Cart } from '@/api/interfaces/session'
import { OrderProduct } from '@/api/interfaces/order'

const sessionOptions = {
	password: process.env.SESSION_PASSWORD ?? '',
	cookieName: 'cart',
}

export async function GET() {
	const session = await getIronSession<Cart>(cookies(), sessionOptions)
	return NextResponse.json(session)
}

export async function POST(req: Request) {
	const product: OrderProduct = await req.json()
	const session = await getIronSession<Cart>(cookies(), sessionOptions)

	if (!session.products) {
		session.subtotal = product.data.price
		session.tax = product.data.price * 0.1
		session.total = session.subtotal + session.tax
		session.products = [product]
	} else {
		session.subtotal = 0
		session.tax = 0
		session.total = 0

		let idx = session.products.findIndex(
			(prod) => prod.data.id === product.data.id,
		)
		if (idx < 0) {
			session.products.push(product)
		} else {
			if (product.quantity == 0) {
				session.products.splice(idx, 1)
			} else {
				session.products[idx] = product
			}
		}

		session.products.forEach((product: OrderProduct) => {
			session.subtotal += product.total
			session.tax += product.total * 0.1
		})
		session.total = session.subtotal + session.tax
	}

	await session.save()
	return NextResponse.json(session)
}
