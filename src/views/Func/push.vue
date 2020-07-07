<!--
 * @Description:消息推送
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-15 09:09:55
 * @LastEditTime: 2020-06-15 09:40:31
-->
<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="推送类型">
      <el-select v-model="form.type" placeholder="请选择推送类型">
        <el-option label="系统消息" :value="0"></el-option>
        <el-option label="推送通知" :value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="消息类型" v-if="form.type === 0">
      <el-select v-model="form.type" placeholder="请选择消息类型">
        <el-option label="系统通知" :value="0"></el-option>
        <el-option label="官方公告" :value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="通知对象">
      <el-input v-model="form.desc">
        <el-button slot="append" icon="el-icon-plus"></el-button>
      </el-input>
      <div class="sub-title">(为空表示全部（包括未登录的），指定用户用,“,”隔开)</div>
    </el-form-item>
    <el-form-item label="引用内容">
      <el-input v-model="form.content">
        <el-select v-model="form.contype" slot="prepend" placeholder="请选择">
          <el-option label="H5" value="1"></el-option>
          <el-option label="周刊" value="2"></el-option>
          <el-option label="文章" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-delete"></el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="推送标题">
      <el-input v-model="form.title" placeholder="请输入推送标题至多20个字符"></el-input>
    </el-form-item>
    <el-form-item label="推送内容">
      <el-input
        type="textarea"
        v-model="form.con"
        placeholder="请输入推送内容至多500个字符"
        maxlength="500"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item label="同步到推送通知">
      <el-switch v-model="form.sync" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" icon="el-icon-check">发送</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'PushMsg',
})
export default class PushMsg extends Vue {
  form = {}
}
</script>

<style scoped lang="less"></style>
