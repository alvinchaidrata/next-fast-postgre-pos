import { fetchProducts } from '@/api/data/product/fetchProducts'
import { Product, ProductQuery } from '@/api/interfaces/product'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

interface Props {
	query?: ProductQuery
	currentPage: number
}

export default async function ProductsGrid({ ...props }: Props) {
	const { query, currentPage } = props
	const paginated_product = await fetchProducts(query, currentPage, 12)

	return paginated_product.items.length > 0 ?
			<div className="flex w-full flex-col gap-y-4">
				<div className="grid w-full gap-4 md:grid-cols-4">
					{paginated_product.items.map((product: Product) => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
				</div>

				<Pagination
					paginated_product={paginated_product}
					{...props}
				/>
			</div>
		:	<span className="mx-auto text-xs opacity-30">
				No product(s) found.
			</span>
}
