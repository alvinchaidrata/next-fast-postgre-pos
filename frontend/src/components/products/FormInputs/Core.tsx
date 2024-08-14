'use client'

import React from 'react'
import { useFormikContext, FormikContextType } from 'formik'

import ImageInput from './Inputs/Image'
import NameInput from './Inputs/Name'
import PriceInput from './Inputs/Price'
import StockInput from './Inputs/Stock'
import Footer from './Footer'
import { ProductForm } from '@/api/interfaces/product'

interface Props {
	isLoading: boolean
	closeModal: Function
	handleDelete?: Function
}

export default function Form({ isLoading, closeModal, handleDelete }: Props) {
	const {
		values,
		errors,
		setFieldValue,
		handleSubmit,
	}: FormikContextType<ProductForm> = useFormikContext()

	return (
		<form
			className="flex flex-col gap-y-1"
			onSubmit={handleSubmit}
		>
			<div className="flex w-full gap-x-8">
				<ImageInput
					image={values.image}
					error={errors.image}
					temp_image_path={values.temp_image_path}
					setFieldValue={setFieldValue}
				/>

				<div className="flex w-full flex-col gap-y-4">
					<NameInput
						name={values.name}
						error={errors.name}
						setFieldValue={setFieldValue}
					/>
					<PriceInput
						price={values.price}
						error={errors.price}
						setFieldValue={setFieldValue}
					/>
					<StockInput
						stock={values.stock}
						error={errors.stock}
						setFieldValue={setFieldValue}
					/>
					{handleDelete && (
						<button
							type="button"
							className="ml-auto text-sm font-medium text-black/30 underline decoration-dotted underline-offset-2 transition-all hover:text-red-600"
							onClick={() => handleDelete()}
						>
							Delete
						</button>
					)}
				</div>
			</div>

			<Footer
				isLoading={isLoading}
				closeModal={closeModal}
			/>
		</form>
	)
}
