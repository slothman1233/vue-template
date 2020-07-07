/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-30 11:18:07
 * @LastEditTime: 2020-06-15 11:55:29
 */
import http from '@/utils/http'

// 文章列表查询——分页
export const getArticleListForPage = (params?: ArticleListPageParams) => {
  return http.get('/api/backstage/weekly/getChapterInfoPage', { params })
}

// 根据文章id获取文章详情
export const getArticleDetail = (params: ArticleDetailParams) => {
  return http.get('/api/backstage/weekly/getChapterDetail', { params })
}

// 文章树查询
export const getArticleTree = (params?: ArticleListParams) => {
  return http.get('/api/AuthArticle/GetTreeList', { params })
}
// 图片上传
export const UploadImg = () => {
  console.log(1)
}
interface ArticleListPageParams extends BasePageParams, BaseSearchParams {
  // 排序字段（1:真实阅读数，2：展示阅读数,3：创建时间,默认为0时不排序）
  sortField?: number
  // 排序规则（1：升序，2：降序，默认为0时不排序）
  sortRule?: number
  // 上下架状态（0：下架，1：上架，2:自动下架，3:全部，4：热门文章）
  status: string | number
}

interface ArticleDetailParams {
  chapterId: number
}
interface ArticleListParams extends BaseSearchParams {
  // 模块id
  moduleId?: number
  // 父级id
  fatherId?: number
}

// 添加文章
export const addArticle = (data: AddArticleParams) => {
  return http.post('/api/AuthArticle/Add', data)
}

interface AddArticleParams {
  /* 权限文章提交模型 */

  menuNumber: number
  // maximum: 9999
  // minimum: 0
  // 文章代码序号（相对模块下唯一，请按照顺序添加）

  moduleId: number
  // 文章Id

  fatherId: number
  // 父级Id

  menuName: string
  // maxLength: 20
  // minLength: 2
  // 文章名

  isEnabled?: boolean
  // 是否启用

  weight?: number
  // maximum: 99999999
  // minimum: 0
  // 权重排序

  icon?: string
  // 图标

  url?: string
  // 地址

  isExpress?: boolean
  // 是否快捷文章（如果设置为真，那么后台显示控制不需要从导航列表中找）
}

// 编辑文章
export const editArticle = (data: EditArticleParams) => {
  return http.put('/api/backstage/weekly/updateChapterInfo', data, {queryType:'json'})
}

export interface EditArticleParams extends AddArticleParams {
  /* 编辑权限文章所需字段 */
  id: number
}

// 文章上下架
export const doArticle = (data: ArticleDoParams) => {
  return http.put('/api/backstage/weekly/updateShelfStatus', data, {
    codes: { sures: ['4607e00'], err: ['4607e01', '4607e0d'] },
    queryType:'text'
  })
}
// 文章设置热门
export const hotArticle = (data: ArticleHotParams) => {
  return http.put('/api/backstage/weekly/setHotChapter', data, {
    codes: { sures: ['4608c00'], err: ['4608c01', '4608c0d'] },
    queryType:'text'
  })
}
interface ArticleDoParams {
  chapterId: number
  // 上下架状态（1：上架，0：下架）
  status: number
}
interface ArticleHotParams {
  chapterId: number
  // 置顶权重（1：置顶:0：取消置顶）
  stickWeight: number
}
