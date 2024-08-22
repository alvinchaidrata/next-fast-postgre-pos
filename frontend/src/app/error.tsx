'use client'

import { NextPageContext } from 'next'

const Error = ({ statusCode }: { statusCode: number }) => {
	return (
		<div className="my-auto flex w-full flex-col items-center justify-center gap-y-8">
			<p className="text-xl font-medium">
				{statusCode ?
					`An error ${statusCode} occurred on server.`
				:	'An error occurred on client.'}
			</p>
		</div>
	)
}

Error.getInitialProps = (ctx: NextPageContext) => {
	const { res, err } = ctx
	const statusCode =
		res ? res.statusCode
		: err ? err.statusCode
		: 404
	return { statusCode }
}

export default Error
