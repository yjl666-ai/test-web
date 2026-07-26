<script setup lang="ts">
import { reactive } from 'vue'
import { showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { saveAddress } from '../../api/user'
import { isChinaMobile } from '../../utils/format'

const form = reactive({
  id: '',
  name: '',
  phone: '',
  province: '上海市',
  city: '上海市',
  district: '徐汇区',
  detail: '',
  isDefault: false,
})

async function submit() {
  if (!form.name || !isChinaMobile(form.phone) || form.detail.length < 5) return showToast('请填写完整地址信息')
  await saveAddress(form)
  showToast('地址已保存')
  history.back()
}
</script>

<template>
  <AppShell title="地址新增/编辑" show-back>
    <section class="form-card">
      <van-field v-model="form.name" label="联系人" placeholder="请输入联系人" />
      <van-field v-model="form.phone" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="form.province" label="省份" />
      <van-field v-model="form.city" label="城市" />
      <van-field v-model="form.district" label="区县" />
      <van-field v-model="form.detail" label="详细地址" type="textarea" maxlength="120" show-word-limit />
      <van-cell title="设为默认地址"><template #right-icon><van-switch v-model="form.isDefault" /></template></van-cell>
      <van-button type="primary" block @click="submit">保存地址</van-button>
    </section>
  </AppShell>
</template>
