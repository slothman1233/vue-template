<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 14:15:03
 * @LastEditTime: 2020-06-04 15:11:48
-->
<template>
  <header class="header">
    <Tabs />
    <SelfInfo />
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import SelfInfo from './SelfInfo.vue'
import Tabs from '@/components/Tabs/index.vue'
@Component({
    name: 'HeaderNav',
    components: { SelfInfo, Tabs },
})
export default class HeaderNav extends Vue {}
</script>

<style scoped lang="less">
.header {
  .flex();
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
  margin-bottom:10px;
}
</style>
