/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-30 15:10:16
 * @LastEditTime: 2020-07-10 11:07:45
 */
import http from '@/utils/http'

// 账号列表查询——分页
export const getUserListForPage = (params?: UserListPageParams) => {
  return http.get('/api/User/GetPagedList', { params, msgPack:true })
}

// 账号列表查询
export const getUserList = (params?: UserListParams) => {
  return http.get('/api/User/GetList', { params })
}
// 账号Id查询
export const getUserById = (params?: BaseByIdParams) => {
  return http.get('/api/User/GetById', { params })
}
interface UserListPageParams extends BasePageParams, BaseSearchParams {}
interface UserListParams extends BaseListParams, BaseSearchParams {}

// 添加账号
export const addUser = (data: AddUserParams) => {
  return http.post('/api/User/Add', data, { queryType: 'json' })
}

interface AddUserParams {
  /* 添加账号所需字段 */

  password: string
  // 密码

  isEnabled?: boolean
  // 是否启用

  userName: string
  // maxLength: 20
  // minLength: 2
  // 用户名

  name: string
  // maxLength: 20
  // minLength: 2
  // 姓名

  mobile: string
  // 手机号码
  organizationIds?: Array<any>
  // 关联组织
  jobIds?: Array<any>
  // 关联职位
  groupIds?: Array<any>
  // 关联用户组
}

// 编辑账号
export const editUser = (data: EditUserParams) => {
  return http.put('/api/User/Update', data, { queryType: 'json' })
}

interface EditUserParams extends AddUserParams {
  /* 编辑账号所需字段 */
  id: number
  // id
  isEnabled?: boolean
  // 是否启用

  userName: string
  // maxLength: 20
  // minLength: 2
  // 用户名

  name: string
  // maxLength: 20
  // minLength: 2
  // 姓名

  mobile: string
  // 手机号码
  organizationIds?: Array<any>
  // 关联组织
  jobIds?: Array<any>
  // 关联职位
  groupIds?: Array<any>
  // 关联用户组
}

// 删除账号
export const deleteUser = (data: BaseDelParams) => {
  return http.delete('/api/User/Delete', { data })
}
