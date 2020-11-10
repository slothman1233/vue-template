/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-07 09:36:15
 * @LastEditTime: 2020-11-10 09:05:27
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import 'nprogress/nprogress.css'
import PowerPlugin from '@stl/power-plugin/src'
Vue.use(VueRouter)

export const staticRoutes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: 'home',
        component: Layout,
        meta: { title: '首页', icon: 'el-icon-s-home', permission: 1 },
        children: [
            {
                path: 'home',
                component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
                name: 'Home',
                meta: { title: '工作台', icon: 'el-icon-s-home', permission: '1' },
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
    }
]
export const routes: Array<RouteConfig> = [
    {
        path: '/expose',
        component: Layout,
        meta: { title: '曝光管理', inTheBar: true, icon: 'el-icon-s-opportunity' },
        children: [
            {
                path: 'list',
                name: 'ExposeList',
                component: () =>
                    import(/* webpackChunkName: "ExposeList" */ '@/views/Expose/List.tsx'),
                meta: { title: '曝光列表', inTheBar: true, icon: 'el-icon-tickets', permission: '6' /* 权限标识 */ },
            },
        ]
    }
]

const router = new VueRouter({
    routes: staticRoutes,
})
export const power = new PowerPlugin({
    mode: process.env.VUE_APP_SSO_MODE || 'test',
    router,
    projectId: '518881103533182976', // 项目ID
    routes,
    staticRoutes,
    loginPath: '/login',
})
power.init()

export default router
