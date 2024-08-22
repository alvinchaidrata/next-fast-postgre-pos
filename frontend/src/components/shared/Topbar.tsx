'use client'

import { AiFillShopping, AiFillFile, AiFillProduct } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Profile from './Profile'

export default function Topbar() {
	const pathname = usePathname()
	const user = useAuth()

	return (
		<div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between gap-x-12 border-b border-neutral-200 bg-white px-5">
			<div className="text-3xl font-bold">POS</div>
			<nav className="flex items-center">
				<Link
					className={`${pathname === '/shop' ? 'border-neutral-400' : 'border-transparent transition hover:border-neutral-400'} flex h-16 shrink-0 items-center gap-x-2 border-b px-5`}
					href={'/shop'}
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
				{user && user.role === 'Master' && (
					<Link
						className={`${pathname === '/users' ? 'border-neutral-400' : 'border-transparent transition hover:border-neutral-400'} flex h-16 shrink-0 items-center gap-x-2 border-b px-5`}
						href={'/users'}
						scroll={false}
					>
						<FaUser className="h-4 w-4" />
						<span>Users</span>
					</Link>
				)}
			</nav>
			{user ?
				<Profile user={user} />
			:	<div></div>}
		</div>
	)
}
