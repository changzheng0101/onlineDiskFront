import all from '@/libs/globalFunction.js'
import "@/router/before.js"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import uploader from 'vue-simple-uploader'
import App from './App.vue'
import "./assets/style/base.css"
import router from './router/index'
import store from './store/index'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(uploader)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(all)
app.mount('#app')
