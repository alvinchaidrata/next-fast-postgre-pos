'use client'

import { memo } from 'react'
import Input from '@/components/global/Input'

interface Props {
	password: string
	error?: string
	setFieldValue: Function
}

export default memo(function PasswordInput({
	password,
	error,
	setFieldValue,
}: Props) {
	return (
		<Input
			id="password"
			label="Password"
			type="password"
			value={password}
			error={error}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setFieldValue('password', e.target.value)
			}
		/>
	)
})
