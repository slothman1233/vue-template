<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-08-18 11:05:55
 * @LastEditTime: 2020-10-26 11:03:55
-->
<template>
    <div id="appName">
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>
<script lang="ts">
import { NetWorkListener } from '@/common/mixins/tool.mixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { sendSelfMenu } from './utils'
import { power } from '@/router'
@Component
export default class App extends Mixins(NetWorkListener) {
    power = power
    @Watch('power.matchRoutes', { deep: true })
    emitMenu(matchRoutes) {
        sendSelfMenu.call(this)
    }
}
</script>

<style lang="less" scoped>
#appName {
    height: 100%;
    min-height: 860px;
    min-width: 1200px;
    width: 100%;
    overflow: hidden;
    flex: 1;
}
</style>
