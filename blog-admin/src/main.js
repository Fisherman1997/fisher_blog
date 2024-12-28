import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/routers'
import { setElComponents } from '@/plugin/element_puls'
import App from './App.vue'


async function bootstrap() {
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    setElComponents(app)
    app.mount('#app')
}
bootstrap();
