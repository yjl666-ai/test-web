<script setup lang="ts">
import { onMounted } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import StateBlock from '../../components/common/StateBlock.vue'
import { getCart } from '../../api/cart'
import { useCartStore } from '../../store/cart'
import { money } from '../../utils/format'

const cartStore = useCartStore()

onMounted(async () => {
  if (!cartStore.items.length) cartStore.setItems(await getCart())
})

async function remove(id: string) {
  await showConfirmDialog({ title: '删除商品', message: '确认从购物车移除这件商品？' })
  cartStore.remove(id)
  showToast('已删除')
}
</script>

<template>
  <AppShell title="购物车" show-tabbar>
    <StateBlock v-if="!cartStore.items.length" title="购物车还是空的" action="去逛逛" @action="$router.push('/')" />
    <div v-else class="cart-list">
      <article v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <van-checkbox :model-value="item.checked" @update:model-value="cartStore.toggle(item.id, Boolean($event))" />
        <img :src="item.product.mainImage" :alt="item.product.name" />
        <div>
          <h3>{{ item.product.name }}</h3>
          <p>{{ Object.values(item.sku.specs).join(' / ') }}</p>
          <strong>{{ money(item.sku.price) }}</strong>
          <van-stepper :model-value="item.count" min="1" :max="item.sku.stock" @update:model-value="cartStore.update(item.id, Number($event))" />
        </div>
        <button class="link-danger" @click="remove(item.id)">删除</button>
      </article>
      <van-submit-bar :price="cartStore.totalAmount" button-text="去结算" @submit="$router.push('/checkout')">
        <van-checkbox :model-value="cartStore.items.every((item) => item.checked)" @update:model-value="cartStore.toggleAll(Boolean($event))">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </AppShell>
</template>
