<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-07 10:35:53
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-11 17:28:31
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonTab.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <slot></slot>
</template>

<script setup lang="ts">
defineOptions({
    type: 'RibbonTab'
})

defineProps({
    label: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: '' 
    }
})
</script>