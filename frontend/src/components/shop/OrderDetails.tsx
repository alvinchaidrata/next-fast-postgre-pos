import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { Cart } from '@/api/interfaces/session'
import getTodaysDate from '@/utils/date/getTodaysDate'
import numberWithCommas from '@/utils/numbers/numberWithCommas'
import DetailsCard from './DetailsCard'
import { OrderProduct } from '@/api/interfaces/order'

export default async function OrderDetails() {
	const session = await getIronSession<Cart>(cookies(), {
		password: process.env.SESSION_PASSWORD ?? '',
		cookieName: 'cart',
	})

	return (
		<div className="fixed right-0 top-0 min-h-screen w-80 shrink-0 border-l border-neutral-200 pt-16">
			<div className="flex flex-col p-5">
				<h1 className="text-lg font-medium">Current Order</h1>
				<h2 className="mt-1 text-xs opacity-30">
					Date: {getTodaysDate()}
				</h2>

				<div className="mt-5 flex flex-col gap-y-3">
					{session.products && session.products.length > 0 ?
						session.products.map((product: OrderProduct) => (
							<DetailsCard
								key={product.data.id}
								product={product}
								session={
									session.products ?
										(session.products.find(
											(el: OrderProduct) =>
												el.data.id === product.data.id,
										) ?? null)
									:	null
								}
							/>
						))
					:	<span className="mx-auto text-xs opacity-30">
							Cart is empty.
						</span>
					}
				</div>
			</div>

			<div className="absolute bottom-0 w-full p-5">
				<div className="flex w-full flex-col gap-y-2 border-t border-neutral-300 py-3 text-sm">
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Subtotal</h3>
						<h3>Rp. {numberWithCommas(session.subtotal)}</h3>
					</div>
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Tax</h3>
						<h3>Rp. {numberWithCommas(session.tax)}</h3>
					</div>
				</div>
				<div className="border-t border-dashed border-neutral-300 py-3">
					<div className="flex w-full items-center justify-between gap-x-4 font-medium">
						<h3>TOTAL</h3>
						<h3>Rp. {numberWithCommas(session.total)}</h3>
					</div>
				</div>

				<button className="w-full rounded-md bg-black px-3 py-2 text-center text-white">
					Create order
				</button>
			</div>
		</div>
	)
}
