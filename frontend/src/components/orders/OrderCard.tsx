'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Order } from '@/api/interfaces/order'
import numberWithCommas from '@/utils/numbers/numberWithCommas'

interface Props {
	order: Order
}

export default function OrderCard({ order }: Props) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		const params = new URLSearchParams(searchParams)
		params.set('order', order.id)

		replace(`${pathname}?${params.toString()}`, { scroll: false })
	}

	return (
		<button
			type="button"
			className="flex flex-col gap-y-4"
			onClick={handleClick}
		>
			<div className="flex h-full w-full flex-col items-start rounded-md border border-neutral-200 bg-white p-3">
				<h1 className="truncate text-lg font-medium">
					Order {order.id}
				</h1>
				<p className="text-sm opacity-30">
					{order.products.length} item(s), Rp.{' '}
					{numberWithCommas(order.total)}
				</p>
			</div>
		</button>
	)
}
