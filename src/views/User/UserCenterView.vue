<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { useUserStore } from '../../store/user'

const userStore = useUserStore()

async function logout() {
  await showConfirmDialog({ title: '退出登录', message: '确认退出当前账号？' })
  userStore.logout()
  location.href = '/'
}
</script>

<template>
  <AppShell show-tabbar>
    <section class="profile-card">
      <div class="avatar">林</div>
      <div>
        <h1>{{ userStore.user?.name || '未登录用户' }}</h1>
        <p>{{ userStore.user?.level || '登录后查看会员权益' }}</p>
      </div>
    </section>
    <section class="entry-grid">
      <button @click="$router.push('/user/orders')">全部订单</button>
      <button @click="$router.push('/user/favorites')">我的收藏</button>
      <button @click="$router.push('/user/coupons')">优惠券</button>
      <button @click="$router.push('/user/address')">地址管理</button>
      <button @click="$router.push('/verify')">正品验证</button>
      <button @click="logout">退出登录</button>
    </section>
  </AppShell>
</template>
