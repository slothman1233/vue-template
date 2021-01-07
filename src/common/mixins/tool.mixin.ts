/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-28 09:51:53
 * @LastEditTime: 2020-11-03 19:52:10
 */
import {
    Component,
    Vue,
    Watch,
    PropSync,
    Prop,
    Mixins
} from 'vue-property-decorator'
import {
    createAbort,
    EventUtil,
    fileSlice,
    getFileMD5,
    imageReaderToBase64,
} from '@/utils'
import { CHANGE_NETWORK } from '@/store/mutation-types'
import { Mutation, State } from 'vuex-class'
import { cloneDeep } from 'lodash'
/**
 * @Description: 网络状态监听
 * @param {type}
 * @return:VueMixin
 * @LastEditors: Please set LastEditors
 * @LastEditTime: Do not edit
 */
@Component
export class NetWorkListener extends Vue {
    private static readonly ONLINE = 'online'
    private static readonly OFFLINE = 'offline'

    mounted() {
        this.listener()
    }
    @Mutation CHANGE_NETWORK

    listener() {
        EventUtil.addHandler(window, NetWorkListener.ONLINE, () =>
            this[CHANGE_NETWORK](NetWorkListener.ONLINE)
        )
        EventUtil.addHandler(window, NetWorkListener.OFFLINE, () =>
            this[CHANGE_NETWORK](NetWorkListener.OFFLINE)
        )
    }

    get networkMsgOpts() {
        return {
            type:
                this.network === NetWorkListener.ONLINE ? 'success' : 'warning',
            text:
                this.network === NetWorkListener.ONLINE
                    ? '网络已连接'
                    : '网络已断开',
        }
    }

    @State('networkStatus') network

    // 网络提示
    @Watch('network')
    networkMsg() {
        const { type, text } = this.networkMsgOpts
        this.$message[type](text)
    }
}

/**
 * @Description: 弹窗显示属性外置
 * @param {prop:String default:show}
 * @return: VueMixin
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export function dialogOutShow(prop = 'show'){
    const propName: unique symbol = Symbol(prop)
    @Component
    class DialogOutShow extends Vue {
        @PropSync(prop, {
            type: Boolean,
            default: false,
        })
        [propName]?: boolean
        // 表单预留字段
        readonly form: any
        get [`v_${prop}`]() {
            return this[prop]
        }
        set [`v_${prop}`](val) {
            this.$emit(`update:${prop}`, val)
        }

        beforeClose(done) {
            if (this.form && this.form.clearValidate) {
                this.form.clearValidate()
            }
            this.resetDialogData()
            done()
        }
        closeSelf(flag: any) {
            this[`v_${prop}`] = false
            if (flag === 'update') {
                this.$emit('update')
            } else {
                this.resetDialogData()
            }
        }

        resetDialogData() {
            console.log('可重写resetDialogData方法')
        }
    }
    return DialogOutShow
}

// 需要数据备份的弹窗
export function dialogBackup(dataName, prop = 'v_show') {
    @Component
    class DialogBackup extends Vue {
        // 备份数据
        backupTemp = null
        @Watch(prop)
        backupDialogData(val) {
            if (!val) {
                return
            }
            this.backupTemp = cloneDeep(this[dataName])
        }
        @Prop()
        mode!: string
        // 将存储的数据返回
        resetDialogData() {
            if (this.mode !== 'add') {
                this.$emit('dialog-cancel', cloneDeep(this.backupTemp))
            }
            this.backupTemp = null
        }
    }
    return DialogBackup
}
import { EveTinymce } from '@stl/eve-vue2-lib'
import { toolbar, menubar } from '@/common/config/tinymce.config'
import { imageConfig, videoConfig } from '@/common/config/upload.config'
import {
    fileSliceInit,
    imgUpload,
    uploadSlice,
    uploadSliceSuccess,
} from '../services/RemoteService'
@Component({
    components: { EveTinymce },
})
export class TinyMce extends Vue {
    /* 编辑器插件配置 顺带图片上传基本参数 以及视频基本参数 */
    readonly tinyMceToolbar = toolbar
    readonly tinyMceMenubar = menubar
    readonly tinyMceImgConfig = imageConfig
    readonly tinyMceVideoConfig = videoConfig
    readonly tinyMceContentStyle =
        'img{display:block;margin:32px auto 40px;max-width:75%;}'
    tinyMceImgUpload = imgUpload
    // 图片突破最大的爆点单位 和 大小限制
    tinyMceImgProps = { sizeName: '2M', maxSize: 2 * 1024 * 1024 }
}

// 包含可阻断的请求列表 配合上传图片和视频使用
@Component
export class HasAbortList extends Vue {
    abortList = {}
    setAbortList(uid) {
        this.$set(this.abortList, uid, createAbort())
    }
}

// 包含上传图片的功能处理
@Component
export class HasUploadImg extends Mixins(HasAbortList, TinyMce) {
    async uploadImage(options) {
        const { file, data, onSuccess, onError, onProgress } = options
        const { uid } = file
        this.setAbortList(uid)
        const res: any = await imageReaderToBase64(file, data, (params) =>
            this.tinyMceImgUpload(
                params,
                (event) =>
                    onProgress({ percent: (event.loaded / event.total) * 100 }),
                this.abortList[uid]
            )
        ).catch((e) => {
            onError(e)
        })
        res && onSuccess(res, file)
    }
}
import SparkMD5 from 'spark-md5'
// 包含视频分片上传的处理
@Component
export class HasUploadVideoInSlice extends Mixins(HasAbortList, TinyMce) {
    async readVideo(ref, file) {
        const { uid } = file
        this.setAbortList(uid)
        ref.progressMsg(uid, 0, '正在读取文件')
        // 开始切片
        const chunks = fileSlice(file)
        // 切片完成 读取文件MD5
        const MD5 = await getFileMD5(chunks)
        return { chunks, MD5 }
    }
    async uploadVideoInit(ref, file, data) {
        const { uid } = file
        const { chunks, MD5 } = await this.readVideo(ref, file)
        ref.progressMsg(uid, 0, '读取文件完成, 正在初始化')
        const params = Object.assign({}, data, { MD5 })
        // 准备初始化
        return {
            res: await fileSliceInit(params, this.abortList[uid]),
            chunks,
        }
    }
    uploadVideoInitError(ref, file, onError) {
        const { uid, name } = file
        // 初始化失败
        ref.progressMsg(uid, 0, '文件初始化失败', 0)
        onError()
    }
    async uploadVideo(ref, options, videoList: any[]) {
        const { file, data, onSuccess, onError } = options
        const { name: filename, uid } = file
        if (!file) {
            onError()
            this.$delete(this.abortList, uid)
            return
        }
        const { res: initRes, chunks } = await this.uploadVideoInit(
            ref,
            file,
            data
        )
        if (!initRes) {
            // 初始化失败
            this.uploadVideoInitError(ref, file, onError)
            this.$delete(this.abortList, uid)
            return
        } else {
            // 初始化完成
            ref.progressMsg(uid, 0, '文件初始化成功,开始上传')
            const id = initRes.bodyMessage.id
            const all = []
            // 开始递归切片上传
            await this.videoSliceLoop(ref, uid, chunks, id, filename, all)
            this.videoSliceCheck(all)
                ? this.uploadVideoSuccess(ref, id, file, onSuccess, videoList)
                : onError('上传失败')
        }
    }
    async uploadVideoSuccess(ref, id, file, onSuccess, videoList: any[]) {
        const { uid, name } = file
        // 递归上传完成 所有code为0 调用成功接口 并注入地址
        const res = await uploadSliceSuccess(id, this.abortList[uid])
        ref.progressMsg(uid, 100, '上传成功', 1)
        res && onSuccess(res, file, videoList)
        this.$delete(this.abortList, uid)
    }
    async videoSliceLoop(
        ref,
        uid: number,
        chunks: Blob[],
        id: string,
        filename: string,
        resArr: any[],
        idx: number = 0
    ) {
        if (idx >= chunks.length) {
            return
        }
        const abort = this.abortList[uid]
        const next = idx + 1
        const res = await uploadSlice(
            {
                file: chunks[idx],
                id,
                index: next,
                filename,
            },
            abort
        )
        // const fileReader = new FileReader()
        // fileReader.readAsBinaryString(chunks[idx])
        // ;((MD5, res) => {
        //     fileReader.onload = (e) => {
        //         MD5.appendBinary(e.target?.result)
        //         console.log(333, res, MD5.end())
        //     }
        // })(new SparkMD5(), res)
        const pass = res && +res.code === 0 && /00$/.test(res.subCode)
        resArr.push(pass)
        const progress = Math.floor((next / chunks.length) * 100)
        if (pass) {
            ref.progressMsg(uid, progress, '正在努力上传...')
            await this.videoSliceLoop(
                ref,
                uid,
                chunks,
                id,
                filename,
                resArr,
                next
            )
        } else {
            // 本条切片上传失败
            ref.progressMsg(uid, progress, '上传失败', 0)
        }
    }
    // 检查是否每个都成功
    videoSliceCheck(resArr: any[]) {
        return resArr.every((_) => _)
    }
}

// 获取远程数据来初始化下拉的部分
@Component
export class GetRemoteTypeInit extends Vue {
    async initSomeRemoteType(
        getFn: Function,
        key: string,
        isSel: boolean = false,
        ...args
    ) {
        const res = await getFn(...args)
        if (!res) {
            throw new Error('获取远程数据失败')
        }
        const data = res.bodyMessage || res
        this[key] = isSel
            ? data.map((_) => ({ label: _.value, value: +_.key }))
            : data
    }
}
