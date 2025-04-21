<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-16 17:21:13
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-21 18:16:55
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonDropDownMenuItem.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
  <li class="ribbon-dropdown-menu-item">
    <i v-if="props.icon" :class="props.icon"></i>
  </li>
</template>

<script setup lang="ts">
import { RibbonMenuItem } from './type';

const props = defineProps<RibbonMenuItem>()

defineOptions({
  name: 'RibbonDropDownMenuItem'
});
</script>