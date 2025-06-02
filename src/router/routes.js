export default [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  // Test page
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Temp/Test.vue'),
  },
  {
    path: '/quick-sale',
    name: 'quick-sale',
    component: () => import('../views/QuickSale.vue'),
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: () => import('../views/Invoices.vue'),
  },
]
