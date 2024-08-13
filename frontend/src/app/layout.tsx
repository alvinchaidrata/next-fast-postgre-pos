import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
	title: 'Next POS',
	description: 'POS system made using Next.js, Fastapi and PostgreSQL',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="min-w-screen relative flex min-h-screen flex-col bg-neutral-50 tracking-tight text-black">
					{children}
				</div>
			</body>
		</html>
	)
}
