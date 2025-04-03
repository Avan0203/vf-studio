<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 09:57:15
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-03 09:57:28
 * @FilePath: \react-ribbonmenu-js\src\ribbon\ribbonGroup\DividerGroup.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
defineProps({
  className: { type: String, default: '' }
});
</script>

<template>
  <div class="group-divider" :class="className"></div>
</template>