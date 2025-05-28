import { useModalStore } from './modal'
import { useLayoutStore } from './layout'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export { useModalStore, useLayoutStore } // Export other stores as needed
