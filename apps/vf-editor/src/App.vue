<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-03-31 17:25:16
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-01 19:26:47
 * @FilePath: \VF-Editor\apps\vf-editor\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <Layout />
</template>

<script lang="ts" setup>

import Layout from "@/layout/index.vue";

</script>

<style lang="scss">
@use 'golden-layout/dist/css/goldenlayout-base.css';


body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 12px;
  height: 100vh;
  width: 100vw;
}

.f-iconfont {
  font-size: 12px;
}
</style>