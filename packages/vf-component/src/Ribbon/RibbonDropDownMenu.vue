<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-11 17:32:03
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-22 14:18:36
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonDropDownMenu.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <ribbon-button class="ribbon-button-dropdown-menu" @click="handleClick" :name="name" :icon="icon" :type="type"
        :class="[disabled ? 'disabled' : '']" ref="dropMenuButtonRef" v-bind="$attrs">{{ label }}</ribbon-button>
    <teleport to="body">
        <transition>
            <ribbon-drop-down-sub-menu :position="position" v-if="visible">
                <template v-for="item in options" :key="item.name">
                    <ribbon-drop-down-menu-item v-if="visibleMethod(item, options, options)" v-bind="item"
                        @click="(e: MouseEvent) => handleItemClick(e, item)" />
                </template>
            </ribbon-drop-down-sub-menu>
        </transition>
    </teleport>
</template>

<script lang="ts" setup>
import { PropType, ref, type VNodeRef, provide } from 'vue';
import RibbonButton from './RibbonButton.vue';
import RibbonDropDownSubMenu from './RibbonDropDownSubMenu.vue';
import RibbonDropDownMenuItem from './RibbonDropDownMenuItem.vue';
import { RibbonMenuItem, VisibleMethod } from './type';

defineOptions({
    name: 'RibbonDropDownMenu'
});

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
    },
    options: {
        type: Array as PropType<Array<RibbonMenuItem>>,
        default: () => []
    },
    visibleMethod: {
        type: Function as PropType<VisibleMethod>,
        default: () => true
    }
});

provide('dropMenu', props);
const dropMenuButtonRef = ref<VNodeRef | null>(null);

const visible = ref(false);
const position = ref({
    left: 0,
    top: 0
});

const emit = defineEmits(['click', 'menuItemClick']);

function handleClick(e: MouseEvent) {
    if (dropMenuButtonRef.value?.ref && props.disabled === false) {
        const { bottom, left } = (dropMenuButtonRef.value.ref as HTMLElement).getBoundingClientRect();
        position.value.left = left;
        position.value.top = bottom;
        visible.value = !visible.value;
        e.preventDefault();
        emit('click', e, props.name);
    }
}

function handleItemClick(e: MouseEvent, item: RibbonMenuItem) {
    visible.value = false;
    emit('menuItemClick', e, item.name);
}
</script>
