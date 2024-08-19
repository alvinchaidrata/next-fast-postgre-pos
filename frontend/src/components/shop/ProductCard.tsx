'use client'

import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import useCart from '@/hooks/useCart'
import { Product } from '@/api/interfaces/product'
import numberWithCommas from '@/utils/numbers/numberWithCommas'
import { OrderProduct } from '@/api/interfaces/order'

interface Props {
	product: Product
	session: OrderProduct | null
}

export default function ProductCard({ product, session }: Props) {
	const { quantity, updateProductQuantity } = useCart(product, session)

	return (
		<div className="flex h-full w-full flex-col rounded-md border border-neutral-200 bg-white p-3">
			<div className="aspect-w-1 aspect-h-1 w-full rounded-md bg-neutral-200">
				<Image
					fill
					alt={product.name}
					src={product.image}
					className="h-full w-full rounded-md object-cover"
					quality={100}
					sizes="100%"
					priority
				/>
			</div>
			<div className="mt-2 flex h-full flex-col items-start justify-between gap-y-2 p-1">
				<h1 className="line-clamp-2 text-left text-lg font-medium leading-tight tracking-normal">
					{product.name}
				</h1>
				<div className="flex w-full items-center justify-between gap-x-4">
					<h2 className="truncate text-sm font-bold">
						Rp. {numberWithCommas(product.price)}
					</h2>

					{quantity ?
						<div className="flex items-center gap-x-2">
							<button
								type="button"
								className="flex items-center rounded-md bg-neutral-200 p-0.5"
								onClick={() => updateProductQuantity(-1)}
							>
								<AiOutlineMinus className="h-4 w-4" />
							</button>
							<span className="text-sm">{quantity}</span>
							<button
								type="button"
								className="flex items-center rounded-md bg-neutral-200 p-0.5"
								onClick={() => updateProductQuantity(1)}
							>
								<AiOutlinePlus className="h-4 w-4" />
							</button>
						</div>
					:	<button
							type="button"
							className="flex items-center rounded-md bg-neutral-200 p-0.5"
							onClick={() => updateProductQuantity(1)}
						>
							<AiOutlinePlus className="h-4 w-4" />
						</button>
					}
				</div>
			</div>
		</div>
	)
}
