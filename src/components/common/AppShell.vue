<script setup lang="ts">
defineProps<{
  title?: string
  showBack?: boolean
  showTabbar?: boolean
}>()
</script>

<template>
  <div class="app-shell">
    <van-nav-bar v-if="title" :title="title" :left-arrow="showBack" fixed placeholder @click-left="$router.back()" />
    <main class="app-shell__main" :class="{ 'app-shell__main--tabbar': showTabbar }">
      <slot />
    </main>
    <van-tabbar v-if="showTabbar" route safe-area-inset-bottom>
      <van-tabbar-item to="/" icon="shop-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
