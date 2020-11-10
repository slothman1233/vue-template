<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-14 17:50:06
 * @LastEditTime: 2020-11-09 11:05:23
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
        :on-exceed="onExceed"
        :headers="signHeaders"
        v-bind="$attrs"
        v-on="$listeners"
        ref="upload"
    >
        <slot v-bind="fileData"><i class="el-icon-plus"></i></slot>
        <slot name="tip" slot="tip"></slot>
    </el-upload>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit, Ref, Prop } from 'vue-property-decorator'
import { name as preview } from '@/common/plugins/PreviewImg'
import { cloneDeep } from 'lodash'
import { sign } from '../utils'
@Component({
    name: 'Upload',
})
export default class Upload extends Vue {
    @Ref('upload') readonly upload
    fileData: any = {
        // 进度信息 100 为 100%
        progress: 0,
    }
    @Prop()
    abortList?: any
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
        return this.fileList.length >= +this.$attrs.limit
    }

    handlePictureCardPreview(file, ...args) {
        const initialIndex = this.fileList.findIndex(_ => _ === file)
        this[preview]({
            img: this.fileList,
            initialIndex,
        })
    }
    handleRemove(file, fileList) {
        const { url, response, uid } = file
        !url && !response && this.abortList[uid] && this.abortList[uid].cancel()
        this.fileList = fileList
    }
    handleError(err, file, fileList) {
        console.log(err)
        const { name: filename} = file
        this.$message.error(`${filename}上传失败`)
    }
    onSuccess(res, file, fileList) {
        res && this.change(res.code === 0 ? [{ url: res.bodyMessage }] : fileList)
        this.$delete(this.abortList, file.uid)
    }
    onProgress(event) {
        const num = event.percent
        this.fileData.progress = +num.toFixed(2)
        return +num.toFixed(2)
    }
    onExceed(files, fileList) {
        const { limit = 1 } = this.$attrs
        const filesCopy = Array.prototype.slice.call(files, 0)
        const len2 = fileList.length
        const capacity = (limit as number) - len2
        const cando = filesCopy.splice(0, capacity)
        if (!cando.length) {
            this.$message.error(`文件数量已满${limit}个`)
            return
        } else {
            // 上传cando
            cando.forEach(_ => this.upload.$refs['upload-inner'].upload(_))
        }
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
