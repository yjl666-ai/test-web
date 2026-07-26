import { defineStore } from 'pinia'
import type { CartItem } from '../types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('beauty-cart') || '[]') as CartItem[],
  }),
  getters: {
    checkedItems: (state) => state.items.filter((item) => item.checked),
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.count, 0),
    totalAmount: (state) => state.items.filter((item) => item.checked).reduce((sum, item) => sum + item.sku.price * item.count, 0),
  },
  actions: {
    setItems(items: CartItem[]) {
      this.items = items
      this.persist()
    },
    add(item: CartItem) {
      const existed = this.items.find((current) => current.skuId === item.skuId)
      if (existed) existed.count += item.count
      else this.items.push(item)
      this.persist()
    },
    update(id: string, count: number) {
      const item = this.items.find((current) => current.id === id)
      if (item) item.count = count
      this.persist()
    },
    remove(id: string) {
      this.items = this.items.filter((item) => item.id !== id)
      this.persist()
    },
    toggle(id: string, checked: boolean) {
      const item = this.items.find((current) => current.id === id)
      if (item) item.checked = checked
      this.persist()
    },
    toggleAll(checked: boolean) {
      this.items.forEach((item) => {
        item.checked = checked
      })
      this.persist()
    },
    persist() {
      localStorage.setItem('beauty-cart', JSON.stringify(this.items))
    },
  },
})
