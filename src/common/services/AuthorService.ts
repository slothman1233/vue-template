/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-30 15:09:59
 * @LastEditTime: 2020-06-03 11:07:42
 */
import http from '@/utils/http'

// 作者列表查询——分页
export const getAuthorListForPage = (params?: AuthorListPageParams) => {
  return http.get('/api/AuthAuthor/GetPagedList', { params })
}

// 作者列表查询
export const getAuthorList = (params?: AuthorListParams) => {
  return http.get('/api/AuthAuthor/GetList', { params })
}

// 作者根据Id查询
export const getAuthorById = (params?: BaseByIdParams) => {
  return http.get('/api/AuthAuthor/GetById', { params })
}
interface AuthorListPageParams extends BasePageParams, BaseSearchParams {
  // 模块id
  moduleId?: number
}
interface AuthorListParams extends BaseSearchParams, BaseListParams {
  // 模块id
  moduleId?: number
}

// 添加作者
export const addAuthor = (data: AddAuthorParams) => {
  return http.post('/api/AuthAuthor/Add', data, { queryType: 'json' })
}

interface AddAuthorParams {
  /* 权限作者提交模型 */

  moduleId: number
  // 模块Id

  roleName: string
  // maxLength: 20
  // minLength: 2
  // 作者名
  roleMenuAction?: Array<AuthorMenuAction>
  // 关联菜单导航功能Id集合

  isEnabled?: boolean
  // 是否启用

  weight?: number
  // maximum: 99999999
  // minimum: 0
  // 权重排序

  menuIds?: Array<number>
  // 关联菜单Id集合
}

export interface AuthorMenuAction {
  //菜单导航功能
  menuId?: number
  //菜单Id
  actionId?: number
  //功能Id
}

// 编辑作者
export const editAuthor = (data: EditAuthorParams) => {
  return http.put('/api/AuthAuthor/Update', data, { queryType: 'json' })
}

export interface EditAuthorParams extends AddAuthorParams {
  /* 编辑权限作者所需字段 */
  id: number
}

// 删除作者
export const deleteAuthor = (data: BaseDelParams) => {
  return http.delete('/api/AuthAuthor/Delete', { data })
}
