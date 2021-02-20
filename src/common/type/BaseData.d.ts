/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-09-25 10:42:25
 * @LastEditTime: 2020-10-19 15:59:32
 */
// 基础列表所需数据
declare interface SelectModel {
  label: string
  value: numOrStr
  id?:any // 其他特殊标识
}
declare type numOrStr = number | string
// 表格字段tsx类型
declare interface TableCol {
  prop?: string
  label?: numOrStr
  other?: any
}
declare type TableCols = TableCol[]
// 文件类型
declare interface FileSetModel {
  imageSet: ImageBaseModel[]
  audioSet: AudioBaseModel[]
  videoSet: VideoBaseModel[]
}
declare interface ImageBaseModel {
  cover?: string
  // 封面地址或小图地址

  url: string
  // 文件地址

  remarks?: string
  // 文件说明
}
declare interface AudioBaseModel {
  size?: number
  // 文件大小（MB）

  duration?: number
  // 文件时长（秒）

  urlExt?: string
  // 扩展地址（存储H5兼容格式音视频地址）

  cover?: string
  // 封面地址或小图地址

  url: string
  // 文件地址

  remarks?: string
  // 文件说明
}
declare interface VideoBaseModel {
  size?: number
  // 文件大小（MB）

  duration?: number
  // 文件时长（秒）

  urlExt?: string
  // 扩展地址（存储H5兼容格式音视频地址）

  cover?: string
  // 封面地址或小图地址

  url: string
  // 文件地址

  remarks?: string
  // 文件说明
}
