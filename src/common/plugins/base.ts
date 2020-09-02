/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-15 14:04:42
 * @LastEditTime: 2020-07-15 16:15:44
 */

import { cloneDeep } from 'lodash'
// 插件基础化
const limitNameList = ['PreviewImg']
// 在此限制数组中的组件会受到限制 只展示1个
interface PluginParams {
  // 默认字段
  content?: string
  // 组件类
  struct: any
  // 组件名唯一
  name: string
}

interface ComponentData {
  // 全替换
  // 只替换data部分
  __advanced__?: boolean
  [prop: string]: any
}

export default class PluginBase {
  content?: string
  struct: any
  id = 0
  name: string
  constructor(params: PluginParams) {
      this.content = params.content
      this.struct = params.struct
      this.name = params.name
  }
  Component = (options: any) => {
      if (typeof options === 'string' && this.content) {
      //如何只传入字符串，将其设置为默认字段的值
          options = {
              [this.content]: options,
          }
      }
      let finalOptions = {}
      if (options?.__advanced__) {
      // 直接使用传入的对象 _advanced标识
          delete options.__advanced__
          finalOptions = options
      } else {
      // 使用部分数据的对象 _advanced 不传或false
          finalOptions = {
              data: () => cloneDeep(options),
          }
      }
      if (limitNameList.includes(this.name) && document.querySelector(`.plugin__${this.name}`)) {
      // 限制重复提示
          console.log('不可重复打开')
          return
      }
      // 下面实例化并挂载
      const Instance = new this.struct(finalOptions)
      this.id++
      Instance.id = `${this.name}${this.id}`
      if(this.id > 999) {this.id = 0}
      Instance.vm = Instance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
      Instance.vm.visible = true
      Instance.dom = Instance.vm.$el //获取到本实例的dom元素
      document.body.appendChild(Instance.dom) // 将dom插入body
      return Instance.vm
  }
}
