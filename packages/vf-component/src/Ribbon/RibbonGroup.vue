<!--
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-04-08 00:09:15
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-11 13:29:19
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonGroup.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
defineProps({
  label: { type: String, default: '' }
});
</script>

<template>
  <div class="ribbon-group" v-bind="$attrs">
    <div class="ribbon-group-wrap">
      <slot></slot>
    </div>
    <span v-if="label !== ''" class="ribbon-group-title">{{ label }}</span>
  </div>
</template>