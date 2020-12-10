/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-28 09:52:54
 * @LastEditTime: 2020-11-10 17:09:36
 */
import md5 from 'blueimp-md5'
import SparkMD5 from 'spark-md5'
import { cloneDeep } from 'lodash'
import axios from 'axios'
import { getNameDictByType } from '@/common/services/RemoteService'
import XLSX from 'xlsx'
import { power } from '@/router'
import EMOJI_CONFIG from '@/common/config/emoji.config'

/*
事件侦听兼容IE
*/
export const EventUtil = {
    addHandler: function (element, type, handler, pop = false) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, pop)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler, pop)
        } else {
            element['on' + type] = handler
        }
    },
    removeHandler: function (element, type, handler, pop = false) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, pop)
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler, pop)
        } else {
            element['on' + type] = null
        }
    },
}

/**
 * 身份证，手机号码加*号处理
 */
export function starParse(str, isPhone) {
    if (!str) {
        return str
    }
    const length = str.length
    if (isPhone) {
        if (length >= 11) {
            const reg = /(\d{3})\d*(\d{4})/
            return str.replace(reg, '$1****$2')
        } else {
            let startlength = 0
            if (str.length % 2 === 0) {
                startlength = (length - 4) / 2
                return (
                    str.substr(0, startlength) +
                    '****' +
                    str.substr(-startlength)
                )
            } else {
                startlength = (length - 4) / 2
                return (
                    str.substr(0, startlength) +
                    '*****' +
                    str.substr(-startlength)
                )
            }
        }
    } else {
        if (length >= 18) {
            const startlength = (length - 6) / 2
            return (
                str.substr(0, startlength) + '******' + str.substr(-startlength)
            )
        } else {
            let startlength = 0
            {
                if (str.length % 2 === 0) {
                    startlength = (length - 4) / 2
                    return (
                        str.substr(0, startlength) +
                        '****' +
                        str.substr(-startlength)
                    )
                } else {
                    startlength = (length - 4) / 2
                    return (
                        str.substr(0, startlength) +
                        '*****' +
                        str.substr(-startlength)
                    )
                }
            }
        }
    }
}

// 设定数字校验区间
export const checkNumberRange = (min, max) => {
    return (rule, value, callback) => {
        if (!value) {
            return callback()
        }
        if (!Number.isInteger(value)) {
            return callback(new Error('请输入数字值'))
        } else {
            if (value < min || value > max) {
                return callback(new Error(`取值在${min}-${max}之间`))
            }
            callback()
        }
    }
}

// 时间快捷选项
export const pickerOptions: any = () => ({
    shortcuts: [
        {
            text: '最近一周',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
            },
        },
        {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
            },
        },
        {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
            },
        },
    ],
})

/* 检测是否有键 */
export function hasKey(target, propName: string) {
    return Object.prototype.hasOwnProperty.call(target, propName)
}

/* 1-0 true-false转换数字 */
export function t1t0(target: 1 | 0 | boolean): 1 | 0 {
    let temp = +target
    return (temp ^= 1) as 1 | 0
}

/* 阻止未完成点击 */
export function stopUnsuccessful(fn: Function, msgFn: Function) {
    let successful = false
    return (...args) => {
        if (successful) {
            msgFn()
            return
        }
        successful = true
        fn(...args).finally(() => (successful = false))
    }
}

/*
判断数据类型
*/

export const isType = (type: string) => (target: any) =>
    `[object ${type}]` === Object.prototype.toString.call(target)

const accessKey = '8860286533AB22E05C0BADC7C6CF5DD9'
const secretKey = 'E11A1F717ADF7445D5C4EDC7A6034355'

export function sign(params: any) {
    let str = ''
    if (Array.isArray(params)) {
        str = `${JSON.stringify(params)}`
    } else {
        const sortArr = paramsASCIISort(params)
        sortArr.forEach((key) => {
            const val = cloneDeep(params[key])
            if (typeof val === 'object') {
                str += `${key}${JSON.stringify(val)}`
            } else {
                str += `${key}${checkEmpty(val) ? `${val}` : ''}`
            }
        })
    }
    const timestamp = new Date().getTime().toString().slice(0, -3)
    const nonce = Math.round(Math.random() * 1000)
    const res = {
        sign: md5(`${accessKey}${str || ''}${timestamp}${nonce}${secretKey}`),
        timestamp,
        nonce,
        accessKey,
    }
    return res
}

// 参数字典码排序
export function paramsASCIISort(params: any): string[] {
    if (!params) {
        return []
    }
    const arr = Object.keys(params)
    // arr.sort((a, b) => {
    //   if (isNumber(+a) && isNumber(+b)) {
    //     /*
    //     解决原始排序 1,200,40,5只看首位的问题
    //     */
    //     return +a - +b
    //   } else {
    //     /*
    //     当排序非 ASCII 字符的字符串（
    //     如包含类似 e, é, è, a, ä 等字符的字符串）。
    //     一些非英语语言的字符串需要使用 String.localeCompare。
    //     这个函数可以将函数排序到正确的顺序。
    //     localeCompare() 方法返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。
    //     */
    //     return a.localeCompare(b)
    //   }
    // })
    arr.sort()
    return arr
}

export function checkEmpty(val) {
    return val !== '' && val !== undefined && val !== null
}

export function fileSlice(file: File, piece = 1024 * 1024 * 5) {
    if (!file) {
        return []
    }
    const { size } = file // 文件总大小
    let start = 0 // 每次上传的开始字节
    let end = start + piece // 每次上传的结尾字节
    const chunks: Blob[] = []
    while (start < size) {
        chunks.push(file.slice(start, end))
        start = end
        end = start + piece
    }
    // 本地合并文件流demo
    // const url = URL.createObjectURL(new Blob(chunks, {type: 'video/mp4'}))
    // console.log(3333, url)
    // createDownload(url, '测试.mp4')
    return chunks
}

export function getFileMD5(chunks: Blob[]) {
    const MD5 = new SparkMD5()
    const readers = chunks.map(async (_) => {
        const fileReader = new FileReader()
        fileReader.readAsBinaryString(_)
        return new Promise((res, rej) => {
            fileReader.onload = (e) => {
                res(e.target?.result)
            }
        })
    })
    return Promise.all(readers)
        .then((resArr) => resArr.forEach((_) => MD5.appendBinary(_)))
        .then(() => MD5.end())
}
// 创建一个可取消的请求凭证
export function createAbort() {
    return axios.CancelToken.source()
}
// 获取平台列表
export async function getPlatform(
    entId?: number,
    entName?: string,
    keywords?: string
) {
    // 获取平台
    const res = await getNameDictByType({
        entType: 0,
        tempType: -1,
        status: 1,
        pageIndex: 1,
        pageSize: 300,
        keywords,
    })
    if (!res || !res.bodyMessage) {
        return false
    }
    const platforms: SelectModel[] = res.bodyMessage.items.map(
        ({ name, entId: id }: any) => ({
            label: name,
            value: +id,
        })
    )
    if (entId === 0) {
        platforms.push({
            label: entName || '自定义平台',
            value: 0,
        })
    }
    return platforms
}

// 解析xlsx
export function file2Xce(file) {
    return new Promise<any[]>(function (resolve, reject) {
        const reader = new FileReader()
        reader.onload = function (e: any) {
            const data = e.target.result
            const wb = XLSX.read(data, {
                type: 'binary',
            })
            const result: any = []
            wb.SheetNames.forEach((sheetName) => {
                result.push({
                    sheetName: sheetName,
                    sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName]),
                })
            })
            resolve(result)
        }
        reader.readAsBinaryString(file.raw)
    })
}

// 滚动到对应错误 请绑定this
export function scrollToTarget(this: any, keys) {
    if (keys.length) {
        let dom = (this as any).$refs[keys[0]]
        if (Object.prototype.toString.call(dom) !== '[object Object]') {
            //这里是针对遍历的情况（多个输入框），取值为数组
            dom = dom[0]
        }
        (dom as any).$el.scrollIntoView({
            //滚动到指定节点
            block: 'center', //值有start,center,end，nearest，当前显示在视图区域中间
            behavior: 'smooth', //值有auto、instant,smooth，缓动动画（当前是慢速的）
        })
    }
}

// 注入处理人信息
export const injectionAdminInfo = <T>(data: T, other?: any) => {
    const res: T = Object.assign(
        {},
        data,
        {
            adminId: (power?.userInfo as any)?.id || 0,
            adminName: (power?.userInfo as any)?.realName || '',
        },
        other
    )
    return res
}

// 正则集合
const REG_MAP = new Map<string, RegExp>([
    ['phone', /^1[3-9]\d{9}$/],
    ['email', /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/],
])
export const isPhone = (phone: string) => REG_MAP.get('phone')!.test(phone)
export const isEmail = (email: string) => REG_MAP.get('email')!.test(email)
// 创建下载
export const createDownload = (href, name) => {
    const downloadElement = document.createElement('a')
    downloadElement.href = href
    downloadElement.download = name //下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() //点击下载
    document.body.removeChild(downloadElement) //下载完成移除元素
}
// 图片上传文件读取base64
export const imageReaderToBase64 = (
    file: File,
    data: any,
    uploadFn: Function
) => {
    const fileReader: FileReader = new FileReader()
    return new Promise((resolve, reject) => {
        if (!file) {
            reject()
            return
        }
        fileReader.readAsDataURL(file)
        fileReader.onload = async () => {
            const base64Str = fileReader.result
            const params = Object.assign({}, data, {
                Base64: (base64Str as string).replace(
                    `data:${file.type};base64,`,
                    ''
                ),
            })
            const res = await uploadFn(params)
            if (!res) {
                reject()
                return
            }
            resolve(res.bodyMessage)
        }
    })
}
/**
 * @description: rules中的公共只鉴定该多选是否有值的闭包
 * @param {any} this
 * @param {string} key 鉴定的数组键名
 * @param {string} tip 不通过时的提示语句
 * @return {ElementUI-validation-function} 用于element-ui表单验证的检查函数
 * @author: EveChee
 */
export const commonChangeCheck = function (
    this: any,
    key: string,
    tip?: string
) {
    return (rule, value, callback) => {
        callback(!this[key].length ? new Error(tip) : undefined)
    }
}

// 发送微前端模式本应用菜单
const APP_NAME = require('../../package.json').name
export function sendSelfMenu(this: any) {
    const { eventBus } = this.$root as any
    if (!eventBus) {
        return
    }
    eventBus.dispatch('menuEvent', {
        name: APP_NAME,
        routes: power.matchRoutes,
    })
}
// 遍历生成枚举的下拉选项
export function createEnumOptions(
    TypeEnum: any,
    TypeTextEnum: any,
    filter?: string[]
): SelectModel[] {
    const enumArr: any = Object.keys(TypeEnum)
    let fragment = enumArr.slice(enumArr.length / 2)
    if (filter && filter.length) {
        fragment = fragment.filter((_) => !filter.includes(_))
    }
    return fragment.map((key) => ({
        label: TypeTextEnum[key],
        value: TypeEnum[key],
    }))
}

// 替换含有内部表情的标签为图片展示
export function convertEmojisIntoImgs(content: string) {
    return content.replace(/\[.*?\]/g, (tag) => {
        const matched = EMOJI_CONFIG[tag]
        return matched ? `<img src="${matched?.Url}"/>` : tag
    })
}
