<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { addCartItem } from '../../api/cart'
import { getProductDetail } from '../../api/product'
import { useCartStore } from '../../store/cart'
import type { Product, Sku } from '../../types'
import { money } from '../../utils/format'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const product = ref<Product>()
const selectedSku = ref<Sku>()
const showSku = ref(false)
const submitting = ref(false)
const currentPrice = computed(() => selectedSku.value?.price || product.value?.price || 0)

onMounted(async () => {
  product.value = await getProductDetail(String(route.params.id))
  selectedSku.value = product.value.skuList[0]
})

async function addToCart(buyNow = false) {
  if (!product.value || !selectedSku.value || submitting.value) return
  submitting.value = true
  await addCartItem({ productId: product.value.id, skuId: selectedSku.value.id, count: 1 })
  cartStore.add({ id: `${Date.now()}`, productId: product.value.id, skuId: selectedSku.value.id, count: 1, checked: true, product: product.value, sku: selectedSku.value })
  showToast(buyNow ? '已选好商品' : '已加入购物车')
  submitting.value = false
  if (buyNow) router.push('/checkout')
}
</script>

<template>
  <AppShell title="商品详情" show-back>
    <van-skeleton v-if="!product" title :row="8" />
    <template v-else>
      <van-swipe class="detail-swipe" indicator-color="#1f2a1f">
        <van-swipe-item v-for="image in product.images" :key="image"><img :src="image" :alt="product.name" /></van-swipe-item>
      </van-swipe>
      <section class="detail-panel">
        <div class="detail-price">{{ money(currentPrice) }}</div>
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <div class="product-card__tags">
          <span v-for="tag in product.tags" :key="tag">{{ tag }}</span>
        </div>
        <button class="sku-line" @click="showSku = true">已选 {{ Object.values(selectedSku?.specs || {}).join(' / ') }} · 库存 {{ selectedSku?.stock }}</button>
      </section>
      <section class="detail-panel">
        <h2>穿着反馈</h2>
        <p>多数用户反馈版型稳定、面料舒适，日常洗护后仍能保持较好的轮廓感。</p>
      </section>
      <section class="detail-panel">
        <h2>图文详情</h2>
        <p>{{ product.brand }} 按尺码表发货，支持 7 天无理由退换；建议根据肩宽、胸围、腰围优先选择尺码。</p>
      </section>
      <van-action-bar>
        <van-action-bar-icon icon="cart-o" text="购物车" @click="router.push('/cart')" />
        <van-action-bar-button color="#8b7355" text="加入购物车" :loading="submitting" @click="addToCart()" />
        <van-action-bar-button color="#1f2a1f" text="立即购买" :loading="submitting" @click="addToCart(true)" />
      </van-action-bar>
      <van-popup v-model:show="showSku" round position="bottom">
        <div class="popup-panel">
          <h3>选择规格</h3>
          <button v-for="sku in product.skuList" :key="sku.id" class="sku-option" :class="{ active: sku.id === selectedSku?.id }" @click="selectedSku = sku">
            {{ Object.values(sku.specs).join(' / ') }} · {{ money(sku.price) }}
          </button>
          <van-button block type="primary" @click="showSku = false">确认</van-button>
        </div>
      </van-popup>
    </template>
  </AppShell>
</template>
