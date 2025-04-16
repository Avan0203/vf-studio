<!--
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-04-08 00:09:15
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-16 18:19:46
 * @FilePath: \VF-Editor\apps\vf-editor\src\components\RibbonMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <ribbon-menu v-model="activeName" @tab-click="handleClick" style="height: 96px;">
        <ribbon-tab label="Static" name="static">
            <ribbon-group label="Vistas">
                <ribbon-button @click="handleOpenSideBar" icon="f-iconfont f-transform" name="transform">
                    transform
                </ribbon-button>
                <ribbon-button @click="handleOpenSideBar" icon="f-iconfont f-sousuo" name="search">
                    sousuo
                </ribbon-button>
                <ribbon-button @click="handleOpenSideBar" icon="f-iconfont f-camera" :disabled="true" name="camera">
                    camera
                </ribbon-button>
                <ribbon-button @click="handleOpenSideBar" name="move">
                    <template #icon>
                        <i class="f-iconfont f-move" style="font-size: 20px;"></i>
                    </template>
                    Move
                </ribbon-button>
            </ribbon-group>
            <ribbon-group label="Vistas">
                <ribbon-button @click="handleOpenSideBar" type="row" icon="f-iconfont f-light" name="light">
                    Light
                </ribbon-button>
                <ribbon-button @click="handleOpenSideBar" type="row" icon="f-iconfont f-zu" name="group">
                    import
                </ribbon-button>
                <ribbon-button @click="handleOpenSideBar" type="row" icon="f-iconfont f-caizhi" name="material">
                    material
                </ribbon-button>
            </ribbon-group>
            <ribbon-group label="multiple / single select">
                <ribbon-button-group :mode="'multiple'">
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-ruler" name="ruler" />
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-ruler" name="ruler1" />
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-ruler" name="ruler2" />
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-ruler" name="ruler3" />
                </ribbon-button-group>
                <ribbon-button-group :mode="'single'">
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-zu" name="zu" />
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-zu" name="zu1" />
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-zu" name="zu2" />
                    <ribbon-button @click="handleOpenSideBar" type="icon" icon="f-iconfont f-zu" name="zu3" />
                </ribbon-button-group>
            </ribbon-group>
            <ribbon-group label="dropdown menu">
                <ribbon-drop-down-menu name="drop1" icon="f-iconfont f-zu" type="common" label="drop1">
                    <ribbon-drop-down-menu-item name="drop1-1">1-1</ribbon-drop-down-menu-item>
                    <ribbon-drop-down-menu-item name="drop1-2">1-2</ribbon-drop-down-menu-item>
                    <ribbon-drop-down-menu-item name="drop1-3">1-3</ribbon-drop-down-menu-item>
                </ribbon-drop-down-menu>
                <ribbon-drop-down-menu name="drop1" icon="f-iconfont f-zu" type="common" disabled>
                    <ribbon-drop-down-menu-item name="drop1-1">1-1</ribbon-drop-down-menu-item>
                    <ribbon-drop-down-menu-item name="drop1-2">1-2</ribbon-drop-down-menu-item>
                    <ribbon-drop-down-menu-item name="drop1-3">1-3</ribbon-drop-down-menu-item>
                </ribbon-drop-down-menu>
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
    RibbonButtonGroup,
    RibbonDropDownMenu,
    RibbonDropDownMenuItem,
} from '@vf/component'
// 狀態管理
const openSidebar = ref(false)
const activeName = ref('static');

const handleOpenSideBar = (e, name) => {
    console.log('button click', name, e);
}

const handleClick = (e) => {
    console.log('click', activeName.value);
}

// 工具方法
</script>