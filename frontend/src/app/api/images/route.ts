import { NextResponse } from 'next/server'
import path from 'path'
import { writeFile } from 'fs/promises'

export const config = {
	api: {
		bodyParser: false,
	},
}

export async function POST(req: Request) {
	const formData = await req.formData()

	const file = formData.get('file')
	const filePath = formData.get('path')

	if (!file || !(file instanceof Blob) || !filePath) {
		return NextResponse.json(
			{ error: 'No files received or path is not provided.' },
			{ status: 400 },
		)
	}

	const buffer = Buffer.from(await file.arrayBuffer())
	try {
		await writeFile(path.join(process.cwd(), `public${filePath}`), buffer)
		return NextResponse.json({ Message: 'Success', status: 201 })
	} catch (error) {
		console.log('Error occured ', error)
		return NextResponse.json({ Message: 'Failed', status: 500 })
	}
}
