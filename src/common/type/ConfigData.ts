/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-11-06 15:23:34
 * @LastEditTime: 2020-11-10 14:07:22
 */
import { BaseDataDisplayStatus } from './RemoteData'

export interface RankModel extends BaseAdminInfo {
    // 满意度排行榜模型
    language: BaseLang
    // 语言类别（0、全部，1、简体，2、繁体）

    statusText: string
    // 状态

    entId: number
    // 平台id

    entName: string
    // 平台名

    entLogo: string
    // 平台logo

    satisfaction: number
    // 满意度（%保留2位小数）

    sort: number
    // 排名

    autoId: number
    // 主键

    status: BaseDataDisplayStatus
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）

    createTime: string
    // 创建日期

    lastUpdateTime: string
    // 最后修改日期

    mongoObjId: string
    recordTicks: number
}
export interface StatModel {
    // 显示统计数据（综合）

    last7DaysCount: number
    // 7日维权数

    last30DaysCount: number
    // 30日维权数

    last30DaysMoney: number
    // 30日维权金额

    yesterdayRecoverAmount: number
    // 昨日追回金额

    recoverAmount: number
    // 累计追回金额

    peopleCount: number
    // 累计维权总数
}

export interface StatResModel {
    // 统计模型
    exposureReal: StatModel
    complaintsReal: StatModel
    virtual: StatModel
}

export enum RankType {
    // 0、所有，1、红榜，2、黑榜 3曝光 4投诉
    All,
    Red,
    Black,
    Expose,
    Complaint,
}
export enum RankTypeTabText {
    // 0、所有，1、红榜，2、黑榜 3曝光 4投诉 给标签切换提供名称
    All = 'All',
    Red = 'Red',
    Black = 'Black',
    Expose = 'Expose',
    Complaint = 'Complaint'
}
export interface HomeData {
    // 首页工作台数据统计

    waitQuestion: number
    // 待回答提问

    waitExposure: number
    // 待审核曝光

    waitComplaints: number
    // 待审核投诉

    waitComplaintsProgress: number
    // 用户补充投诉待跟进
}
