import http from '@/utils/http'

// 问答列表查询——分页
export const getNameDictByType = (params?: NameDictParams) => {
    return http.get('/api/Remote/GetNameDictByType', { params })
}
interface NameDictParams {
    // 1 外汇交易商，2 黄金交易商，3 虚假交易商，4 原油交易商，10 代理商
    type: number
    // true 默认 已显示，fasle 所有
    status: boolean
    //  0所有 10汇查查 1汇聊 2FX110官网
    productId: number
}
// 图片上传
export const imgUpload = (data: any) => {
    return http.post('/upload/image', data)
}
