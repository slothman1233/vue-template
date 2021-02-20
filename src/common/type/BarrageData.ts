import { BaseDataDisplayStatus } from './RemoteData'

// 弹幕推荐状态
export enum BarrageRecommendStatus {
  // 0全部，1推荐，2不推荐）
  All,
  Recommended,
  UnRecommend
}
// 弹幕类型
export enum BarrageType {
  // 弹幕类型（0全部，1用户弹幕，2机器弹幕）
  All,
  User,
  Robot
}
// 弹幕数据模型
export interface BarrageModel extends BaseAdminInfo{

  // 弹幕

  autoId:number
  // 主键

  status:BaseDataDisplayStatus
  // 数据显示状态（0、全部，1、显示，2、不显示，3、回收站，4、仅用户可见，5、仅同城可见）


  createTime:string
  // 创建日期

  lastUpdateTime:string
  // 最后修改日期

  eTimeId:number
  // 关联维权E时间Id

  content:string
  // 弹幕内容

  themeTime:number
  // 发弹幕时刻点

  barrageType:BarrageType
  // 弹幕类型（0全部，1用户弹幕，2机器弹幕）

  uid:number
  // 用户Id

  mongoObjId:string
  recordTicks:number
}