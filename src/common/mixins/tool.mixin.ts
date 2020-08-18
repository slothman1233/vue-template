/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-28 09:51:53
 * @LastEditTime: 2020-07-21 09:38:42
 */
import { Component, Vue, Watch, PropSync } from 'vue-property-decorator'
import { EventUtil } from '@/utils'
import { CHANGE_NETWORK } from '@/store/mutation-types'
import { Mutation, State } from 'vuex-class'
import { cloneDeep } from 'lodash'
/**
 * @Description: 网络状态监听
 * @param {type}
 * @return:VueMixin
 * @LastEditors: Please set LastEditors
 * @LastEditTime: Do not edit
 */
@Component
export class NetWorkListener extends Vue {
  private static readonly ONLINE = 'online'
  private static readonly OFFLINE = 'offline'

  mounted() {
    this.listener()
  }
  @Mutation CHANGE_NETWORK

  listener() {
    EventUtil.addHandler(window, NetWorkListener.ONLINE, () =>
      this[CHANGE_NETWORK](NetWorkListener.ONLINE)
    )
    EventUtil.addHandler(window, NetWorkListener.OFFLINE, () =>
      this[CHANGE_NETWORK](NetWorkListener.OFFLINE)
    )
  }

  get networkMsgOpts() {
    return {
      type: this.network === NetWorkListener.ONLINE ? 'success' : 'warning',
      text: this.network === NetWorkListener.ONLINE ? '网络已连接' : '网络已断开',
    }
  }

  @State('networkStatus') network

  // 网络提示
  @Watch('network')
  networkMsg() {
    const { type, text } = this.networkMsgOpts
    this.$message[type](text)
  }
}

/**
 * @Description: 弹窗显示属性外置
 * @param {prop:String default:show}
 * @return: VueMixin
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const dialogOutShow = (prop = 'show') => {
  const propName: unique symbol = Symbol(prop)
  @Component
  class DialogOutShow extends Vue {
    @PropSync(prop, {
      type: Boolean,
      default: false,
    })
    [propName]?: boolean

    get [`v_${prop}`]() {
      return this[prop]
    }
    set [`v_${prop}`](val) {
      this.$emit(`update:${prop}`, val)
    }

    beforeClose(done) {
      this.resetDialogData()
      done()
    }
    closeSelf(flag: any) {
      this[`v_${prop}`] = false
      if (flag === 'update') {
        this.$emit('update')
      } else {
        this.resetDialogData()
      }
    }

    resetDialogData() {
      console.log('可重写resetDialogData方法')
    }
  }
  return DialogOutShow
}

// 需要数据备份的弹窗
export const dialogBackup = (dataName, prop = 'v_show') => {
  @Component
  class DialogBackup extends Vue {
    // 备份数据
    backupTemp = null
    @Watch(prop)
    backupDialogData(val) {
      if (!val) return
      this.backupTemp = cloneDeep(this[dataName])
    }

    // 将存储的数据返回
    resetDialogData() {
      this.$emit('dialog-cancel', cloneDeep(this.backupTemp))
      this.backupTemp = null
    }
  }
  return DialogBackup
}
