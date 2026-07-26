import { request } from './request'
import type { Coupon } from '../types'

export function getCoupons() {
  return request<Coupon[]>({ url: '/coupons', method: 'get' })
}

export function receiveCoupon(id: string) {
  return request<{ received: boolean }>({ url: `/coupons/${id}/receive`, method: 'post' })
}
