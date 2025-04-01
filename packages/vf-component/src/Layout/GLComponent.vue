<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-01 10:11:18
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-01 10:33:41
 * @FilePath: \VF-Editor\packages\vf-component\src\Layout\glComponent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div ref="GLComponent" style="position: absolute; overflow: hidden">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const GLComponent = ref(null);

const numberToPixels = (value: Number) => {
  return value.toString(10) + "px";
};

const setPosAndSize = (left: Number, top: Number, width: Number, height: Number) => {
  if (GLComponent.value) {
    const el: HTMLElement = GLComponent.value;
    el.style.left = numberToPixels(left);
    el.style.top = numberToPixels(top);
    el.style.width = numberToPixels(width);
    el.style.height = numberToPixels(height);
  }
};


const setVisibility = (visible: Boolean) => {
  if (GLComponent.value) {
    const el: HTMLElement = GLComponent.value;
    if (visible) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  }
};

const setZIndex = (value: string) => {
  if (GLComponent.value) {
    const el: HTMLElement = GLComponent.value;
    el.style.zIndex = value;
  }
};

defineExpose({
  setPosAndSize,
  setVisibility,
  setZIndex,
})
</script>
