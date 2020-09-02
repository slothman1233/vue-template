import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import modules from './modules'
import { RootState } from './types'
import { CHANGE_NETWORK } from './mutation-types'
Vue.use(Vuex)
const store: StoreOptions<RootState> = {
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
    modules,
}

export default new Vuex.Store(store)
