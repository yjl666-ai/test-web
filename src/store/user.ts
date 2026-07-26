import { defineStore } from 'pinia'
import type { UserInfo } from '../types'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('beauty-token') || '',
    user: JSON.parse(localStorage.getItem('beauty-user') || 'null') as UserInfo | null,
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token),
  },
  actions: {
    setSession(token: string, user: UserInfo) {
      this.token = token
      this.user = user
      localStorage.setItem('beauty-token', token)
      localStorage.setItem('beauty-user', JSON.stringify(user))
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('beauty-token')
      localStorage.removeItem('beauty-user')
    },
  },
})
