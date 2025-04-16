<template>
    <teleport to="body">
        <transition>
            <ul 
            class="ribbon-dropdown-submenu" 
            :style="{
                position: 'fixed',
                left: position.left + 'px',
                top: position.top + 'px'
            }">
                <slot></slot>
            </ul>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import {  PropType } from 'vue';
defineOptions({
  type: 'RibbonDropDownSubMenu'
})


defineProps({
    position: {
        type: Object as PropType<{left: number, top: number}>,
        default: {left: 0, top: 0}, 
    }
})
</script>