<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 11:53:35
 * @LastEditTime: 2020-10-31 10:47:09
-->
<template>
    <div class="home-layout">
        <EveSideBar :collapse="isCollapse" :routes="routes" v-if="!IS_MFE" />
        <div class="con-box">
            <HeaderNav />
            <EveBreadcrumb
                :collapse="isCollapse"
                @toggleSideBar="toggleSideBar"
            />
            <router-view class="app-con"></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import HeaderNav from '@/components/HeaderNav/index.vue'
import { EveBreadcrumb, EveSideBar } from '@stl/eve-vue2-lib'
import { power } from '@/router'
import { IS_MFE } from '@/main'
@Component({
    name: 'HomeIndexLayOut',
    components: { EveSideBar, HeaderNav, EveBreadcrumb },
})
export default class HomeIndexLayOut extends Vue {
    isCollapse = false
    power = power
    @Watch('power.matchRoutes', {deep: true})
    routesToSideBar(match){
        this.routes = [...(power.staticRoutes || []), ...match]
        return [...(power.staticRoutes || []), ...match]
    }
    routes = this.routesToSideBar(power.matchRoutes)

    toggleSideBar() {
        this.isCollapse = !this.isCollapse
    }
    IS_MFE = IS_MFE
}
</script>

<style scoped lang="less">
.home-layout {
    height: 100%;
    display: flex;
    .con-box {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
        box-sizing: border-box;
        .app-con {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #fff;
        }
    }
}
</style>
