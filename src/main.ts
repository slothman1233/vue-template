import './set-public-path'
import './router-hooks-init'
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

export const IS_MFE = (window as any).__SINGLE_SPA_MFE__ || false

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
    const vm = singleSpaVue({
        Vue,
        appOptions: { ...options, el },
    })
    return vm
}
if (!IS_MFE) {
    render()
}
