<template>
    <ribbon-menu v-model="activeName" @tab-click="handleClick">
        <ribbon-tab label="Static" name="static">
            content 1
        </ribbon-tab>
        <ribbon-tab label="Herramientas" name="herramientas">
            content 2
        </ribbon-tab>
        <ribbon-tab label="Others" name="others">
            content 3
        </ribbon-tab>
        <ribbon-tab label="Disabled" name="disabled">
            content 4
        </ribbon-tab>
    </ribbon-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    RibbonMenu,
    RibbonTab
} from '@vf/component'
// 狀態管理
const activeTabRibbon = ref('section-one')
const openSidebar = ref(false)
const layout = ref({ id: null, active: false })
const category = ref({ active: false })
const widthGroupControls = ref('auto')

const activeName = ref('static');

// 方法
const toggleTapRibbon = (tabId) => {
    if (activeTabRibbon.value !== tabId) {
        activeTabRibbon.value = tabId
    }
}

const handleOpenSideBar = () => {
    openSidebar.value = !openSidebar.value
}

const handleOpenLayout = () => {
    layout.value.active = !layout.value.active
}

const handleClick = () => {
    console.log('click', activeName.value);
}

// 工具方法
const clickButton = (id) => {
    // 實現按鈕點擊邏輯
}
</script>