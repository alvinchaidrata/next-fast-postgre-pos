import React, { useState } from 'react'

// Used to bridge conditional rendering and a component's transition animation
// active and setActive are used to render the component conditionally
// show is used to enable transition animation

// EXAMPLE USAGE
// const closeModal = useBridge(setActive)

export default (setActive: React.Dispatch<React.SetStateAction<boolean>>) => {
	const [isShow, setIsShow] = useState(false)

	const openModal = () => {
		setActive(true)
		setIsShow(true)
	}

	const closeModal = () => {
		setIsShow(false)
		setTimeout(() => {
			setActive(false)
		}, 300)
	}

	return { isShow, openModal, closeModal }
}
