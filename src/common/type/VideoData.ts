import { BaseDataDisplayStatus } from './RemoteData'

export enum ETimeRecommendType {
    // 推荐状态（0全部，1推荐，2不推荐）
    All,
    Recommended,
    UnRecommend,
}
export interface ETimeModel extends BaseAdminInfo {
    // 维权E时间mongo模型

    autoId: number
    // 主键

    status: BaseDataDisplayStatus
    // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）

    statusText: string
    // 状态

    createTime: string
    // 创建日期

    lastUpdateTime: string
    // 最后修改日期

    title: string
    // 标题

    videoUrl: string
    // 视频地址URL

    duration: string
    // 视频时长

    coverUrl: string
    // 封面URL

    description: string
    // 描述介绍

    recommendState: ETimeRecommendType
    // 推荐状态
    recommendStateText: string
    // 是否推荐
    sort?:number
    // 排序号
    keyword:string
    // 关键字
    summary:string
    // 摘要

    clickCount: number
    // 点击量

    weekClickCountL: number
    // 周点击量

    monthClickCount: number
    // 月点击量

    virtualClickCount: number
    // 虚拟点击量

    commentCount: number
    // 评论量

    forwardCount: number
    // 转发量

    virtualForwardCount: number
    // 转发量

    mongoObjId: string
    recordTicks: number
}
