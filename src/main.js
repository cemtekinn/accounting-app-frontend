import './bootstrap'
import { createApp } from 'vue'

import './assets/main.css'
import { mask } from 'vue-the-mask'

import '@/styles/app.scss'
import 'bootstrap/dist/js/bootstrap.bundle'

import App from './App.vue'
import router from './router'
import pinia from '@/stores/index.js'
import '@/services/api.js'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.directive('mask', mask)
app.mount('#app')
