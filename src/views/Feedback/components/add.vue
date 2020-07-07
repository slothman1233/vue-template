<!--
 * @Description:添加反馈
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-03 17:12:30
 * @LastEditTime: 2020-06-04 17:37:15
-->
<template>
  <el-dialog :title="`${title}反馈`" :visible.sync="v_show" :before-close="beforeClose">
    <el-form :model="tempData" :rules="rules" ref="form" label-width="80px" v-if="tempData">
      <el-form-item label="反馈名" prop="groupName">
        <el-input v-model="tempData.groupName" autocomplete="off"></el-input>
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
import {
  addFeedback,
  editFeedback,
  getFeedbackList,
  EditFeedbackParams,
} from '@/common/services/FeedbackService'
import { getAuthorList, EditAuthorParams } from '@/common/services/AuthorService'
import { checkNumberRange } from '@/utils'
// 基础数据模型
const baseAuthFeedback = {
  isEnabled: true,
  weight: 0,
  groupName: '',
  roleIds: [],
}
// 添加与编辑弹窗mixin
const AEDialog = generatorAEDialog(addFeedback, editFeedback, {
  temp: baseAuthFeedback,
})

@Component({
  name: 'AddFeedbackDialog',
})
export default class AddFeedbackDialog extends AEDialog {
  created() {
    this.getAuthors()
  }

  rules = {
    weight: [
      {
        validator: checkNumberRange(0, 99999999),
        trigger: 'blur',
      },
    ],
    groupName: [
      { required: true, message: '请输入反馈名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' },
    ],
  }

  groupLoading = false
  // 反馈信息
  groupOptions: Array<EditFeedbackParams> = []
  // 过滤自身后的反馈信息
  get groupOptionsNoSelf(){
    return this.groupOptions.filter(item => item.id !== this.tempData.id)
  }

  //角色列表
  roles: Array<EditFeedbackParams> = []
  async getAuthors() {
    const res = await getAuthorList()
    if (!res) return
    this.roles = res.bodyMessage
  }
}
</script>

<style scoped lang="less"></style>
