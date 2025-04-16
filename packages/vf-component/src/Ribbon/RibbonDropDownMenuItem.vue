<template>
  <li class="ribbon-dropdown-menu-item">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">

defineProps({
    name:{
        type: String,
        required: true,
    },
    disabled:{
        type: Boolean,
        default: false 
    }
})

defineOptions({
  type: 'RibbonDropDownMenuItem'
});
</script>