<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 10:25:04
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-11 15:27:12
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonMenu.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <nav class="ribbon-menu" v-bind="$attrs">
        <div class="ribbon-header">
            <div class="ribbon-header-wrap">
                <div v-for="({ label, name }) in labelOptions" :key="name" @click="() => tabClick(name)"
                    class="ribbon-tab-item" :class="{
                        'ribbon-tab-item-active': name === currentName
                    }">
                    {{ label }}
                </div>
            </div>
        </div>
        <div class="ribbon-content">
            <div v-for="(component, index) in defaults" :key="index" class="ribbon-content-pane" :style="{
                display: component.props.name === currentName ? 'block' : 'none'
            }">
                <div class="ribbon-content-component-wrap">
                    <component :is="component"></component>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>

const currentName = defineModel();

defineOptions({
    type: 'RibbonMenu',
});

const emit = defineEmits(['tab-click']);

const slots = defineSlots();
const defaults = slots.default?.();


defaults.forEach((slot: any) => {
    if (slot.type.type !== 'RibbonTab') {
        throw new Error('tabs必须是tab')
    }
})
const labelOptions = defaults.map((slot: any) => {
    return {
        label: slot.props.label,
        name: slot.props.name
    }
})

const tabClick = (name: string) => {
    currentName.value = name;
    emit('tab-click', name);
}

</script>


<style lang="scss">
@use './style.scss'
</style>