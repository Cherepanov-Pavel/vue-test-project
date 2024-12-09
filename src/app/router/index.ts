import {usersRoutes} from '@/users/router'
import {
	createRouter,
	createWebHistory
} from 'vue-router'

const router = createRouter({
	'history': createWebHistory(import.meta.env.BASE_URL),
	'routes': [
		{
			'name': 'App',
			'path': '/',
			'redirect': {'name': 'Users'}
		},
		...usersRoutes,
		{
			'name': 'NotFound',
			'path': '/:pathMatch(.*)*',
			'redirect': {'name': 'App'}
		}
	],
	'strict': true
})
export default router