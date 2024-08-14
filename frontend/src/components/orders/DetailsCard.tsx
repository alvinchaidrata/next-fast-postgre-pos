export default function DetailsCard() {
	return (
		<div className="flex w-full items-center gap-x-3 rounded-md border border-neutral-200 bg-white p-2">
			<div className="h-16 w-16 shrink-0 rounded-md bg-neutral-200"></div>
			<div className="flex w-full flex-col">
				<h1 className="text-sm">Item name</h1>
				<p className="line-clamp-2 text-[10px] opacity-30">
					Description
				</p>
				<div className="mt-1 flex w-full items-center justify-between gap-x-2">
					<h2 className="truncate text-xs font-medium">
						Rp. 200,000
					</h2>

					<span className="text-xs">1 pcs</span>
				</div>
			</div>
		</div>
	)
}
