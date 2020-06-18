<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 17:20:04
 * @LastEditTime: 2020-06-04 15:15:14
-->
<template>
  <el-breadcrumb separator="/" class="bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, i) in breadList"
      :key="i"
      :to="item.path ? { path: item.path } : false"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { RouteRecord } from 'vue-router'
@Component({
  name: 'Breadcrumb',
})
export default class Breadcrumb extends Vue {
  breadList: RouteRecord[] = []

  @Watch('$route')
  changeRoute() {
    // if you go to the redirect page, do not update the breadcrumbs
    this.getBreadcrumb()
  }
  created() {
    this.getBreadcrumb()
  }
  getBreadcrumb() {
    let breadList: RouteRecord[] = []
    // only show routes with meta.title
    const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
    const first = matched[0]
    if (!(first.path === '/home' && matched.length <= 1)) {
      breadList = matched
      breadList.reduce((pre, now) => {
        if (pre.redirect === now.path) pre.path = ''
        return now
      })
    }
    this.breadList = breadList
  }
}
</script>

<style scoped lang="less">
.bread {
  background: #fff;
  padding-left:20px;
}
</style>
