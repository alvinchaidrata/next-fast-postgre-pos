'use client'

import { memo } from 'react'
import InputWithLogo from '@/components/global/InputWithLogo'
import numberWithCommas from '@/utils/numbers/numberWithCommas'
import convertToNumber from '@/utils/numbers/convertToNumber'

interface Props {
	stock: string
	error?: string
	setFieldValue: Function
}

export default memo(function StockInput({
	stock,
	error,
	setFieldValue,
}: Props) {
	return (
		<InputWithLogo
			id="stock"
			label="Stock"
			type="string"
			inputClass="pr-9"
			logoClass="right-3"
			value={stock}
			error={error}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setFieldValue(
					'stock',
					numberWithCommas(convertToNumber(e.target.value)),
				)
			}
		>
			pcs
		</InputWithLogo>
	)
})
