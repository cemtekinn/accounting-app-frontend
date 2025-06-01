export default [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/quick-sale',
    name: 'quick-sale',
    component: () => import('../views/QuickSale.vue'),
  },
]
