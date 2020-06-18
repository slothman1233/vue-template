<template>
  <div class="power-home">
    <h3 class="dashbord-title">移动端：</h3>
    <el-row class="dashbord-box" type="flex" justify="space-between" :gutter="30">
      <el-col>
        <DashTab title="最新" icon="el-icon-user" :pv="999" :uv="999" :addPV="123" :addUV="333" />
      </el-col>
      <el-col>
        <DashTab
          title="全部"
          icon="el-icon-copy-document"
          :pv="999"
          :uv="999"
          :addPV="123"
          :addUV="333"
          bgColor="#6ECAF8"
        />
      </el-col>
      <el-col>
        <DashTab
          title="我的"
          icon="el-icon-data-line"
          :pv="999"
          :uv="999"
          :addPV="123"
          :addUV="333"
          bgColor="#18DFE5"
        />
      </el-col>
    </el-row>
    <h3 class="dashbord-title">PC端：</h3>
    <el-row class="dashbord-box" :gutter="30" type="flex" justify="space-between">
      <el-col>
        <DashTab
          title="首页"
          icon="el-icon-chat-line-round"
          :pv="999"
          :uv="999"
          :addPV="123"
          :addUV="333"
          bgColor="#1DD3B6"
        />
      </el-col>
      <el-col>
        <DashTab
          title="目录页"
          icon="el-icon-chat-line-round"
          :pv="999"
          :uv="999"
          :addPV="123"
          :addUV="333"
          bgColor="#1DD3B6"
        />
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>

    <div class="dashbord-box">
      <!-- 下部 -->
      <Chart></Chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DashTab from './components/DashTab.vue'
import Chart from './components/Chart.vue'
@Component({
  name: 'Home',
  components: { DashTab, Chart},
})
export default class Home extends Vue {}
</script>

<style scoped lang="less">
.dashbord-title {
  font-size: 24px;
  margin: 10px 0;
}
.dashbord-box {
  margin-bottom: 20px;
}
</style>
