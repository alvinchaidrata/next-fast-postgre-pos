import axios from 'axios'

export async function getAuthHeader(): Promise<string> {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_URL}/api/auth/token`,
		)
		const token: string = res.data
		return `Bearer ${token}`
	} catch (error) {
		console.error('Error retrieving token:', error)
		throw error
	}
}
