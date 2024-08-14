'use client'

import { memo } from 'react'
import InputWithLogo from '@/components/global/InputWithLogo'
import numberWithCommas from '@/utils/numbers/numberWithCommas'
import convertToNumber from '@/utils/numbers/convertToNumber'

interface Props {
	price: string
	error?: string
	setFieldValue: Function
}

export default memo(function PriceInput({
	price,
	error,
	setFieldValue,
}: Props) {
	return (
		<InputWithLogo
			id="price"
			label="Price"
			type="string"
			inputClass="pl-9"
			logoClass="left-3"
			value={price}
			error={error}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setFieldValue(
					'price',
					numberWithCommas(convertToNumber(e.target.value)),
				)
			}
		>
			Rp.
		</InputWithLogo>
	)
})
