import { Suspense } from 'react'
import Topbar from '@/components/shared/Topbar'
import Filter from '@/components/products/Filter'
import AddButton from '@/components/products/AddButton'
import ProductsGrid from '@/components/products/ProductsGrid'
import ProductsGridSkeleton from '@/components/products/ProductsGridSkeleton'
import { getQueryObj } from '@/api/form_helpers/product'

interface Props {
	searchParams?: {
		search?: string
		page?: string
	}
}

export default function Orders({ searchParams }: Props) {
	const search = searchParams?.search ?? ''
	const currentPage = Number(searchParams?.page) || 1

	return (
		<>
			<Topbar />

			<div className="flex w-full flex-1 flex-col pt-16">
				<div className="flex w-full flex-col gap-5 p-5">
					<div className="flex w-full items-center justify-between gap-x-8">
						<Filter />
						<AddButton />
					</div>

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
		</>
	)
}
