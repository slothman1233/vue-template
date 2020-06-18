/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-28 09:52:54
 * @LastEditTime: 2020-05-28 09:56:47
 */
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