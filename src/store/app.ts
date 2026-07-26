import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loadingCount: 0,
    online: navigator.onLine,
  }),
  actions: {
    startLoading() {
      this.loadingCount += 1
    },
    endLoading() {
      this.loadingCount = Math.max(0, this.loadingCount - 1)
    },
    setOnline(value: boolean) {
      this.online = value
    },
  },
})
