<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppShell from '../../components/common/AppShell.vue'
import ProductCard from '../../components/business/ProductCard.vue'
import { getCategories, getProducts } from '../../api/product'
import type { Product } from '../../types'

const route = useRoute()
const router = useRouter()
const categories = ref<Array<{ id: string; name: string }>>([])
const products = ref<Product[]>([])
const activeId = computed(() => String(route.params.id || categories.value[0]?.id || 'women'))
const visibleProducts = computed(() => products.value.filter((item) => item.categoryId === activeId.value))

onMounted(async () => {
  categories.value = await getCategories()
  products.value = await getProducts()
})

watch(categories, () => {
  if (!route.params.id && categories.value[0]) router.replace(`/category/${categories.value[0].id}`)
})
</script>

<template>
  <AppShell title="分类" show-tabbar>
    <div class="category-page">
      <aside>
        <button v-for="item in categories" :key="item.id" :class="{ active: item.id === activeId }" @click="router.push(`/category/${item.id}`)">
          {{ item.name }}
        </button>
      </aside>
      <div class="category-page__grid">
        <ProductCard v-for="item in visibleProducts" :key="item.id" :product="item" />
      </div>
    </div>
  </AppShell>
</template>
