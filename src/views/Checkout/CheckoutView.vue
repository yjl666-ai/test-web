<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { createOrder } from '../../api/order'
import { getAddresses } from '../../api/user'
import { getCoupons } from '../../api/coupon'
import { useAddressStore } from '../../store/address'
import { useCartStore } from '../../store/cart'
import type { Coupon } from '../../types'
import { money } from '../../utils/format'

const cartStore = useCartStore()
const addressStore = useAddressStore()
const coupons = ref<Coupon[]>([])
const loading = ref(false)

onMounted(async () => {
  addressStore.setList(await getAddresses())
  coupons.value = await getCoupons()
})

async function submitOrder() {
  if (!addressStore.defaultAddress) return showToast('请先新增收货地址')
  if (!cartStore.checkedItems.length) return showToast('请选择可购买商品')
  loading.value = true
  const order = await createOrder({ addressId: addressStore.defaultAddress.id, cartItemIds: cartStore.checkedItems.map((item) => item.id) })
  loading.value = false
  location.href = `/pay/result?status=success&orderId=${order.id}`
}
</script>

<template>
  <AppShell title="结算" show-back>
    <section class="checkout-card" @click="$router.push('/user/address')">
      <h3>收货地址</h3>
      <template v-if="addressStore.defaultAddress">
        <p>{{ addressStore.defaultAddress.name }} {{ addressStore.defaultAddress.phone }}</p>
        <strong>{{ addressStore.defaultAddress.province }}{{ addressStore.defaultAddress.city }}{{ addressStore.defaultAddress.district }}{{ addressStore.defaultAddress.detail }}</strong>
      </template>
      <p v-else>新增地址</p>
    </section>
    <section class="checkout-card">
      <h3>商品清单</h3>
      <div v-for="item in cartStore.checkedItems" :key="item.id" class="mini-row">
        <span>{{ item.product.name }} x{{ item.count }}</span>
        <strong>{{ money(item.sku.price * item.count) }}</strong>
      </div>
    </section>
    <section class="checkout-card">
      <h3>优惠券</h3>
      <div v-for="item in coupons" :key="item.id" class="mini-row">
        <span>{{ item.title }}</span>
        <strong>-{{ money(item.amount) }}</strong>
      </div>
    </section>
    <section class="checkout-card">
      <div class="mini-row"><span>运费</span><strong>¥0.00</strong></div>
      <div class="mini-row"><span>合计</span><strong>{{ money(cartStore.totalAmount) }}</strong></div>
    </section>
    <van-submit-bar :price="cartStore.totalAmount" button-text="提交订单" :loading="loading" @submit="submitOrder" />
  </AppShell>
</template>
