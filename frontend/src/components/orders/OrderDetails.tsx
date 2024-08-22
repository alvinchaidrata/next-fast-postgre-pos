import { useState, useEffect } from 'react'
import { fetchOrderById } from '@/api/client/order/fetchOrderById'
import { getParsedDate } from '@/utils/date/getParsedDate'
import { numberWithCommas } from '@/utils/numbers/numberWithCommas'
import { Order, OrderProduct } from '@/interfaces/order'
import DetailsCard from './DetailsCard'
import OrderDetailsSkeleton from './OrderDetailsSkeleton'

interface Props {
	order_id: string
}

export default function OrderDetails({ order_id }: Props) {
	const [order, setOrder] = useState<Order | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		fetchOrderById(order_id).then((res) => {
			setOrder(res)
			setLoading(false)
		})
	}, [order_id])

	return order && !loading ?
			<div className="fixed right-0 top-0 min-h-screen w-80 shrink-0 border-l border-neutral-200 pt-16">
				<div className="flex flex-col p-5">
					<h1 className="text-lg font-medium">Order {order.id}</h1>
					<h2 className="mt-1 text-xs opacity-30">
						Date: {getParsedDate(order.created_at)}
					</h2>

					<div className="mt-5 flex flex-col gap-y-3">
						{order.products.map((product: OrderProduct) => (
							<DetailsCard
								key={product.data.id}
								product={product}
							/>
						))}
					</div>
				</div>

				<div className="absolute bottom-0 w-full p-5">
					<div className="flex w-full flex-col gap-y-2 border-t border-neutral-300 py-3 text-sm">
						<div className="flex w-full items-center justify-between gap-x-4">
							<h3>Subtotal</h3>
							<h3>Rp. {numberWithCommas(order.subtotal)}</h3>
						</div>
						<div className="flex w-full items-center justify-between gap-x-4">
							<h3>Tax</h3>
							<h3>Rp. {numberWithCommas(order.tax)}</h3>
						</div>
					</div>
					<div className="border-t border-dashed border-neutral-300 py-3">
						<div className="flex w-full items-center justify-between gap-x-4 font-medium">
							<h3>TOTAL</h3>
							<h3>Rp. {numberWithCommas(order.total)}</h3>
						</div>
					</div>
				</div>
			</div>
		:	<OrderDetailsSkeleton />
}
