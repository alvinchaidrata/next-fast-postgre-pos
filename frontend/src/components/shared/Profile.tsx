'use client'

import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { MdLogout } from 'react-icons/md'
import { User } from '@/interfaces/user'

interface Props {
	user: User
}

export default function Profile({ user }: Props) {
	const router = useRouter()

	const logout = (e: React.MouseEvent) => {
		e.preventDefault()
		axios
			.post(`${process.env.NEXT_PUBLIC_URL}/api/auth/logout`)
			.then(() => router.push('/'))
	}

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<button
					className="flex items-center gap-x-1"
					onClick={logout}
				>
					<MdLogout className="h-4 w-4" />
					<span className="text-xs font-medium">Logout</span>
				</button>
			),
		},
	]

	return (
		<Dropdown
			menu={{ items }}
			trigger={['click']}
		>
			<div className="flex cursor-pointer items-center gap-x-2">
				<div className="w-8 shrink-0">
					<div className="aspect-w-1 aspect-h-1 w-full rounded-full bg-neutral-200">
						{user.image && (
							<Image
								fill
								alt={user.id}
								src={user.image}
								className="h-full w-full rounded-full object-cover"
								quality={100}
								sizes="100%"
								priority
							/>
						)}
					</div>
				</div>
				<span className="text-xs">{user.id}</span>
			</div>
		</Dropdown>
	)
}
