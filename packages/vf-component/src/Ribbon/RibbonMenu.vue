<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 10:25:04
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-03 10:53:06
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <nav class="ribbon-menu" v-bind="$attrs">
      <slot></slot>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  
  onMounted(() => {
    console.log('%creact-ribbonmenu-js v1.1.1', 'background: #339955; padding: 4px; font-weight: bold; color: white');
  });
  </script>
  
  <style >
  @import './style.css';
  </style>