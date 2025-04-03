<script setup lang="ts">
import { provide } from 'vue';

const props = defineProps({
  activeTab: { required: true },
  className: { type: String, default: '' }
});

// 提供 `activeTab` 作为上下文
provide('activeTabContext', { activeTabId: props.activeTab });
</script>

<template>
  <div class="content-holder tab-content" :class="className">
    <slot></slot>
  </div>
</template>