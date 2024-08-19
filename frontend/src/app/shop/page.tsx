import { Suspense } from 'react'
import { getQueryObj } from '@/api/form_helpers/product'
import Topbar from '@/components/shared/Topbar'
import Filter from '@/components/shop/Filter'
import ProductsGrid from '@/components/shop/ProductsGrid'
import ProductsGridSkeleton from '@/components/shop/ProductsGridSkeleton'
import OrderDetails from '@/components/shop/OrderDetails'
import OrderDetailsSkeleton from '@/components/shop/OrderDetailsSkeleton'

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
		<>
			<Topbar />

			<div className="flex w-full flex-1 flex-col pr-80 pt-16">
				<div className="flex w-full flex-1 bg-neutral-50">
					<div className="flex w-full flex-col gap-5 p-5">
						<Filter />

						<Suspense
							key={search + currentPage}
							fallback={<ProductsGridSkeleton />}
						>
							<ProductsGrid
								query={getQueryObj(searchParams)}
								currentPage={currentPage}
							/>
						</Suspense>
					</div>
				</div>
			</div>

			<Suspense fallback={<OrderDetailsSkeleton />}>
				<OrderDetails />
			</Suspense>
		</>
	)
}
