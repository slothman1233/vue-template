const EX_CONFIG = {
  EXTERNALS_MAP: new Map([
    ['1', { 'vue': 'Vue', }],
    ['2', { 'vue-router': 'VueRouter', }],
    ['3', { 'vuex': 'Vuex' }],
    ['4', { 'axios': 'axios', }],
    ['5', { 'echarts': 'echarts' }],
    ['6', { 'element-ui': 'ElementUI' }],
  ]),

  DEV_CDN_LIST: [
    "https://cdn.bootcss.com/vue/2.6.11/vue.js",
    "https://cdn.bootcss.com/vue-router/3.1.6/vue-router.js",
    "https://cdn.bootcss.com/vuex/3.1.3/vuex.js",
    "https://cdn.bootcss.com/axios/0.19.2/axios.js",
    "https://lib.baomitu.com/echarts/4.7.0/echarts.js",
    "https://unpkg.com/element-ui@2.13.2/lib/index.js"
  ],
  PROD_CDN_LIST: [
    "https://cdn.bootcss.com/vue/2.6.11/vue.min.js",
    "https://cdn.bootcss.com/vue-router/3.1.6/vue-router.min.js",
    "https://cdn.bootcss.com/vuex/3.1.3/vuex.min.js",
    "https://cdn.bootcss.com/axios/0.19.2/axios.min.js",
    "https://lib.baomitu.com/echarts/4.7.0/echarts.min.js",
    "https://unpkg.com/element-ui@2.13.2/lib/index.js",
  ]
}

const yargs = require('yargs');
const EX = yargs.argv.ex ? yargs.argv.ex.split(',') : []
const {EXTERNALS_MAP, DEV_CDN_LIST,PROD_CDN_LIST} = EX_CONFIG
const EX_RES = (() => {
  let externals = {}
  let cdn = {
    // 开发环境
    dev: {
      js: []
    },
    // 生产环境
    build: {
      js: []
    }
  }
  EX.forEach(n => {
    Object.assign(externals, EXTERNALS_MAP.get(+n) || {})
    cdn.dev.js.push(DEV_CDN_LIST[n - 1])
    cdn.build.js.push(PROD_CDN_LIST[n - 1])
  })
  return {
    externals,
    cdn
  }
})()
module.exports = EX_RES