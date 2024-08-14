'use client'

import { useRef, ChangeEvent, memo } from 'react'
import Image from 'next/image'

interface Props {
	image: string
	temp_image_path: string | null
	setFieldValue: Function
	error?: string
}

export default memo(function ImageInput({
	image,
	temp_image_path,
	setFieldValue,
	error,
}: Props) {
	const fileInput = useRef<HTMLInputElement>(null)

	return (
		<div className="flex w-full max-w-[320px] shrink-0 flex-col gap-y-1">
			<button
				type="button"
				className="w-full rounded-md transition-all hover:opacity-60"
				onClick={() => fileInput.current?.click()}
			>
				<div className="aspect-w-1 aspect-h-1 w-full rounded-md bg-neutral-200">
					{(image != '' || temp_image_path) && (
						<Image
							fill
							alt="product_image"
							src={temp_image_path ?? image}
							className="h-full w-full rounded-md object-cover"
							quality={100}
							sizes="100%"
							priority
						/>
					)}
				</div>
			</button>
			{error && (
				<span className="text-center text-xs text-red-500">
					{error}
				</span>
			)}
			<input
				id="image"
				type="file"
				ref={fileInput}
				className="hidden"
				accept="image/png, image/jpeg, image/jpg, image/webp"
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					if (e.target.files && e.target.files.length > 0) {
						setFieldValue('image_file', e.target.files[0])
						setFieldValue(
							'new_image_path',
							`/images/${Date.now()}.${e.target.files[0].name.split('.').pop()}`,
						)
						setFieldValue(
							'temp_image_path',
							URL.createObjectURL(e.target.files[0]),
						)
					}
				}}
			/>
		</div>
	)
})
