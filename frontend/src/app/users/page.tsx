import { Suspense } from 'react'
import { getQueryObj } from '@/utils/form-helpers/user'
import Topbar from '@/components/shared/Topbar'
import Filter from '@/components/products/Filter'
import AddButton from '@/components/users/AddButton'
import UsersGrid from '@/components/users/UsersGrid'
import UsersGridSkeleton from '@/components/users/UsersGridSkeleton'

interface Props {
	searchParams?: {
		search?: string
		page?: string
	}
}

export default function Users({ searchParams }: Props) {
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
						fallback={<UsersGridSkeleton />}
					>
						<UsersGrid
							query={getQueryObj(searchParams)}
							currentPage={currentPage}
						/>
					</Suspense>
				</div>
			</div>
		</>
	)
}
