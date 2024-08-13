import LoginFormComponent from '@/components/LoginForm'

export default function Home() {
	return (
		<div className="my-auto flex w-full flex-col items-center justify-center gap-y-8">
			<h1 className="text-5xl font-bold">Login</h1>
			<LoginFormComponent />
		</div>
	)
}
