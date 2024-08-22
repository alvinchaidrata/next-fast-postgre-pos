import { PaginationObj } from './pagination'

export interface User {
	id: string
	image: string
	role: string
}

export interface UserForm {
	image: string
	id: string
	password: string
	password_confirm: string
	role: string
	image_file: File | null
	new_image_path: string | null
	temp_image_path: string | null
}

export interface UserError {
	image?: string
	id?: string
	password?: string
	password_confirm?: string
	role?: string
	image_file?: string
}

export interface UserQuery {
	search?: string
}

export interface PostData extends Omit<User, 'id'> {}

export interface PaginatedUser extends PaginationObj {
	items: User[]
}
