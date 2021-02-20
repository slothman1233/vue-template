<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 14:15:03
 * @LastEditTime: 2020-09-24 10:46:28
-->
<template>
    <header class="header">
        <EveTabs />
        <SelfInfo />
    </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import SelfInfo from './SelfInfo.vue'
import { EveTabs } from '@stl/eve-vue2-lib'
@Component({
    name: 'HeaderNav',
    components: { SelfInfo, EveTabs },
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
    margin-bottom: 10px;
}
</style>
