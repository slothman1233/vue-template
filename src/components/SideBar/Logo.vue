<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 10:39:10
 * @LastEditTime: 2020-06-15 10:43:46
-->
<template>
  <div class="logo-box">
    <img src="./power.png" alt="logo" class="logo-img" />
    <span>汇魂管理台</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component({
  name: 'Logo',
})
export default class Logo extends Vue {}
</script>

<style scoped lang="less">
.logo-box {
  .flex(flex-start);
  box-sizing: border-box;
  padding: 0 20px;
  color: @menuText;
  font-size: 26px;
  .logo-img {
    height: 64px;
    width:64px;
    background: @menuBg;
    border-radius: 8px;
    margin-right:15px;
  }
}
</style>
