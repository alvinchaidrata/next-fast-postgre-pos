'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { emptyCart } from '@/redux/cart/cartSlice'
import { getTodaysDate } from '@/utils/date/getTodaysDate'
import { numberWithCommas } from '@/utils/numbers/numberWithCommas'
import { createOrder } from '@/api/client/order/createOrder'
import { OrderProduct } from '@/interfaces/order'
import DetailsCard from './DetailsCard'
import Spinner from '../global/Spinner'

export default function OrderDetails() {
	const router = useRouter()
	const cart = useAppSelector((state) => state.cart)
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(false)

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault()
		setLoading(true)
		createOrder(cart).then((res) => {
			dispatch(emptyCart())

			const params = new URLSearchParams()
			params.set('order', res.id)
			router.push(`/orders?${params.toString()}`, { scroll: false })
		})
	}

	return (
		<div className="fixed right-0 top-0 min-h-screen w-80 shrink-0 border-l border-neutral-200 pt-16">
			<div className="flex flex-col p-5">
				<h1 className="text-lg font-medium">Current Order</h1>
				<h2 className="mt-1 text-xs opacity-30">
					Date: {getTodaysDate()}
				</h2>

				<div className="mt-5 flex flex-col gap-y-3">
					{cart.products.length > 0 ?
						cart.products.map((product: OrderProduct) => (
							<DetailsCard
								key={product.data.id}
								product={product}
								session={
									cart.products ?
										(cart.products.find(
											(el: OrderProduct) =>
												el.data.id === product.data.id,
										) ?? null)
									:	null
								}
							/>
						))
					:	<span className="mx-auto text-xs opacity-30">
							Cart is empty.
						</span>
					}
				</div>
			</div>

			<div className="absolute bottom-0 w-full p-5">
				<div className="flex w-full flex-col gap-y-2 border-t border-neutral-300 py-3 text-sm">
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Subtotal</h3>
						<h3>Rp. {numberWithCommas(cart.subtotal)}</h3>
					</div>
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Tax</h3>
						<h3>Rp. {numberWithCommas(cart.tax)}</h3>
					</div>
				</div>
				<div className="border-t border-dashed border-neutral-300 py-3">
					<div className="flex w-full items-center justify-between gap-x-4 font-medium">
						<h3>TOTAL</h3>
						<h3>Rp. {numberWithCommas(cart.total)}</h3>
					</div>
				</div>

				<button
					className={`${cart.total ? '' : 'opacity-30'} flex w-full items-center justify-center gap-x-2 rounded-md bg-black px-3 py-2 text-center text-white`}
					disabled={!cart.total || loading}
					onClick={handleSubmit}
				>
					<span>Create order</span>
					{loading && <Spinner className="h-6 w-6 border-white" />}
				</button>
			</div>
		</div>
	)
}
