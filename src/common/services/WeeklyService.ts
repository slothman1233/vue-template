import http from '@/utils/http'

// 周刊列表查询——分页
export const getWeeklyListForPage = (params?: WeeklyListPageParams) => {
  return http.get('/api/AuthWeekly/GetPagedList', { params })
}

// 周刊列表查询
export const getWeeklyList = (params?: WeeklyListParams) => {
  return http.get('/api/AuthWeekly/GetList', { params })
}

// 周刊id查询
export const getWeeklyById = (params?: BaseByIdParams) => {
  return http.get('/api/AuthWeekly/GetById', { params })
}
interface WeeklyListPageParams extends BasePageParams, BaseSearchParams {}
interface WeeklyListParams extends BaseListParams, BaseSearchParams {}

// 添加周刊
export const addWeekly = (data: AddWeeklyParams) => {
  return http.post('/api/AuthWeekly/Add', data)
}

export interface AddWeeklyParams {
  /* 权限周刊添加模型 */

  isEnabled?: boolean
  // 是否启用

  weight?: number
  // maximum: 99999999
  // minimum: 0
  // 权重排序

  WeeklyName: string
  // maxLength: 20
  // minLength: 2
  // 周刊名

  WeeklyNumber: number
  // maximum: 9999
  // minimum: 0
  // 周刊代码
  [propName: string]: any
}

// 编辑周刊
export const editWeekly = (data: EditWeeklyParams) => {
  return http.put('/api/AuthWeekly/Update', data)
}

export interface EditWeeklyParams extends AddWeeklyParams {
  /* 编辑周刊所需字段 */
  id: number
}

// 删除周刊
export const deleteWeekly = (data: BaseDelParams) => {
  return http.delete('/api/AuthWeekly/Delete', { data })
}
