<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppShell from '../../components/common/AppShell.vue'
import { getCoupons } from '../../api/coupon'
import type { Coupon } from '../../types'
import { money } from '../../utils/format'

const coupons = ref<Coupon[]>([])
onMounted(async () => {
  coupons.value = await getCoupons()
})
</script>

<template>
  <AppShell title="我的优惠券" show-back>
    <article v-for="item in coupons" :key="item.id" class="coupon-card">
      <strong>{{ money(item.amount) }}</strong>
      <div><h3>{{ item.title }}</h3><p>满 {{ money(item.threshold) }} 可用</p></div>
      <van-tag>{{ item.status === 'available' ? '可用' : '已领取' }}</van-tag>
    </article>
  </AppShell>
</template>
