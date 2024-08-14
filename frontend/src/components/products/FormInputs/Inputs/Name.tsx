'use client'

import { memo } from 'react'
import Input from '@/components/global/Input'

interface Props {
	name: string
	error?: string
	setFieldValue: Function
}

export default memo(function NameInput({ name, error, setFieldValue }: Props) {
	return (
		<Input
			id="name"
			label="Name"
			type="string"
			value={name}
			error={error}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setFieldValue('name', e.target.value)
			}
		/>
	)
})
