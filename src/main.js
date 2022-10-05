import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import "./assets/style/base.css"
import router from './router/index'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
