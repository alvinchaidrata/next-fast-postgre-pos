'use client'

import { PropsWithChildren } from 'react'

// inputClass is set to prevent input from overlapping with the logo
// EXAMPLE : inputClass='pl-10'
// logoClass is set to position of the logo
// EXAMPLE : logoClass='left-2'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	inputClass: string
	logoClass: string
	label?: string
	error?: string
}

export default function InputWithLogo({
	label,
	inputClass,
	logoClass,
	children,
	error,
	...props
}: PropsWithChildren<Props>) {
	return (
		<div className="flex w-full flex-col gap-y-1">
			{label && (
				<label
					htmlFor={label}
					className="ml-1 text-xs font-medium"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<input
					name={label}
					className={`
						${inputClass} 
						${error ? 'border-red-500 focus:ring-red-700' : 'border-black/30  focus:ring-black'}
						w-full rounded-md border px-3 py-2 transition-all duration-300 focus:outline-none focus:ring-1
					`}
					{...props}
				/>
				<div
					className={`${logoClass} pointer-events-none absolute inset-y-0 flex items-center`}
				>
					{children}
				</div>
			</div>
			{error && (
				<span className="ml-1 text-xs text-red-500">{error}</span>
			)}
		</div>
	)
}
