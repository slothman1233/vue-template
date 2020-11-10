/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-11-03 20:08:36
 * @LastEditTime: 2020-11-03 20:47:30
 */
import { scrollToTarget } from '@/utils'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { TinyMce } from './tool.mixin'
import UploadVideo from '@/components/UploadVideo.vue'
import { EveSselect } from '@stl/eve-vue2-lib'
import Upload from '@/components/Upload.vue'
@Component({
    components: { EveSselect, Upload, UploadVideo },
})
export default class ExposeAndComplaintMixin extends Vue {
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
            const res = keyArr.length > 5 ? new Error('最多5个关键字') : undefined
            callback(res)
        }
    }
    _getCommonRules(title: string) {
        return {
            entId: [{ required: true, message: '请选择平台', trigger: 'blur' }],
            title: [
                { required: true, message: `请填写${title}标题`, trigger: 'blur' },
                { min: 5, max: 49, message: '字数限定5-49', trigger: 'blur' },
            ],
            keywords: [
                { required: true, message: '请填写SEO关键字', trigger: 'blur' },
                {
                    validator: this._keywordsChange,
                    trigger: 'blur',
                },
            ],
            summary: [{ required: true, message: `请填写${title}摘要`, trigger: 'blur' }],
            content: [
                { required: true, message: `请填写${title}内容`, trigger: 'blur' },
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
}
