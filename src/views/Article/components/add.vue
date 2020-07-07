<!--
 * @Description:添加模块
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-28 09:42:51
 * @LastEditTime: 2020-06-01 16:43:59
-->
<template>
  <el-dialog :title="`${title}菜单`" :visible.sync="v_show" :before-close="beforeClose">
    <el-form :model="tempData" :rules="rules" ref="form" label-width="100px" v-if="tempData">
      <el-form-item label="菜单名" prop="menuName">
        <el-input v-model="tempData.menuName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单" prop="fatherId">
        <el-input v-model="tempData.fatherId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属模块" prop="moduleId">
        <el-input v-model.number="tempData.moduleId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单代码" prop="menuNumber">
        <el-input type="number" v-model.number="tempData.menuNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="url">
        <el-input v-model="tempData.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input type="number" v-model="tempData.icon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="isEnabled">
        <el-switch v-model="tempData.isEnabled"></el-switch>
      </el-form-item>
      <el-form-item label="是否快捷菜单" prop="isExpress">
        <el-switch v-model="tempData.isExpress"></el-switch>
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
import { addArticle, editArticle } from '@/common/services/ArticleService'
import { checkNumberRange } from '@/utils'
// 基础数据模型
const baseAuthArticle = {
  menuNumber: '',
  moduleId: '',
  fatherId: '',
  isEnabled: true,
  weight: 0,
  menuName: '',
  icon: '',
  url: '',
  isExpress: false,
}
// 添加与编辑弹窗mixin
const AEDialog = generatorAEDialog(addArticle, editArticle, { temp: baseAuthArticle })

@Component({
  name: 'AddArticleDialog',
})
export default class AddArticleDialog extends AEDialog {
  rules = {
    weight: [
      {
        validator: checkNumberRange(0, 99999999),
        trigger: 'blur',
      },
    ],
    menuName: [
      { required: true, message: '请输入模块名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' },
    ],
    menuNumber: [
      { required: true, message: '请输入模块代码', trigger: 'blur' },
      { validator: checkNumberRange(0, 9999), trigger: 'blur' },
    ],
  }
}
</script>

<style scoped lang="scss"></style>
