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
    path: '/sales',
    name: 'sales',
    component: () => import('../views/Sales.vue'),
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: () => import('../views/Invoices.vue'),
  },
  {
    path: '/account-transactions',
    name: 'account-transactions',
    component: () => import('../views/AccountTransactions.vue'),
  },
  {
    path: '/income-expense',
    name: 'income-expense',
    component: () => import('../views/IncomeExpense.vue'),
  },
  {
    path: '/cash-register',
    name: 'cash-register',
    component: () => import('../views/CashRegister.vue'),
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../views/Contacts.vue'),
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../views/Reports.vue'),
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('../views/Customers.vue'),
  },

]
