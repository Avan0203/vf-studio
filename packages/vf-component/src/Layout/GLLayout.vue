<template>
    <div style="position: relative">
        <div ref="GLRoot" style="position: absolute; width: 100%; height: 100%">
            <!-- Root dom for Golden-Layout manager -->
        </div>
        <div style="position: absolute; width: 100%; height: 100%">
            <GLComponent v-for="[id, component] in AllComponents" :key="id" :ref="(el) => setComponentRef(id, el)">
                <component :is="component"></component>
            </GLComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    onMounted,
    ref,
    markRaw,
    nextTick,
    defineAsyncComponent,
    type Component,
    h,
    onUnmounted,
    shallowRef,
} from "vue";
import type {
    ComponentContainer,
    Json,
    ResolvedComponentItemConfig,
    LogicalZIndex,
    ResolvedLayoutConfig
} from 'golden-layout'
import {
    LayoutConfig,
    VirtualLayout,
} from "golden-layout";
import GLComponent from "./GLComponent.vue";
import { ContentType, ContentItemType, ComponentMap } from './type'


let GLayout: VirtualLayout;

const GLRoot = ref<null | HTMLElement>(null);

const MapComponents = new Map<ComponentContainer, { refId: number; glc: InstanceType<typeof GLComponent> }>();
const AllComponents = shallowRef(new Map<number, Component>());
const UnusedIndexes: number[] = [];
let currentIndex = 0;
let GLBoundingClientRect: DOMRect;

const componentRefs = new Map<number, any>();

const setComponentRef = (index: number, el: any) => {
    if (el) {
        componentRefs.set(index, el);
    } else {
        componentRefs.delete(index);
    }
};


const defaultComponent = h('div', { style: { width: '100%', height: '100%' } }, 'Can not find the registered component');
const registerComponent = (componentType: string, componentMap: { [key: string]: any }) => {
    const importFn = componentMap[componentType];
    return markRaw(importFn ? defineAsyncComponent(importFn) : defaultComponent);
};


const addComponent = (componentType: string, componentMap: any, updateImmediately: boolean = true): number => {
    const component = registerComponent(componentType, componentMap)
    console.log('component: ', component);

    let index = currentIndex;
    if (UnusedIndexes.length > 0) {
        index = UnusedIndexes.pop() ?? currentIndex
    } else {
        currentIndex++;
    }

    AllComponents.value.set(index, component);
    // 如果需要立即更新，重新赋值整个 Map 以触发响应式更新
    if (updateImmediately) {
        updateAllComponents();
    }
    return index;
};

// 统一更新 AllComponents，触发响应式更新
const updateAllComponents = () => {
    AllComponents.value = new Map(AllComponents.value);
};

const addGLComponent = async (componentType: string, title: string, componentMap: ComponentMap): Promise<void> => {
    if (componentType.length === 0) {
        throw new Error("addGLComponent: Component's type is empty");
    }

    const refId = addComponent(componentType, componentMap);
    await nextTick(() => {
        GLayout.addComponent(componentType, { refId }, title);
    });
};


const loadLayout = async (layoutConfig: LayoutConfig | ResolvedLayoutConfig, componentMap: ComponentMap) => {
    GLayout.clear();
    AllComponents.value = new Map<number, Component>();
    console.log('AllComponents: ', AllComponents.value);

    const config = (() => {
        if (Object.hasOwnProperty.call(layoutConfig, "resolved")) {
            return LayoutConfig.fromResolved(layoutConfig as ResolvedLayoutConfig);
        } else {
            return layoutConfig as LayoutConfig;
        }
    })();

    if (!config.root) {
        return;
    }

    // 确保 content 不为 undefined 并进行类型断言
    const contents: ContentType = config.root?.content ? [config.root.content as ContentItemType] : [];

    // 批量添加组件，不立即触发更新
    while (contents.length > 0) {
        const content = contents.shift();
        if (content) {
            for (let itemConfig of content) {
                if (itemConfig.type == "component") {
                    // 批量加载时不立即更新，最后统一更新
                    const refId = addComponent(itemConfig.componentType as string, componentMap, false);
                    if (typeof itemConfig.componentState == "object") {
                        (itemConfig.componentState as Record<string, any>)["refId"] = refId;
                    } else {
                        itemConfig.componentState = { refId };
                    }
                } else if (itemConfig.content.length > 0) {
                    contents.push(itemConfig.content as ContentItemType);
                }
            }
        }
    }

    // 所有组件添加完成后，统一更新一次
    updateAllComponents();

    await nextTick(); // wait 1 tick for vue to add the dom

    GLayout.loadLayout(config);
};

const saveLayout = () => {
    return GLayout.saveLayout();
};


const toggleComponentVisibility = (container: ComponentContainer, visible: boolean): void => {
    const component = MapComponents.get(container);
    if (component && component.glc) {
        component.glc.setVisibility(visible);
    } else {
        throw new Error("toggleComponentVisibility: Component not found");
    }
};

const bindComponent = (container: ComponentContainer, itemConfig: ResolvedComponentItemConfig): ComponentContainer.BindableComponent => {
    let refId = -1;
    if (itemConfig && itemConfig.componentState) {
        refId = (itemConfig.componentState as Json).refId as number;
    } else {
        throw new Error("bindComponent: component's ref id is required");
    }

    const ref = refId;
    const component = componentRefs.get(ref) as InstanceType<typeof GLComponent>;

    MapComponents.set(container, { refId: refId, glc: component });

    container.virtualRectingRequiredEvent = updateComponentPosition;
    container.virtualVisibilityChangeRequiredEvent = toggleComponentVisibility;
    container.virtualZIndexChangeRequiredEvent = updateComponentZIndex;

    return {
        component,
        virtual: true,
    };
};

const unbindComponent = (container: ComponentContainer): void => {
    const component = MapComponents.get(container);
    if (component && component.glc) {
        MapComponents.delete(container);
        AllComponents.value.delete(component.refId);
        // 重新赋值整个 Map 以触发响应式更新
        AllComponents.value = new Map(AllComponents.value);
        UnusedIndexes.push(component.refId);
    } else {
        throw new Error("handleUnbindComponentEvent: Component not found");
    }
};

const updateComponentZIndex = (container: ComponentContainer, _: LogicalZIndex, defaultZIndex: string): void => {
    const component = MapComponents.get(container);
    if (component && component.glc) {
        component.glc.setZIndex(defaultZIndex);
    } else {
        throw new Error("updateComponentZIndex: Component not found");
    }
};

const updateBoundingRect = (_: number) => {
    GLBoundingClientRect = GLRoot.value!.getBoundingClientRect();
};

const updateComponentPosition = (container: ComponentContainer, width: number, height: number): void => {
    const component = MapComponents.get(container);
    if (component && component?.glc) {
        const boundingRect = container.element.getBoundingClientRect();
        const left = boundingRect.left - GLBoundingClientRect.left;
        const top = boundingRect.top - GLBoundingClientRect.top;
        component.glc.setPosAndSize(left, top, width, height);
    } else {
        throw new Error("updateComponentPosition: Component not found");
    }
};

const onResize = () => {
    const dom = GLRoot.value;
    let [width, height] = [0, 0];
    if (dom) {
        width = dom.offsetWidth;
        height = dom.offsetHeight;
    }
    GLayout.setSize(width, height);
};


onMounted(() => {
    if (GLRoot.value == null) throw new Error("Golden Layout can't find the root DOM!");

    window.addEventListener("resize", onResize, { passive: true });

    GLayout = new VirtualLayout(GLRoot.value!, bindComponent, unbindComponent);
    GLayout.beforeVirtualRectingEvent = updateBoundingRect;
});

onUnmounted(() => {
    window.removeEventListener("resize", onResize);

    if (GLayout) {
        GLayout.clear();
        MapComponents.clear();
        AllComponents.value = new Map<number, Component>();
    }
})

defineExpose({
    addGLComponent,
    loadLayout,
    saveLayout,
});
</script>

<style>
@import 'golden-layout/dist/css/goldenlayout-base.css';
@import 'golden-layout/dist/css/themes/goldenlayout-light-theme.css';
@import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css';


[data-theme="light"] {
    @import 'golden-layout/dist/css/themes/goldenlayout-light-theme.css';
}
[data-theme="dark"] {
    @import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css';
}

.lm_header .lm_tabs {
    margin-top: 2px;
}
</style>