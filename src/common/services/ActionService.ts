import http from '@/utils/http'

// 功能列表查询——分页
export const getActionListForPage = (params?: ActionListPageParams) => {
  return http.get('/api/AuthAction/GetPagedList', { params })
}

// 功能列表查询
export const getActionList = (params?: ActionListParams) => {
  return http.get('/api/AuthAction/GetList', { params })
}
interface ActionListPageParams extends BasePageParams, BaseSearchParams {
  // 模块id
  moduleId?: number
  // 菜单id
  menuId?: number
}
interface ActionListParams extends BaseSearchParams {
  // 模块id
  moduleId?: number
  // 菜单id
  menuId?: number
}

// 添加功能
export const addAction = (data: AddActionParams) => {
  return http.post('/api/AuthAction/Add', data)
}

interface AddActionParams {
  /* 权限功能提交模型 */

  actionNumber: number
  // maximum: 9999
  // minimum: 0
  // 功能代码序号（相对菜单下唯一，请按照顺序添加）

  moduleId: number
  // 模块Id

  menuId: number
  // 菜单Id

  actionName: string
  // maxLength: 20
  // minLength: 2
  // 功能名


  isEnabled?: boolean
  // 是否启用

  weight?: number
  // maximum: 99999999
  // minimum: 0
  // 权重排序

  icon?: string
  // 图标
}

// 编辑功能
export const editAction = (data: EditActionParams) => {
  return http.put('/api/AuthAction/Update', data)
}

interface EditActionParams extends AddActionParams {
  /* 编辑权限功能所需字段 */
  id: number
}

// 删除账号
export const deleteAction = (data: BaseDelParams) => {
  return http.delete('/api/AuthAction/Delete', { data })
}