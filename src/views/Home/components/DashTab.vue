<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-04 10:35:16
 * @LastEditTime: 2020-06-04 14:42:12
-->
<template>
  <div class="dash-tab" :style="{ backgroundColor: bgColor }">
    <i :class="icon"></i>
    <div class="data">
      <p class="data-title">{{ title }}</p>
      <div class="data-con">
        <p class="con">PV: {{ pv }} (+{{ addPV }})</p>
        <p class="con">UV: {{ uv }} (+{{ addUV }})</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'DashTab',
})
export default class DashTab extends Vue {
  @Prop()
  title!: string

  @Prop()
  icon!: string

  @Prop()
  pv!: number
  @Prop()
  addPV!: number
  @Prop()
  uv!: number
  @Prop()
  addUV!: number

  @Prop()
  bgColor?: any
}
</script>

<style scoped lang="less">
.dash-tab {
  .flex(flex-start);
  color: #fff;
  background: #4065df;
  min-width: 200px;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  i {
    font-size: 40px;
    margin-right: 25px;
  }
  .data {
    flex: 1;
    .data-title {
      font-size: 16px;
      color: #423e3e;
      margin-bottom: 5px;
      text-align: center;
    }
    .data-con {
      font-size: 20px;
      .flex();
      flex-wrap: wrap;
      .con {
        margin-top:10px;
      }
    }
  }
}
</style>
