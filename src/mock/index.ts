import { addresses, cartItems, categories, coupons, orders, products } from './data'
import type { CartItem, Order } from '../types'

type MockResponse = { code: number; message: string; data: unknown }

const ok = (data: unknown): MockResponse => ({ code: 200, message: 'success', data })

function toAdminItem(item: CartItem) {
  return {
    id: item.id,
    productId: item.productId,
    skuId: item.skuId,
    productName: item.product.name,
    brand: item.product.brand,
    image: item.product.mainImage,
    specs: item.sku.specs,
    unitPrice: item.sku.price,
    count: item.count,
    subtotal: item.sku.price * item.count,
  }
}

function toAdminOrder(order: Order) {
  return {
    id: order.id,
    userId: 'u1',
    userName: '林夏',
    userPhone: '13800138000',
    status: order.status,
    createdAt: order.createdAt,
    totalAmount: order.totalAmount,
    freightAmount: order.freightAmount,
    discountAmount: order.discountAmount,
    payableAmount: order.totalAmount + order.freightAmount - order.discountAmount,
    address: order.address,
    items: order.items.map(toAdminItem),
  }
}

export async function mockRequest(method: string, url: string, data?: unknown): Promise<MockResponse> {
  await new Promise((resolve) => setTimeout(resolve, 160))
  const path = url.replace(/^\/api\/v1/, '').split('?')[0]

  if (method === 'post' && path === '/auth/send-code') return ok({ sent: true })
  if (method === 'post' && path === '/auth/login') return ok({ token: 'mock-token', user: { id: 'u1', name: '林夏', level: '银卡会员' } })
  if (method === 'get' && path === '/categories') return ok(categories)
  if (method === 'get' && path === '/products') return ok(products)
  if (method === 'get' && path.startsWith('/products/')) return ok(products.find((item) => item.id === path.split('/').pop()) || products[0])
  if (method === 'get' && path === '/cart') return ok(cartItems)
  if (method === 'post' && path === '/cart/items') return ok(cartItems[0])
  if (method === 'put' && path.startsWith('/cart/items/')) return ok({ updated: true })
  if (method === 'delete' && path.startsWith('/cart/items/')) return ok({ deleted: true })
  if (method === 'post' && path === '/cart/merge') return ok(cartItems)
  if (method === 'get' && path === '/addresses') return ok(addresses)
  if (['post', 'put', 'delete'].includes(method) && path.startsWith('/addresses')) return ok({ saved: true })
  if (method === 'post' && path === '/orders') return ok(orders[0])
  if (method === 'get' && path === '/orders') return ok(orders)
  if (method === 'get' && path === '/admin/orders') return ok(orders.map(toAdminOrder))
  if (method === 'get' && path.startsWith('/orders/') && !path.includes('pay-status')) return ok(orders.find((item) => item.id === path.split('/').pop()) || orders[0])
  if (method === 'post' && path.endsWith('/pay')) return ok({ payUrl: '/pay/result?status=success&orderId=O20260724001' })
  if (method === 'get' && path.endsWith('/pay-status')) return ok({ status: 'success' })
  if (method === 'get' && path === '/coupons') return ok(coupons)
  if (method === 'post' && path.includes('/coupons/')) return ok({ received: true })
  if (method === 'post' && path === '/reviews') return ok({ published: true })
  if (method === 'post' && path === '/aftersales') return ok({ id: 'AS20260724001', status: 'pending' })
  if (method === 'get' && path === '/verify') return ok({ valid: true, productName: products[0].name, checkedAt: new Date().toISOString() })

  return { code: 404, message: '未找到 Mock 接口', data: null }
}
