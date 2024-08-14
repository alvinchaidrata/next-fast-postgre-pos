import ProductCardSkeleton from './ProductCardSkeleton'

export default function ProductsGridSkeleton() {
	return (
		<div className="grid w-full gap-4 md:grid-cols-4">
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
		</div>
	)
}
