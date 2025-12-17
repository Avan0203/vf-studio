<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-01 10:11:18
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-12-17 10:15:40
 * @FilePath: \vf-studio\packages\vf-component\src\Layout\GLComponent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div ref="GLComponent" style="position: absolute; overflow: hidden">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const GLComponent = ref<null | HTMLElement>(null);

const numberToPixels = (value: number) => (`${value.toString(10)}px`);

const setPosAndSize = (left: number, top: number, width: number, height: number) => {
  if (GLComponent.value) {
    const el = GLComponent.value;
    el.style.left = numberToPixels(left);
    el.style.top = numberToPixels(top);
    el.style.width = numberToPixels(width);
    el.style.height = numberToPixels(height);
  }
};


const setVisibility = (visible: boolean) => {
  if (GLComponent.value) {
    const el = GLComponent.value;
    if (visible) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }
};

const setZIndex = (value: string) => {
  if (GLComponent.value) {
    const el = GLComponent.value;
    el.style.zIndex = value;
  }
};

defineExpose({
  setPosAndSize,
  setVisibility,
  setZIndex,
})
</script>
