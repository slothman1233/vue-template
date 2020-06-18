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
  }
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
