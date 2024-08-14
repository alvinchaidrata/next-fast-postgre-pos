import { PaginationObj } from './pagination'

export interface Product {
	id: number
	image: string
	name: string
	description: string
	price: number
	stock: number
}

export interface ProductForm {
	image: string
	name: string
	description: string
	price: string
	stock: string
	image_file: File | null
	new_image_path: string | null
	temp_image_path: string | null
}

export interface ProductError {
	image?: string
	name?: string
	description?: string
	price?: string
	stock?: string
	image_file?: string
}

export interface ProductQuery {
	search?: string
}

export interface PostData extends Omit<Product, 'id'> {}

export interface PaginatedProduct extends PaginationObj {
	items: Product[]
}
