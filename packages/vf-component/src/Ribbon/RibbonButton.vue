<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 09:51:52
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-09 16:14:26
 * @FilePath: \react-ribbonmenu-js\src\ribbon\RibbonButton.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEtton-label
-->
<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  icon: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<'icon' | 'row' | 'common'>,
    default: 'common'
  }
});
</script>

<template>
  <button class="ribbon-button" :disabled="disabled" :class="`ribbon-button-${type}`">
    <span class="ribbon-button-icon-wrap">
      <template v-if="$slots.icon">
        <slot name="icon"></slot>
      </template>
      <template v-else-if="icon !== ''">
        <i :class="icon" class="ribbon-button-icon"></i>
      </template>
    </span>
    <span class="ribbon-button-label" v-if="type !== 'icon'">
      <slot></slot>
    </span>
  </button>
</template>