import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  mode: 'history',
})

router.beforeEach(async (to, from, next) => {
  await next();
})

export default router
