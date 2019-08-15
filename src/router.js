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
      children:[
        {
          path: '',
          component: () => import('./views/Index.vue'),
          meta:{
            title:'欢迎页'
          }
        },
        {
          path: '/user',
          component: () => import('./views/Home.vue'),
          meta:{
            title:'用户列表'
          }
        },
        {
          path: '/user1',
          component: () => import('./views/Home.vue'),
          meta:{
            title:'用户列表'
          }
        },
      ]
      
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
