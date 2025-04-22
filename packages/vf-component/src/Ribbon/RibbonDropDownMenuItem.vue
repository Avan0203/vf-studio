<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-16 17:21:13
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-22 14:52:38
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonDropDownMenuItem.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
  <li class="ribbon-dropdown-menu-item" :class="[props.disabled ? 'disabled' : '', props.divider ? 'divider' : '']"
    :name="props.name" ref="itemRef" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <span class="ribbon-dropdown-menu-item-wrap">
      <span class="ribbon-dropdown-menu-item-prefix">
        <i v-if="props.icon" :class="props.icon"></i>
      </span>
      <span for="">{{ props.label }}</span>
    </span>
    <span class="ribbon-dropdown-menu-item-suffix">
      <i v-if="props.children && props.children.length > 0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M12 8l10 8l-10 8z"></path></svg>
      </i>
    </span>
    <template v-if="props.children && props.children.length > 0">
      <ribbon-drop-down-sub-menu :position="position" v-if="visible">
        <template v-for="item in props.children" :key="item.name">
          <ribbon-drop-down-menu-item v-if="visibleMethod(item, props.children, options)" v-bind="item"
            @click="(e: MouseEvent) => handleClick(e, item)" />
        </template>
      </ribbon-drop-down-sub-menu>
    </template>
  </li>
</template>

<script setup lang="ts">
import { RibbonMenuItem, VisibleMethod } from './type';
import RibbonDropDownSubMenu from './RibbonDropDownSubMenu.vue';
import { inject, onMounted, reactive, ref } from 'vue';

const dropMenu = inject<{ options: Array<RibbonMenuItem>, visibleMethod: VisibleMethod }>('dropMenu');
const visibleMethod = dropMenu!.visibleMethod;
const options = dropMenu!.options;

const props = defineProps<RibbonMenuItem>();
const itemRef = ref<HTMLElement | null>(null);

const position = reactive({
  left: 0,
  top: 0
});

function mouseenter() {
  visible.value = true;
}
function mouseleave() {
  visible.value = false;
}

const visible = ref(false);

defineOptions({
  name: 'RibbonDropDownMenuItem'
});

const emit = defineEmits(['menuItemClick']);

function handleClick(e: MouseEvent, item: RibbonMenuItem) {
  if (!item.disabled) {
    visible.value = !visible.value;
    emit('menuItemClick', e, item.name);
  }
}

onMounted(() => {
  if (itemRef.value) {
    const bounding = itemRef.value.getBoundingClientRect();
    position.left = bounding.left + bounding.width;
    position.top = bounding.top;
  }
})
</script>