<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-08-18 11:05:55
 * @LastEditTime: 2020-11-10 08:52:42
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
import { Mixins } from 'vue-property-decorator'
export default class App extends Mixins(NetWorkListener) {}
</script>

<style lang="less" scoped>
#safeguard-admin {
    height: 100%;
    min-height: 860px;
    min-width: 1200px;
    overflow: hidden;
}
</style>
