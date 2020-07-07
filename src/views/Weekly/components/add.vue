<template>
  <el-dialog :title="`${title}周刊`" :visible.sync="v_show" :before-close="beforeClose">
    <el-form :model="tempData" :rules="rules" ref="form" label-width="80px" v-if="tempData">
      <el-form-item label="年份" prop="WeeklyName">
        <el-input v-model="tempData.WeeklyName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="期数" prop="WeeklyNumber">
        <el-input
          type="number"
          v-model.number="tempData.WeeklyNumber"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="weight">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="推荐度" prop="isEnabled">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="阅读数" prop="isEnabled">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="点赞数" prop="isEnabled">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否上架" prop="isEnabled">
        <el-switch v-model="tempData.isEnabled"></el-switch>
      </el-form-item>
      <el-form-item label="上架时间" prop="isEnabled">
        <el-date-picker
          v-model="tempData.time"
          type="datetime"
          placeholder="选择上架时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="封面图" prop="isEnabled">
        <el-upload
          :limit="1"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="Web图" prop="isEnabled">
        <el-upload
          :limit="1"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeSelf">取 消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { generatorAEDialog } from '@/common/mixins/dialog.mixin'
import { addWeekly, editWeekly } from '@/common/services/WeeklyService'
import { checkNumberRange } from '@/utils'
// 基础数据模型
const baseAuthWeekly = {
  isEnabled: true,
  weight: 0,
  WeeklyName: '',
  WeeklyNumber: '',
}
// 添加与编辑弹窗mixin
const AEDialog = generatorAEDialog(addWeekly, editWeekly, { temp: baseAuthWeekly })

@Component({
  name: 'AddWeeklyDialog',
})
export default class AddWeeklyDialog extends Mixins(AEDialog) {
  rules = {
    weight: [
      {
        validator: checkNumberRange(0, 99999999),
        trigger: 'blur',
      },
    ],
    WeeklyName: [
      { required: true, message: '请输入模块名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' },
    ],
    WeeklyNumber: [
      { required: true, message: '请输入模块代码', trigger: 'blur' },
      { validator: checkNumberRange(0, 9999), trigger: 'blur' },
    ],
  }
}
</script>

<style scoped lang="scss"></style>
