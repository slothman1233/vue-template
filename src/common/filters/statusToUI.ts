/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-08-18 11:05:55
 * @LastEditTime: 2020-11-10 08:58:59
 */
import moment from 'moment'
import {
    CommentDisplayText,
    CommentDisplayType,
    CommentStatusText,
    CommentStatusType,
} from '../type/CommentData'
import { BaseDataDisplayStatus, BaseDataDisplayStatusText } from '../type/RemoteData'

// 通用模板
export function createSimpleFilter(val: any, compare: any, resArr: Array<any>) {
    let truly = true
    if (Array.isArray(compare)) {
        truly = compare.includes(val)
    } else {
        truly = val === compare
    }
    return truly ? resArr[0] : resArr[1]
}

const QS_STATUS_TEXTS = new Map([
    [0, '不限'],
    [1, '待回答'],
    [2, '回答中'],
    [3, '已回答'],
    [4, '已关闭'],
])
// 提问状态
export function qsStatusToText(status) {
    return QS_STATUS_TEXTS.get(status)
}
const QS_SHOW_STATUS_TEXTS = new Map([
    [0, '不限'],
    [1, '显示'],
    [2, '不显示'],
    [3, '回收站'],
    [4, '违规'],
])
// 提问显示状态
export function qsShowStatusToText(status) {
    return QS_SHOW_STATUS_TEXTS.get(status)
}
const LANG_STATUS_TEXTS = new Map([
    [0, '不限'],
    [1, '简体'],
    [2, '繁体'],
])
// 提问显示状态
export function langStatusToText(status) {
    return LANG_STATUS_TEXTS.get(status)
}
const PRODUCT_STATUS_TEXTS = new Map([
    [0, '不限'],
    [2, 'fx110'],
    [17, 'fx110繁体'],
    [10, '汇查查'],
])
// 提问显示状态
export function productStatusToText(status) {
    return PRODUCT_STATUS_TEXTS.get(status)
}
// 评论审核状态
const COMMENT_STATUS_TEXTS = new Map<CommentStatusType, CommentStatusText>([
    [CommentStatusType.Wait, CommentStatusText.Wait],
    [CommentStatusType.Pass, CommentStatusText.Pass],
    [CommentStatusType.Obsolete, CommentStatusText.Obsolete],
    [CommentStatusType.Recycle, CommentStatusText.Recycle],
])
export function commentStatusToText(status: CommentStatusType) {
    return COMMENT_STATUS_TEXTS.get(status)
}
// 评论显示状态
const COMMENT_DISPLAY_TEXTS = new Map<CommentDisplayType, CommentDisplayText>([
    [CommentDisplayType.Show, CommentDisplayText.Show],
    [CommentDisplayType.Hide, CommentDisplayText.Hide],
    [CommentDisplayType.Violate, CommentDisplayText.Violate],
])
export function commentDisplayToText(display: CommentDisplayType) {
    return COMMENT_DISPLAY_TEXTS.get(display)
}
// 评论不通过原因
export const COMMENT_AUDIT_TEXTS = new Map<number, string>([
    [1, '评论与主题无关'],
    [2, '评论恶意诽谤他人'],
    [3, '评论中有广告'],
    [4, '评论中有非法词汇'],
    [5, '恶意评论'],
    [6, '评论重复'],
    [7, '请提供证据支撑']
])
// 基础显示文字
const BASE_DISPLAY_TEXTS = new Map<BaseDataDisplayStatus, BaseDataDisplayStatusText>([
    [BaseDataDisplayStatus.All, BaseDataDisplayStatusText.All],
    [BaseDataDisplayStatus.Show, BaseDataDisplayStatusText.Show],
    [BaseDataDisplayStatus.Hide, BaseDataDisplayStatusText.Hide],
    [BaseDataDisplayStatus.Recycle, BaseDataDisplayStatusText.Recycle],
    [BaseDataDisplayStatus.OnlyUser, BaseDataDisplayStatusText.OnlyUser],
    [BaseDataDisplayStatus.OnlyCity, BaseDataDisplayStatusText.OnlyCity],
])
export function baseDisplayStatusToText(status:BaseDataDisplayStatus){
    return BASE_DISPLAY_TEXTS.get(status)
}
// 时间格式
export function timeFormat(value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
}
