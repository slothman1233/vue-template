/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-09-18 12:01:07
 * @LastEditTime: 2020-11-11 10:46:14
 */
import { injectionAdminInfo } from '@/utils'
import http from '@/utils/http'
import { SYMBOL_FILENAME } from '@stl/request'
import { CancelTokenSource } from 'axios'
import { DealerTemplateType, EntFilterModel, EntStatusType, EntType } from '../type/DealerData'
import {
    AnswerModel,
    AnswerType,
    BaseDataDisplayStatus,
    SumUserInfo,
} from '../type/RemoteData'
export const UPLOAD_VIDEO_SUBCODE = '50E00000'
export type TypesModel = { key: number; value: string }[]
// 所有平台查询——分页---徐毅
// export const getNameDictByType = (params?: NameDictParams) => {
//     return http.get<any>('/api/Remote/GetNameDictByType', { params })
// }
// 所有平台查询——分页---瑶哥
export const getNameDictByType = (params: GetDealerListParams) =>
    http.get<BaseListData<EntFilterModel>>('/platApi/EntName/GetPagedList', {
        params,
    })
export interface GetDealerListParams extends BasePageParams, BaseSearchParams {
    //平台类型，默认 0 全部，1 交易商，2 香港黄金，3 虚假交易商，4 原油期货，10 代理商，12 资金盘，13 股票期货
    entType: EntType
    // 店铺模板类型，-1 全部，0 默认普通店铺，1 金牌店铺，2 银牌店铺
    tempType: DealerTemplateType
    // 状态，-1 全部，0 未显示，1 已显示
    status: EntStatusType
    // 排序类型：0 默认排序号，1 名称
    sortType?: number
}

interface NameDictParams {
    // 1 外汇交易商，2 黄金交易商，3 虚假交易商，4 原油交易商，10 代理商
    type: number
    // 1 默认 2 所有
    status: number
    //  0所有 10汇查查 1汇聊 2FX110官网 2020年11月14日11:53:35 API删除
    // productId: number
}
// 图片上传
export const imgUpload = (
    data: any,
    onUploadProgress?: any,
    abort?: CancelTokenSource
) =>
    http.post<string>('/upload/image/new', data, {
        cancelToken: abort?.token,
        unErrorMsg: true,
        onUploadProgress,
        selfSign: () => {},
    })
interface SliceInitModel {
    FileName?: string
    MD5: string
    FileType?: number
    SiteType?: number
    // 是否保持原文件名
    keepFileName?: boolean
    // 是否允许覆盖或被覆盖(默认：false)
    allowCover?: boolean
    // 自定义目录
    customDirectory?: string
    // 是否包含日期目录(默认为:true)
    containsDataPath?: string
}
// 文件分片初始化
export const fileSliceInit = (
    data: SliceInitModel,
    abort?: CancelTokenSource
) =>
    http.post<{ id: string }>('/upload/File/InitiateMultipartUpload', data, {
        cancelToken: abort?.token,
        unErrorMsg: true,
        selfSign: () => {},
    })
// 文件分片上传
interface SliceParamsModel {
    file: any
    id: string
    index: number
    filename: string
}

export const uploadSlice = (
    params: SliceParamsModel,
    abort?: CancelTokenSource
) => {
    const { file, filename, id, index } = params
    return http.post<any>(
        `/upload/File/UploadPart?id=${id}&index=${index}`,
        { file, [SYMBOL_FILENAME]: filename },
        {
            queryType: 'formd',
            timeout: 0,
            cancelToken: abort?.token,
            unErrorMsg: true,
            selfSign: () => {},
        }
    )
}
// 文件分片上传完成
export const uploadSliceSuccess = (id: string, abort?: CancelTokenSource) =>
    http.get<string>(`/upload/File/CompleteMultipartUpload`, {
        params: { id },
        timeout: 0,
        cancelToken: abort?.token,
        unErrorMsg: true,
        selfSign: () => {},
    })
// 获取产品类型
export const getProductTypes = (isDefault?: boolean) =>
    http.get<TypesModel>('/api/Common/GetProductType', {
        params: { isDefault },
    })
// 获取用户信息以及问题曝光汇总
// 用户汇总信息模型

type SumUserInfoModel = {
    complaintsCount: number
    exposureCount: number
    questionCount: number
    userInfo: SumUserInfo
}
// 获取用户汇总信息
export const getSumUserInfo = (userId: number) =>
    http.get<SumUserInfoModel>('/api/UserCollect/QueryByUser', {
        params: { userId },
    })
// 获取曝光进度表
export const getExposureProcessState = (isDefault?: boolean) =>
    http.get<TypesModel>('/api/Common/GetExposureProcessState', {
        params: { isDefault },
    })
// 获取提问进度表
export const getQsProcessState = (isDefault?: boolean) =>
    http.get<TypesModel>('/api/Common/GetQuestionProcessState', {
        params: { isDefault },
    })
// 获取曝光类型
export const getExposureTypes = () =>
    http.get<TypesModel>('/api/Common/GetExposureType')
// 获取投诉类型
export const getComplaintsTypes = () =>
    http.get<TypesModel>('/api/Common/GetComplaintsType')
// 获取诉求类型
export const getAppealTypes = () =>
    http.get<TypesModel>('/api/Common/GetComplaintsRightsOfAppeal')
// 获取所有回答 对应投诉和曝光其实就是进度
export const getAllProcess = (data: AnswerParams) => {
    data.viewUserId = -10
    return http.get<AnswerModel[]>('/api/Answer/QueryByLimit', { params: data })
}
// 获取所有回答分页
export const getAllAnswerList = (params: AdminAnswerParams) => {
    return http.get<BaseListData<AnswerModel>>('/api/Answer/GetByPage', {
        params,
    })
}

// 提交问答或曝光进度|回答
export const pushAnswer = (data: PushAnswerParams) =>
    http.post<any>('/api/Answer/Add', data)
export const updateAnswer = (data: UpdateAnswerParams) =>
    http.put<any>(
        '/api/Answer/UpdateAnswer',
        injectionAdminInfo<UpdateAnswerParams>(data)
    )
export const delAnswer = (data: DelAnswerParams) =>
    http.put<any>('/api/Answer/UpdateStatus', data, { queryType: 'text' })

// 获取回答审核状态
export const getAnswerAuditStatus = (isDefault: boolean = false) =>
    http.get<TypesModel>('/api/Common/GetAnswerProcessState', {
        params: { isDefault },
    })
// 获取回答原因状态
export const getAnswerReasonStatus = (isDefault: boolean = false) =>
    http.get<TypesModel>('/api/Common/GetAnswerProcessReasonState', {
        params: { isDefault },
    })
// 审核通过回答
export const updateAnswerPass = (data: UpdateAnswerAuditParams) =>
    http.put(
        '/api/Answer/Verified',
        injectionAdminInfo<UpdateAnswerAuditParams>(data)
    )
// 审核不通过回答 包含未审核
export const updateAnswerUnPass = (data: UpdateAnswerUnPassParams) =>
    http.put(
        '/api/Answer/VerifyFail',
        injectionAdminInfo<UpdateAnswerUnPassParams>(data)
    )
// 回答审核重置
export const updateAnswerReset = (data: UpdateAnswerAuditParams) =>
    http.put(
        '/api/Answer/VerifyReset',
        injectionAdminInfo<UpdateAnswerAuditParams>(data)
    )

interface AdminAnswerParams extends BaseListParams, BaseSearchParams {
    answerType: AnswerType
    // 回答的类型，用于区分来源自哪个业务（0、不限，1、提问，2、曝光，3、投诉等）
    answerProcessState?: number
    // 审核状态(-1、全部，0、待审核，2、已审核，3、不通过)
    status: BaseDataDisplayStatus
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）
    beginTime?: string
    endTime?: string
}
interface AnswerParams {
    answerType: AnswerType
    // 回答的类型，用于区分来源自哪个业务（0、不限，1、提问，2、曝光，3、投诉等）
    customerServiceType?: number
    // 客户端修改客服信息(0、默认，1、fx110客服，2、汇查查客服)
    themeId: number
    // 回答主题Id（根据AnswerType而定，有可能是问题的主键，有可能是曝光、投诉的主键)
    viewUserId?: number
    // 当前查看的用户Id，用于检测点赞状态
    limit: number
}
interface PushAnswerParams {
    answerType: number
    themeId: number
    // 回答主题的标题（用于记录和消息）
    themeTitle: string
    // 用户类型（0、普通用户，1、平台，2、运营）
    fromUserType: number
    // 发表回答的用户Id（谁发的）
    fromUserId: number
    // 内容
    content: string
    // ip
    ip?: string
    // 是否显示汇聊号
    isFxCode?: boolean
    // 是否匿名
    isAnonymity?: boolean
    fileSet?: FileSetModel
    label?: string
    // 1 所有人 2仅该用户和后台可见
    showStatus: number
}
interface DelAnswerParams {
    id: number
    // 状态（0、不限，1、显示，2、不显示，3、回收站，4、违规）
    status: number
}
interface UpdateAnswerParams {
    id: number
    content: string
    createTime: string
    showStatus: number
    label?: string
}
interface UpdateAnswerAuditParams extends BaseAdminInfo {
    id: number
}
export interface UpdateAnswerUnPassParams extends UpdateAnswerAuditParams {
    status: BaseDataDisplayStatus
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）
    processState: number
    // 回答审核状态(0、待审核，1、已审核，2、不通过)
    processReasonState: number
    // 回答审核原因状态
    processReason: string
    // 审核原因
}
