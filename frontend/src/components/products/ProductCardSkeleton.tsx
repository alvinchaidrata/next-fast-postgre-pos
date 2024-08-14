export default function ProductCardSkeleton() {
	return (
		<div className="flex h-full w-full flex-col rounded-md border border-neutral-200 bg-white p-3">
			<div className="aspect-w-1 aspect-h-1 animate-pulse rounded-md bg-neutral-200"></div>
			<div className="mt-2 h-5 w-3/4 animate-pulse bg-neutral-200"></div>
			<div className="mt-1 h-3 w-1/2 animate-pulse bg-neutral-200"></div>
		</div>
	)
}
