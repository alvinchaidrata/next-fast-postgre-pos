'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Filter() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams)
		if (term) {
			params.set('search', term)
		} else {
			params.delete('search')
		}
		params.delete('page')

		replace(`${pathname}?${params.toString()}`, { scroll: false })
	}, 500)

	return (
		<div className="flex">
			<input
				className="w-80 rounded-md border border-neutral-300 bg-neutral-100 px-5 py-3 text-sm transition-all duration-300 hover:border-neutral-400 focus:outline-0 focus:ring-1 focus:ring-neutral-600"
				placeholder="Search product here..."
				onChange={(e) => {
					handleSearch(e.target.value)
				}}
				defaultValue={searchParams.get('search')?.toString()}
			/>
		</div>
	)
}
