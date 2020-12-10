/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-11-03 20:08:36
 * @LastEditTime: 2020-11-03 20:47:30
 */
import { getPlatform, scrollToTarget } from '@/utils'
import { Component, Vue, Ref } from 'vue-property-decorator'
import UploadVideo from '@/components/UploadVideo.vue'
import { EveSselect } from '@stl/eve-vue2-lib'
import Upload from '@/components/Upload.vue'
import { LoadingD } from '../decorators/preposition.fn.decorator'
import OldImgs from '@/components/OldImgs.vue'

@Component({
    components: { EveSselect, Upload, UploadVideo, OldImgs },
})
export default class ExposeAndComplaintMixin extends Vue {
    [x: string]: any
    // 曝光以及投诉等 共用配置
    @Ref('editor') readonly editor: any
    _checkContent(rule, value, callback) {
        const imgLen = this.editor.getTinymce().dom.select('img').length
        const textLen = this.editor.getContent({ format: 'text' }).length
        const len = imgLen + textLen
        if (len < 10 || len > 10000) {
            callback(new Error('内容限制10-10000字'))
            return
        }
        callback()
    }
    _keywordsChange(rule, value, callback) {
        if (value === '') {
            callback(new Error('请填写SEO关键字'))
        } else {
            const keyArr = value.split(',')
            const res =
                keyArr.length > 5 ? new Error('最多5个关键字') : undefined
            callback(res)
        }
    }
    _getCommonRules(title: string) {
        return {
            entName: [
                { required: true, message: '请选择平台', trigger: 'blur' },
            ],
            title: [
                {
                    required: true,
                    message: `请填写${title}标题`,
                    trigger: 'blur',
                },
                { min: 5, max: 49, message: '字数限定5-49', trigger: 'blur' },
            ],
            keywords: [
                { required: true, message: '请填写SEO关键字', trigger: 'blur' },
                {
                    validator: this._keywordsChange,
                    trigger: 'blur',
                },
            ],
            summary: [
                {
                    required: true,
                    message: `请填写${title}摘要`,
                    trigger: 'blur',
                },
            ],
            content: [
                {
                    required: true,
                    message: `请填写${title}内容`,
                    trigger: 'blur',
                },
                {
                    validator: this._checkContent,
                    trigger: 'blur',
                },
            ],
        }
    }
    valiFnScroll(v, o) {
        // 验证时滑动到当前不通过项
        if (!v) {
            const keys = Object.keys(o)
            scrollToTarget.call(this, keys)
            return
        }
    }

    get oldDataImgs() {
        return this.tempData?.fileSet?.imageSet || []
    }
    set oldDataImgs(arr) {
        if (this.tempData?.fileSet) {
            this.tempData.fileSet.imageSet = arr
        } else {
            this.tempData.fileSet = {
                imageSet: arr,
                audioSet: [],
                videoSet: [],
            }
        }
    }
}
@Component
export class HasPlatforms extends Vue {
    // 维权三剑客共用平台配置
    created() {
        this.platformSearch()
    }
    /*
    本来是ProvideReactive 实现
    存在BUG issue: https://github.com/kaorun343/vue-property-decorator/issues/277
    */
    platforms: SelectModel[] = []
    platformLoading = false
    tempData?: any

    @LoadingD('platformLoading', 'platformSearchNext')
    async platformSearch(title?: string) {
        const { entId, entName } = this.tempData
        return await getPlatform(entId, entName, title)
    }

    platformSearchNext(platforms: any) {
        if (!platforms) {
            return
        }
        this.platforms = platforms.map(({ label, value }) => ({
            label,
            value: label,
            id: value,
        }))
    }
    entChange(name: string) {
        const hasEnt = this.platforms.find((_) => _.label === name)
        this.tempData.entId = hasEnt?.id ?? 0
    }
}

@Component
export class HasUserInfoDialog extends Vue {
    [x: string]: any
    // 维权三剑客在列表展现个人信息
    showUserInfoDialog = false
    nowShowUserId = 0
    showUserInfo(row, idx?: any) {
        this.nowShowUserId = row.userId
        this.showUserInfoDialog = true
    }
    userInfoDialogCommon() {
        return {
            props: {
                show: this.showUserInfoDialog,
                userId: this.nowShowUserId,
            },
            on: {
                'update:show': (val) => (this.showUserInfoDialog = val),
                edit: this.pageSomeEdit,
            },
            attrs: { 'destroy-on-close': true },
        }
    }
}
