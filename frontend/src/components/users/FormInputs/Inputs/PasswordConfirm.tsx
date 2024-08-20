'use client'

import { memo } from 'react'
import Input from '@/components/global/Input'

interface Props {
	password_confirm: string
	error?: string
	setFieldValue: Function
}

export default memo(function password_confirmConfirmInput({
	password_confirm,
	error,
	setFieldValue,
}: Props) {
	return (
		<Input
			id="password_confirm"
			label="Confirm password"
			type="password"
			value={password_confirm}
			error={error}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setFieldValue('password_confirm', e.target.value)
			}
		/>
	)
})
