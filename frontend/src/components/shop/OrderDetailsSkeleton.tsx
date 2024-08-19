import React from 'react'
import getTodaysDate from '@/utils/date/getTodaysDate'
import Spinner from '../global/Spinner'

export default function OrderDetailsSkeleton() {
	return (
		<div className="fixed right-0 top-0 min-h-screen w-80 shrink-0 border-l border-neutral-200 pt-16">
			<div className="flex flex-col p-5">
				<h1 className="text-lg font-medium">Current Order</h1>
				<h2 className="mt-1 text-xs opacity-30">
					Date: {getTodaysDate()}
				</h2>

				<Spinner className="mx-auto mt-5 h-8 w-8 border-neutral-200" />
			</div>

			<div className="absolute bottom-0 w-full p-5">
				<div className="flex w-full flex-col gap-y-2 border-t border-neutral-300 py-3 text-sm">
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Subtotal</h3>
						<div className="h-4 w-24 animate-pulse bg-neutral-200"></div>
					</div>
					<div className="flex w-full items-center justify-between gap-x-4">
						<h3>Tax</h3>
						<div className="h-4 w-24 animate-pulse bg-neutral-200"></div>
					</div>
				</div>
				<div className="border-t border-dashed border-neutral-300 py-3">
					<div className="flex w-full items-center justify-between gap-x-4 font-medium">
						<h3>TOTAL</h3>
						<div className="h-5 w-24 animate-pulse bg-neutral-200"></div>
					</div>
				</div>

				<div className="w-full rounded-md bg-black px-3 py-2 text-center text-white">
					<Spinner className="mx-auto h-4 w-4 border-white" />
				</div>
			</div>
		</div>
	)
}
