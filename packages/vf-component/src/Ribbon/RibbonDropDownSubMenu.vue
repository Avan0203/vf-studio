<template>
    <ul class="ribbon-dropdown-submenu" :style="{
        position: 'fixed',
        left: position.left + 'px',
        top: position.top + 'px'
    }">
        <slot></slot>
    </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
defineOptions({
    name: 'RibbonDropDownSubMenu'
})

defineProps({
    position: {
        type: Object as PropType<{ left: number, top: number }>,
        default: { left: 0, top: 0 },
    }
})
</script>