import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useDebouncedCallback } from 'use-debounce'
import { Product } from '@/api/interfaces/product'
import { OrderProduct } from '@/api/interfaces/order'
import { useFirstRender } from '@/hooks/useFirstRender'

export default (product: Product, session: OrderProduct | null) => {
	const router = useRouter()
	const firstRender = useFirstRender()
	const runUpdateCart = useRef(true)

	// Local state is used to make quantity update seamless
	const [quantity, setQuantity] = useState<number>(
		session ? session.quantity : 0,
	)

	const updateCart = useDebouncedCallback(() => {
		axios
			.post(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
				quantity: quantity,
				total: product.price * quantity,
				data: product,
			})
			.then(() => router.refresh())
	}, 500)

	useEffect(() => {
		if (!firstRender) {
			if (runUpdateCart.current) {
				updateCart()
			} else {
				runUpdateCart.current = true
			}
		}
	}, [quantity])

	// This part is to sync session quantity with local state
	// ref acts as a flag to prevent unnecessary session update
	useEffect(() => {
		if (session) {
			if (session.quantity != quantity) {
				runUpdateCart.current = false
				setQuantity(session.quantity)
			}
		}
	}, [session])

	const updateProductQuantity = (delta: number) => {
		if (quantity + delta >= 0) {
			setQuantity(quantity + delta)
		}
	}

	return { quantity, updateProductQuantity }
}
