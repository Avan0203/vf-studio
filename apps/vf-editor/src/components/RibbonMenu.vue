<template>
    <ribbon-menu>
        <!-- 標籤欄 -->
        <ribbon-tabs v-model="activeTabRibbon" @click="">
            <ribbon-tab-item static>Static</ribbon-tab-item>
            <ribbon-tab-item>Herramientas</ribbon-tab-item>
            <ribbon-tab-item>Others</ribbon-tab-item>
            <ribbon-tab-item disabled>Disabled</ribbon-tab-item>
        </ribbon-tabs>

        <!-- 內容區域 -->
        <ribbon-content :active-tab="activeTabRibbon">
            <!-- 第一分頁 -->
            <ribbon-section tab-id="section-one" :style="{ borderBottom: 'none' }">
                <ribbon-group text="Vistas">
                    <ribbon-button @click="handleOpenSideBar" :class="{ 'active': openSidebar }">
                        <ribbon-icon class="indira-icono-agregar-serie" :style="{ fontSize: '30px' }" />
                        <ribbon-caption>{{ 'herramientas.series' }}</ribbon-caption>
                    </ribbon-button>

                    <ribbon-button @click="handleOpenLayout" :id="layout.id" :class="{ 'active': layout.active }">
                        <ribbon-icon class="indira-icono-ventanas" :style="{ fontSize: '30px' }" />
                        <ribbon-caption>{{ 'controls.nombre.layout' }}</ribbon-caption>
                    </ribbon-button>

                    <ribbon-divider-group />

                    <ribbon-button>
                        <ribbon-icon class="indira-lungs" :style="{ fontSize: '30px' }" />
                        <ribbon-caption>{{ 'ia' }}</ribbon-caption>
                    </ribbon-button>
                </ribbon-group>

                <!-- 工具組 -->
                <ribbon-group text="Herramientas">
                    <div class="d-flex flex-column">
                        <ribbon-button icon-left :class="{ 'active': category.active }" @contextmenu.prevent
                            @click="clickButton">
                            <ribbon-icon class="indira-icono-arrastrar" />
                            <ribbon-caption>Arrastrar</ribbon-caption>
                        </ribbon-button>

                        <ribbon-button icon-left :class="{ 'active': category.active }" @contextmenu.prevent
                            @click="clickButton">
                            <ribbon-icon class="indira-icono-anotacion" />
                            <ribbon-caption>Anotar</ribbon-caption>
                        </ribbon-button>

                        <ribbon-button icon-left :class="{ 'active': category.active }" @contextmenu.prevent
                            @click="clickButton">
                            <ribbon-icon class="indira-icono-segmentacion" />
                            <ribbon-caption>Pintar</ribbon-caption>
                        </ribbon-button>
                    </div>

                    <!-- 切換組 -->
                    <ribbon-toggle-group :style="{ width: widthGroupControls }">
                        <ribbon-button icon-left :style="{ height: '32px' }" @mousedown="clickButton"
                            @contextmenu.prevent>
                            <ribbon-icon :style="{ fontSize: '25px' }" />
                            <ribbon-caption>Scroll</ribbon-caption>
                        </ribbon-button>
                    </ribbon-toggle-group>
                </ribbon-group>
            </ribbon-section>

            <!-- 第二分頁 -->
            <ribbon-section tab-id="section-two">
                <h1 class="text-white">Section-two</h1>
            </ribbon-section>
        </ribbon-content>
    </ribbon-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    RibbonButton,
    RibbonCaption,
    RibbonContent,
    RibbonDividerGroup,
    RibbonGroup,
    RibbonMenu,
    RibbonIcon,
    RibbonTabItem,
    RibbonTabs,
    RibbonSection,
    RibbonToggleGroup
} from '@vf/component'
// 狀態管理
const activeTabRibbon = ref('section-one')
const openSidebar = ref(false)
const layout = ref({ id: null, active: false })
const category = ref({ active: false })
const widthGroupControls = ref('auto')

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

// 工具方法
const clickButton = (id) => {
    // 實現按鈕點擊邏輯
}
</script>