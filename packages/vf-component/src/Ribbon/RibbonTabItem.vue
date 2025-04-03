<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-03 10:06:33
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-03 10:58:07
 * @FilePath: \react-ribbonmenu-js\src\ribbon\ribbonTabs\TabItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <li :class="classes" :style="computedStyle">
        <a href="#">
            <slot></slot>
        </a>
    </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    static: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    backgroundColor: {
        type: String,
        default: ''
    },
    textColor: {
        type: String,
        default: ''
    },
    className: {
        type: String,
        default: ''
    }
})

const classes = computed(() => {
    return {
        [props.className]: true,
        'static': props.static,
        'disabled': props.disabled,
        'active': props.active
    }
})

const computedStyle = computed(() => {
    const style: { [key: string]: any } = {}
    if (props.backgroundColor) {
        style.backgroundColor = props.backgroundColor
    }
    if (props.textColor) {
        style.color = props.textColor
    }
    return style
})
</script>