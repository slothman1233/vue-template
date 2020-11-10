/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-08-18 11:05:55
 * @LastEditTime: 2020-09-01 15:35:28
 */
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface ElementAttributesProperty {
      $props: {}
    }
  }
}
