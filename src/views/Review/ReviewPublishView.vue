<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { publishReview } from '../../api/order'

const rate = ref(5)
const content = ref('')
const anonymous = ref(false)

async function submit() {
  if (!rate.value) return showToast('请选择评分')
  await publishReview({ rate: rate.value, content: content.value, anonymous: anonymous.value })
  showToast('评价已发布')
  history.back()
}
</script>

<template>
  <AppShell title="发布评价" show-back>
    <section class="form-card">
      <van-rate v-model="rate" color="#ff6f91" />
      <van-field v-model="content" label="评价" type="textarea" maxlength="500" show-word-limit placeholder="说说真实使用感受" />
      <van-uploader max-count="6" />
      <van-cell title="匿名评价"><template #right-icon><van-switch v-model="anonymous" /></template></van-cell>
      <van-button type="primary" block @click="submit">发布评价</van-button>
    </section>
  </AppShell>
</template>
