import './set-public-path'
import singleSpaVue from 'single-spa-vue-mfe'
import Vue from 'vue'
import App from './App.vue'
import router, { routes } from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/style/reset.less'
// import '@/common/style/index.less'
import '@/common/icons'

Vue.use(ElementUI)
Vue.config.productionTip = false


const options = {
  router,
  store,
  render: (h: Function) => h(App),
}

// 独立渲染
export const render = function() {
  new Vue(options).$mount('#huihun-admin')
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
