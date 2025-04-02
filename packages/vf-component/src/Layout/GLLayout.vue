<template>
    <div style="position: relative">
        <div ref="GLRoot" style="position: absolute; width: 100%; height: 100%">
            <!-- Root dom for Golden-Layout manager -->
        </div>
        <div style="position: absolute; width: 100%; height: 100%">
            <GLComponent v-for="[refId, component] in AllComponents" :key="refId" :ref="keyPrefix + refId">
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
    getCurrentInstance,
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
import { ContentType, ContentItemType } from './type'


let GLayout: VirtualLayout;

const GLRoot = ref<null | HTMLElement>(null);
const keyPrefix = 'GLComponent';

const MapComponents = new Map<ComponentContainer, { refId: number; glc: InstanceType<typeof GLComponent> }>();
const AllComponents = ref(new Map<number, any>());
const UnusedIndexes: number[] = [];
let CurIndex = 0;
let GLBoundingClientRect: DOMRect;

const instance = getCurrentInstance();

/**
 * @description: 从json 中获取组件类型 并导入
 * @param {*} componentType
 * @param {*} componentMap
 * @return {*}
 */
const registerComponent = (componentType: string, componentMap: { [key: string]: any }) => {
    // 从映射对象中获取动态导入函数
    const importFn = componentMap[componentType];
    if (!importFn) {
        // 如果没有找到对应的动态导入函数，返回 null 或抛出错误
        return null;
    } else {
        // 使用动态导入函数来异步加载组件
        return markRaw(defineAsyncComponent(importFn));
    }
};


const addComponent = (componentType: string, componentMap: any) => {
    const component = registerComponent(componentType, componentMap)

    let index = CurIndex;
    if (UnusedIndexes.length > 0) {
        index = UnusedIndexes.pop() ?? CurIndex
    } else {
        CurIndex++;
    }

    AllComponents.value.set(index, component);
    return index;
};

const addGLComponent = async (componentType: string, title: string): Promise<void> => {
    if (componentType.length === 0) {
        throw new Error("addGLComponent: Component's type is empty");
    }

    const refId = addComponent(componentType, title);
    await nextTick(() => {
        GLayout.addComponent(componentType, { refId }, title);
    });
};


const loadGLLayout = async (layoutConfig: LayoutConfig | ResolvedLayoutConfig) => {
    GLayout.clear();
    AllComponents.value.clear();

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

    let refId = 0;
    while (contents.length > 0) {
        const content = contents.shift();
        if (content) {
            for (let itemConfig of content) {
                if (itemConfig.type == "component") {
                    refId = addComponent(itemConfig.componentType as string, itemConfig.title as string);
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

    await nextTick(); // wait 1 tick for vue to add the dom

    GLayout.loadLayout(config);
};

const getLayoutConfig = () => {
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

    const ref = keyPrefix + refId;
    const component = (instance?.refs[ref] as any)[0] as InstanceType<typeof GLComponent>;

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

onMounted(() => {
    window.removeEventListener("resize", onResize);

    if (GLayout) {
        GLayout.clear();
        MapComponents.clear();
        AllComponents.value.clear();
    }
})

defineExpose({
    addGLComponent,
    loadGLLayout,
    getLayoutConfig,
});
</script>

<style>
@import 'golden-layout/dist/css/goldenlayout-base.css';
@import 'golden-layout/dist/css/themes/goldenlayout-light-theme.css';
@import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css';

.lm_header .lm_tabs {
    margin-top: 2px;
}
</style>