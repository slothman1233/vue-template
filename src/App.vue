<template>
  <div id="appName">
    <router-view />
  </div>
</template>
<script lang="ts">
import { NetWorkListener } from '@/common/mixins/tool.mixin'
import { Mixins } from 'vue-property-decorator'
export default class App extends Mixins(NetWorkListener) {}
</script>

<style lang="less">
#appName {
  height: 100%;
  min-height: 860px;
  min-width: 1200px;
  overflow: hidden;
}
</style>
