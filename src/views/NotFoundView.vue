<script setup lang="ts">
import AppShell from '../components/common/AppShell.vue'
import StateBlock from '../components/common/StateBlock.vue'
</script>

<template>
  <AppShell title="404" show-back>
    <StateBlock title="页面不存在" action="返回首页" @action="$router.push('/')" />
  </AppShell>
</template>
