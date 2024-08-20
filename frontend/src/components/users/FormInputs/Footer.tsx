'use client'

import { memo } from 'react'
import Spinner from '@/components/global/Spinner'

interface Props {
	closeModal: Function
	isLoading: boolean
}

export default memo(function Footer({ closeModal, isLoading }: Props) {
	return (
		<div className="flex w-full items-center justify-end gap-x-4">
			<button
				type="button"
				className="font-medium opacity-30 transition-all hover:opacity-100"
				onClick={() => closeModal()}
			>
				Cancel
			</button>
			<button
				type="submit"
				className={`${isLoading ? 'opacity-50' : 'transition-all hover:opacity-80'} flex items-center justify-between gap-x-2 rounded-md bg-black px-4 py-2 text-white`}
				disabled={isLoading}
			>
				<span className="font-medium text-white">Save</span>
				{isLoading && <Spinner className="h-4 w-4 border-white" />}
			</button>
		</div>
	)
})
