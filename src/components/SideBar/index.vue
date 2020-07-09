<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 09:46:01
 * @LastEditTime: 2020-06-15 10:13:41
-->
<template>
  <div class="side-bar" :class="{collapse}">
    <el-menu
      class="sidebar-menu"
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse="collapse"
      :collapse-transition="false"
      mode="vertical"
      router
    >
      <SideBarItem v-for="(nav, i) in navData" :key="i" :item="nav" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import SideBarItem from './SideBarItem.vue'
import Logo from './Logo.vue'
import { routes } from '@/router'

@Component({
  name: 'SideBar',
  components: { SideBarItem, Logo },
})
export default class SideBar extends Vue {
  @Prop()
  collapse!: boolean
  showLogo = false

  variables = {
    menuBg: '#304156',
    menuText: '#bfcbd9',
    menuActiveText: '#409EFF',
  }

  parseRouteForBar(r, basePath = '/') {
    const nav: Array<NavData> = []
    r.forEach(({ meta, path, children }) => {
      const mpath = this.pathResolve(basePath, path)
      if (meta?.inTheBar || (children && children.length)) {
        let obj: NavData = {
          subName: meta?.title,
          path: mpath,
          icon: meta?.icon,
        }
        if (children?.length > 1) {
          obj.children = children.map(child => ({
            subName: child.meta?.title,
            path: this.pathResolve(obj.path, child.path),
            icon: child.meta?.icon,
          }))
        } else if (children?.length) {
          const child = children[0]
          obj = {
            subName: child.meta?.title,
            path: this.pathResolve(obj.path, child.path),
            icon: child.meta?.icon,
          }
        }
        nav.push(obj)
      }
    })
    return nav.filter(({ subName }) => !!subName)
  }

  pathResolve(basePath, path) {
    if (basePath === '/') {
      return path.indexOf('/') !== 0 ? basePath + path : path
    }
    return basePath + '/' + path
  }

  navData: Array<NavData> = this.parseRouteForBar(routes)

  get activeMenu() {
    // if set path, the sidebar will highlight the path you set
    return this.$route.fullPath
  }
}

interface NavData {
  // 应用名
  // appName?: string
  // 导航标题
  subName: string
  // 复合子项
  childrens?: Array<NavChildrenData>
  // 子项
  children?: Array<NavData>
  // 路由
  path?: string
  // 图标
  icon?: string
}
interface NavChildrenData {
  // 具体子项
  children?: Array<NavData>
  // 分组标题
  title?: string
  // 路由
  path?: string
}
</script>

<style scoped lang="less">
.side-bar {
  height: 100%;
  background: @menuBg;
  padding: 20px 0;
  box-sizing: border-box;
  width:210px;
  transition: width .28s;
  &.collapse{
    width:auto !important;
  }
  .sidebar-menu {
    height: 100%;
    border: none;
  }
}
</style>
