<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '../../components/common/AppShell.vue'

const route = useRoute()
const status = computed(() => String(route.query.status || 'success'))
const title = computed(() => (status.value === 'success' ? '支付成功' : status.value === 'processing' ? '支付处理中' : '支付失败'))
</script>

<template>
  <AppShell title="支付结果" show-back>
    <section class="result-panel">
      <van-icon :name="status === 'success' ? 'checked' : 'warning-o'" size="64" :color="status === 'success' ? '#52c41a' : '#faad14'" />
      <h1>{{ title }}</h1>
      <p>订单 {{ route.query.orderId || 'O20260724001' }} 的支付状态已更新。</p>
      <van-button type="primary" block @click="$router.push(`/user/orders/${route.query.orderId || 'O20260724001'}`)">查看订单</van-button>
      <van-button plain block @click="$router.push('/')">返回首页</van-button>
    </section>
  </AppShell>
</template>
