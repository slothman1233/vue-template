<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 14:57:52
 * @LastEditTime: 2020-06-05 08:58:14
-->
<template>
  <el-dropdown @command="handleCommand">
    <div class="self-info">
      <el-avatar
        size="large"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      >
      </el-avatar>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import {power} from '@/router'
@Component({
  name: 'SelfInfo',
})
export default class SelfInfo extends Vue {
  handleCommand(command) {
    this[command]()
  }

  logout() {
    power.logout()
  }
}
</script>

<style scoped lang="less">
.self-info {
  .flex(flex-start);
  margin-left: 10px;
  cursor: pointer;
}
</style>
