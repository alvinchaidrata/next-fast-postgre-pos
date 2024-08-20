import { useState, useEffect } from 'react'
import { PaginatedOrder } from '@/api/interfaces/order'
import { fetchOrders } from '@/api/data/order/fetchOrders'
import { Order, OrderQuery } from '@/api/interfaces/order'
import OrderCard from './OrderCard'
import Pagination from './Pagination'
import OrdersGridSkeleton from './OrdersGridSkeleton'

interface Props {
	query?: OrderQuery
	currentPage: number
}

export default function OrdersGrid({ ...props }: Props) {
	const { query, currentPage } = props

	const [paginatedOrder, setPaginatedOrder] = useState<PaginatedOrder | null>(
		null,
	)

	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		fetchOrders(query, currentPage, 12).then((res) => {
			setPaginatedOrder(res)
			setLoading(false)
		})
	}, [query, currentPage])

	return (
		paginatedOrder && !loading ?
			paginatedOrder.items.length > 0 ?
				<div className="flex w-full flex-col gap-y-4">
					<div className="grid w-full grid-cols-1 gap-4">
						{paginatedOrder.items.map((order: Order) => (
							<OrderCard
								key={order.id}
								order={order}
							/>
						))}
					</div>

					<Pagination
						paginated_order={paginatedOrder}
						{...props}
					/>
				</div>
			:	<span className="mx-auto text-xs opacity-30">
					No order(s) found.
				</span>
		:	<OrdersGridSkeleton />
	)
}
