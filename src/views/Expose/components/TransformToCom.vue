<template>
    <el-form
        :model="tempData"
        :rules="rules"
        ref="form"
        label-width="120px"
        id="safeguardAdminExposeToCom"
    >
        <el-form-item label="平台名称" prop="entId">
            <EveSselect
                filterable
                v-model="tempData.entId"
                placeholder="平台名称"
                :options="platforms"
            ></EveSselect>
        </el-form-item>
        <el-form-item label="投诉标题" prop="title" ref="title">
            <el-input
                v-model="tempData.title"
                autocomplete="off"
                minlength="5"
                maxlength="49"
            ></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords" ref="keywords">
            <el-input
                v-model="tempData.keywords"
                autocomplete="off"
                maxlength="25"
                class="mini-inp"
            ></el-input>
            <div class="form-item-tip">
                （多关键字使用英文逗号隔开，如：Example,示例）
            </div>
        </el-form-item>

        <el-form-item label="投诉内容" prop="content" ref="content">
            <EveTinymce
                ref="editor"
                v-model="tempData.content"
                height="400px"
                :toolbar="tinyMceToolbar"
                :menubar="tinyMceMenubar"
                :editorImageBaseParams="tinyMceImgConfig"
                :uploadFn="tinyMceImgUpload"
            ></EveTinymce>
        </el-form-item>
         <!-- <el-form-item label="证据图集">
                <Upload
                    ref="img-upload"
                    class="upload-item"
                    v-model="imgs"
                    :limit="20"
                    list-type="picture-card"
                    action="/upload/image"
                    multiple
                    :auto-upload="true"
                    :data="tinyMceImgConfig"
                    :http-request="uploadImage"
                    :before-upload="beforeUpload"
                    :abort-list="abortList"
                >
                    <p class="tip" slot="tip">
                        图片最多上传20张，单张大小不超过2M，支持jpg/png/gif
                    </p>
                </Upload>
            </el-form-item>

            <el-form-item label="视频">
                <UploadVideo
                    class="upload-item"
                    v-model="videos"
                    :limit="3"
                    :show-file-list="false"
                    multiple
                    action=""
                    :auto-upload="true"
                    :data="tinyMceVideoConfig"
                    :http-request="(...args) => uploadVideo(uploadVideoRef, ...args,videos)"
                    :before-upload="beforeUploadVideo"
                    :abort-list="abortList"
                    ref="upload-video"
                >
                    <div slot="tip">
                        <p class="tip">
                            视频最多上传3个，单个大小不超过200M
                        </p>
                    </div>
                </UploadVideo>
            </el-form-item> -->
    </el-form>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash'
import {
    Component,
    Emit,
    InjectReactive,
    Mixins,
    Prop,
    PropSync,
    Ref,
    Vue,
    Watch,
} from 'vue-property-decorator'
import {
    fileSliceInit,
    uploadSlice,
    uploadSliceSuccess,
    UPLOAD_VIDEO_SUBCODE,
} from '@/common/services/RemoteService'
import { addComplaint } from '@/common/services/ComplaintsService'
import { CancelTokenSource } from 'axios'
import { createAbort, fileSlice, getFileMD5, getPlatform } from '@/utils'
import ExposeAndComplaintMixin from '@/common/mixins/exposeAndComplaint.mixin'
import { GetRemoteTypeInit, HasUploadImg, HasUploadVideoInSlice, TinyMce } from '@/common/mixins/tool.mixin'
@Component({
    name: 'TransformToCom',
})
export default class TransformToCom extends  Mixins(
    ExposeAndComplaintMixin,
    HasUploadImg,
    HasUploadVideoInSlice,
    GetRemoteTypeInit
)  {
    created() {
        this.allInit()
    }
    allInit() {
        const { entId, entName } = this.tempData
        this.initSomeRemoteType(getPlatform, 'platforms', false, entId, entName).catch(e =>
            this.$message.error('获取平台失败')
        )
    }
    @Ref() readonly form: any
    /*
    本来是ProvideReactive 实现
    存在BUG issue: https://github.com/kaorun343/vue-property-decorator/issues/277
    */
    platforms: SelectModel[] = []
    @Ref('upload-video') uploadVideoRef
    maxImageSize = 2 * 1024 * 1024
    @PropSync('imgList', {
        default: () => [],
    })
    imgs!: any[]

    maxVideoSize = 200 * 1024 * 1024
    @PropSync('videoList', {
        default: () => [],
    })
    videos!: any[]
    // 临时数据
    @PropSync('temp', {
        default: () => {},
    })
    tempData!: any
    rules = this._getCommonRules('投诉')


    beforeUpload(file) {
        const { size } = file
        if (size > this.maxImageSize) {
            this.$message.error('图片大小不得超过2M')
            return false
        }
    }
    beforeUploadVideo(file) {
        const { size } = file
        if (size > this.maxVideoSize) {
            this.$message.error('视频大小不得超过200M')
            return false
        }
    }
    async save() {
        const valid = await this.form.validate().catch(e => e)
        if (!valid) {
            return
        }
        const params = {
            content: this.tempData.content,
            title: this.tempData.title,
            entName: this.tempData.entName,
            entId: this.tempData.entId,
            ip: this.tempData.ip,
            rightsOfAppeal: this.tempData.rightsOfAppeal
                ? this.tempData.rightsOfAppeal.join(',')
                : '',
            tradingAccount: this.tempData.tradingAccount,
            userId: this.tempData.userId,
            language: this.tempData.language,
            productType: this.tempData.productType,
        }
        const res = await addComplaint(params)
        if (!res) {
            return
        }
        this.$message.success('提交成功')
        return true
    }
    @Watch('abortList')
    @Emit('changeTabDisable')
    listenAbort(val) {
        return !!Object.keys(val).length
    }
}
</script>

<style scoped lang="less">
#safeguardAdminExposeToCom {
    .form-item-tip {
        color: #909399;
        font-size: 12px;
        &.strong {
            color: red;
        }
    }
}
</style>
