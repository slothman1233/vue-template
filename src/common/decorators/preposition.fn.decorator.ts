/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-11-05 10:06:11
 * @LastEditTime: 2020-11-09 14:15:52
 */
interface CreateTipOpts<T> {
    // unconfirm 会有不需要确认的场景
    (data: T): { tip: string; success: string; unconfirm?: boolean }
}
import { MessageBox, Message } from 'element-ui'
/**
 * @description: 确认操作的前置
 * @param {createTip} CreateTipOpts 返回一个提示语句和成功语句的对象 会传入当前函数的第一个采纳数
 * @return {*}
 * @author: EveChee
 */
export const ConfirmD = <T>(createTip: CreateTipOpts<T>) => (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const oldFn = descriptor.value
    descriptor.value = async function (row: T, ...args) {
        const { tip, success, unconfirm } = createTip.apply(this, [row])
        const confirm = !unconfirm
            ? await MessageBox.confirm(tip).catch((e) => e)
            : true
        if (confirm === 'cancel') {
            return Promise.reject()
        }
        const res = await oldFn.apply(this, [row, ...args])
        res && !unconfirm && Message.success(success)
        return res
    }
}

export const LoadingD = (loading: string, next?: string) => (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const oldFn = descriptor.value
    descriptor.value = async function (this: any, ...args) {
        if (this[loading]) {
            // Loading时间内 重复点击
            return
        }
        this[loading] = true
        const res = await oldFn.apply(this, args)
        this[loading] = false
        return next ? this[next](res) : true
    }
}
