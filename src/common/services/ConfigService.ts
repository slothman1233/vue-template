/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-10-09 10:56:49
 * @LastEditTime: 2020-11-10 13:56:48
 */
import { injectionAdminInfo } from '@/utils'
import http from '@/utils/http'
import { HomeData, RankModel, RankType, StatResModel } from '../type/ConfigData'

// 问答列表查询——分页
export const getPreventSwindledListForPage = (params?: PreventSwindledListPageParams) => {
    return http.get<BaseListData<any>>('/api/Question/GetPage', { params })
}
// 满意度查询——分页
export const getSatisfactionListForPage = (params?: SatisfactionListPageParams) => {
    return http.get<BaseListData<RankModel>>('/api/Ranking/GetPage', { params })
}
// 删除满意度
export const delSatisfaction = (data: DelSatisfactionParams) => {
    return http.put<any>('/api/Ranking/UpdateStatus', data, { queryType: 'text' })
}
// 更新满意度
export const updateSatisfaction = (data: UpdateSatisfactionParams) => {
    return http.put<any>('/api/Ranking/Update', injectionAdminInfo<AddSatisfactionParams>(data))
}
// 添加满意度
export const addSatisfaction = (data: AddSatisfactionParams) => {
    return http.post<any>('/api/Ranking/Add', injectionAdminInfo<AddSatisfactionParams>(data))
}
// 查询统计数据
export const getStatAll = () => {
    return http.get<StatResModel>('/api/Aggregate/QueryRightsByStatDetail')
}
// 修改统计数据
export const setStatAll = (data: SetStatParams) => {
    return http.post<any>('/api/Aggregate/UpdateVirtualStat', data)
}
// 查询平台是否已经添加过红黑榜
export const checkPlatformStatus = (params:CheckPlatformParams) => http.get<boolean>('/api/Ranking/AnyByEntId', {params})
// 查询首页统计
export const getAdminIndexData = () => http.get<HomeData>('/api/Aggregate/AdminIndexV1')
interface CheckPlatformParams {
    // 语言类别（0、全部，1、简体，2、繁体）
    language: BaseLang
    entId: number
    type:RankType
}
export interface SetStatParams {
    // 显示统计数据（综合）

    todayCount: number
    // 今日维权数

    yesterdayCount: number
    // 昨日维权数

    yesterdayMoney: number
    // 昨日维权金额

    recoverAmount: number
    // 累计追回金额

    peopleCount: number
    // 累计维权总数
}
export interface AddSatisfactionParams extends BaseAdminInfo {
    // 维权中心---满意度榜---提交模型--2020年11月26日增加负面平台模型融合

    entId: number
    // 平台Id

    satisfaction?: number
    // 满意度
    label?:string
    // 维权标签 -- 负面

    sort: number
    // 排名

    status: number
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）
}
export interface UpdateSatisfactionParams extends BaseAdminInfo {
    // 2020年11月26日增加负面平台模型融合
    id: number
    // 主键

    entId: number
    // 平台Id

    satisfaction?: number
    // 满意度
    label?:string
    // 维权标签 -- 负面

    sort: number
    // 排名

    status: number
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）
}
export interface DelSatisfactionParams {
    id: number
    // 状态（0、全部，1、显示，2、不显示，3、回收站，4、违规）
    status: number
}
export interface SatisfactionListPageParams extends BasePageParams, BaseSearchParams {
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、违规
    status: number
    // 1、发布日期倒序，2、最新更新倒序，3、排序号倒序，4、排序号倒序+满意度倒序
    orderByMode: number
    language?:BaseLang
}
export interface PreventSwindledListPageParams extends BasePageParams, BaseSearchParams, BaseAdminInfo {
    // 语言
    language: BaseLang
    // 显示状态
    status: number
    // 热门
    isHots: number
    // 交易商显示
    isEntShow: number
    // 排序
    orderByMode: number
    // 开始时间
    beginTime?: string
    // 结束时间
    endTime?: string
}

// 添加账号
export const addPrevent = (data: AddPreventParams) => {
    return http.post('/api/User/Add', data, { queryType: 'json' })
}

interface AddPreventParams {
    id: numOrStr
}

// 编辑提问
export const editPrevent = (data: EditPreventParams) => {
    return http.put('/api/Question/Update', data, { queryType: 'json' })
}

interface EditPreventParams {
    id: numOrStr
}

// 删除问题 实际是放回收站
interface DelParams extends BaseDelParams {
    // 状态（0、不限，1、显示，2、不显示，3、回收站，4、违规）
    status: number
}
export const delPrevent = (data: DelParams) => {
    return http.put('/api/Question/UpdateStatus', data, { queryType: 'text' })
}
