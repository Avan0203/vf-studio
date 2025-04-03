<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <span :class="['caption', { disabled }]">
    <slot></slot>
  </span>
</template>
