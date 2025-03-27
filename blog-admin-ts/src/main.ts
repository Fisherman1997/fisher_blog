import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/routers/index'
import { setElComponents } from '@/plugin/element_puls'
import App from './App.vue'
// import 'element-plus/theme-chalk/index.css'

async function bootstrap() {
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    setElComponents(app)
    app.mount('#app')
}
bootstrap().then()
