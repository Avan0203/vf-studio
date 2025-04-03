<template>
    <ul class="tabs-holder" v-bind="$attrs">
        <slot></slot>
    </ul>
</template>

<script setup lang="ts">
defineProps({
    // 如果存在需要類型驗證的 props 可在此聲明
    // 例如：title: { type: String, default: '' }
});
</script>