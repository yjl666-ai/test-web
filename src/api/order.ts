import { request } from './request'
import type { AdminOrder, Order } from '../types'

export function createOrder(data: { addressId: string; cartItemIds: string[]; couponId?: string }) {
  return request<Order>({ url: '/orders', method: 'post', data })
}

export function getOrders() {
  return request<Order[]>({ url: '/orders', method: 'get' })
}

export function getAdminOrders() {
  return request<AdminOrder[]>({ url: '/admin/orders', method: 'get' })
}

export function getOrderDetail(id: string) {
  return request<Order>({ url: `/orders/${id}`, method: 'get' })
}

export function payOrder(id: string) {
  return request<{ payUrl: string }>({ url: `/orders/${id}/pay`, method: 'post' })
}

export function getPayStatus(id: string) {
  return request<{ status: string }>({ url: `/orders/${id}/pay-status`, method: 'get' })
}

export function createAfterSale(data: Record<string, unknown>) {
  return request<{ id: string; status: string }>({ url: '/aftersales', method: 'post', data })
}

export function publishReview(data: Record<string, unknown>) {
  return request<{ published: boolean }>({ url: '/reviews', method: 'post', data })
}
