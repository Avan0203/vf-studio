<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 09:51:52
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-12 18:29:36
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonButton.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEtton-label
-->
<script setup lang="ts">
import { computed, type PropType, inject, ref } from 'vue';

defineOptions({
  type: 'RibbonButton'
});

const ribbonButtonRef = ref<null | any>(null);

defineExpose({
  ref: ribbonButtonRef
})

const props = defineProps({
  name: {
    require: true,
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<'icon' | 'row' | 'common'>,
    default: 'common'
  }
});

const emit = defineEmits(['click']);
const buttonGroup = inject<null | any>('buttonGroup', null);
const isActive = computed(() => {
  return buttonGroup?.active.value.includes(props.name) ?? false
});

function handleClick(e: MouseEvent) {
  if (buttonGroup) {
    buttonGroup.updateActive(props.name)
  }
  emit('click', e, props.name);
}
</script>

<template>
  <button class="ribbon-button" :disabled="disabled" :class="[`ribbon-button-${type}`, isActive ? 'active' : '']"
    @click="handleClick" ref="ribbonButtonRef">
    <span class="ribbon-button-icon-wrap">
      <template v-if="$slots.icon">
        <slot name="icon"></slot>
      </template>
      <template v-else-if="icon !== ''">
        <i :class="icon" class="ribbon-button-icon"></i>
      </template>
    </span>
    <span class="ribbon-button-label" v-if="type !== 'icon'">
      <slot></slot>
    </span>
  </button>
</template>