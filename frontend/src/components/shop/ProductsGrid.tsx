import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { fetchProducts } from '@/api/data/product/fetchProducts'
import { Product, ProductQuery } from '@/api/interfaces/product'
import { Cart } from '@/api/interfaces/session'
import { OrderProduct } from '@/api/interfaces/order'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

interface Props {
	query?: ProductQuery
	currentPage: number
}

export default async function ProductsGrid({ ...props }: Props) {
	const { query, currentPage } = props
	const paginated_product = await fetchProducts(query, currentPage, 12)
	const session = await getIronSession<Cart>(cookies(), {
		password: process.env.SESSION_PASSWORD ?? '',
		cookieName: 'cart',
	})

	return (
		<div className="flex w-full flex-col gap-y-4">
			<div className="grid w-full gap-4 md:grid-cols-3">
				{paginated_product.items.map((product: Product) => (
					<ProductCard
						key={product.id}
						product={product}
						session={
							session.products ?
								(session.products.find(
									(el: OrderProduct) =>
										el.data.id === product.id,
								) ?? null)
							:	null
						}
					/>
				))}
			</div>

			<Pagination
				paginated_product={paginated_product}
				{...props}
			/>
		</div>
	)
}
