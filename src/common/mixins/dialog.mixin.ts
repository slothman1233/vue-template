/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-29 14:06:12
 * @LastEditTime: 2020-06-05 10:16:50
 */
import { Component, PropSync, Prop, Ref, Mixins } from 'vue-property-decorator'
import { dialogOutShow, dialogBackup } from './tool.mixin'
import { cloneDeep } from 'lodash'
const DialogOutShow = dialogOutShow()
const DialogBackup = dialogBackup('tempData')
/**
   * @description: 添加和编辑弹窗公共代码
   * @param {addFun:Function 添加执行的方法}
   * @param {editFun:Function 编辑执行的方法}
   * @param {options:AEDialogOptions 额外参数
   * 比如配置添加所需字段的初始值}
   * 对于弹窗外接收的属性
   * @prop {temp: 编辑的数据 添加时自动为false}
   * @prop {mode: 当前模式 add 添加 edit 编辑}
   * 对于弹窗可触发的事件
   * @event {dialog-cancel 取消时触发的事件  参数为所拷贝的初始数据}
   * @event {update 保存时触发的事件 }
   * @author: EveChee
   */
export function generatorAEDialog(
    addFun: Function,
    editFun: Function,
    options: AEDialogOptions = { temp: {} }
) {
    const { temp } = options
  @Component
    class AEDialog extends Mixins(DialogOutShow, DialogBackup) {
    // 临时数据
    @PropSync('temp', {
        default: () => cloneDeep(temp),
    })
    tempData!: any

    // 模式
    @Prop({
        type: String,
        default: 'add',
    })
    mode!: string

    // 模式文字
    get title() {
        return this.mode === 'add' ? '添加' : '编辑'
    }

    // 保存Loading
    saveLoading = false

    // 表单
    @Ref()
    readonly form
    // 保存编辑
    async save() {
        const valid = await this.form.validate()
        if (!valid) {return}
        this.saveLoading = true
        const res = await (this.mode === 'add' ? addFun : editFun)(this.tempData)
        this.saveLoading = false
        if (!res) {return}
        this.$message.success('操作成功')
        this.closeSelf('update')
    }

  }
  return AEDialog
}

interface AEDialogOptions {
  temp: any
}
