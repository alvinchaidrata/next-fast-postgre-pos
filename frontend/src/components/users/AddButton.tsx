'use client'

import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { MdAdd } from 'react-icons/md'
import AddModal from './AddModal'
import useBridge from '@/hooks/useBridge'

export default function AddUserButton() {
	const [active, setActive] = useState(false)

	// Allows conditional rendering of EditModal while retaining open/close animation
	const { isShow, openModal, closeModal } = useBridge(setActive)

	const showSuccessMsg = () => toast.success('User has been made!')
	const showErrorMsg = (message: string) => toast.error(message)

	return (
		<>
			<button
				type="button"
				className="rounded-md border bg-black p-1 text-sm font-medium text-white transition-all"
				onClick={() => openModal()}
			>
				<MdAdd className="h-5 w-5" />
			</button>
			{active && (
				<AddModal
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
