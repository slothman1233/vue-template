<!--
 * @Description:消息推送
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-15 09:09:55
 * @LastEditTime: 2020-06-15 11:26:52
-->
<template>
  <div class="live-set-container">
    <el-form ref="form" :model="form" label-width="120px" class="form-box">
      <el-form-item label="直播标题">
        <el-input v-model="form.title" placeholder="请输入推送标题至多20个字符"></el-input>
      </el-form-item>
      <el-form-item label="Web封面"> </el-form-item>
      <el-form-item label="移动封面"> </el-form-item>
      <el-form-item label="直播开关">
        <el-switch v-model="form.open" active-text="强制关闭" inactive-text="正常开启"> </el-switch>
      </el-form-item>
      <el-form-item label="评论区互动开关">
        <el-switch v-model="form.open" active-text="强制关闭" inactive-text="正常开启"> </el-switch>
      </el-form-item>
      <el-form-item label="直播开始时间">
        <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="直播PC源地址">
        <el-input v-model="form.pc" placeholder="请输入推送标题至多20个字符"></el-input>
      </el-form-item>
      <el-form-item label="直播H5源地址">
        <el-input v-model="form.h5" placeholder="请输入推送标题至多20个字符"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-check">保存</el-button>
      </el-form-item>
    </el-form>
    <div class="oth-btn">
      <div class="form-item-con-box">
        <el-button type="danger" icon="el-icon-delete">清空前端互动区</el-button>
        <span>(前端互动区请勿随意清楚)</span>
      </div>
      <div class="form-item-con-box">
        <el-button type="primary" icon="el-icon-s-custom">获取虚拟用户剩余量</el-button>
        <el-button type="danger" icon="el-icon-s-opportunity">导入用户数据</el-button>
      </div>
      <div class="form-item-con-box">
        <el-button type="primary" icon="el-icon-refresh">同步直播评论</el-button>
      </div>
      <div class="form-item-con-box">
        <el-button type="warning">强制关闭直播</el-button>
        <el-button type="danger">强制关闭评论</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'LiveSet',
})
export default class LiveSet extends Vue {
  form = {}
}
</script>

<style scoped lang="less">
.live-set-container {
  .flex(space-between, flex-start);
}
.form-box {
  width: 850px;
}
.oth-btn {
  flex: 1;
  padding:20px;
}
.form-item-con-box {
  margin-top: 10px;
}
</style>
