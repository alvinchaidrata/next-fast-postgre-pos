'use client'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
}

export default function Input({ label, error, ...props }: Props) {
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
			<input
				name={label}
				className={`${error ? 'border-red-500 hover:ring-red-600 focus:ring-red-700' : 'border-black/50 hover:ring-black/30 focus:ring-black'} w-full rounded-md border px-3 py-2 transition-all duration-300 hover:ring-1 focus:outline-none focus:ring-1`}
				{...props}
			/>
			{error && (
				<span className="ml-1 text-xs text-red-500">{error}</span>
			)}
		</div>
	)
}
