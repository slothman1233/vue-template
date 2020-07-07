/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-08 14:40:09
 * @LastEditTime: 2020-07-07 10:27:31
 */
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { merge, toPairs } from 'lodash'
import Intercept from './axios'
import qs from 'qs'
class HttpService {
  private axios: AxiosInstance

  // 是否支持msgpack
  public supportMsg: Uint8Array | boolean

  // 请求头
  public normalHeader: any = {
    // 'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  }

  public getHeader: any = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  public formHeader: any = {
    'Content-Type': ' multipart/form-data;',
  }

  public msgPackAxiosOptions: AxiosRequestConfig = {
    headers: {
      Accept: 'application/x-msgpack',
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
  }

  constructor() {
    this.axios = new Intercept().getInterceptors()
    try {
      this.supportMsg = new Uint8Array([])
    } catch {
      this.supportMsg = false
    }
  }

  /**
   * @description: Get
   * @param {type}
   * @return: Promise<ResponseData | undefined>
   * @author: EveChee
   */
  public get(url: string, options: AxiosOptions): Promise<ResponseData | undefined> {
    const { queryType = 'text', data, params } = options
    if (queryType === 'text') {
      options.params = params || data
    } else {
      options.params = this.queryParse(params || data, queryType)
    }
    const opts: AxiosOptions = this.checkMsgPack(options, { headers: this.getHeader })
    return this.axios.get(url, opts)
  }

  /**
   * @description: Post
   * @param {type}
   * @return: Promise<ResponseData | undefined>
   * @author: EveChee
   */
  public post(url: string, data?: any, options: AxiosOptions = {}): Promise<ResponseData | undefined> {
    const { queryType } = options
    options.data = this.queryParse(data, queryType)
    const opts: AxiosOptions = this.checkMsgPack(options, { headers: this.normalHeader })
    return this.axios.post(url, data, opts)
  }

  /**
   * @description: Put
   * @param {type}
   * @return: Promise<ResponseData | undefined>
   * @author: EveChee
   */
  public put(url: string, data?: any, options: AxiosOptions = {}): Promise<ResponseData | undefined> {
    const { queryType } = options
    if (queryType === 'text') {
      options.params = data
    } else {
      options.data = this.queryParse(data, queryType)
    }
    const opts: AxiosOptions = this.checkMsgPack(options, {
      headers: queryType === 'json' ? this.normalHeader : this.getHeader,
    })
    return this.axios.put(url, data, opts)
  }

  /**
   * @description: Delete
   * @param {type}
   * @return: Promise<AxiosResponse<any>>
   * @author: EveChee
   */
  public delete(url: string, options: AxiosOptions = {}): Promise<ResponseData | undefined> {
    const { queryType, data } = options
    options.params = this.queryParse(data, queryType)
    const opts: AxiosOptions = this.checkMsgPack(options, { headers: this.normalHeader })
    return this.axios.delete(url, opts)
  }

  // 参数格式转化
  private queryParse(data: any, type?: string) {
    let dataOpts: any
    if (type === 'formd' && data) {
      const form = new FormData()
      toPairs(data).forEach(([key, val]: any) => {
        !Array.isArray(val)
          ? form.append(key, val)
          : val.forEach(item => form.append(`${key}[]`, item))
      })
      // dataOpts = form
    } else if (type === 'json') {
      /*
      axios 未解决的 数组变键值对BUG 起因是 util.deepMerge函数错误
      issue: https://github.com/axios/axios/issues/2813
      */
      dataOpts = JSON.stringify(data)
    } else if (type === 'forms') {
      dataOpts = qs.stringify(data)
      console.log(dataOpts)
    } else {
      dataOpts = data
    }
    return dataOpts
  }

  private checkMsgPack(options, oth: any): AxiosOptions {
    const token = localStorage.getItem('huihun_token')
    const opts: AxiosOptions =
      options.msgPack && this.supportMsg
        ? merge(this.msgPackAxiosOptions, options)
        : { ...oth, ...options }
    opts.headers['Authorization'] = 'Bearer ' + token
    return opts
  }
}

export default new HttpService()

interface DataOptions {
  params?: object
  data?: object | FormData
}

// 请求额外配置
interface AxiosOptions extends DataOptions {
  headers?: any
  codes?: Codes
  queryType?: string
  msgPack?: boolean
  oth?: AxiosRequestConfig
}

// codes
interface Codes {
  sures?: Array<string>
  err?: Array<string>
}

export interface ResponseData {
  code: number | string
  subCode: string
  bodyMessage: string | object
}
