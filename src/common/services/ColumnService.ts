/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-30 15:09:34
 * @LastEditTime: 2020-06-03 14:27:06
 */
import http from '@/utils/http'

// 栏目列表查询——分页
export const getColumnListForPage = (params?: ColumnListPageParams) => {
  return http.get('/api/AuthColumn/GetPagedList', { params })
}

// 栏目列表查询
export const getColumnList = (params?: BaseSearchParams) => {
  return http.get('/api/AuthColumn/GetList', { params })
}
// 栏目树列表查询
export const getColumnTree = (params?: BaseSearchParams) => {
  return http.get('/api/AuthColumn/GetTreeList', { params })
}
// 栏目Id查询
export const getColumnById = (params?: BaseByIdParams) => {
  return http.get('/api/AuthColumn/GetById', { params })
}
interface ColumnListPageParams extends BasePageParams, BaseSearchParams {}

// 添加栏目
export const addColumn = (data: AddColumnParams) => {
  return http.post('/api/AuthColumn/Add', data, { queryType: 'json' })
}

interface AddColumnParams {
  /* 权限栏目提交模型 */

  isEnabled?: boolean
  // 是否启用

  weight?: number
  // maximum: 99999999
  // minimum: 0
  // 权重排序

  fatherId: number
  // 父级Id

  organizationName: string
  // maxLength: 20
  // minLength: 2
  // 栏目名

  roleIds?: Array<number>
  // 关联角色Id集合
}

// 编辑栏目
export const editColumn = (data: EditColumnParams) => {
  return http.put('/api/AuthColumn/Update', data, { queryType: 'json' })
}

export interface EditColumnParams extends AddColumnParams {
  /* 编辑权限栏目所需字段 */
  id: number
}

// 删除栏目
export const deleteColumn = (data: BaseDelParams) => {
  return http.delete('/api/AuthColumn/Delete', { data })
}
