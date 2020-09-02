<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-14 17:50:06
 * @LastEditTime: 2020-07-24 16:12:02
-->
<template>
  <el-upload
    :class="{ hide: hideUpload }"
    :file-list="fileList"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-error="handleError"
    :on-success="onSuccess"
    :on-progress="onProgress"
    :headers="signHeaders"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-bind="fileData"><i class="el-icon-plus"></i></slot>
    <slot name="tip" slot="tip"></slot>
  </el-upload>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit } from 'vue-property-decorator'
import { name as preview } from '@/common/plugins/PreviewImg'
import { cloneDeep } from 'lodash'
import { sign } from '../utils'
@Component({
    name: 'Upload',
})
export default class Upload extends Vue {
  fileData: any = {
      // 进度信息 100 为 100%
      progress: 0,
  }

  @Model('change', {
      type: Array,
  })
  value!: Array<any>

  @Emit('change')
  change(e: any) {
      return e
  }

  get fileList() {
      return cloneDeep(this.value)
  }
  set fileList(val) {
      this.change(val)
  }
  get hideUpload() {
      return this.fileList.length >= 1
  }

  handlePictureCardPreview(file) {
      this[preview]({
          img: this.fileList,
      })
  }
  handleRemove(file, fileList) {
      this.fileList = fileList
  }
  handleError(err, file, fileList) {
      console.log(err)
      this.$message.error('上传失败')
  }
  onSuccess(res, file, fileList) {
      res && this.change(res.code === 0 ? [{ url: res.bodyMessage }] : fileList)
  }
  onProgress(event, file, fileList) {
      this.fileData.progress = +event.percent.toFixed(2)
  }
  get signHeaders() {
      return sign(this.$attrs.data)
  }
}
</script>

<style scoped lang="less">
.hide /deep/ .el-upload--picture-card {
  display: none;
}
</style>
