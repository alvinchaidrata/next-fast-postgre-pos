'use client'

import { AiFillShopping, AiFillFile, AiFillProduct } from 'react-icons/ai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Topbar() {
	const pathname = usePathname()

	return (
		<div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between gap-x-12 border-b border-neutral-200 bg-white px-5">
			<div className="text-3xl font-bold">POS</div>
			<nav className="flex items-center">
				<Link
					className={`${pathname === '/' ? 'border-neutral-400' : 'border-transparent transition hover:border-neutral-400'} flex h-16 shrink-0 items-center gap-x-2 border-b px-5`}
					href={'/'}
					scroll={false}
				>
					<AiFillShopping className="h-4 w-4" />
					<span>Shop</span>
				</Link>
				<Link
					className={`${pathname === '/orders' ? 'border-neutral-400' : 'border-transparent transition hover:border-neutral-400'} flex h-16 shrink-0 items-center gap-x-2 border-b px-5`}
					href={'/orders'}
					scroll={false}
				>
					<AiFillFile className="h-4 w-4" />
					<span>Orders</span>
				</Link>
				<Link
					className={`${pathname === '/products' ? 'border-neutral-400' : 'border-transparent transition hover:border-neutral-400'} flex h-16 shrink-0 items-center gap-x-2 border-b px-5`}
					href={'/products'}
					scroll={false}
				>
					<AiFillProduct className="h-4 w-4" />
					<span>Products</span>
				</Link>
			</nav>
			<div className="h-8 w-8 rounded-full bg-neutral-200"></div>
		</div>
	)
}
