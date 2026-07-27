import { createRouter, createWebHistory } from 'vue-router'
import { setupGuards } from './guards'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/Home/HomeView.vue') },
    { path: '/category', component: () => import('../views/Category/CategoryView.vue') },
    { path: '/category/:id', component: () => import('../views/Category/CategoryView.vue') },
    { path: '/search', component: () => import('../views/Search/SearchView.vue') },
    { path: '/product/:id', component: () => import('../views/Product/ProductDetailView.vue') },
    { path: '/cart', component: () => import('../views/Cart/CartView.vue') },
    { path: '/checkout', component: () => import('../views/Checkout/CheckoutView.vue'), meta: { requiresAuth: true } },
    { path: '/pay/result', component: () => import('../views/Pay/PayResultView.vue') },
    { path: '/admin/orders', component: () => import('../views/Admin/AdminOrdersView.vue') },
    { path: '/login', component: () => import('../views/Login/LoginView.vue') },
    { path: '/user', component: () => import('../views/User/UserCenterView.vue'), meta: { requiresAuth: true } },
    { path: '/user/orders', component: () => import('../views/Order/OrderListView.vue'), meta: { requiresAuth: true } },
    { path: '/user/orders/:id', component: () => import('../views/Order/OrderDetailView.vue'), meta: { requiresAuth: true } },
    { path: '/user/orders/:id/aftersale', component: () => import('../views/Order/AfterSaleView.vue'), meta: { requiresAuth: true } },
    { path: '/user/address', component: () => import('../views/User/AddressView.vue'), meta: { requiresAuth: true } },
    { path: '/user/address/edit', component: () => import('../views/User/AddressEditView.vue'), meta: { requiresAuth: true } },
    { path: '/user/favorites', component: () => import('../views/User/FavoritesView.vue'), meta: { requiresAuth: true } },
    { path: '/user/coupons', component: () => import('../views/Coupon/MyCouponsView.vue'), meta: { requiresAuth: true } },
    { path: '/coupon/center', component: () => import('../views/Coupon/CouponCenterView.vue') },
    { path: '/review/publish/:orderId', component: () => import('../views/Review/ReviewPublishView.vue'), meta: { requiresAuth: true } },
    { path: '/verify', component: () => import('../views/Verify/VerifyView.vue') },
    { path: '/404', component: () => import('../views/NotFoundView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

setupGuards(router)

export default router
