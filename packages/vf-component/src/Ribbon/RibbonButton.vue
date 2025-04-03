<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 09:51:52
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-03 09:52:06
 * @FilePath: \react-ribbonmenu-js\src\ribbon\RibbonButton.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  iconLeft: { type: Boolean, default: false },
  dropdown: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
});

const buttonClass = computed(() => ({
  'ribbon-button': !props.iconLeft && !props.dropdown,
  'ribbon-icon-button': props.iconLeft,
  'dropdown-toggle': props.dropdown,
  'disabled': props.disabled
}));
</script>

<template>
  <button :class="buttonClass" :disabled="disabled">
    <slot></slot>
  </button>
</template>