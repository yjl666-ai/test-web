<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { verifyCode } from '../../api/user'

const code = ref('')
const result = ref<{ valid: boolean; productName: string; checkedAt: string }>()

async function submit() {
  if (!code.value.trim()) return showToast('请输入防伪码')
  result.value = await verifyCode(code.value)
}
</script>

<template>
  <AppShell title="正品验证" show-back>
    <section class="form-card">
      <van-field v-model="code" label="防伪码" placeholder="请输入包装上的防伪码" />
      <van-button type="primary" block @click="submit">查询</van-button>
    </section>
    <section v-if="result" class="result-panel compact">
      <van-icon name="shield-o" size="48" color="#d4a056" />
      <h1>{{ result.valid ? '验证为正品' : '未查询到记录' }}</h1>
      <p>{{ result.productName }}</p>
    </section>
  </AppShell>
</template>
