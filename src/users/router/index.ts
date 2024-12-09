import type {RouteRecordRaw} from 'vue-router'

import {
	usersListAvailableTabs,
	UsersListAvailableTabs
} from '@/users/shared/consts'
import UsersView from '@/users/views/UsersView.vue'

export const usersRoutes: RouteRecordRaw[] = [
	{
		'beforeEnter': (to, from, next) => {
			if (
				!to.params.tab ||
				!usersListAvailableTabs.includes(to.params.tab as UsersListAvailableTabs) ||
				(
					to.params.userId &&
					!Number.isInteger(+to.params.userId)
				)
			) {
				next({
					'name': 'Users',
					'params': {'tab': UsersListAvailableTabs.Clients}
				})
			} else {
				next()
			}
		},
		'component': UsersView,
		'name': 'Users',
		'path': '/users/:tab?/:userId(\\d+)?',
		'props': (route) => ({
			'tab': route.params.tab,
			'userId': route.params.userId ? +route.params.userId : route.params.userId
		})
	}
]