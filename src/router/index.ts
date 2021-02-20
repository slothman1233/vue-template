/*
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-07 09:36:15
 * @LastEditTime: 2020-10-31 13:59:48
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import 'nprogress/nprogress.css'
import PowerPlugin from '@stl/power-plugin'
import { setHeaderAdminInfo } from '@/utils/http'
Vue.use(VueRouter)
export const PROJECT_ID = process.env.VUE_APP_PROJECT_ID
export const staticRoutes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: 'home',
        component: Layout,
        meta: { title: '首页', icon: 'el-icon-s-home', permission: 1 },
        children: [
            {
                path: 'home',
                component: () =>
                    import(
                        /* webpackChunkName: "home" */ '@/views/Home/index.vue'
                    ),
                name: 'Home',
                meta: {
                    title: '工作台',
                    icon: 'el-icon-s-home',
                    permission: `${PROJECT_ID}_1`,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import(/* webpackChunkName: "Login" */ '../views/login.vue'),
        props: {
            subTitle: '模板系统'
        },
    },
]
export const routes: Array<RouteConfig> = [
    // {
    //     path: '/audit',
    //     component: Layout,
    //     meta: { title: '审核管理', inTheBar: true, icon: 'el-icon-question' },
    //     children: [
    //         {
    //             path: 'commentList',
    //             name: 'Comment',
    //             component: () =>
    //                 import(
    //                     /* webpackChunkName: "Comment" */ '@/views/Audit/Comment.tsx'
    //                 ),
    //             meta: {
    //                 title: '评论列表',
    //                 inTheBar: true,
    //                 icon: 'el-icon-question',
    //                 permission: `${PROJECT_ID}_11`,
    //             },
    //         }
    //     ],
    // },
]

const router = new VueRouter({
    routes: staticRoutes,
})
export const power = new PowerPlugin({
    mode: process.env.VUE_APP_SSO_MODE || 'test',
    router,
    projectId: PROJECT_ID,
    routes,
    staticRoutes,
    loginPath: '/login',
})
power
    .init()
    .then(() =>
        setHeaderAdminInfo(
            power?.userInfo?.id,
            encodeURIComponent(power?.userInfo?.realName)
        )
    )

export default router
