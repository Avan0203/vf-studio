<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 09:51:52
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-08 15:27:01
 * @FilePath: \react-ribbonmenu-js\src\ribbon\RibbonButton.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: ''
  },
  disabled:{
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button class="ribbon-button" :disabled="disabled">
    <template v-if="$slots.icon">
      <slot name="icon"></slot>
    </template>
    <template v-else>
      <i :class="icon"></i>
    </template>
    <span><slot></slot></span>
  </button>
</template>