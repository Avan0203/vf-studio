<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-01 18:13:15
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-02 17:01:46
 * @FilePath: \VF-Editor\apps\vf-editor\src\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE>
-->
<template>
    <header class="header">
        <ribbon-menu/>
    </header>
    <main class="main">
        <side-bar/>
        <div class="layout">
            <!-- <layout-container ref="GLayoutRoot" class="GLayout"></layout-container> -->
        </div>
    </main>
    <footer class="footer">
        <div>444</div>
    </footer>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { LayoutContainer } from '@vf/component';
import { layoutConfig, componentMap } from '../config/layout';
import SideBar from './Sidebar.vue';
import RibbonMenu from './RibbonMenu.vue';


const GLayoutRoot = ref(null);

onMounted(() => {
    if (GLayoutRoot.value) {
        (GLayoutRoot.value as any).loadGLLayout(layoutConfig, componentMap)
    }
})

defineExpose({
    GLayoutRoot: GLayoutRoot.value
})
</script>

<style lang="scss">
.header {
    height: 25px;
}

.main {
    display: flex;
    flex-direction: row;
    height: calc(100% - 45px);
}

.aside {
    width: 30px;
}

.layout {
    flex-grow: 1;
}

.GLayout {
    width: 100%;
    height: 100%;
}

.footer {
    height: 20px;
    width: 100%;
}
</style>