import { fetchUsers } from '@/api/server/user/fetchUsers'
import { User, UserQuery } from '@/interfaces/user'
import UserCard from './UserCard'

interface Props {
	query?: UserQuery
	currentPage: number
}

export default async function UsersGrid({ ...props }: Props) {
	const { query, currentPage } = props

	const paginated_user = await fetchUsers(query, currentPage, 12)

	return paginated_user.items.length > 0 ?
			<div className="flex w-full flex-col gap-y-4">
				<div className="grid w-full gap-4 md:grid-cols-4">
					{paginated_user.items.map((user: User) => (
						<UserCard
							key={user.id}
							user={user}
						/>
					))}
				</div>
			</div>
		:	<span className="mx-auto text-xs opacity-30">No user(s) found.</span>
}
