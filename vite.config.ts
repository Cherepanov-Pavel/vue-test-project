import vue from '@vitejs/plugin-vue'
import {
	fileURLToPath,
	URL
} from 'node:url'
import {visualizer} from 'rollup-plugin-visualizer'
import {defineConfig} from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
	'plugins': [
		vue(),
		vueDevTools(),
		visualizer({
			'filename': 'node_modules/.tmp/stats.html',
			'open': true
		})
	],
	'resolve': {'alias': {'@': fileURLToPath(new URL('./src', import.meta.url))}},
	'server': {'port': 53155}
})