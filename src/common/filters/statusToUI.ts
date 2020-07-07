// 通用模板
export function createSimpleFilter(val: any, compare: any, resArr: Array<any>) {
  let truly = true
  if (Array.isArray(compare)) {
    truly = compare.includes(val)
  } else {
    truly = val === compare
  }
  return truly ? resArr[0] : resArr[1]
}

const ARTICLE_STATUS_TEXTS = new Map([
  [2, '自动下架'],
  [1, '上架'],
  [0, '下架'],
  [4, '热门文章'],
])
// 文章状态
export function articleStatusToText(status) {
  return ARTICLE_STATUS_TEXTS.get(status)
}
const ARTICLE_STATUS_TYPES = new Map([
  [2, 'warning'],
  [1, ''],
  [0, 'danger'],
  [4, 'success'],
])
// 文章状态
export function articleStatusToType(status) {
  return ARTICLE_STATUS_TYPES.get(status)
}
