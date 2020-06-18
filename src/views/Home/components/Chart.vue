<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-04 11:34:01
 * @LastEditTime: 2020-06-04 17:07:18
-->
<template>
  <div>
    <div>
      <el-date-picker
      class="date-pick"
      v-model="dateInfo"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
    <el-button type="primary">查询</el-button>
    </div>
    <div id="powerDashbordChartBox" class="chart-box"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import {pickerOptions} from '@/utils'
const PVC = '#F87F50'
const UVC = '#86CEFA'

const baseOption = {
  tooltip: {
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: [
      { name: 'PV', textStyle: { color: PVC } },
      { name: 'UV', textStyle: { color: UVC } },
    ],
  },
  grid: {
    left: '1%',
    right: '2%',
    bottom: '2%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'PV',
      type: 'line',
      stack: '总量',
      lineStyle: {
        color: PVC,
      },
      areaStyle: {
        color: PVC,
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'UV',
      type: 'line',
      stack: '总量',
      lineStyle: {
        color: UVC,
      },
      areaStyle: {
        color: UVC,
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
  ],
}

@Component({
  name: 'Chart',
})
export default class Chart extends Vue {
  charts: any = null
  dateInfo = ''

  pickerOptions: any = Object.freeze(pickerOptions())

  mounted() {
    this.setChart()
  }
  setChart() {
    const chartsDOM = document.getElementById('powerDashbordChartBox')
    if (!chartsDOM) return
    const charts = echarts.init(chartsDOM)
    this.charts = charts.setOption(baseOption, true)
  }
}
</script>

<style scoped lang="less">
.chart-box {
  height: 400px;
}
.date-pick{
  margin-right:8px;
}
</style>
