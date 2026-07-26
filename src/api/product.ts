import { request } from './request'
import type { Product } from '../types'

export function getCategories() {
  return request<Array<{ id: string; name: string }>>({ url: '/categories', method: 'get' })
}

export function getProducts(params?: { keyword?: string; categoryId?: string; sort?: string }) {
  return request<Product[]>({ url: '/products', method: 'get', params })
}

export function getProductDetail(id: string) {
  return request<Product>({ url: `/products/${id}`, method: 'get' })
}
