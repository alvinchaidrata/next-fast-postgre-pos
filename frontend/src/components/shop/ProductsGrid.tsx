'use client'

import { useState, useEffect } from 'react'
import { fetchProducts } from '@/api/data/product/fetchProducts'
import { Product, ProductQuery } from '@/api/interfaces/product'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import { PaginatedProduct } from '@/api/interfaces/product'
import ProductsGridSkeleton from './ProductsGridSkeleton'

interface Props {
	query?: ProductQuery
	currentPage: number
}

export default function ProductsGrid({ ...props }: Props) {
	const { query, currentPage } = props

	const [paginatedProduct, setPaginatedProduct] =
		useState<PaginatedProduct | null>(null)

	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		fetchProducts(query, currentPage, 12).then((res) => {
			setPaginatedProduct(res)
			setLoading(false)
		})
	}, [query, currentPage])

	return (
		paginatedProduct && !loading ?
			paginatedProduct.items.length > 0 ?
				<div className="flex w-full flex-col gap-y-4">
					<div className="grid w-full gap-4 md:grid-cols-3">
						{paginatedProduct.items.map((product: Product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
					</div>

					<Pagination
						paginated_product={paginatedProduct}
						{...props}
					/>
				</div>
			:	<span className="mx-auto text-xs opacity-30">
					No product(s) found.
				</span>
		:	<ProductsGridSkeleton />
	)
}
