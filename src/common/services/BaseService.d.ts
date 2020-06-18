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
// 基础查询所需数据
declare interface BaseSearchParams {
  // 关键字
  searchKey?: string
}

interface BaseDelParams {
  /* 删除所需字段 */
  id: number
  // id
}

interface BaseByIdParams {
  id: number
  // 是否树形
  isMenuActionTree?: boolean
}