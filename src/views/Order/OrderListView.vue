<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppShell from '../../components/common/AppShell.vue'
import StateBlock from '../../components/common/StateBlock.vue'
import { getOrders } from '../../api/order'
import type { Order } from '../../types'
import { money, orderStatusText } from '../../utils/format'

const orders = ref<Order[]>([])
const active = ref('all')
const visibleOrders = computed(() => (active.value === 'all' ? orders.value : orders.value.filter((item) => item.status === active.value)))

onMounted(async () => {
  orders.value = await getOrders()
})
</script>

<template>
  <AppShell title="订单列表" show-back>
    <van-tabs v-model:active="active">
      <van-tab title="全部" name="all" />
      <van-tab title="待付款" name="pending_pay" />
      <van-tab title="待发货" name="paid" />
      <van-tab title="待收货" name="shipped" />
      <van-tab title="待评价" name="received" />
    </van-tabs>
    <StateBlock v-if="!visibleOrders.length" title="暂无订单" action="去首页看看" @action="$router.push('/')" />
    <article v-for="order in visibleOrders" :key="order.id" class="order-card" @click="$router.push(`/user/orders/${order.id}`)">
      <header><span>{{ order.id }}</span><strong>{{ orderStatusText(order.status) }}</strong></header>
      <p>{{ order.items.map((item) => item.product.name).join('、') }}</p>
      <footer>{{ money(order.totalAmount) }}</footer>
    </article>
  </AppShell>
</template>
