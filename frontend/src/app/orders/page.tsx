import Topbar from '@/components/shared/Topbar'
import Filter from '@/components/orders/Filter'
import OrdersGrid from '@/components/orders/OrdersGrid'
import OrderDetails from '@/components/orders/OrderDetails'

export default function Orders() {
	return (
		<>
			<Topbar />

			<div className="flex w-full flex-1 flex-col pr-80 pt-16">
				<div className="flex w-full flex-1 bg-neutral-50">
					<div className="flex w-full flex-col gap-5 p-5">
						<Filter />
						<OrdersGrid />
					</div>
				</div>
			</div>

			<OrderDetails />
		</>
	)
}
