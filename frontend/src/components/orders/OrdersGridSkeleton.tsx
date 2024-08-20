export default function OrdersGridSkeleton() {
	return (
		<div className="grid w-full grid-cols-1 gap-4">
			<div className="flex flex-col gap-y-4">
				<div className="flex h-full w-full flex-col gap-y-2 rounded-md border border-neutral-200 bg-white p-3">
					<div className="h-6 w-36 animate-pulse bg-neutral-200"></div>
					<div className="h-4 w-80 animate-pulse bg-neutral-200"></div>
				</div>
				<div className="flex h-full w-full flex-col gap-y-2 rounded-md border border-neutral-200 bg-white p-3">
					<div className="h-6 w-36 animate-pulse bg-neutral-200"></div>
					<div className="h-4 w-80 animate-pulse bg-neutral-200"></div>
				</div>
				<div className="flex h-full w-full flex-col gap-y-2 rounded-md border border-neutral-200 bg-white p-3">
					<div className="h-6 w-36 animate-pulse bg-neutral-200"></div>
					<div className="h-4 w-80 animate-pulse bg-neutral-200"></div>
				</div>
			</div>
		</div>
	)
}
