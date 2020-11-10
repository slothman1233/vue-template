<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-09-03 15:57:43
 * @LastEditTime: 2020-11-05 19:44:57
-->
<template>
    <div>
        <el-upload
            :class="{ hide: hideUpload }"
            :file-list="fileList"
            :on-remove="handleRemove"
            :on-error="handleError"
            :on-success="onSuccess"
            :headers="signHeaders"
            :on-change="onChange"
            accept="video/*"
            v-bind="$attrs"
            v-on="$listeners"
            ref="video-upload-ref"
            v-if="!hideUpload"
        >
            <div class="upload-slot-box">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text"><em>点击上传</em></div>
            </div>
            <slot name="tip" slot="tip">
                <div class="el-upload__tip" slot="tip">只能上传视频文件，且不超过1G</div>
            </slot>
        </el-upload>
        <div class="video-list" v-if="fileList.length">
            <div class="video-box" v-for="(_, idx) in fileList" :key="_.name">
                <video
                    class="video"
                    v-if="_.url || _.response"
                    :src="_.url || _.response"
                    controls="controls"
                    @click.stop
                    @canplaythrough="canplay"
                >
                    请升级浏览器
                </video>
                <div class="progress-box" v-else-if="progressList[_.uid]">
                    <el-progress type="circle" :percentage="progressList[_.uid].num"></el-progress>
                    <div>
                        <p>{{ _.name }}</p>
                        <p>{{ progressList[_.uid].msg }}</p>
                    </div>
                </div>
                <i class="el-icon-circle-close" @click.stop="del(_, idx)"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit, Ref, Prop } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import { sign } from '../utils'
interface Progress {
    [uid: number]: {
        num: number
        msg?: string
    }
}
@Component({
    name: 'UploadVideo',
})
export default class UploadVideo extends Vue {
    @Ref('video-upload-ref') readonly upload

    onChange(file, uploadList) {
        this.$set(this.progressList, file.uid, this.progressList[file.uid] || { num: 0 })
        this.fileList = uploadList
    }
    @Emit('videoCanPlay')
    canplay(ele){
        return ele.target
    }

    // 进度信息表
    progressList: Progress = {}

    @Model('change', {
        type: Array,
    })
    value!: Array<any>

    @Emit('change')
    change(e: any) {
        return e
    }
    @Prop()
    abortList?: any
    get fileList() {
        return cloneDeep(this.value)
    }
    set fileList(val) {
        this.change(val)
    }
    get hideUpload() {
        return this.fileList.length >= +this.$attrs.limit
    }
    async del(file, idx) {
        const { name, url, response, uid } = file
        const confirm = await this.$confirm(`确定删除视频${name || ''}吗？`).catch(e => e)
        if (confirm === 'cancel') {
            return this.fileList
        }
        if (!url && !response) {
            this.abortList[uid] && this.abortList[uid].cancel()
            // 发送事件通知 取消本视频的上传
            this.$delete(this.progressList, uid)
            this.$delete(this.abortList, uid)
        }
        this.fileList = this.delCom(file, idx, this.fileList)
    }
    delCom(file, idx, fileList) {
        const list = fileList
        const index = fileList.findIndex(_ => _ === file)
        list.splice(index, 1)
        return list
    }
    // status 0 失败 1成功
    progressMsg(uid, num, msg?: string, status?: number) {
        // 外部通知使用
        if (!this.progressList[uid]) {
            return
        }
        this.$set(this.progressList, uid, { num, msg })
    }

    handleRemove(file, fileList) {
        this.fileList = fileList
    }
    handleError(err, file, fileList) {
        console.log(err)
        this.$message.error('上传失败')
    }
    onSuccess(res, file, fileList) {
        if (res && +res.code === 0) {
            this.$set(file, 'url', res.bodyMessage)
            this.change([...fileList, file])
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
.video-list {
    display: grid;
    grid-template-columns: repeat(3, 348px);
    grid-gap: 20px;
}
.video-box,
.video {
    width: 348px;
    height: 172px;
}
.video-box {
    position: relative;
    .el-icon-circle-close {
        font-size: 18px;
        position: absolute;
        right: -8px;
        top: -8px;
        color: red;
        &:hover {
            transform: scale(1.2, 1.2);
            cursor: pointer;
        }
    }
    .progress-box {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        background: rgba(0, 0, 0, 0.7);
        .flex(center, center);
        border-radius: 6px;
        color:#fff;
    }
}
.upload-slot-box {
    width: 340px;
    height: 168px;
    .flex(center, center);
    flex-wrap: wrap;
    border: 1px dashed #ccc;
    flex-direction: column;
    border-radius: 6px;
    .el-icon-upload {
        font-size: 60px;
        display: block;
        width: 100%;
    }
    &:hover {
        color: #409eff;
    }
}
</style>
