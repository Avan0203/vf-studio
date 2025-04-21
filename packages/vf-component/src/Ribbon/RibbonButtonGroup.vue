<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-10 09:41:33
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-11 13:22:57
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonButtonGroup.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
  <div class="ribbon-button-group" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, PropType, ref } from "vue";
const props = defineProps({
  mode: {
    type: String as PropType<"single" | "multiple" | "">,
    default: ""
  }
})
const active = ref<string[]>([]);
defineOptions({
  name: "RibbonButtonGroup",
});

function updateActive(name: string) {
  if (props.mode === 'single') {
    active.value = [name]
  } else if (props.mode === 'multiple') {
    const index = active.value.indexOf(name)
    if (index === -1) {
      active.value.push(name)
    } else {
      active.value.splice(index, 1)
    }
  }
}

provide("buttonGroup", {
  active,
  updateActive
})


</script>
