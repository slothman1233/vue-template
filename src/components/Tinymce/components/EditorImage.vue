<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-07 09:36:15
 * @LastEditTime: 2020-08-28 16:55:04
-->
<template>
    <div class="upload-container">
        <el-upload
            :file-list="fileList"
            :show-file-list="true"
            :on-success="onSuccess"
            class="editor-slide-upload"
            action="/upload/image"
            :http-request="submit"
            :before-upload="beforeUpload"
        >
            <el-button size="small" type="primary">点此上传图片</el-button>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { imgUpload } from '@/common/services/RemoteService'
import EditorImageBaseParams from '../config'
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
            maxSize: 800 * 1024,
        }
    },
    methods: {
        onSuccess(res, file, fileList) {
            const data = res.bodyMessage
            const arr = [
                {
                    hasSuccess: false,
                    uid: file.uid,
                    url: data,
                },
            ]
            ;(this as any).$emit('successCBK', arr)
        },
        async submit(data) {
            const { file } = data
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = async e => {
                    // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                    const imgcode = e.target?.result
                    if (!imgcode) {return reject(new Error('imgcode is undefined!'))}
                    let imgfile = imgcode.toString()
                    imgfile = imgfile.replace(`data:${file.type};base64,`, '')
                    const res = await imgUpload(Object.assign({}, EditorImageBaseParams, {
                        Base64: imgfile,
                        FileType: 1,
                    }))
                    if (!res) {return reject(res)}
                    resolve(res)
                }
            })
        },
        beforeUpload({ size }) {
            if (size > (this as any).maxSize) {return false}
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
