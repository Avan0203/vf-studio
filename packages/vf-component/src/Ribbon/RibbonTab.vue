<template>
    <slot></slot>
</template>

<script setup lang="ts">
defineOptions({
    type: 'RibbonTab'
})

const props = defineProps({
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