<!--
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-04-08 00:09:15
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-09 17:17:42
 * @FilePath: /vf-studio/apps/vf-editor/src/components/RibbonMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <ribbon-menu v-model="activeName" @tab-click="handleClick">
        <ribbon-tab label="Static" name="static">
                <ribbon-group label="Vistas">
                    <ribbon-button @click="handleOpenSideBar" icon="f-iconfont f-transform">
                        transform
                    </ribbon-button>
                    <ribbon-button @click="handleOpenSideBar" icon="f-iconfont f-sousuo">
                        sousuo
                    </ribbon-button>
                    <ribbon-button @click="handleOpenSideBar" icon="f-iconfont f-camera" :disabled="true">
                        camera
                    </ribbon-button>
                    <ribbon-button @click="handleOpenSideBar">
                        <template #icon>
                            <i class="f-iconfont f-move" style="font-size: 20px;"></i>
                        </template>
                        move
                    </ribbon-button>
                </ribbon-group>
                <ribbon-group label="Vistas">
                    <ribbon-button @click="handleOpenSideBar" :class="{ 'active': openSidebar }">
                    </ribbon-button>
                </ribbon-group>
                <ribbon-group label="Vistas">
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-ruler" />
                </ribbon-group>
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
    RibbonTab,
    RibbonGroup,
    RibbonButton,
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
    console.log('button click');
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