import Image from 'next/image'
import { OrderProduct } from '@/api/interfaces/order'
import numberWithCommas from '@/utils/numbers/numberWithCommas'

interface Props {
	product: OrderProduct
}

export default function DetailsCard({ product }: Props) {
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

					<span className="text-xs">
						{numberWithCommas(product.quantity)} pcs
					</span>
				</div>
			</div>
		</div>
	)
}
