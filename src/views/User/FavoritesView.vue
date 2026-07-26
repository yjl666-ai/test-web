<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppShell from '../../components/common/AppShell.vue'
import ProductCard from '../../components/business/ProductCard.vue'
import StateBlock from '../../components/common/StateBlock.vue'
import { getProducts } from '../../api/product'
import type { Product } from '../../types'

const products = ref<Product[]>([])
onMounted(async () => {
  products.value = (await getProducts()).slice(0, 2)
})
</script>

<template>
  <AppShell title="我的收藏" show-back>
    <StateBlock v-if="!products.length" title="暂无收藏商品" action="去逛逛" @action="$router.push('/')" />
    <div v-else class="product-grid">
      <ProductCard v-for="item in products" :key="item.id" :product="item" />
    </div>
  </AppShell>
</template>
