export const convertToNumber = (input: string): number => {
	// Remove any commas (thousand separators)
	const sanitizedInput = input.replace(/,/g, '')

	// Attempt to parse the sanitized input as a float
	const parsedNumber = parseFloat(sanitizedInput)

	// Check if the parsed number is a valid number
	if (isNaN(parsedNumber)) {
		return 0
	}

	return parsedNumber
}
