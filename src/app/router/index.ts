import AppLayout from "@/app/layouts/AppLayout.vue"
import {
	createRouter,
	createWebHistory
} from "vue-router"

const router = createRouter({
	"history": createWebHistory(import.meta.env.BASE_URL),
	"routes": [
		{
			"component": AppLayout,
			"name": "App",
			"path": "/"
		},
		{
			"name": "NotFound",
			"path": "/:pathMatch(.*)*",
			"redirect": {"name": "App"}
		}
	]
})
export default router