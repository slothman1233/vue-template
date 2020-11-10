<template>
    <div id="safeguardAdminExposeDetail">
        <el-divider content-position="left">基本信息</el-divider>
        <section class="base-info-box">
            <p>
                语言类型：<el-tag>{{ tempData.language | langStatusToText }}</el-tag>
            </p>
            <p>
                产品来源：<el-tag>{{ tempData.productTypeText }}</el-tag>
            </p>
            <p>
                投诉单号：<el-tag>{{ tempData.autoId }}</el-tag>
            </p>
            <p>
                提交时间：<el-tag>{{ tempData.createTime | timeFormat }}</el-tag>
            </p>
        </section>
        <el-divider content-position="left">用户信息</el-divider>
        <section class="user-info-box">
            <el-input placeholder="请输入用户名" v-model="tempData.userNickName" readonly>
                <p class="inp-pre" slot="prepend">提交用户：</p>
                <template slot="append">(ID：{{ tempData.userId }})</template> </el-input
            ><el-input
                placeholder="请输入手机号"
                type="number"
                v-model.trim.number="tempData.userMobile"
                maxlength="11"
            >
                <p class="inp-pre" slot="prepend"><span>*</span>手机号：</p> </el-input
            ><el-input placeholder="请输入所在地" v-model="tempData.location">
                <p class="inp-pre" slot="prepend">所在地：</p> </el-input
            ><el-input placeholder="请输入汇聊号" v-model="tempData.userFxCode">
                <p class="inp-pre" slot="prepend">汇聊号：</p>
            </el-input>
            <el-input placeholder="请输入QQ" v-model="tempData.userQQ">
                <p class="inp-pre" slot="prepend">QQ：</p>
            </el-input>
            <el-input placeholder="请输入邮箱" v-model="tempData.userEmail">
                <p class="inp-pre" slot="prepend">邮箱：</p>
            </el-input>
            <el-input placeholder="请输入真实姓名" v-model="tempData.userCallName">
                <p class="inp-pre" slot="prepend"><span>*</span>真实姓名：</p>
            </el-input>
            <el-input placeholder="请输入身份证号" v-model="tempData.userIdCard">
                <p class="inp-pre" slot="prepend">身份证号：</p>
            </el-input>
            <el-input placeholder="请输入资金存放地" v-model="tempData.cashDeposit">
                <p class="inp-pre" slot="prepend">资金存放地：</p>
            </el-input>
        </section>
        <el-divider content-position="left">曝光信息</el-divider>
        <el-form :model="tempData" :rules="rules" ref="form" label-width="120px">
            <el-form-item label="平台名称" prop="entId" ref="entId">
                <EveSselect
                    filterable
                    v-model="tempData.entId"
                    placeholder="平台名称"
                    :options="platforms"
                ></EveSselect>
            </el-form-item>
            <el-form-item label="曝光标题" prop="title" ref="title">
                <el-input
                    v-model="tempData.title"
                    autocomplete="off"
                    minlength="5"
                    maxlength="49"
                ></el-input>
            </el-form-item>
            <el-form-item label="关键字" prop="keywords" ref="keywords">
                <el-input v-model="tempData.keywords" autocomplete="off"></el-input>
                <div class="form-item-tip">
                    （多关键字使用英文逗号隔开，如：Example,示例）
                </div>
            </el-form-item>
            <el-form-item label="曝光摘要" prop="summary" ref="summary">
                <el-input
                    v-model="tempData.summary"
                    autocomplete="off"
                    maxlength="200"
                    type="textarea"
                    :rows="3"
                ></el-input>
            </el-form-item>
            <el-form-item label="曝光内容" prop="content" ref="content">
                <EveTinymce
                    ref="editor"
                    v-model="tempData.content"
                    height="400px"
                    :toolbar="tinyMceToolbar"
                    :menubar="tinyMceMenubar"
                    :editorImageBaseParams="tinyMceImgConfig"
                    :uploadFn="tinyMceImgUpload"
                    :imgProps="tinyMceImgProps"
                ></EveTinymce>
            </el-form-item>
            <el-form-item label="曝光类型" prop="exposureType" ref="exposureType">
                <el-checkbox-group v-model="exposureTypes" :max="3">
                    <el-checkbox :label="_.key" v-for="_ in exposeTypes" :key="_.key">{{
                        _.value
                    }}</el-checkbox>
                </el-checkbox-group>
                <p class="form-item-tip">（限选3项）</p>
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
            <el-form-item label="台湾版显示" prop="twDisplay" ref="twDisplay">
                <el-radio-group v-model="tempData.twDisplay">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="浏览量" prop="virtualClickCount" ref="virtualClickCount">
                <div class="like-box">
                    <el-input
                        type="number"
                        v-model.number="tempData.clickCount"
                        disabled
                        autocomplete="off"
                        style="width:100px;"
                    ></el-input>
                    <span>+</span>
                    <el-input
                        type="number"
                        v-model.number="tempData.virtualClickCount"
                        autocomplete="off"
                        style="width:100px;"
                    ></el-input>
                </div>
            </el-form-item>
            <el-form-item label="设为热点" prop="isHots" ref="isHots">
                <el-radio-group v-model="tempData.isHots">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="曝光状态" prop="processState" ref="processState">
                <el-radio-group v-model="tempData.processState">
                    <el-radio :label="_.value" v-for="_ in statesList" :key="_.value">{{
                        _.label
                    }}</el-radio>
                </el-radio-group>
                <p class="form-item-tip strong">
                    (改变状态保存后，用户马上就会收到通知，请不要随意改变状态)
                </p>
            </el-form-item>
            <el-form-item
                label="不通过原因"
                prop="processStateRemark"
                ref="processStateRemark"
                v-if="tempData.processState === 5"
            >
                <el-input
                    v-model="tempData.processStateRemark"
                    maxlength="20"
                    placeholder="限20个字"
                ></el-input>
            </el-form-item>
            <el-form-item label="显示状态" prop="status" ref="status">
                <el-radio-group v-model="tempData.status">
                    <el-radio :label="1">显示</el-radio>
                    <el-radio :label="2">不显示</el-radio>
                    <el-radio :label="5">提交用户同城可见</el-radio>
                    <el-radio :label="4">提交用户自己可见</el-radio>
                    <!-- <el-radio :label="3">回收站</el-radio> -->
                </el-radio-group>
            </el-form-item>
            <el-form-item label="FX110备注" prop="remark">
                <el-input
                    v-model="tempData.remark"
                    autocomplete="off"
                    maxlength="25"
                    rows="4"
                    type="textarea"
                ></el-input>
            </el-form-item>
        </el-form>
    </div>
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
    getExposureProcessState,
    getExposureTypes,
    TypesModel,
    uploadSlice,
    uploadSliceSuccess,
    UPLOAD_VIDEO_SUBCODE,
} from '@/common/services/RemoteService'
import { CancelTokenSource } from 'axios'
import { commonChangeCheck, createAbort, fileSlice, getFileMD5, getPlatform, isPhone } from '@/utils'
import { langStatusToText, timeFormat } from '@/common/filters/statusToUI'
import { editExpose } from '@/common/services/ExposeService'
import { power } from '@/router'
import { scrollToTarget } from '@/utils'
import ExposeAndComplaintMixin from '@/common/mixins/exposeAndComplaint.mixin'
import {
    GetRemoteTypeInit,
    HasUploadImg,
    HasUploadVideoInSlice,
    TinyMce,
} from '@/common/mixins/tool.mixin'
import { LoadingD } from '@/common/decorators/preposition.fn.decorator'
@Component({
    name: 'ExposeDetail',
    filters: { langStatusToText, timeFormat },
})
export default class ExposeDetail extends Mixins(
    ExposeAndComplaintMixin,
    HasUploadImg,
    HasUploadVideoInSlice,
    GetRemoteTypeInit
) {
    statesList: any = []
    /*
    本来是ProvideReactive 实现
    存在BUG issue: https://github.com/kaorun343/vue-property-decorator/issues/277
    */
    platforms: SelectModel[] = []
    created() {
        this.allInit()
    }
    allInit() {
        this.initSomeRemoteType(getExposureTypes, 'exposeTypes').catch(e =>
            this.$message.error('获取曝光类型失败')
        )
        this.initSomeRemoteType(getExposureProcessState, 'rightsOfAppeal', false, false).catch(e =>
            this.$message.error('获取曝光进度失败')
        )
        const { entId, entName } = this.tempData
        this.initSomeRemoteType(getPlatform, 'platforms', false, entId, entName).catch(e =>
            this.$message.error('获取平台失败')
        )
    }
    @Ref('upload-video') uploadVideoRef
    exposeTypes: TypesModel = []
    exposureTypes = []
    @Watch('tempData.exposureType', { immediate: true })
    transformExposureType(val) {
        this.exposureTypes = val.map(_ => _.key)
    }
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

    get rules() {
        const rule = {
            ...this._getCommonRules('曝光'),
            twDisplay: [{ required: true, message: '请选择台湾版显示状态', trigger: 'blur' }],
            isHots: [{ required: true, message: '请选择是否热点', trigger: 'blur' }],
            processState: [{ required: true, message: '请选择曝光状态', trigger: 'blur' }],
            status: [{ required: true, message: '请选择显示状态', trigger: 'blur' }],
            virtualClickCount: [{ required: true, message: '请填写虚拟浏览量', trigger: 'blur' }],
            exposureType: [{ validator: commonChangeCheck.apply(this, ['exposureTypes', '请选择曝光类型']), trigger: 'blur' }],
        }
        if (this.tempData.processState === 5) {
            rule['processStateRemark'] = [
                { required: true, message: '请填写不通过原因', trigger: 'blur' },
                { max: 20, message: '限20个字', trigger: 'blur' },
            ]
        }
        return rule
    }
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

    @Ref() readonly form
    saveLoading = false

    @LoadingD('saveLoading', 'saveRequestNext')
    async saveRequest(){
        const params = {
            id: this.tempData.autoId,
            ...this.tempData,
            fileSet: {
                imageSet: this.imgs.map(_ => ({ url: _.url })),
                videoSet: this.videos.map(_ => ({ url: _.url, size: _.size })),
            },
            exposureType: this.exposureTypes.join(','),
            userMobile: '' + this.tempData.userMobile,
        }
        return await editExpose(params)
    }
    saveRequestNext(res){
        if (!res) {
            return
        }
        this.$message.success('操作成功')
        return true
    }
    async save() {
        if (this.tempData.userMobile === '' || !isPhone('' + this.tempData.userMobile)) {
            this.$message.error('请正确填写用户手机号')
            return
        }
        if (this.tempData.userCallName === '') {
            this.$message.error('用户姓名不能为空')
            return
        }
        if (Object.keys(this.abortList).length) {
            this.$message.warning('当前还有文件未上传完成，本次保存无效')
            return
        }
        const valid = await this.form.validate().catch(e => e)
        if (!valid) {
            this.form.validate(this.valiFnScroll)
            return
        }
        return await this.saveRequest()
    }

    @Watch('abortList')
    @Emit('changeTabDisable')
    listenAbort(val) {
        return !!Object.keys(val).length
    }
}
</script>

<style scoped lang="less">
#safeguardAdminExposeDetail {
    .inp-pre {
        span {
            color: red;
        }
    }
    .mini-inp {
        width: 100px;
    }
    .form-item-tip {
        color: #909399;
        font-size: 12px;
        &.strong {
            color: red;
        }
    }
    // 基本信息
    .base-info-box {
        display: grid;
        grid-template-columns: repeat(4, auto);
    }
    // 用户信息
    .user-info-box {
        display: grid;
        grid-template-rows: repeat(3, 40px);
        grid-template-columns: repeat(3, 350px);
        column-gap: 40px;
        /deep/ .el-input-group__prepend {
            box-sizing: border-box;
            width: 110px;
        }
    }
}
</style>
