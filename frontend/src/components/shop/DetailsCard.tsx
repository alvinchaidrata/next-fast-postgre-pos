'use client'

import Image from 'next/image'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useAppDispatch } from '@/redux/hooks'
import { updateQuantity } from '@/redux/cart/cartSlice'
import { numberWithCommas } from '@/utils/numbers/numberWithCommas'
import { OrderProduct } from '@/interfaces/order'

interface Props {
	product: OrderProduct
	session: OrderProduct | null
}

export default function DetailsCard({ product, session }: Props) {
	const dispatch = useAppDispatch()

	return (
		<div className="flex w-full items-center gap-x-3 rounded-md border border-neutral-200 bg-white p-2">
			<div className="w-24">
				<div className="aspect-w-1 aspect-h-1 w-full rounded-md bg-neutral-200">
					<Image
						fill
						alt={product.data.name}
						src={product.data.image}
						className="h-full w-full rounded-md object-cover"
						quality={100}
						sizes="100%"
						priority
					/>
				</div>
			</div>
			<div className="flex h-16 w-full flex-col justify-between">
				<h1 className="line-clamp-2 text-sm">{product.data.name}</h1>
				<div className="mt-1 flex w-full items-center justify-between gap-x-2">
					<h2 className="truncate text-xs font-medium">
						Rp. {numberWithCommas(product.data.price)}
					</h2>

					<div className="flex items-center gap-x-2">
						<button
							type="button"
							className="flex items-center rounded bg-neutral-200 p-0.5"
							onClick={() =>
								dispatch(
									updateQuantity({
										delta: -1,
										product: product.data,
									}),
								)
							}
						>
							<AiOutlineMinus className="h-3 w-3" />
						</button>
						<span className="text-xs">
							{numberWithCommas(session ? session.quantity : 0)}
						</span>
						<button
							type="button"
							className={`${session && session.quantity + 1 > product.data.stock ? 'opacity-30' : ''} flex items-center rounded bg-neutral-200 p-0.5`}
							disabled={
								session ?
									session.quantity + 1 > product.data.stock
								:	false
							}
						>
							<AiOutlinePlus
								className="h-3 w-3"
								onClick={() =>
									dispatch(
										updateQuantity({
											delta: 1,
											product: product.data,
										}),
									)
								}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
