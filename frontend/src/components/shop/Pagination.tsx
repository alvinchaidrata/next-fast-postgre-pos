import { GrPrevious, GrNext } from 'react-icons/gr'
import { PaginatedProduct, ProductQuery } from '@/api/interfaces/product'
import Link from 'next/link'

interface Props {
	paginated_product: PaginatedProduct
	query?: ProductQuery
	currentPage: number
}

export default function Pagination({
	paginated_product,
	query,
	currentPage,
}: Props) {
	const getLinkParams = (pageNum: number, query?: ProductQuery) => {
		const params: null | Record<string, string | number> = {
			page: pageNum,
		}

		if (query) {
			if (query.search) {
				params.search = query.search
			}
		}
		return params
	}

	const PageLink = ({ page }: { page: number }) => (
		<Link
			href={{
				pathname: '/products',
				query: getLinkParams(page),
			}}
			className={`${page == currentPage ? 'border border-black' : 'transition-all hover:bg-black/10'} flex h-8 w-8 items-center justify-center rounded-md p-2`}
			scroll={false}
		>
			{page}
		</Link>
	)

	const getLinks = (start: number, end: number): React.ReactNode[] => {
		const links = []
		for (let i = start; i <= end; i++) {
			links.push(
				<PageLink
					page={i}
					key={i}
				/>,
			)
		}
		return links
	}

	const getStartLink = (): React.ReactNode[] => {
		return [
			<PageLink
				key={1}
				page={1}
			/>,
			<span
				key={'front-skip'}
				className="opacity-50"
			>
				...
			</span>,
		]
	}

	const getEndLink = (): React.ReactNode[] => {
		return [
			<span
				key={'end-skip'}
				className="opacity-50"
			>
				...
			</span>,
			<PageLink
				key={paginated_product.pages}
				page={paginated_product.pages}
			/>,
		]
	}

	const generateLinks = (): React.ReactNode[] => {
		const links: React.ReactNode[] = []

		if (paginated_product.pages <= 5) {
			links.push(...getLinks(1, paginated_product.pages))
		} else {
			if (currentPage - 3 < 1) {
				links.push(...getLinks(1, 4))
				links.push(...getEndLink())
			} else if (currentPage + 3 > paginated_product.pages) {
				links.push(...getStartLink())
				links.push(
					...getLinks(
						paginated_product.pages - 3,
						paginated_product.pages,
					),
				)
			} else {
				links.push(...getStartLink())
				links.push(...getLinks(currentPage - 1, currentPage + 1))
				links.push(...getEndLink())
			}
		}

		return links
	}

	return (
		<div className="flex w-full items-center justify-center">
			<div className="flex items-center gap-x-4">
				<Link
					href={{
						pathname: '/products',
						query: getLinkParams(
							currentPage - 1 < 1 ? currentPage : currentPage - 1,
						),
					}}
					className="flex h-8 w-8 items-center justify-center rounded-md p-2 transition-all hover:bg-black/10"
					scroll={false}
				>
					<GrPrevious className="w-full" />
				</Link>
				{generateLinks().map((el: React.ReactNode) => el)}
				<Link
					href={{
						pathname: '/products',
						query: getLinkParams(
							currentPage + 1 > paginated_product.pages ?
								currentPage
							:	currentPage + 1,
						),
					}}
					className="flex h-8 w-8 items-center justify-center rounded-md p-2 transition-all hover:bg-black/10"
					scroll={false}
				>
					<GrNext className="w-full" />
				</Link>
			</div>
		</div>
	)
}
