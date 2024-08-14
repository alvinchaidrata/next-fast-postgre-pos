export default function numberWithCommas(
	input: number,
	decimalPlace: number = 0,
): string {
	// Check if the input is a valid number
	if (isNaN(input)) {
		return '0'
	}

	// Round the number to the specified decimal places
	input = parseFloat(input.toFixed(decimalPlace))

	// Convert the number to a string with thousand separators
	return input.toLocaleString('en-US', {
		minimumFractionDigits: decimalPlace,
		maximumFractionDigits: decimalPlace,
	})
}
