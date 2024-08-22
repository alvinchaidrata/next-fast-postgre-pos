import axios from 'axios'
import { useEffect, useState } from 'react'
import { User } from '@/interfaces/user'

export function useAuth(): User | null {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/api/auth/user`)
			.then((res) => {
				setUser(res.data)
			})
	}, [])

	return user
}
