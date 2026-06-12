import { createApp } from 'vue'
import './style.css'
import './assets/admin-ui.css'
import App from './App.vue'
import router from './router'
import i18n, { getSavedLocale } from './i18n'

document.documentElement.lang = getSavedLocale()

createApp(App).use(router).use(i18n).mount('#app')
