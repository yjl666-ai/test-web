<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import AppShell from '../../components/common/AppShell.vue'
import { login, sendCode } from '../../api/user'
import { useUserStore } from '../../store/user'
import { isChinaMobile } from '../../utils/format'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const phone = ref('')
const code = ref('')
const agreed = ref(false)
const countdown = ref(0)
const canSubmit = computed(() => isChinaMobile(phone.value) && /^\d{4,6}$/.test(code.value) && agreed.value)

async function requestCode() {
  if (!isChinaMobile(phone.value)) return showToast('请输入正确手机号')
  await sendCode(phone.value)
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

async function submit() {
  if (!canSubmit.value) return showToast('请补全登录信息')
  const result = await login({ phone: phone.value, code: code.value })
  userStore.setSession(result.token, result.user)
  showToast('登录成功')
  router.replace(String(route.query.redirect || '/user'))
}
</script>

<template>
  <AppShell title="登录注册" show-back back-to="/">
    <section class="login-card">
      <h1>欢迎回来</h1>
      <p>登录后同步购物车、地址和订单。</p>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" type="tel" />
      <van-field v-model="code" label="验证码" placeholder="4-6 位数字">
        <template #button>
          <van-button size="small" :disabled="countdown > 0" @click="requestCode">{{ countdown ? `${countdown}s` : '获取验证码' }}</van-button>
        </template>
      </van-field>
      <van-checkbox v-model="agreed">已阅读并同意用户协议</van-checkbox>
      <van-button type="primary" block :disabled="!canSubmit" @click="submit">登录</van-button>
    </section>
  </AppShell>
</template>
