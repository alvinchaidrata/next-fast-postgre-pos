import { Suspense } from 'react'
import { getQueryObj } from '@/api/form_helpers/order'
import Topbar from '@/components/shared/Topbar'
import Filter from '@/components/orders/Filter'
import OrdersGrid from '@/components/orders/OrdersGrid'
import OrdersGridSkeleton from '@/components/orders/OrdersGridSkeleton'
import OrderDetails from '@/components/orders/OrderDetails'
import OrderDetailsSkeleton from '@/components/orders/OrderDetailsSkeleton'
import OrderDetailsEmpty from '@/components/orders/OrderDetailsEmpty'

interface Props {
	searchParams?: {
		search?: string
		page?: string
		order?: string
	}
}

export default function Orders({ searchParams }: Props) {
	const orderId = searchParams?.order ?? null
	const search = searchParams?.search ?? ''
	const currentPage = Number(searchParams?.page) || 1

	return (
		<>
			<Topbar />

			<div className="flex w-full flex-1 flex-col pr-80 pt-16">
				<div className="flex w-full flex-1 bg-neutral-50">
					<div className="flex w-full flex-col gap-5 p-5">
						<Filter />

						<Suspense
							key={search + currentPage}
							fallback={<OrdersGridSkeleton />}
						>
							<OrdersGrid
								query={getQueryObj(searchParams)}
								currentPage={currentPage}
							/>
						</Suspense>
					</div>
				</div>
			</div>

			{orderId ?
				<Suspense
					key={orderId}
					fallback={<OrderDetailsSkeleton />}
				>
					<OrderDetails order_id={orderId} />
				</Suspense>
			:	<OrderDetailsEmpty />}
		</>
	)
}
