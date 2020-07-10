/*
 * @Date: 2020-04-24 10:19:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-08 10:30:33
 */
import { MutationTree, ActionTree, Module } from 'vuex'
import { RootState } from '../types'

export interface DemoState {
  test: number
}
const state: DemoState = {
  test: 123,
}

const mutations: MutationTree<DemoState> = {
  ADD_TO(state, project) {
    state.test++
  },
}

const actions: ActionTree<DemoState, RootState> = {}
const Demo: Module<DemoState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true,
}
export default Demo
