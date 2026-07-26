<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { getCoupons, receiveCoupon } from '../../api/coupon'
import type { Coupon } from '../../types'
import { money } from '../../utils/format'

const coupons = ref<Coupon[]>([])
onMounted(async () => {
  coupons.value = await getCoupons()
})

async function receive(id: string) {
  await receiveCoupon(id)
  showToast('领取成功')
}
</script>

<template>
  <AppShell title="领券中心" show-back>
    <article v-for="item in coupons" :key="item.id" class="coupon-card">
      <strong>{{ money(item.amount) }}</strong>
      <div><h3>{{ item.title }}</h3><p>满 {{ money(item.threshold) }} 可用</p></div>
      <van-button size="small" type="primary" @click="receive(item.id)">领取</van-button>
    </article>
  </AppShell>
</template>
