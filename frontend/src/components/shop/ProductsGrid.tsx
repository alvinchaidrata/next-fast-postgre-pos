import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import ProductCard from './ProductCard'

export default function ProductsGrid() {
	return (
		<div className="grid w-full gap-4 md:grid-cols-4">
			<div className="flex h-full w-full flex-col rounded-md border border-neutral-200 bg-white p-3">
				<div className="aspect-w-1 aspect-h-1 rounded-md bg-neutral-200"></div>
				<h1 className="mt-2 truncate text-lg">Item name</h1>
				<p className="opactiy-30 line-clamp-2 text-xs">Description</p>
				<div className="mt-2 flex w-full items-center justify-between gap-x-4">
					<h2 className="truncate text-sm font-bold">Rp. 200,000</h2>

					<div className="flex items-center gap-x-2">
						<button className="flex items-center rounded-md bg-neutral-200 p-0.5">
							<AiOutlineMinus className="h-4 w-4" />
						</button>
						<span className="text-sm">1</span>
						<button className="flex items-center rounded-md bg-neutral-200 p-0.5">
							<AiOutlinePlus className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</div>
	)
}
