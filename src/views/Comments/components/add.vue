<!--
 * @Description:添加评论
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-03 15:19:06
 * @LastEditTime: 2020-06-03 16:01:44
-->
<template>
  <el-dialog :title="`${title}评论`" :visible.sync="v_show" :before-close="beforeClose">
    <el-form :model="tempData" :rules="rules" ref="form" label-width="80px" v-if="tempData">
      <el-form-item label="评论名" prop="jobName">
        <el-input v-model="tempData.jobName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属上级" prop="fatherId">
        <el-select
          v-model="tempData.fatherId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="searchComments"
          :loading="jobLoading"
        >
          <el-option label="最高级" :value="0"> </el-option>
          <el-option
            v-for="{ jobName, id } in jobOptionsNoSelf"
            :key="id"
            :label="jobName"
            :value="id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联角色" prop="roleIds">
        <el-checkbox-group v-model="tempData.roleIds">
          <el-checkbox :label="id" v-for="{ id, roleName } in roles" :key="id">{{
            roleName
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="isEnabled">
        <el-switch v-model="tempData.isEnabled"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeSelf">取 消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { generatorAEDialog } from '@/common/mixins/dialog.mixin'
import { addComments, editComments, getCommentsList, EditCommentsParams } from '@/common/services/CommentsService'
import { getAuthorList, EditAuthorParams } from '@/common/services/AuthorService'
import { checkNumberRange } from '@/utils'
// 基础数据模型
const baseAuthComments = {
  isEnabled: true,
  weight: 0,
  jobName: '',
  roleIds: [],
  fatherId: 0,
}
// 添加与编辑弹窗mixin
const AEDialog = generatorAEDialog(addComments, editComments, {
  temp: baseAuthComments,
})

@Component({
  name: 'AddCommentsDialog',
})
export default class AddCommentsDialog extends AEDialog {
  created() {
    this.getComments()
    this.getAuthors()
  }

  rules = {
    weight: [
      {
        validator: checkNumberRange(0, 99999999),
        trigger: 'blur',
      },
    ],
    jobName: [
      { required: true, message: '请输入评论名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' },
    ],
  }

  jobLoading = false
  // 评论信息
  jobOptions: Array<EditCommentsParams> = []
  // 过滤自身后的评论信息
  get jobOptionsNoSelf() {
    return this.jobOptions.filter(item => item.id !== this.tempData.id)
  }
  searchComments(keyword) {
    this.getComments(keyword)
  }

  async getComments(keyword?: string) {
    this.jobLoading = true
    const res = await getCommentsList({
      keyword,
    })
    this.jobLoading = false
    if (!res) return
    const data = res.bodyMessage
    const options = Array.isArray(data) ? data : [data]

    this.jobOptions = options
  }

  //角色列表
  roles: Array<EditAuthorParams> = []
  async getAuthors() {
    const res = await getAuthorList()
    if (!res) return
    this.roles = res.bodyMessage
  }
}
</script>

<style scoped lang="less"></style>
