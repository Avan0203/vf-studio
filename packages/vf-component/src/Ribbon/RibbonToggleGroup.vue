<template>
    <div 
    :class="['ribbon-toggle-group button-group', className]" 
    data-role-buttongroup="true" 
    data-role="buttongroup"
    v-bind="rest"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    className: {
        type: String,
        default: ''
    }
});

const { className, ...rest } = props;
</script>