export default function UsersGridSkeleton() {
	return (
		<div className="flex w-full flex-col gap-y-4">
			<div className="grid w-full gap-4 md:grid-cols-4">
				<div className="flex h-full w-full items-center gap-x-4 rounded-md border border-neutral-200 bg-white p-2">
					<div className="w-20 shrink-0">
						<div className="aspect-w-1 aspect-h-1 w-full animate-pulse rounded-md bg-neutral-200"></div>
					</div>
					<div className="flex w-full flex-col gap-y-2">
						<div className="h-4 w-2/3 animate-pulse bg-neutral-200"></div>
						<div className="h-3 w-1/2 animate-pulse bg-neutral-200"></div>
					</div>
				</div>
				<div className="flex h-full w-full items-center gap-x-4 rounded-md border border-neutral-200 bg-white p-2">
					<div className="w-20 shrink-0">
						<div className="aspect-w-1 aspect-h-1 w-full animate-pulse rounded-md bg-neutral-200"></div>
					</div>
					<div className="flex w-full flex-col gap-y-2">
						<div className="h-4 w-2/3 animate-pulse bg-neutral-200"></div>
						<div className="h-3 w-1/2 animate-pulse bg-neutral-200"></div>
					</div>
				</div>
				<div className="flex h-full w-full items-center gap-x-4 rounded-md border border-neutral-200 bg-white p-2">
					<div className="w-20 shrink-0">
						<div className="aspect-w-1 aspect-h-1 w-full animate-pulse rounded-md bg-neutral-200"></div>
					</div>
					<div className="flex w-full flex-col gap-y-2">
						<div className="h-4 w-2/3 animate-pulse bg-neutral-200"></div>
						<div className="h-3 w-1/2 animate-pulse bg-neutral-200"></div>
					</div>
				</div>
				<div className="flex h-full w-full items-center gap-x-4 rounded-md border border-neutral-200 bg-white p-2">
					<div className="w-20 shrink-0">
						<div className="aspect-w-1 aspect-h-1 w-full animate-pulse rounded-md bg-neutral-200"></div>
					</div>
					<div className="flex w-full flex-col gap-y-2">
						<div className="h-4 w-2/3 animate-pulse bg-neutral-200"></div>
						<div className="h-3 w-1/2 animate-pulse bg-neutral-200"></div>
					</div>
				</div>
			</div>
		</div>
	)
}
