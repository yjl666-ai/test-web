import { request } from './request'
import type { Address, UserInfo } from '../types'

export function sendCode(phone: string) {
  return request<{ sent: boolean }>({ url: '/auth/send-code', method: 'post', data: { phone } })
}

export function login(data: { phone: string; code: string }) {
  return request<{ token: string; user: UserInfo }>({ url: '/auth/login', method: 'post', data })
}

export function getAddresses() {
  return request<Address[]>({ url: '/addresses', method: 'get' })
}

export function saveAddress(data: Address) {
  return request<{ saved: boolean }>({ url: data.id ? `/addresses/${data.id}` : '/addresses', method: data.id ? 'put' : 'post', data })
}

export function deleteAddress(id: string) {
  return request<{ saved: boolean }>({ url: `/addresses/${id}`, method: 'delete' })
}

export function verifyCode(code: string) {
  return request<{ valid: boolean; productName: string; checkedAt: string }>({ url: '/verify', method: 'get', params: { code } })
}
