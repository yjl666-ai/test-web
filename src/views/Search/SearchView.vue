<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppShell from '../../components/common/AppShell.vue'
import ProductCard from '../../components/business/ProductCard.vue'
import StateBlock from '../../components/common/StateBlock.vue'
import { getProducts } from '../../api/product'
import type { Product } from '../../types'

const route = useRoute()
const router = useRouter()
const keyword = ref(String(route.query.keyword || ''))
const sort = ref(String(route.query.sort || 'sales'))
const products = ref<Product[]>([])
const history = ref<string[]>(JSON.parse(localStorage.getItem('beauty-search-history') || '["连衣裙","短袖衬衫","牛仔夹克"]'))

const visibleProducts = computed(() => {
  const value = keyword.value.trim()
  const list = products.value.filter((item) => !value || item.name.includes(value) || item.brand.includes(value) || item.tags.join('').includes(value))
  return [...list].sort((a, b) => (sort.value === 'price' ? a.price - b.price : b.sales - a.sales))
})

function search(value = keyword.value) {
  keyword.value = value
  if (value && !history.value.includes(value)) history.value.unshift(value)
  localStorage.setItem('beauty-search-history', JSON.stringify(history.value.slice(0, 6)))
  router.replace({ path: '/search', query: { keyword: keyword.value, sort: sort.value } })
}

onMounted(async () => {
  products.value = await getProducts()
})
</script>

<template>
  <AppShell title="搜索" show-back>
    <van-search v-model="keyword" placeholder="搜索连衣裙、衬衫、外套" show-action @search="search" @cancel="$router.back()" />
    <div class="chips">
      <button v-for="item in history" :key="item" @click="search(item)">{{ item }}</button>
    </div>
    <van-tabs v-model:active="sort" @change="search()">
      <van-tab title="销量" name="sales" />
      <van-tab title="价格" name="price" />
      <van-tab title="新品" name="new" />
    </van-tabs>
    <StateBlock v-if="!visibleProducts.length" title="没有找到相关服装" action="换个词试试" />
    <div v-else class="product-grid">
      <ProductCard v-for="item in visibleProducts" :key="item.id" :product="item" />
    </div>
  </AppShell>
</template>
