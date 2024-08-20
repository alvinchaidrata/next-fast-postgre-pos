import { fetchOrders } from '@/api/data/order/fetchOrders'
import { Order, OrderQuery } from '@/api/interfaces/order'
import OrderCard from './OrderCard'
import Pagination from './Pagination'

interface Props {
	query?: OrderQuery
	currentPage: number
}

export default async function OrdersGrid({ ...props }: Props) {
	const { query, currentPage } = props
	const paginated_order = await fetchOrders(query, currentPage, 12)

	return paginated_order.items.length > 0 ?
			<div className="flex w-full flex-col gap-y-4">
				<div className="grid w-full grid-cols-1 gap-4">
					{paginated_order.items.map((order: Order) => (
						<OrderCard
							key={order.id}
							order={order}
						/>
					))}
				</div>

				<Pagination
					paginated_order={paginated_order}
					{...props}
				/>
			</div>
		:	<span className="mx-auto text-xs opacity-30">No order(s) found.</span>
}
