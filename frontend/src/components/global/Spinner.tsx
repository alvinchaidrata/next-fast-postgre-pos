import React from 'react'

interface Spinner {
	className?: string
}

export default function Spinner({ className }: Spinner) {
	return (
		<div
			className={`${className} inline-block animate-spin rounded-full border-2 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
		/>
	)
}
