import { defineStore } from 'pinia'
import type { Address } from '../types'

export const useAddressStore = defineStore('address', {
  state: () => ({
    list: [] as Address[],
  }),
  getters: {
    defaultAddress: (state) => state.list.find((item) => item.isDefault) || state.list[0],
  },
  actions: {
    setList(list: Address[]) {
      this.list = list
    },
  },
})
