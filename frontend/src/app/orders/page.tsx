'use client'

import { useMemo } from 'react'
import { getQueryObj } from '@/utils/form-helpers/order'
import Topbar from '@/components/shared/Topbar'
import Filter from '@/components/orders/Filter'
import OrdersGrid from '@/components/orders/OrdersGrid'
import OrderDetails from '@/components/orders/OrderDetails'
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
	const currentPage = Number(searchParams?.page) || 1
	const search = searchParams?.search

	// Prevent refresh on every click on order card
	const queryObj = useMemo(
		() => getQueryObj(searchParams),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentPage, search],
	)

	return (
		<>
			<Topbar />

			<div className="flex w-full flex-1 flex-col pr-80 pt-16">
				<div className="flex w-full flex-1 bg-neutral-50">
					<div className="flex w-full flex-col gap-5 p-5">
						<Filter />

						<OrdersGrid
							query={queryObj}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>

			{orderId ?
				<OrderDetails order_id={orderId} />
			:	<OrderDetailsEmpty />}
		</>
	)
}
