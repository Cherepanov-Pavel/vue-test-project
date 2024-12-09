import {makeRequest} from '@/app/api'

const prefix = '/users'

export interface User {
	'avatar': string
	'email': string
	'first_name': string
	'id': number
	'last_name': string
}

interface PaginationResponse<T> {
	'data': T[]
	'page': number
	'per_page': number
	'total': number
	'total_pages': number
}

export const getUsers = () => {
	return makeRequest<PaginationResponse<User>>({'req': {'url': `${prefix}`}})
}