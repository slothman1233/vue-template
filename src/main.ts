import './set-public-path'
import singleSpaVue from 'single-spa-vue-mfe'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import '@/common/style/reset.less'

Vue.config.productionTip = false;


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
