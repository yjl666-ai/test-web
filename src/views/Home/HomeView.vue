<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppShell from '../../components/common/AppShell.vue'
import ProductCard from '../../components/business/ProductCard.vue'
import { getCategories, getProducts } from '../../api/product'
import type { Product } from '../../types'

const products = ref<Product[]>([])
const categories = ref<Array<{ id: string; name: string }>>([])
const loading = ref(true)

onMounted(async () => {
  const [categoryData, productData] = await Promise.all([getCategories(), getProducts()])
  categories.value = categoryData
  products.value = productData
  loading.value = false
})
</script>

<template>
  <AppShell show-tabbar>
    <section class="home-hero">
      <div>
        <span>Beauty desk</span>
        <h1>今天的梳妆台，少一点试错。</h1>
        <p>精选护肤、彩妆和礼盒，用真实评价和清楚价格帮你更快下单。</p>
      </div>
      <button @click="$router.push('/search')">搜索商品</button>
    </section>

    <section class="category-strip">
      <button v-for="item in categories" :key="item.id" @click="$router.push(`/category/${item.id}`)">
        {{ item.name }}
      </button>
    </section>

    <section class="section-title">
      <h2>今日推荐</h2>
      <span>正品保障 · 支持售后</span>
    </section>

    <van-skeleton v-if="loading" title :row="6" />
    <div v-else class="product-grid">
      <ProductCard v-for="item in products" :key="item.id" :product="item" />
    </div>
  </AppShell>
</template>
