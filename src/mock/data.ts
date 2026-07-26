import type { Address, CartItem, Coupon, Order, Product } from '../types'

const img = (seed: string) => `https://picsum.photos/seed/${seed}/640/640`

export const categories = [
  { id: 'skin', name: '护肤' },
  { id: 'makeup', name: '彩妆' },
  { id: 'clean', name: '清洁' },
  { id: 'gift', name: '礼盒' },
]

export const products: Product[] = [
  {
    id: 'p1',
    name: '云柔修护精华水',
    mainImage: img('serum-water'),
    images: [img('serum-water'), img('serum-texture')],
    price: 12900,
    originalPrice: 16900,
    sales: 3820,
    stock: 58,
    tags: ['正品保障', '敏感肌可用'],
    categoryId: 'skin',
    brand: 'Luma',
    description: '轻盈水感质地，适合日常补水和屏障护理。',
    skuList: [
      { id: 's1', productId: 'p1', specs: { 容量: '150ml' }, price: 12900, stock: 32 },
      { id: 's2', productId: 'p1', specs: { 容量: '300ml' }, price: 19900, stock: 26 },
    ],
  },
  {
    id: 'p2',
    name: '琉光润色唇釉',
    mainImage: img('lip-glaze'),
    images: [img('lip-glaze'), img('lip-shade')],
    price: 8900,
    originalPrice: 11900,
    sales: 6410,
    stock: 76,
    tags: ['热卖色号', '不易拔干'],
    categoryId: 'makeup',
    brand: 'Miro',
    description: '玻璃感成膜，通勤和约会都能稳稳接住。',
    skuList: [
      { id: 's3', productId: 'p2', specs: { 色号: '玫瑰豆沙' }, price: 8900, stock: 40 },
      { id: 's4', productId: 'p2', specs: { 色号: '杏仁奶茶' }, price: 8900, stock: 36 },
    ],
  },
  {
    id: 'p3',
    name: '氨基酸云朵洁面',
    mainImage: img('cleanser'),
    images: [img('cleanser'), img('foam')],
    price: 6900,
    originalPrice: 9900,
    sales: 2920,
    stock: 88,
    tags: ['温和清洁', '弱酸性'],
    categoryId: 'clean',
    brand: 'Nori',
    description: '低刺激洁面泡沫，洗后不紧绷。',
    skuList: [{ id: 's5', productId: 'p3', specs: { 容量: '120g' }, price: 6900, stock: 88 }],
  },
  {
    id: 'p4',
    name: '花园香氛身体乳礼盒',
    mainImage: img('body-gift'),
    images: [img('body-gift'), img('gift-box')],
    price: 15900,
    originalPrice: 19900,
    sales: 1260,
    stock: 24,
    tags: ['礼盒包装', '可写祝福'],
    categoryId: 'gift',
    brand: 'Aube',
    description: '轻香身体护理礼盒，适合节日和临时送礼。',
    skuList: [{ id: 's6', productId: 'p4', specs: { 香型: '晨露花园' }, price: 15900, stock: 24 }],
  },
]

export const addresses: Address[] = [
  {
    id: 'a1',
    name: '林夏',
    phone: '13800138000',
    province: '上海市',
    city: '上海市',
    district: '徐汇区',
    detail: '漕溪北路 18 号 1206',
    isDefault: true,
  },
]

export const coupons: Coupon[] = [
  { id: 'c1', title: '新人满 199 减 30', amount: 3000, threshold: 19900, status: 'available' },
  { id: 'c2', title: '彩妆专享减 15', amount: 1500, threshold: 9900, status: 'received' },
]

export const cartItems: CartItem[] = [
  { id: 'ci1', productId: 'p1', skuId: 's1', count: 1, checked: true, product: products[0], sku: products[0].skuList[0] },
  { id: 'ci2', productId: 'p2', skuId: 's3', count: 2, checked: true, product: products[1], sku: products[1].skuList[0] },
]

export const orders: Order[] = [
  {
    id: 'O20260724001',
    status: 'pending_pay',
    totalAmount: 30700,
    freightAmount: 0,
    discountAmount: 0,
    address: addresses[0],
    items: cartItems,
    createdAt: '2026-07-24T10:30:00.000Z',
  },
  {
    id: 'O20260718009',
    status: 'shipped',
    totalAmount: 15900,
    freightAmount: 0,
    discountAmount: 2000,
    address: addresses[0],
    items: [{ id: 'ci3', productId: 'p4', skuId: 's6', count: 1, checked: true, product: products[3], sku: products[3].skuList[0] }],
    createdAt: '2026-07-18T08:10:00.000Z',
  },
]
