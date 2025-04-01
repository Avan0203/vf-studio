<template>
    <header class="header">
        <div>222</div>
    </header>
    <main class="main">
        <div class="layout">
            <LayoutContainer ref="GLayoutRoot" class="GLayout"></LayoutContainer>
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