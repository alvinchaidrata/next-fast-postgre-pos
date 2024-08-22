import Spinner from '@/components/global/Spinner'

export default function Loading() {
	return (
		<div className="my-auto flex w-full flex-col items-center justify-center gap-y-8">
			<Spinner className="h-20 w-20 border-black" />
		</div>
	)
}
