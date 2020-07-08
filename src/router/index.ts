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
