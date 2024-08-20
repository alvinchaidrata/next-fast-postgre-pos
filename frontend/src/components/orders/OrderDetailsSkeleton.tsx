import Spinner from '../global/Spinner'

export default function OrderDetailsSkeleton() {
	return (
		<div className="fixed right-0 top-0 h-full min-h-screen w-80 shrink-0 border-l border-neutral-200 pt-16">
			<div className="flex h-full w-full items-center justify-center">
				<Spinner className="h-10 w-10 border-black" />
			</div>
		</div>
	)
}
