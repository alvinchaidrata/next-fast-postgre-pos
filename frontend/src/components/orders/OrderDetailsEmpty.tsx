export default function OrderDetailsEmpty() {
	return (
		<div className="fixed right-0 top-0 h-full min-h-screen w-80 shrink-0 border-l border-neutral-200 pt-16">
			<div className="flex h-full w-full items-center justify-center">
				<span className="text-sm opacity-30">
					Please select an order.
				</span>
			</div>
		</div>
	)
}
