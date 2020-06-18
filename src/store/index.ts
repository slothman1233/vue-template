/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-08 10:38:53
 * @LastEditTime: 2020-05-28 09:59:33
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { CHANGE_NETWORK } from './mutation-types'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    networkStatus: null, // 当前网络状态
  },
  mutations: {
    [CHANGE_NETWORK](state, data) {
      // 网络状态
      state.networkStatus = data
    },
  },
  actions: {},
  modules: {},
})
