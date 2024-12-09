import '@/app/assets/styles/main.css'
import App from '@/app/App.vue'
import router from '@/app/router'
import {createApp} from 'vue'

const app = createApp(App)

app.use(router)

app.mount('#app')