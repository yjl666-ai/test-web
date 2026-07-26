<script setup lang="ts">
import { onMounted } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import StateBlock from '../../components/common/StateBlock.vue'
import { deleteAddress, getAddresses } from '../../api/user'
import { useAddressStore } from '../../store/address'

const addressStore = useAddressStore()

onMounted(async () => {
  addressStore.setList(await getAddresses())
})

async function remove(id: string) {
  await showConfirmDialog({ title: '删除地址', message: '确认删除这个收货地址？' })
  await deleteAddress(id)
  addressStore.setList(addressStore.list.filter((item) => item.id !== id))
  showToast('已删除')
}
</script>

<template>
  <AppShell title="地址管理" show-back>
    <StateBlock v-if="!addressStore.list.length" title="还没有收货地址" action="新增地址" @action="$router.push('/user/address/edit')" />
    <article v-for="item in addressStore.list" :key="item.id" class="checkout-card">
      <h3>{{ item.name }} {{ item.phone }}</h3>
      <p>{{ item.province }}{{ item.city }}{{ item.district }}{{ item.detail }}</p>
      <div class="action-row">
        <van-tag v-if="item.isDefault" color="#d4a056">默认</van-tag>
        <van-button size="small" @click="$router.push('/user/address/edit')">编辑</van-button>
        <van-button size="small" plain type="danger" @click="remove(item.id)">删除</van-button>
      </div>
    </article>
    <div class="bottom-space">
      <van-button type="primary" block @click="$router.push('/user/address/edit')">新增地址</van-button>
    </div>
  </AppShell>
</template>
