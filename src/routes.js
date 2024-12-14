import React from 'react';

const AdminDashboard = React.lazy(() => import('./views/_admin/dashboard/Dashboard'));

const AdminSaleList = React.lazy(() => import('./views/_admin/sale/List'));
const AdminSaleAdd = React.lazy(() => import('./views/_admin/sale/Create'));
const AdminSaleEdit = React.lazy(() => import('./views/_admin/sale/Update'));

const AdminPurchaseList = React.lazy(() => import('./views/_admin/purchase/List'));
const AdminPurchaseAdd = React.lazy(() => import('./views/_admin/purchase/Create'));
const AdminPurchaseEdit = React.lazy(() => import('./views/_admin/purchase/Update'));

const AdminAdjustList = React.lazy(() => import('./views/_admin/adjust/List'));
const AdminConvertList = React.lazy(() => import('./views/_admin/convert/List'));
const AdminStockList = React.lazy(() => import('./views/_admin/stock/List'));
const AdminPriceList = React.lazy(() => import('./views/_admin/price/List'));
const AdminDiscountList = React.lazy(() => import('./views/_admin/discount/List'));
const AdminOutstandingList = React.lazy(() => import('./views/_admin/outstanding/List'));
const AdminCashList = React.lazy(() => import('./views/_admin/cash/List'));
const AdminBankList = React.lazy(() => import('./views/_admin/bank/List'));
const AdminGledgerList = React.lazy(() => import('./views/_admin/gledger/List'));

const AdminList  = React.lazy(() => import('./views/_admin/settings/admins/List'));
const AdminListAdd = React.lazy(() => import('./views/_admin/settings/admins/Create'));
const AdminListEdit = React.lazy(() => import('./views/_admin/settings/admins/Update'));

const UserList  = React.lazy(() => import('./views/_admin/settings/users/List'));
const UserListAdd = React.lazy(() => import('./views/_admin/settings/users/Create'));
const UserListEdit = React.lazy(() => import('./views/_admin/settings/users/Update'));

const AdminProfile  = React.lazy(() => import('./views/_admin/profile/Profile'));

// ================= ### =================


// ================= ### =================

const routes = [
  // { path: '/', exact: true, name: 'Home' },

  // ================= Admin Routes =================
  { path: '/admin/dashboard', name: 'Dashboard', component: AdminDashboard },

  { path: '/admin/sale', name: 'Sale Lists', component: AdminSaleList },
  { path: '/admin/sale-new', name: 'Add New Sale list', component: AdminSaleAdd },
  { path: '/admin/sale-edit/:id', name: 'Edit Sale list', component: AdminSaleEdit },

  { path: '/admin/purchase', name: 'Purchase Lists', component: AdminPurchaseList },
  { path: '/admin/purchase-new', name: 'Add New Purchase list', component: AdminPurchaseAdd },
  { path: '/admin/purchase-edit/:id', name: 'Edit Purchase list', component: AdminPurchaseEdit },

  { path: '/admin/adjust', name: 'Adjust Lists', component: AdminAdjustList },
  { path: '/admin/convert', name: 'Convert Lists', component: AdminConvertList },
  { path: '/admin/stock', name: 'Stock Status Lists', component: AdminStockList },
  { path: '/admin/price', name: 'Price Lists', component: AdminPriceList },
  { path: '/admin/discount', name: 'Discount Lists', component: AdminDiscountList },
  { path: '/admin/outstanding', name: 'Outstanding Lists', component: AdminOutstandingList },
  { path: '/admin/cash', name: 'Cash Lists', component: AdminCashList },
  { path: '/admin/bank', name: 'Bank Lists', component: AdminBankList },
  { path: '/admin/gledger', name: 'Gledger Lists', component: AdminGledgerList },

  { path: '/admin/admin-list', name: 'Admins Management', component: AdminList },
  { path: '/admin/admin-new', name: 'Add New Admin Account', component: AdminListAdd },
  { path: '/admin/admin-edit/:id', name: 'Edit Admin Account', component: AdminListEdit },
  
  { path: '/admin/user-list', name: 'Users Management', component: UserList },
  { path: '/admin/user-new', name: 'Add New User Account', component: UserListAdd },
  { path: '/admin/user-edit/:id', name: 'Edit User Account', component: UserListEdit },
  
  { path: '/admin/profile', name: 'Admin Profile', component: AdminProfile },
  
  // ================= User Routes ===================
  
  // ================= Common Routes =================

];

export default routes;
