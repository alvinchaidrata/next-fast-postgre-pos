'use client'

import { useState } from 'react'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import useBridge from '@/hooks/useBridge'
import { User } from '@/api/interfaces/user'
import EditUserModal from './EditModal'

interface Props {
	user: User
}

export default function UserCard({ user }: Props) {
	const [active, setActive] = useState(false)

	// Allows conditional rendering of EditModal while retaining open/close animation
	const { isShow, openModal, closeModal } = useBridge(setActive)

	const showSuccessMsg = (message: string) => toast.success(message)
	const showErrorMsg = (message: string) => toast.error(message)

	return (
		<>
			<button
				type="button"
				className="flex h-full w-full items-center gap-x-4 rounded-md border border-neutral-200 bg-white p-2"
				onClick={() => openModal()}
			>
				<div className="w-20 shrink-0">
					<div className="aspect-w-1 aspect-h-1 w-full rounded-md bg-neutral-200">
						{user.image && (
							<Image
								fill
								alt={user.id}
								src={user.image}
								className="h-full w-full rounded-md object-cover"
								quality={100}
								sizes="100%"
								priority
							/>
						)}
					</div>
				</div>
				<div className="w-full">
					<h1 className="text-left font-medium">{user.id}</h1>
					<h1 className="text-left text-xs italic opacity-50">
						{user.role}
					</h1>
				</div>
			</button>
			{active && (
				<EditUserModal
					user={user}
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
