/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-08 14:10:12
 * @LastEditTime: 2020-06-15 11:57:02
 */
import axios, { AxiosInstance, AxiosResponse } from 'axios'
// 弹窗消息UI组件
import { Message } from 'element-ui'
// 控制跳转中心
import router from '@/router'
import { ResponseData } from '.'

const BASE_URL = ''
// const BASE_URL = '/api'
// const AUTO_ERROR = 'AUTO_ERROR' // Symbol('AUTO_ERROR')
const CODES = 'CODES'
export default class Intercept {
  // 唯一实例
  public instance: AxiosInstance

  // Http状态判断
  private NORMAL_STATUS = [200, 304, 400]

  constructor() {
    // 创建axios实例
    this.instance = axios.create({ timeout: 1000 * 12, baseURL: BASE_URL })
    // 初始化拦截器
    this.initInterceptors()
  }

  // 获取初始化好的axios实例
  public getInterceptors() {
    return this.instance
  }

  // 拦截设置
  initInterceptors = () => {
    // 响应拦截器
    this.instance.interceptors.response.use(
      // 请求成功
      res => (this.checkCode(this.checkStatus(res)) as any),
      // 请求失败
      error => {
        const { response } = error
        if (response) {
          // response.status === 401 && Message.error('未登录或登录过期!') && router.replace('/login')
          return response
        }
        Message.error('请求异常,请稍后再试!')
      }
    )
  }

  checkCode = (res: any): ResponseData | undefined => {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    const { data, status, msg, config } = res
    if (status === -404){
      Message.error(msg)
      return
    }
    if (!data)return
    const codes = config?.codes || {}
    // 兼容后端code不规范
    data.code = +data.code
    if (data.code !== 0 || (codes.sures && !this.codeEqual(codes.sures, data.subCode))) {
      // 失败 并且不在自行处理code里面的
      return !this.codeEqual(codes.err, data.subCode) && Message.error(data.message) ? undefined : data
    }
    // 成功
    try {
      data.bodyMessage = data.bodyMessage ? JSON.parse(data.bodyMessage) : null
    } catch (e) {
      console.log('bodyMessage not a JSON Data!')
    }
    return data
  }

  codeEqual = (arr: any[], subCode: string) => {
    return arr ? arr.find(code => subCode.indexOf(code) !== -1) : false
  }

  checkStatus = (response: AxiosResponse) => {
    // loading
    return this.NORMAL_STATUS.includes(response.status)
      ? response
      : {
          status: -404,
          msg: response.data ? response.data.message : '网络异常',
        }
  }
}
