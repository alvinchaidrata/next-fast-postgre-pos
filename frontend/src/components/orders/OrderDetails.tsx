import DetailsCard from './DetailsCard'

export default function OrderDetails() {
	return (
		<div className="fixed right-0 top-0 min-h-screen w-80 shrink-0 border-l border-neutral-200 pt-16">
			<div className="flex flex-col p-5">
				<h1 className="text-lg font-medium">Order X023KD222</h1>
				<h2 className="mt-1 text-xs opacity-30">
					Date: Monday, 24 June 2024
				</h2>

				<div className="mt-5 flex flex-col gap-y-3">
					<DetailsCard />
				</div>
			</div>

			<div className="absolute bottom-0 w-full p-5">
				<div className="flex w-full flex-col gap-y-2 border-t border-neutral-300 py-3 text-sm">
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Subtotal</h3>
						<h3>Rp. 200,000</h3>
					</div>
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Discount</h3>
						<h3>-Rp. 20,000</h3>
					</div>
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Service Charge</h3>
						<h3>Rp. 10,000</h3>
					</div>
				</div>
				<div className="border-t border-dashed border-neutral-300 py-3">
					<div className="flex w-full items-center justify-between gap-x-4 font-medium">
						<h3>TOTAL</h3>
						<h3>Rp. 190,000</h3>
					</div>
				</div>
			</div>
		</div>
	)
}
