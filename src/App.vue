<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-18 11:19:26
 * @LastEditTime: 2020-06-18 11:22:53
-->
<template>
  <div id="huihun-admin">
    <router-view />
  </div>
</template>
<script lang="ts">
import { NetWorkListener } from '@/common/mixins/tool.mixin'
export default class App extends NetWorkListener {}
</script>

<style lang="less">
#huihun-admin {
  height: 100%;
  min-height: 860px;
  min-width: 1200px;
  overflow: hidden;
}
</style>
