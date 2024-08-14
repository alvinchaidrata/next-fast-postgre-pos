'use client'

import { useState } from 'react'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import useBridge from '@/hooks/useBridge'
import EditProductModal from './EditModal'
import { Product } from '@/api/interfaces/product'
import numberWithCommas from '@/utils/numbers/numberWithCommas'

interface Props {
	product: Product
}

export default function ProductCard({ product }: Props) {
	const [active, setActive] = useState(false)

	// Allows conditional rendering of EditModal while retaining open/close animation
	const { isShow, openModal, closeModal } = useBridge(setActive)

	const showSuccessMsg = (message: string) => toast.success(message)
	const showErrorMsg = (message: string) => toast.error(message)

	return (
		<>
			<button
				type="button"
				className="flex h-full w-full flex-col rounded-md border border-neutral-200 bg-white p-3"
				onClick={() => openModal()}
			>
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
					<p className="opacity-70">
						Rp. {numberWithCommas(product.price)}
					</p>
				</div>
			</button>
			{active && (
				<EditProductModal
					product={product}
					open={isShow}
					closeModal={closeModal}
					showSuccessMsg={showSuccessMsg}
					showErrorMsg={showErrorMsg}
				/>
			)}
			<Toaster
				position="top-right"
				toastOptions={{
					className: 'border border-black bg-black text-white',
				}}
			/>
		</>
	)
}
