<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-11 17:32:03
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-12 18:22:45
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonDropDownMenu.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <ribbon-button class="ribbon-button-drop-down-menu" @click="handleClick" :name="name" :icon="icon" :type="type"
        ref="dropMenuButtonRef" />
    <teleport to="body">
        <div style="width: 200px; position: fixed; border: 1px solid #000;" v-if="visible" :style="{
            left: position.left + 'px',
            top: position.top + 'px'
        }">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </div>
    </teleport>

    
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, type VNodeRef } from 'vue';
import RibbonButton from './RibbonButton.vue';

defineProps({
    name: {
        require: true,
        type: String,
        default: ''
    },
    icon: {
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
    if (dropMenuButtonRef.value) {
        console.log(dropMenuButtonRef.value);
    }
})

function handleClick(e: MouseEvent) {
    console.log(777);
    position.value.left = e.clientX;
    position.value.top = e.clientY;
    visible.value = !visible.value;
    e.preventDefault();
}
</script>
