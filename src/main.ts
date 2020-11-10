/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-08-18 11:05:55
 * @LastEditTime: 2020-09-24 10:59:04
 */
import './set-public-path'
import singleSpaVue from 'single-spa-vue-mfe'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/style/reset.less'
import '@stl/eve-vue2-lib/dist/EveVue2Lib.css'
import ELEMENT from 'element-ui'
import PreviewImg from '@/common/plugins/PreviewImg'
import '@/common/icons'
Vue.use(ELEMENT)
Vue.use(PreviewImg)
Vue.prototype.$ELEMENT = { size: 'mini' }
Vue.config.productionTip = false


const options = {
    router,
    store,
    render: (h: Function) => h(App),
}

// 独立渲染
export const render = function() {
    new Vue(options).$mount('#appName')
}
// 微前端模式
export const vueLifeCycles = ({ el }: any) => {
    return singleSpaVue({
        Vue,
        appOptions: { ...options, el },
    })
}
if (!(<any>window).__SINGLE_SPA_MFE__) {
    render()
}
