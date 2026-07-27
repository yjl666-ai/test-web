<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppShell from '../../components/common/AppShell.vue'
import ProductCard from '../../components/business/ProductCard.vue'
import { getCategories, getProducts } from '../../api/product'
import type { Product } from '../../types'

const products = ref<Product[]>([])
const categories = ref<Array<{ id: string; name: string }>>([])
const loading = ref(true)
const heroProducts = computed(() => products.value.slice(0, 2))

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
        <span>男女装新选</span>
        <h1>今天穿什么，先看版型。</h1>
        <p>女装的层次感、男装的清爽线条放在同一页，方便直接混搭成一套。</p>
      </div>
      <button @click="$router.push('/search')">搜索服装</button>
    </section>

    <section class="category-strip">
      <button v-for="item in categories" :key="item.id" @click="$router.push(`/category/${item.id}`)">
        {{ item.name }}
      </button>
    </section>

    <section v-if="heroProducts.length" class="featured-pair">
      <article v-for="item in heroProducts" :key="item.id" @click="$router.push(`/product/${item.id}`)">
        <img :src="item.mainImage" :alt="item.name" />
        <div>
          <span>{{ item.categoryId === 'women' ? '女装示例' : '男装示例' }}</span>
          <h2>{{ item.brand }}</h2>
          <p>{{ item.name }}</p>
        </div>
      </article>
    </section>

    <section class="section-title">
      <h2>混搭推荐</h2>
      <span>版型清楚 · 尺码可选</span>
    </section>

    <van-skeleton v-if="loading" title :row="6" />
    <div v-else class="product-grid">
      <ProductCard v-for="item in products" :key="item.id" :product="item" />
    </div>
  </AppShell>
</template>
