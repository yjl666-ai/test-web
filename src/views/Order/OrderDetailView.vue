<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppShell from '../../components/common/AppShell.vue'
import { getOrderDetail } from '../../api/order'
import type { Order } from '../../types'
import { money, orderStatusText } from '../../utils/format'

const order = ref<Order>()

onMounted(async () => {
  order.value = await getOrderDetail(location.pathname.split('/').pop() || '')
})
</script>

<template>
  <AppShell title="订单详情" show-back>
    <van-skeleton v-if="!order" title :row="6" />
    <template v-else>
      <section class="checkout-card">
        <h3>{{ orderStatusText(order.status) }}</h3>
        <p>{{ order.address.name }} {{ order.address.phone }}</p>
        <strong>{{ order.address.province }}{{ order.address.city }}{{ order.address.district }}{{ order.address.detail }}</strong>
      </section>
      <section class="checkout-card">
        <div v-for="item in order.items" :key="item.id" class="mini-row">
          <span>{{ item.product.name }} x{{ item.count }}</span>
          <strong>{{ money(item.sku.price * item.count) }}</strong>
        </div>
      </section>
      <section class="checkout-card">
        <div class="mini-row"><span>订单金额</span><strong>{{ money(order.totalAmount) }}</strong></div>
        <div class="mini-row"><span>优惠</span><strong>-{{ money(order.discountAmount) }}</strong></div>
      </section>
      <div class="action-row">
        <van-button plain @click="$router.push(`/user/orders/${order.id}/aftersale`)">申请售后</van-button>
        <van-button type="primary" @click="$router.push(`/review/publish/${order.id}`)">去评价</van-button>
      </div>
    </template>
  </AppShell>
</template>
