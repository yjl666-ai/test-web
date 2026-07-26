<script setup lang="ts">
defineProps<{
  type?: 'empty' | 'error'
  title: string
  action?: string
}>()

defineEmits<{ action: [] }>()
</script>

<template>
  <div class="state-block">
    <div class="state-block__mark">{{ type === 'error' ? '!' : '·' }}</div>
    <h3>{{ title }}</h3>
    <van-button v-if="action" size="small" type="primary" @click="$emit('action')">{{ action }}</van-button>
  </div>
</template>
