<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-10 09:41:33
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-10 18:29:26
 * @FilePath: \VF-Editor\packages\vf-component\src\Ribbon\RibbonButtonGroup.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
  <div class="ribbon-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, PropType ,ref } from "vue";
const props = defineProps({
    mode:{
        type:String as PropType<"single"|"multiple"|"">,
        default:""
    } 
})
const activeButton = ref<string[]>([]);
defineOptions({
  type: "RibbonButtonGroup",
});

function updateActive(name:string){
    if(props.mode === 'single'){
        activeButton.value = [name]
    }else if(props.mode ==='multiple'){
        const index = activeButton.value.indexOf(name)
        if(index === -1){
            activeButton.value.push(name)  
        }else{
            activeButton.value.splice(index,1)
        }
    }
    console.log(activeButton.value);
}

provide("buttonGroup",{
    activeButton,
  updateActive
})


</script>
