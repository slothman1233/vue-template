/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-08 10:24:57
 * @LastEditTime: 2020-07-08 10:25:07
 */
const files = require.context('.', false, /\.(js|ts)$/)
const modules: any = {}

files.keys().forEach(key => {
  if (key === './index.ts' || key === './index.js') return
  modules[key.replace(/(\.\/|\.(js|ts))/g, '')] = files(key).default
})
export default modules
