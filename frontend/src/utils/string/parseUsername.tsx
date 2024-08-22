export const parseUsername = (input: string) => {
	// Convert the input string to lowercase
	let username = input.toLowerCase()

	// Remove all non-alphanumeric characters except underscores
	username = username.replace(/[^a-z0-9_]/g, '')

	// Replace spaces with underscores
	username = username.replace(/\s+/g, '_')

	return username
}
