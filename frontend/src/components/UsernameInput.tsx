'use client'

import { memo } from 'react'

import Input from '@/components/global/Input'

interface Props {
	username: string
	error?: string
	setFieldValue: Function
}

export default memo(function UsernameInput({
	username,
	error,
	setFieldValue,
}: Props) {
	return (
		<Input
			id="username"
			type="string"
			placeholder="Username"
			value={username}
			error={error}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setFieldValue('username', e.target.value)
			}
		/>
	)
})
