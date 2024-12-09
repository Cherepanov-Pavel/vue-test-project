import type {User} from '@/users/api/index'

export enum UsersListAvailableTabs {
	'Clients' = 'clients',
	'Rating' = 'rating'
}
export const usersListAvailableTabs = Object.values(UsersListAvailableTabs)

export type AdditionalUsersDataInStorage = {
	[Id in `${User['id']}`]: {
		'comment': string
		'rating': number
	};
}

export type UserWithAdditionalData = (AdditionalUsersDataInStorage[`${User['id']}`] extends never ? Record<string, never> : {
	'comment': string
	'rating': number
}) & User