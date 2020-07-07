import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: 'home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/index.vue'),
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
        component: () => import('@/views/User/list.vue'),
        meta: { title: '用户列表', inTheBar: true, icon: 'el-icon-user' },
      },
    ],
  },
  {
    path: '/weekly',
    component: Layout,
    redirect: '/Weekly/list',
    meta: { title: '周刊管理', inTheBar: true, icon: 'el-icon-s-grid' },
    children: [
      {
        path: 'list',
        name: 'WeeklyList',
        component: () => import('@/views/Weekly/list.vue'),
        meta: { title: '周刊列表', inTheBar: true, icon: 'el-icon-menu' },
      },
    ],
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    meta: { title: '文章管理', inTheBar: true, icon: 'el-icon-s-order' },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/Article/list.vue'),
        meta: { title: '文章列表', inTheBar: true, icon: 'el-icon-folder-opened' },
      },
    ],
  },
  {
    path: '/author',
    component: Layout,
    redirect: '/author/list',
    meta: { title: '作者管理', inTheBar: true, icon: 'el-icon-knife-fork' },
    children: [
      {
        path: 'list',
        name: 'AuthorList',
        component: () => import('@/views/Author/list.vue'),
        meta: { title: '作者列表', inTheBar: true, icon: 'el-icon-knife-fork' },
      },
    ],
  },
  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/list',
    meta: { title: '栏目管理', inTheBar: true },
    children: [
      {
        path: 'list',
        name: 'ColumnList',
        component: () => import('@/views/Column/list.vue'),
        meta: { title: '栏目列表', inTheBar: true, icon: 'el-icon-copy-document' },
      },
    ],
  },
  {
    path: '/comments',
    component: Layout,
    redirect: '/comments/list',
    meta: { title: '评论管理', inTheBar: true },
    children: [
      {
        path: 'list',
        name: 'CommentsList',
        component: () => import('@/views/Comments/list.vue'),
        meta: { title: '评论列表', inTheBar: true, icon: 'el-icon-files' },
      },
    ],
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/list',
    meta: { title: '反馈管理', inTheBar: true },
    children: [
      {
        path: 'list',
        name: 'Feedback',
        component: () => import('@/views/Feedback/list.vue'),
        meta: { title: '反馈列表', inTheBar: true, icon: 'el-icon-collection-tag' },
      },
    ],
  },
  {
    path: '/func',
    component: Layout,
    redirect: '/func/push',
    meta: { title: '功能管理', inTheBar: true, icon: 'el-icon-receiving' },
    children: [
      {
        path: 'push',
        name: 'PushMsg',
        component: () => import('@/views/Func/push.vue'),
        meta: { title: '消息推送', inTheBar: true, icon: 'el-icon-collection-tag' },
      },
      {
        path: 'download',
        name: 'AppList',
        component: () => import('@/views/Func/download.vue'),
        meta: { title: '应用下载', inTheBar: true, icon: 'el-icon-collection-tag' },
      },
      {
        path: 'adv',
        name: 'AdvList',
        component: () => import('@/views/Func/adv.vue'),
        meta: { title: '开屏广告', inTheBar: true, icon: 'el-icon-collection-tag' },
      },
      {
        path: 'live',
        name: 'LiveSet',
        component: () => import('@/views/Func/live.vue'),
        meta: { title: '直播管理', inTheBar: true, icon: 'el-icon-collection-tag' },
      },

    ],
  },
  // {
  //   path: '/log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'LogList',
  //       component: () => import('@/views/acclist.vue'),
  //       meta: { title: '日志列表', inTheBar: true },
  //     },
  //   ],
  // },
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

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('huihun_token')
// 	if (!token && to.path !== '/login') {
// 		next('/login')
// 		localStorage.removeItem('huihun_token')
// 	} else {
// 		next()
// 	}
// })

export default router
