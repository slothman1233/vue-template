/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-30 15:00:00
 * @LastEditTime: 2020-06-04 08:47:10
 */
import http from '@/utils/http'

// 权限组列表查询——分页
export const getFeedbackListForPage = (params?: FeedbackListPageParams) => {
  return http.get('/api/AuthFeedback/GetPagedList', { params })
}

// 权限组列表查询
export const getFeedbackList = (params?: BaseSearchParams) => {
  return http.get('/api/AuthFeedback/GetList', { params })
}

// 权限组ID查询
export const getFeedbackById = (params?: BaseByIdParams) => {
  return http.get('/api/AuthFeedback/GetById', { params })
}
interface FeedbackListPageParams extends BasePageParams, BaseSearchParams {}

// 添加权限组
export const addFeedback = (data: AddFeedbackParams) => {
  return http.post('/api/AuthFeedback/Add', data, { queryType: 'json' })
}

interface AddFeedbackParams {
  /* 权限用户分组提交模型 */
  groupName: string
  // maxLength: 20
  // minLength: 2
  // 组名
  isEnabled?: boolean
  // 是否启用

  weight?: number
  // maximum: 99999999
  // minimum: 0
  // 权重排序

  roleIds?: Array<number>
  //关联角色Id集合
}

// 编辑权限组
export const editFeedback = (data: EditFeedbackParams) => {
  return http.put('/api/AuthFeedback/Update', data, { queryType: 'json' })
}

export interface EditFeedbackParams extends AddFeedbackParams {
  /* 编辑权限权限组所需字段 */
  id: number
}

// 删除权限组
export const deleteFeedback = (data: BaseDelParams) => {
  return http.delete('/api/AuthFeedback/Delete', { data })
}
