<!--
 * @Description:标签
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-30 09:25:48
 * @LastEditTime: 2020-06-04 09:24:08
-->
<template>
  <el-tabs
    class="tabs-box"
    v-model="activeName"
    :closable="tabs.length > 1"
    type="card"
    @tab-click="handleClick"
    @tab-remove="handleRemove"
  >
    <el-tab-pane
      v-for="{ path, title, name } in tabs"
      :key="path"
      :label="title"
      :name="name"
      :route="path"
    ></el-tab-pane>
  </el-tabs>
</template>
<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class Tabs extends Vue {
  activeName = ''

  tabs = []

  // 监听路由
  @Watch('$route')
  checkRoute(nval) {
    this.setTabs(nval)
  }

  // 第一次生成
  created() {
    this.setTabs(this.$route)
  }

  setTabs(route) {
    const matched = this.tabs.find(({ path }) => path === route.fullPath)
    if (!matched) {
      const obj = {
        title: route.meta.title,
        path: route.fullPath,
        name: route.name || route.meta.title,
      }
      this.tabs.push(obj)
      this.activeName = obj.name
    } else {
      this.activeName = matched.name
    }
  }

  handleClick(tab) {
    const { fullPath } = this.$route
    const path = tab.$attrs.route
    if (fullPath === path) return
    this.$router.push(path)
  }

  handleRemove(name) {
    // 如果关闭的是当前页
    const index = this.tabs.findIndex(tab => tab.name === name)
    if (name === this.activeName) {
      const nextTab = this.tabs[index + 1] || this.tabs[index - 1]
      if (nextTab) {
        this.$router.push(nextTab.path).catch(e => console.log(e))
      }
    }
    this.tabs.splice(index, 1)
  }
}
</script>

<style lang="less" scoped>
.tabs-box {
  flex: 1;
}
</style>
