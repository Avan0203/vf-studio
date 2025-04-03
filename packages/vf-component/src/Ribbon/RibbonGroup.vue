<script setup lang="ts">
defineProps({
  className: { type: String, default: '' },
  text: { type: String, default: '' }
});
</script>

<template>
  <div class="group" :class="className">
    <slot></slot>
    <span v-if="text !== ''" class="title">{{ text }}</span>
  </div>
</template>