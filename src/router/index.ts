/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-07 09:36:15
 * @LastEditTime: 2020-07-22 15:36:29
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import 'nprogress/nprogress.css'
import PowerPlugin from '@stl/power-plugin'
Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: 'home',
        component: Layout,
        children: [
            {
                path: 'home',
                component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
                name: 'Home',
                meta: { title: '首页', icon: 'el-icon-s-home' },
            },
        ],
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        meta: { title: '用户管理', inTheBar: true, icon: 'el-icon-s-custom' },
        children: [
            {
                path: 'list',
                name: 'UserList',
                component: () => import(/* webpackChunkName: "UserList" */ '@/views/User/list.vue'),
                meta: { title: '用户列表', inTheBar: true, icon: 'el-icon-user' },
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Login" */ '../views/login.vue'),
    },
]

const router = new VueRouter({
    routes,
})

export const power = new PowerPlugin({
    router,
    projectId: 1,
    routes: [],
    staticRoutes: routes,
})
power.init()

export default router
