<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 11:24:43
 * @LastEditTime: 2020-07-10 14:38:09
-->
<template>
  <el-submenu v-if="item.childrens && item.childrens.length" :index="item.path">
    <!-- 有复合子项且复合子项不为空 -->
    <template slot="title">
      <i :class="item.icon"></i>
      <span>{{ item.subName }}</span>
    </template>
    <el-menu-item-group
      v-for="navChildrenData in item.childrens"
      :key="navChildrenData.title"
      :title="navChildrenData.title"
    >
      <el-menu-item
        :index="child.path"
        v-for="child in navChildrenData.children"
        :key="child.subName"
        :route="{ path: child.path }"
        >{{ child.subName }}</el-menu-item
      >
    </el-menu-item-group>
  </el-submenu>

  <el-submenu v-else-if="item.children && item.children.length" :index="item.path">
    <!-- 有子项且子项不为空（非复合子项） -->
    <template slot="title">
      <i :class="item.icon"></i>
      <span slot="title">{{ item.subName }}</span>
    </template>
    <el-menu-item
      :index="child.path"
      v-for="child in item.children"
      :key="child.subName"
      :route="{ path: child.path }"
    >
      <i :class="child.icon"></i>
      <span slot="title">{{ child.subName }}</span>
    </el-menu-item>
  </el-submenu>

  <el-menu-item :index="item.path" v-else :route="{ path: item.path }">
    <!-- 没有子项 -->
    <i :class="item.icon"></i>
    <span slot="title">{{ item.subName }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'SideBarItem',
})
export default class SideBarItem extends Vue {
  @Prop()
  item
}
</script>

<style scoped lang="scss"></style>
