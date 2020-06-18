<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 11:53:35
 * @LastEditTime: 2020-06-04 15:16:37
-->
<template>
  <div class="home-layout">
    <SideBar />
    <div class="con-box">
      <HeaderNav />
      <Breadcrumb />
      <router-view class="app-con"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import SideBar from '@/components/SideBar/index.vue'
import HeaderNav from '@/components/HeaderNav/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'


@Component({
  name: 'HomeIndexLayOut',
  components: { SideBar, HeaderNav, Breadcrumb },
})
export default class HomeIndexLayOut extends Vue {}
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
      background:#fff;
    }
  }
}
</style>
