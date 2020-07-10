<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-07 09:36:15
 * @LastEditTime: 2020-07-08 10:47:21
-->
<template>
  <div class="upload-container">
    <el-upload
      :file-list="fileList"
      :show-file-list="true"
      :before-upload="beforeAvatarUpload"
      class="editor-slide-upload"
      action="#"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script lang="ts">
// import { UploadImg } from '@/common/services/ArticleService'
function UploadImg(opts: any) {
  // 上传图片的方法
  return opts
}
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff',
    },
  },
  data() {
    return {
      listObj: {},
      fileList: [],
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const fileName = file.uid
      let imgUrlBase64
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async e => {
        imgUrlBase64 = e.target?.result //转换后的文件数据存储在e.target.result中
        let params = {
          base64: imgUrlBase64,
          Extension: 'png',
          GetInfo: true,
        }
        const res = await UploadImg(params)
        if (!res) return
        let data = res.bodyMessage
        let arr = [
          {
            hasSuccess: false,
            uid: file.uid,
            width: data.width,
            height: data.height,
            url: data.url,
          },
        ]
        ;(this as any).$emit('successCBK', arr)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/.el-upload-list {
    display: none;
  }
}
</style>
