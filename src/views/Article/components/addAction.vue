<template>
  <el-dialog :title="`${title}功能`" :visible.sync="v_show" :before-close="beforeClose">
    <el-form :model="tempData" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="功能名" prop="actionName">
        <el-input v-model="tempData.actionName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属模块" prop="moduleId">
        <el-select
          disabled
          v-model="tempData.moduleId"
          :loading="moduleLoading"
          v-if="moduleOptions"
        >
          <el-option :label="moduleOptions.moduleName" :value="moduleOptions.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属菜单" prop="menuId">
        <el-select v-model="tempData.menuId" placeholder="请选择菜单" disabled>
          <el-option :label="menuInfo.menuName" :value="menuInfo.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能序号" prop="actionNumber">
        <el-input
          type="number"
          v-model.number="tempData.actionNumber"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="tempData.icon" autocomplete="off"></el-input>
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
import { Component, Inject } from 'vue-property-decorator'
import { generatorAEDialog } from '@/common/mixins/dialog.mixin'
import { addAction, editAction } from '@/common/services/ActionService'
import { getWeeklyById } from '@/common/services/WeeklyService'
import { checkNumberRange } from '@/utils'
// 基础数据模型
const baseAction = {
  actionNumber: '',
  moduleId: '',
  menuId: '',
  isEnabled: true,
  weight: 0,
  actionName: '',
  icon: '',
}
// 添加与编辑弹窗mixin
const AEDialog = generatorAEDialog(addAction, editAction, { temp: baseAction })
@Component({
  name: 'AddAction',
})
export default class AddAction extends AEDialog {
  @Inject()
  readonly menuInfo
  rules = {
    weight: [
      {
        validator: checkNumberRange(0, 99999999),
        trigger: 'blur',
      },
    ],
    actionName: [
      { required: true, message: '请输入功能名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' },
    ],
    actionNumber: [
      { required: true, message: '请输入功能代码序号', trigger: 'blur' },
      { validator: checkNumberRange(0, 9999), trigger: 'blur' },
    ],
    moduleId: [{ required: true, message: '请选择模块', trigger: 'blur' }],
    menuId: [{ required: true, message: '请选择菜单', trigger: 'blur' }],
  }

  created() {
    this.searchWeekly()
    this.tempData.moduleId = this.menuInfo.moduleId
    this.tempData.menuId = this.menuInfo.id
  }

  moduleLoading = false
  moduleOptions = null
  async searchWeekly() {
    this.moduleLoading = true
    const res = await getWeeklyById({
      id: this.menuInfo.moduleId,
    })
    this.moduleLoading = false
    this.moduleOptions = res?.bodyMessage
  }
}
</script>

<style scoped lang="scss"></style>
