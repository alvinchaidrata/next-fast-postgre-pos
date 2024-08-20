'use client'

import { memo } from 'react'

interface Props {
	role: string
	error?: string
	setFieldValue: Function
}

export default memo(function RoleInput({ role, error, setFieldValue }: Props) {
	return (
		<div className="flex w-full flex-col gap-y-1">
			<div className="ml-1 text-xs font-medium">Role</div>
			<div className="flex w-full items-center gap-x-4 gap-y-2">
				<button
					type="button"
					className={`${role === 'User' ? 'bg-black text-white' : 'border border-black transition-all hover:bg-black hover:text-white'} rounded-md px-4 py-2 text-sm`}
					onClick={() => setFieldValue('role', 'User')}
				>
					User
				</button>
				<button
					type="button"
					className={`${role === 'Master' ? 'bg-black text-white' : 'border border-black transition-all hover:bg-black hover:text-white'} rounded-md px-4 py-2 text-sm`}
					onClick={() => setFieldValue('role', 'Master')}
				>
					Master
				</button>
			</div>
			{error && (
				<span className="ml-1 text-xs text-red-500">{error}</span>
			)}
		</div>
	)
})
