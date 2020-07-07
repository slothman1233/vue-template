<!--
 * @Description:添加栏目
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-03 13:46:07
 * @LastEditTime: 2020-06-03 15:58:44
-->
<template>
  <el-dialog :title="`${title}栏目`" :visible.sync="v_show" :before-close="beforeClose">
    <el-form :model="tempData" :rules="rules" ref="form" label-width="80px" v-if="tempData">
      <el-form-item label="栏目名" prop="organizationName">
        <el-input v-model="tempData.organizationName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属父级" prop="fatherId">
        <el-select
          v-model="tempData.fatherId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="searchColumn"
          :loading="organizationLoading"
        >
          <el-option label="最高级" :value="0"> </el-option>
          <el-option
            v-for="{ organizationName, id } in organizationOptionsNoSelf"
            :key="id"
            :label="organizationName"
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
import {
  addColumn,
  editColumn,
  getColumnList,
  EditColumnParams,
} from '@/common/services/ColumnService'
import { getAuthorList, EditAuthorParams } from '@/common/services/AuthorService'
import { checkNumberRange } from '@/utils'
// 基础数据模型
const baseAuthColumn = {
  isEnabled: true,
  weight: 0,
  organizationName: '',
  roleIds: [],
  fatherId: 0,
}
// 添加与编辑弹窗mixin
const AEDialog = generatorAEDialog(addColumn, editColumn, {
  temp: baseAuthColumn,
})

@Component({
  name: 'AddColumnDialog',
})
export default class AddColumnDialog extends AEDialog {
  created() {
    this.getColumn()
    this.getAuthors()
  }

  rules = {
    weight: [
      {
        validator: checkNumberRange(0, 99999999),
        trigger: 'blur',
      },
    ],
    organizationName: [
      { required: true, message: '请输入栏目名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' },
    ],
  }

  organizationLoading = false
  // 栏目信息
  organizationOptions: Array<EditColumnParams> = []
  // 过滤自身后的栏目信息
  get organizationOptionsNoSelf(){
    return this.organizationOptions.filter(item => item.id !== this.tempData.id)
  }
  searchColumn(keyword) {
    this.getColumn(keyword)
  }

  async getColumn(keyword?: string) {
    this.organizationLoading = true
    const res = await getColumnList({
      keyword,
    })
    this.organizationLoading = false
    if (!res) return
    const data = res.bodyMessage
    const options = Array.isArray(data) ? data : [data]
    this.organizationOptions = options
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
