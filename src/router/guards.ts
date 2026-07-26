import type { Router } from 'vue-router'
import { useUserStore } from '../store/user'

export function setupGuards(router: Router) {
  router.beforeEach((to) => {
    const userStore = useUserStore()
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
    return true
  })
}
