<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-11 17:32:03
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-16 18:28:06
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonDropDownMenu.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <ribbon-button class="ribbon-button-dropdown-menu" @click="handleClick" :name="name" :icon="icon" :type="type"
        :class="[disabled ? 'disabled' : '']" ref="dropMenuButtonRef">{{ label }}</ribbon-button>
    <ribbon-drop-down-sub-menu :position="position" v-if="visible">
        <slot></slot>
    </ribbon-drop-down-sub-menu>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, type VNodeRef } from 'vue';
import RibbonButton from './RibbonButton.vue';
import RibbonDropDownSubMenu from './RibbonDropDownSubMenu.vue';

const props = defineProps({
    name: {
        require: true,
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String as PropType<"icon" | "common" | "row">,
        default: 'common'
    }
})

const dropMenuButtonRef = ref<VNodeRef | null>(null);

const visible = ref(false);
const position = ref({
    left: 0,
    top: 0
});

onMounted(() => {

})

function handleClick(e: MouseEvent) {
    if (dropMenuButtonRef.value?.ref && props.disabled === false) {
        const { bottom, left } = (dropMenuButtonRef.value.ref as HTMLElement).getBoundingClientRect();
        position.value.left = left;
        position.value.top = bottom;
        visible.value = !visible.value;
        e.preventDefault();
    }
}
</script>
