'use client'

import { getQueryObj } from '@/api/form_helpers/product'
import { StoreProvider } from '@/redux/StoreProvider'
import Topbar from '@/components/shared/Topbar'
import Filter from '@/components/shop/Filter'
import ProductsGrid from '@/components/shop/ProductsGrid'
import OrderDetails from '@/components/shop/OrderDetails'

interface Props {
	searchParams?: {
		search?: string
		page?: string
	}
}

export default function Shop({ searchParams }: Props) {
	const search = searchParams?.search ?? ''
	const currentPage = Number(searchParams?.page) || 1

	return (
		<StoreProvider>
			<Topbar />

			<div className="flex w-full flex-1 flex-col pr-80 pt-16">
				<div className="flex w-full flex-1 bg-neutral-50">
					<div className="flex w-full flex-col gap-5 p-5">
						<Filter />

						<ProductsGrid
							query={getQueryObj(searchParams)}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>

			<OrderDetails />
		</StoreProvider>
	)
}
