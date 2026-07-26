<script setup lang="ts">
import type { Product } from '../../types'
import { money } from '../../utils/format'

defineProps<{ product: Product }>()
</script>

<template>
  <article class="product-card" @click="$router.push(`/product/${product.id}`)">
    <img :src="product.mainImage" :alt="product.name" loading="lazy" />
    <div class="product-card__body">
      <div class="product-card__tags">
        <span v-for="tag in product.tags.slice(0, 2)" :key="tag">{{ tag }}</span>
      </div>
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="product-card__footer">
        <strong>{{ money(product.price) }}</strong>
        <small>已售 {{ product.sales }}</small>
      </div>
    </div>
  </article>
</template>
