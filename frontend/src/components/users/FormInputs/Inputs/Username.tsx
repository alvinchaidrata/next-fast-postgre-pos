'use client'

import { memo } from 'react'
import Input from '@/components/global/Input'
import { parseUsername } from '@/utils/string/parseUsername'

interface Props {
	id: string
	error?: string
	setFieldValue: Function
	disabled: boolean
}

export default memo(function UsernameInput({
	id,
	error,
	setFieldValue,
	disabled,
}: Props) {
	return (
		<Input
			id="id"
			label="Username"
			type="string"
			value={id}
			error={error}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setFieldValue('id', parseUsername(e.target.value))
			}
			disabled={disabled}
		/>
	)
})
