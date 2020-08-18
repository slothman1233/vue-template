/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-28 09:52:54
 * @LastEditTime: 2020-08-03 11:06:18
 */
import md5 from 'blueimp-md5'
import { isNumber, cloneDeep } from 'lodash'
/*
事件侦听兼容IE
*/
export const EventUtil = {
  addHandler: function(element, type, handler, pop = false) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, pop)
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler, pop)
    } else {
      element['on' + type] = handler
    }
  },
  removeHandler: function(element, type, handler, pop = false) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, pop)
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler, pop)
    } else {
      element['on' + type] = null
    }
  },
}

/**
 * 身份证，手机号码加*号处理
 */
export function starParse(str, isPhone) {
  if (!str) return str
  const length = str.length
  if (isPhone) {
    if (length >= 11) {
      const reg = /(\d{3})\d*(\d{4})/
      return str.replace(reg, '$1****$2')
    } else {
      let startlength = 0
      if (str.length % 2 == 0) {
        startlength = (length - 4) / 2
        return str.substr(0, startlength) + '****' + str.substr(-startlength)
      } else {
        startlength = (length - 4) / 2
        return str.substr(0, startlength) + '*****' + str.substr(-startlength)
      }
    }
  } else {
    if (length >= 18) {
      const startlength = (length - 6) / 2
      return str.substr(0, startlength) + '******' + str.substr(-startlength)
    } else {
      let startlength = 0
      if (str.length % 2 == 0) {
        startlength = (length - 4) / 2
        return str.substr(0, startlength) + '****' + str.substr(-startlength)
      } else {
        startlength = (length - 4) / 2
        return str.substr(0, startlength) + '*****' + str.substr(-startlength)
      }
    }
  }
}

// 设定数字校验区间
export const checkNumberRange = (min, max) => {
  return (rule, value, callback) => {
    if (!value) return callback()
    if (!Number.isInteger(value)) {
      return callback(new Error('请输入数字值'))
    } else {
      if (value < min || value > max) {
        return callback(new Error(`取值在${min}-${max}之间`))
      }
      callback()
    }
  }
}

// 时间快捷选项
export const pickerOptions: any = () => ({
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      },
    },
  ],
})

/* 检测是否有键 */
export function hasKey(target, propName: string) {
  return Object.prototype.hasOwnProperty.call(target, propName)
}

/* 1-0 true-false转换数字 */
export function t1t0(target: 1 | 0 | boolean): 1 | 0 {
  let temp = +target
  return (temp ^= 1) as 1 | 0
}

/* 阻止未完成点击 */
export function stopUnsuccessful(fn: Function, msgFn: Function) {
  let successful = false
  return (...args) => {
    if (successful) {
      msgFn()
      return
    }
    successful = true
    fn(...args).finally(() => (successful = false))
  }
}

/*
判断数据类型
*/

export const isType = (type: string) => (target: any) =>
  `[object ${type}]` === Object.prototype.toString.call(target)

const accessKey = '8860286533AB22E05C0BADC7C6CF5DD9'
const secretKey = 'E11A1F717ADF7445D5C4EDC7A6034355'

export function sign(params: any) {
  let str = ''
  if (Array.isArray(params)) {
    str = `${JSON.stringify(params)}`
  } else {
    const sortArr = paramsASCIISort(params)
    const obj = {}
    sortArr.forEach(key => {
      const val = cloneDeep(params[key])
      if (typeof val === 'object') {
        str += `${key}${JSON.stringify(val)}`
      } else {
        str += `${key}${checkEmpty(val) ? `${val}` : ''}`
      }
    })
  }
  const timestamp = new Date()
    .getTime()
    .toString()
    .slice(0, -3)
  const nonce = Math.round(Math.random() * 1000)
  const res = {
    sign: md5(`${accessKey}${str || ''}${timestamp}${nonce}${secretKey}`),
    timestamp,
    nonce,
    accessKey
  }
  return res
}

// 参数字典码排序
export function paramsASCIISort(params: any): string[] {
  if (!params) return []
  const arr = Object.keys(params)
  // arr.sort((a, b) => {
  //   if (isNumber(+a) && isNumber(+b)) {
  //     /*
  //     解决原始排序 1,200,40,5只看首位的问题
  //     */
  //     return +a - +b
  //   } else {
  //     /*
  //     当排序非 ASCII 字符的字符串（
  //     如包含类似 e, é, è, a, ä 等字符的字符串）。
  //     一些非英语语言的字符串需要使用 String.localeCompare。
  //     这个函数可以将函数排序到正确的顺序。
  //     localeCompare() 方法返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。
  //     */
  //     return a.localeCompare(b)
  //   }
  // })
  arr.sort()
  return arr
}

export function checkEmpty(val) {
  return val !== '' && val !== undefined && val !== null
}
