/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-11-10 09:00:31
 * @LastEditTime: 2020-11-10 09:02:52
 */
import { injectionAdminInfo } from '@/utils'
import http from '@/utils/http'
import { ExposureModel } from '../type/ExposeData'

// 曝光列表查询——分页
export const getExposeListForPage = (params?: ExposeListPageParams) => {
    return http.get<BaseListData<ExposureModel>>('/api/Exposure/GetPage', { params })
}

export interface ExposeListPageParams extends BasePageParams, BaseSearchParams, BaseAdminInfo {
    // 来源
    source: number
    // 产品类型
    productType: numOrStr
    // 语言
    language: BaseLang
    // 显示状态
    status?: number
    // 繁体显示
    // twDisplay: number
    // 曝光处理状态
    processState?: numOrStr
    // 平台是否回复
    // entReply:number
    // 热门
    isHots?: number
    // 是否补充材料
    isSupplement?:number
    // 交易商显示
    isEntShow: number
    // 是否录入交易商
    hasEntId: number
    // 用户是否回复
    userReply: number
    // 运营是否回复
    isReplyTemp: number
    // 排序
    orderByMode: number
    // 关联标签
    tagIds?: string
    // 开始时间
    beginTime?: string
    // 结束时间
    endTime?: string
}
// 获取曝光详情
export const getExposeDetail = (id: number) => http.get('/api/Exposure/GetById', { params: { id } })
// 编辑曝光
export const editExpose = (data: EditExposeParams) =>
    http.put(
        '/api/Exposure/Update',
        injectionAdminInfo<EditExposeParams>(data),
        { queryType: 'json' }
    )
// 编辑曝光
export const addExpose = (data: AddExposeParams) => {
    return http.post('/api/Exposure/Add', data)
}
// 编辑追回资金
export const editRecover = (data: EditRecoverParams) =>
    http.put(
        '/api/Exposure/UpdateRecover',
        injectionAdminInfo<EditRecoverParams>(data),
        { queryType: 'json' }
    )

export interface EditRecoverParams extends BaseAdminInfo {
    id: number
    // maximum: 2147483647
    // minimum: 1
    // 曝光主键

    recoverFunds: number
    // 追回资金

    recoverDate: string
    // 追回日期

    recoverDesc: string
    // 追回资金说明
}

interface EditExposeParams extends BaseAdminInfo {
    /* 编辑账号所需字段 */
    id: number
    userCallName: string
    // 用户称呼

    userMobile: string
    // 用户Mobile

    userQQ?: string
    // 用户QQ（扩展保留）

    userEmail?: string
    // 用户Email（扩展保留）

    location?: string
    // 地址

    userIdCard?: string
    // 用户身份证号

    cashDeposit?: string
    // 资金存放地

    entId: number
    // maximum: 2147483647
    // minimum: 0
    // 交易商Id

    entName?: string
    // 交易商名称

    title: string
    // 维权标题

    keywords?: string
    // 维权关键字

    summary?: string
    // 摘要

    content: string
    // 维权内容

    exposureType: string
    // 曝光类型（1,2,3,4）

    fileSet?: FileSetModel
    twDisplay: number
    // 是否繁体显示（-1、不选择，0、不显示，1、显示）

    virtualClickCount: number
    // maximum: 2147483647
    // minimum: 0
    // 虚拟点击量

    virtualForwardCount: number
    // maximum: 2147483647
    // minimum: 0
    // 虚拟转发量

    isHots: boolean
    // 热点

    processState: number
    // maximum: 2147483647
    // minimum: 0
    // 处理状态

    status: number
    // 数据显示状态（0、不限，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）

    remark?: string
    // 备注

}
interface AddExposeParams {
    // 维权中心---我要曝光---提交模型

    productType: number
    // 产品类型，具体以接口【/api/Common/GetProductType】为准
    language: number
    // 语言类别（0、全部，1、简体，2、繁体）
    userId: number
    // 用户Id

    ip: string
    // 用户IP

    entId: number
    // 平台Id

    entName: string
    // 平台名称

    title: string
    // 主题

    content: string
    // 内容

    fileSet?: FileSetModel
}

// 删除问题 实际是放回收站
interface DelParams extends BaseDelParams {
    // 状态（0、不限，1、显示，2、不显示，3、回收站，4、违规）
    status: number
}
export const delExpose = (data: DelParams) => {
    return http.put('/api/Exposure/UpdateStatus', data, { queryType: 'text' })
}

// 获取曝光进度
export const getExposeProcess = (data: GetProcessParams) => {
    data.viewUserId = -10
    return http.get<any>('/api/Exposure/QueryBySingleAndAnswer', { params: data })
}
interface GetProcessParams {
    id: number
    // 是否累加点击量
    isClick?: boolean
    // 客户端修改客服信息
    customerServiceType?: number
    // 当前查看的用户Id，用于检测关注状态
    viewUserId?: number
}
