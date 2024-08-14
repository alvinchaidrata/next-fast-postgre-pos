import Topbar from '@/components/shared/Topbar'
import Filter from '@/components/shop/Filter'
import ProductsGrid from '@/components/shop/ProductsGrid'
import OrderDetails from '@/components/shop/OrderDetails'

export default function () {
	return (
		<>
			<Topbar />

			<div className="flex w-full flex-1 flex-col pr-80 pt-16">
				<div className="flex w-full flex-1 bg-neutral-50">
					<div className="flex w-full flex-col gap-5 p-5">
						<Filter />
						<ProductsGrid />
					</div>
				</div>
			</div>

			<OrderDetails />
		</>
	)
}
