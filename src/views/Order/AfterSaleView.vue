<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { createAfterSale } from '../../api/order'

const type = ref('refund')
const reason = ref('')
const note = ref('')
const loading = ref(false)

async function submit() {
  if (!reason.value) return showToast('请选择售后原因')
  loading.value = true
  await createAfterSale({ type: type.value, reason: reason.value, note: note.value })
  loading.value = false
  showToast('售后申请已提交')
}
</script>

<template>
  <AppShell title="售后申请" show-back>
    <section class="form-card">
      <van-radio-group v-model="type" direction="horizontal">
        <van-radio name="refund">仅退款</van-radio>
        <van-radio name="return_refund">退货退款</van-radio>
      </van-radio-group>
      <van-field v-model="reason" label="原因" placeholder="请选择或填写原因" />
      <van-field v-model="note" label="说明" type="textarea" maxlength="300" show-word-limit placeholder="补充问题描述" />
      <van-uploader max-count="6" />
      <van-button type="primary" block :loading="loading" @click="submit">提交申请</van-button>
    </section>
    <section class="checkout-card">
      <h3>进度</h3>
      <van-steps direction="vertical" :active="0">
        <van-step>待审核</van-step>
        <van-step>处理中</van-step>
        <van-step>已完成</van-step>
      </van-steps>
    </section>
  </AppShell>
</template>
