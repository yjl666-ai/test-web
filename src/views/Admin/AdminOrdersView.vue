<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppShell from '../../components/common/AppShell.vue'
import StateBlock from '../../components/common/StateBlock.vue'
import { getAdminOrders } from '../../api/order'
import type { AdminOrder, OrderStatus } from '../../types'
import { money, orderStatusText } from '../../utils/format'

const orders = ref<AdminOrder[]>([])
const loading = ref(true)
const activeStatus = ref<'all' | OrderStatus>('all')
const keyword = ref('')
const expanded = ref<string[]>([])

const statusTabs: Array<{ title: string; name: 'all' | OrderStatus }> = [
  { title: '全部', name: 'all' },
  { title: '待付款', name: 'pending_pay' },
  { title: '已付款', name: 'paid' },
  { title: '已发货', name: 'shipped' },
  { title: '已完成', name: 'completed' },
]

const visibleOrders = computed(() => {
  const word = keyword.value.trim().toLowerCase()
  return orders.value.filter((order) => {
    const statusMatched = activeStatus.value === 'all' || order.status === activeStatus.value
    const text = [
      order.id,
      order.userName,
      order.userPhone,
      order.address.name,
      order.address.phone,
      order.address.detail,
      ...order.items.map((item) => `${item.productName} ${item.brand} ${Object.values(item.specs).join(' ')}`),
    ]
      .join(' ')
      .toLowerCase()
    return statusMatched && (!word || text.includes(word))
  })
})

const stats = computed(() => ({
  total: orders.value.length,
  pending: orders.value.filter((item) => item.status === 'pending_pay').length,
  paid: orders.value.filter((item) => item.status === 'paid').length,
  sales: orders.value.reduce((sum, item) => sum + item.payableAmount, 0),
}))

function toggle(id: string) {
  expanded.value = expanded.value.includes(id) ? expanded.value.filter((item) => item !== id) : [...expanded.value, id]
}

function formatTime(value: string) {
  return new Date(value).toLocaleString('zh-CN', { hour12: false })
}

onMounted(async () => {
  orders.value = await getAdminOrders()
  expanded.value = orders.value.slice(0, 1).map((item) => item.id)
  loading.value = false
})
</script>

<template>
  <AppShell title="订单后台" show-back>
    <section class="admin-overview">
      <div>
        <span>订单总数</span>
        <strong>{{ stats.total }}</strong>
      </div>
      <div>
        <span>待付款</span>
        <strong>{{ stats.pending }}</strong>
      </div>
      <div>
        <span>已付款</span>
        <strong>{{ stats.paid }}</strong>
      </div>
      <div>
        <span>销售额</span>
        <strong>{{ money(stats.sales) }}</strong>
      </div>
    </section>

    <van-search v-model="keyword" placeholder="搜订单号、手机号、收货人、商品名" />
    <van-tabs v-model:active="activeStatus">
      <van-tab v-for="tab in statusTabs" :key="tab.name" :title="tab.title" :name="tab.name" />
    </van-tabs>

    <van-skeleton v-if="loading" title :row="8" />
    <StateBlock v-else-if="!visibleOrders.length" title="暂无匹配订单" action="清空搜索" @action="keyword = ''" />

    <section v-else class="admin-order-list">
      <article v-for="order in visibleOrders" :key="order.id" class="admin-order">
        <header @click="toggle(order.id)">
          <div>
            <strong>{{ order.id }}</strong>
            <span>{{ formatTime(order.createdAt) }}</span>
          </div>
          <em>{{ orderStatusText(order.status) }}</em>
        </header>

        <div class="admin-order__summary">
          <span>{{ order.address.name }} {{ order.address.phone }}</span>
          <strong>{{ money(order.payableAmount) }}</strong>
        </div>

        <div v-if="expanded.includes(order.id)" class="admin-order__detail">
          <div class="admin-order__address">
            <b>收货信息</b>
            <p>{{ order.address.province }}{{ order.address.city }}{{ order.address.district }}{{ order.address.detail }}</p>
            <p>下单用户：{{ order.userName }} {{ order.userPhone || order.userId }}</p>
          </div>

          <div class="admin-order__items">
            <div v-for="item in order.items" :key="item.id" class="admin-order__item">
              <img :src="item.image" :alt="item.productName" />
              <div>
                <b>{{ item.productName }}</b>
                <p>{{ item.brand }} · {{ Object.entries(item.specs).map(([key, value]) => `${key}: ${value}`).join(' / ') }}</p>
                <span>{{ money(item.unitPrice) }} x {{ item.count }}</span>
              </div>
              <strong>{{ money(item.subtotal) }}</strong>
            </div>
          </div>

          <div class="admin-order__amount">
            <span>商品金额 {{ money(order.totalAmount) }}</span>
            <span>运费 {{ money(order.freightAmount) }}</span>
            <span>优惠 -{{ money(order.discountAmount) }}</span>
          </div>
        </div>
      </article>
    </section>
  </AppShell>
</template>
