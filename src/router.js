import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./components/Layout.vue'),
      meta:{
        title:'首页'
      }
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      meta:{
        title:'登录'
      }
    },
    {
      path: '*',
      component: () => import('./views/404.vue'),
      meta:{
        title:'404错误页'
      }
    }
  ]
})
