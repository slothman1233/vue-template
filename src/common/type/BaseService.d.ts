/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-08-18 13:44:42
 * @LastEditTime: 2020-11-09 17:13:55
 */

// 基础列表所需数据
declare interface BaseListParams {
    // 条数
    limit?: number
}
// 基础分页所需数据
declare interface BasePageParams {
    // 条数
    pageSize?: number
    // 页码
    pageIndex?: number
}
declare interface BaseListData<T> extends BasePageParams {
    // 总页数
    totalPages: number
    // 总条数
    totalRecords: number
    // 列表数据
    items: T[]
}
// 基础查询所需数据
declare interface BaseSearchParams {
    // 关键字
    searchKey?: string
    keywords?: string
    query?: string
}
declare interface BaseDelParams {
    /* 删除所需字段 */
    id: number
    // id
}


declare enum BaseLang {
    // 本项目基础共用语言枚举
    All, // 全部
    Simplified, // 简体
    Complex, // 繁体
}
declare enum BaseTwDisplayStatus {
    // 本项目基础共用台湾版显示状态
    // -1、不选择，0、不显示，1、显示
    All = -1,
    Hide,
    Show,
}
declare interface BaseAdminInfo {
    adminId?: number // 处理人ID
    adminName?: string // 处理人
}
