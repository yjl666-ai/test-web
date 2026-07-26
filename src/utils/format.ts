export function money(value: number) {
  return `¥${(value / 100).toFixed(2)}`
}

export function orderStatusText(status: string) {
  const map: Record<string, string> = {
    pending_pay: '待付款',
    paid: '待发货',
    shipped: '待收货',
    received: '待评价',
    completed: '已完成',
    closed: '已关闭',
  }
  return map[status] || '处理中'
}

export function isChinaMobile(phone: string) {
  return /^1[3-9]\d{9}$/.test(phone)
}
