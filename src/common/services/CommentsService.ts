/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-30 14:40:22
 * @LastEditTime: 2020-06-05 09:27:33
 */
import http from '@/utils/http'

// 评论列表查询——分页
export const getCommentsListForPage = (params?: CommentsListPageParams) => {
  return http.get('/api/AuthComments/GetPagedList', { params })
}

// 评论列表查询
export const getCommentsList = (params?: BaseSearchParams) => {
  return http.get('/api/AuthComments/GetList', { params })
}
// 评论树查询
export const getCommentsTree = (params?: BaseSearchParams) => {
  return http.get('/api/AuthComments/GetTreeList', { params })
}
// 评论Id查询
export const getCommentsById = (params?: BaseByIdParams) => {
  return http.get('/api/AuthComments/GetById', { params })
}
interface CommentsListPageParams extends BasePageParams, BaseSearchParams {}

// 添加评论
export const addComments = (data: AddCommentsParams) => {
  return http.post('/api/AuthComments/Add', data, { queryType: 'json' })
}

interface AddCommentsParams {
  // 权限评论提交模型

  fatherId: number
  // 父级Id

  jobName: string
  // maxLength: 20
  // minLength: 2
  // 评论名

  isEnabled?: boolean
  // 是否启用

  weight?: number
  // maximum: 99999999
  // minimum: 0
  // 权重排序

  roleIds?: Array<number>
  // 关联角色Id集合
}

// 编辑评论
export const editComments = (data: EditCommentsParams) => {
  return http.put('/api/AuthComments/Update', data, { queryType: 'json' })
}

export interface EditCommentsParams extends AddCommentsParams {
  /* 编辑权限菜单所需字段 */
  id: number
}

// 删除评论
export const deleteComments = (data: BaseDelParams) => {
  return http.delete('/api/AuthComments/Delete', { data })
}
