/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-15 14:03:37
 * @LastEditTime: 2020-07-15 16:07:50
 */
import Vue from "vue";
import previewCom from "./preview";
import PluginBase from "../base";
const PluginConstructor = Vue.extend(previewCom); // 直接将Vue组件作为Vue.extend的参数

const {Component} = new PluginBase({
  name: "PreviewImg",
  struct: PluginConstructor,
  content: 'img'
});
const PreviewImg = Symbol('PreviewImg')

export const name = PreviewImg

export default {
  install: Vue => {
    Vue.prototype[name] = Component; // 将组件暴露出去，并挂载在Vue的prototype上
  }
};
