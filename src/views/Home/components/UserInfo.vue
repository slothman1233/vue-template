<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-04 14:24:29
 * @LastEditTime: 2020-06-04 17:20:15
-->
<template>
  <el-row class="user-info" type="flex" justify="space-around">
    <el-col :span="10">
      <div class="user-ui-box">
        <el-form class="job" label-width="70px" label-position="left">
          <el-form-item label="姓名：">
            <span>阿凡达</span>
          </el-form-item>
          <el-form-item label="职务：">
            <span>技术总监</span>
          </el-form-item>
          <el-form-item label="部门：">
            <span>研发部</span>
          </el-form-item>
        </el-form>
        <div class="avatar-box">
          <img src="../imgs/avatar.jpg" alt="头像" />
          <el-button type="text">编辑资料</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <Chart />
    </el-col>
    <el-col :span="6">
      <div class="login-ip">
        <p>常用IP：<span>224.226.108.199</span></p>
        <p>上次IP：<span>224.226.108.199</span></p>
        <p>本次IP：<span>224.226.108.199</span></p>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Chart from './Chart.vue'
@Component({
  name: 'UserInfo',
  components: { Chart },
})
export default class UserInfo extends Vue {}
</script>

<style scoped lang="less">
.user-info {
  margin-top: 15px;
  border-radius: 6px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  .user-ui-box {
    .flex();
    box-sizing: border-box;
    padding: 20px;
    background: #c4fff4;
    color: #555;
    border-radius: 3px;
    // .job {
    //   align-self: stretch;
    //   .flex(space-around, flex-start);
    //   flex-direction: column;
    // }
    .avatar-box {
      .flex(center);
      flex-direction: column;
      img {
        height: 100px;
        margin-bottom: 10px;
      }
    }
  }
  .login-ip {
    height: 100%;
    .flex();
    flex-direction: column;
    p {
      padding: 10px;
      box-sizing: border-box;
      border-radius: 4px;
      background: #18e1e6;
      span {
        color: red;
      }
    }
  }
}
</style>
