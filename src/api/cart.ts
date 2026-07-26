import { request } from './request'
import type { CartItem } from '../types'

export function getCart() {
  return request<CartItem[]>({ url: '/cart', method: 'get' })
}

export function addCartItem(data: { productId: string; skuId: string; count: number }) {
  return request<CartItem>({ url: '/cart/items', method: 'post', data })
}

export function updateCartItem(id: string, data: { count?: number; checked?: boolean }) {
  return request<{ updated: boolean }>({ url: `/cart/items/${id}`, method: 'put', data })
}

export function deleteCartItem(id: string) {
  return request<{ deleted: boolean }>({ url: `/cart/items/${id}`, method: 'delete' })
}

export function mergeCart(items: CartItem[]) {
  return request<CartItem[]>({ url: '/cart/merge', method: 'post', data: { items } })
}
