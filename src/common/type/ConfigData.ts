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

    todayCount: number
    // 今日维权数

    yesterdayCount: number
    // 昨日维权数

    yesterdayMoney: number
    // 昨日维权金额

    yesterdayRecoverAmount: number
    // 昨日追回金额

    recoverAmount: number
    // 累计追回金额

    peopleCount: number
    // 累计维权人数
}

export interface StatResModel {
    // 统计模型
    exposureReal: StatModel
    complaintsReal: StatModel
    virtual: StatModel
}
