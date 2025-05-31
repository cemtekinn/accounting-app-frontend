import './bootstrap'
import { createApp } from 'vue'
import Toast from "vue-toastification";
import { mask } from 'vue-the-mask'

import App from './App.vue'
import router from '@/router/index.js'
import pinia from '@/stores/index.js'
import '@/services/api.js'
import '@/styles/app.scss'
import 'bootstrap/dist/js/bootstrap.bundle'

const toastOptions = {
  position: 'top-center',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  containerClassName: 'app-toast-container',
}

const app = createApp(App)
app.use(Toast, toastOptions)
app.use(pinia)
app.use(router)
app.directive('mask', mask)
app.mount('#app')
