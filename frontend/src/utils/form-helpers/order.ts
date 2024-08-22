import { OrderQuery } from '@/interfaces/order'

export const getQueryObj = (pageParams?: { search?: string }): OrderQuery => {
	const query: OrderQuery = {}

	if (pageParams) {
		if (pageParams.search) {
			query.search = pageParams.search
		}
	}

	return query
}
