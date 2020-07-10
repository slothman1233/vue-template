<!--
 * @Description:文章编辑
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-15 11:33:27
 * @LastEditTime: 2020-07-08 10:32:17
-->
<template>
  <el-dialog
    :title="`${title}文章`"
    :visible.sync="v_show"
    :before-close="beforeClose"
    width="1000px"
  >
    <el-form :model="tempData" :rules="rules" ref="form" label-width="100px" v-if="tempData">
      <el-form-item label="标题" prop="chapterTitle">
        <el-input v-model="tempData.chapterTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="subTitle">
        <el-input v-model="tempData.subTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="authorName">
        <el-input v-model="tempData.authorName"></el-input>
      </el-form-item>
      <el-form-item label="设为封面">
        <el-switch v-model="isPost"></el-switch>
      </el-form-item>
      <el-form-item label="序号" prop="bannerSort" inline>
        <el-input v-model.number="tempData.bannerSort"></el-input>
      </el-form-item>
      <el-form-item label="阅读数" prop="readCount">
        <el-input class="join-inp" v-model.number="tempData.readCount" disabled></el-input>
        +
        <el-input class="join-inp" v-model.number="virtualRead"></el-input>
      </el-form-item>
      <el-form-item label="收藏数" prop="favoritesCount">
        <el-input class="join-inp" v-model.number="tempData.favoritesCount" disabled></el-input>
        +
        <el-input class="join-inp" v-model.number="tempData.favoritesInsert"></el-input>
      </el-form-item>
      <el-form-item label="音频地址" prop="audioSrc">
        <el-input v-model="tempData.audioSrc">
          <el-upload slot="append" action="https://jsonplaceholder.typicode.com/posts/">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="chapterSummary">
        <el-input
          type="textarea"
          rows="5"
          resize="none"
          class="inp-textarea"
          v-model="tempData.chapterSummary"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <Tinymce ref="editor" v-model="tempData.chapterContent" height="400px" />
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
import Tinymce from '@/components/Tinymce/index.vue'
const addFun = () => {
  console.log(1)
}
const editFun = () => {
  console.log(2)
}
const AEDialog = generatorAEDialog(
  addFun,
  // 这里是编辑的方法
  function() {}
)
@Component({
  name: 'EditArticle',
  components: { Tinymce },
})
export default class EditArticle extends AEDialog {
  beforeClose() {
    console.log(3)
  }
  // 是否封面
  get isPost() {
    return this.tempData.bannerSort > 0
  }
  set isPost(val) {
    this.tempData.bannerSort = val ? 1 : 0
  }

  // 虚拟阅读数
  get virtualRead() {
    return this.tempData.readShow - this.tempData.readCount
  }
  set virtualRead(val) {
    this.tempData.readShow = this.tempData.readCount + val
  }

  get rules() {
    const titleMaxLenght = this.isPost ? 20 : 50
    const checkSortNum = (rule, value, callback) => {
      if (value === '') return callback(new Error('封面专题序号不能为空'))
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (this.isPost && value <= 0) {
          callback(new Error('必须大于1'))
        } else {
          callback()
        }
      }
    }
    const rule = {
      chapterTitle: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { min: 1, max: titleMaxLenght, message: `长度在1-${titleMaxLenght}个字`, trigger: 'blur' },
      ],
      subTitle: [
        { required: this.isPost, message: '封面专题必须有副标题', trigger: 'blur' },
        { min: 1, max: titleMaxLenght, message: `长度在1-${titleMaxLenght}个字`, trigger: 'blur' },
      ],
      bannerSort: [
        {
          required: this.isPost,
          validator: checkSortNum,
          message: '封面专题必须有序号',
          trigger: 'blur',
        },
      ],
      audioSrc: [{ required: true, message: '请上传音频', trigger: 'change' }],
      chapterSummary: [
        { required: this.isPost, message: '封面专题必须填写摘要', trigger: 'change' },
        { min: 0, max: 120, message: `长度在0-120个字`, trigger: 'change' },
      ],
    }
    return rule
  }
}
</script>

<style scoped lang="less">
.join-inp {
  width: 150px;
}
.inp-textarea {
  width: 500px;
}
</style>
