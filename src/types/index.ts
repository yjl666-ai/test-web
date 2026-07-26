export type Sku = {
  id: string
  productId: string
  specs: Record<string, string>
  price: number
  stock: number
  image?: string
}

export type Product = {
  id: string
  name: string
  mainImage: string
  images: string[]
  price: number
  originalPrice?: number
  sales: number
  stock: number
  tags: string[]
  categoryId: string
  brand: string
  description: string
  skuList: Sku[]
}

export type CartItem = {
  id: string
  productId: string
  skuId: string
  count: number
  checked: boolean
  product: Product
  sku: Sku
}

export type Address = {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

export type OrderStatus = 'pending_pay' | 'paid' | 'shipped' | 'received' | 'completed' | 'closed'

export type Order = {
  id: string
  status: OrderStatus
  totalAmount: number
  freightAmount: number
  discountAmount: number
  address: Address
  items: CartItem[]
  createdAt: string
}

export type Coupon = {
  id: string
  title: string
  amount: number
  threshold: number
  status: 'available' | 'used' | 'expired' | 'received'
}

export type UserInfo = {
  id: string
  name: string
  level: string
}
