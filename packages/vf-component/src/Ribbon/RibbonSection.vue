<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 09:59:07
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-03 09:59:56
 * @FilePath: \react-ribbonmenu-js\src\ribbon\ribbonSection\RibbonSection.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { inject, computed } from 'vue';

const props = defineProps({
  className: { type: String, default: '' },
  tabId: { type: String, required: true },
  backgroundColor: { type: String, default: '' },
  textColor: { type: String, default: '' },
  style: { type: Object, default: () => ({}) }
});

// 从父级 `RibbonContent` 组件注入 `activeTabId`
const activeTabId = inject('activeTabId');

// 计算样式和动态类名
const sectionStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  color: props.textColor,
  ...props.style
}));

const sectionClasses = computed(() => [
  'section tab-pane fade',
  props.className,
  { 'show active': props.tabId === activeTabId }
]);
</script>

<template>
  <div :class="sectionClasses" :style="sectionStyle" :id="tabId">
    <slot></slot>
  </div>
</template>
