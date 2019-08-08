import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Axios from 'axios';

Vue.config.productionTip = false

Vue.prototype.$RequestUrl = 'http://www.zhihui.com';

Vue.prototype.$axios = Axios.create({
    // baseURL: Vue.prototype.$RequestUrl,
    baseURL: 'http://www.zhihui.com',
    timeout: 5000,
    headers: {
        'Authorization':store.state.token
    }
});

// Vue.prototype.$axios.interceptors.response.use(function (response) {
//   //请先登录
//   if(response.data.code==1001){
//     router.push({ path: '/login' });
//   }
//   return response;
// })

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //根据路由中的title来修改页面title标签
  if(to.meta && to.meta.title) document.title = to.meta.title +'- 智慧管理系统'
  next()
  // if (to.path == '/login') {
  //   localStorage.clear();
  // }

  // // let token = localStorage.getItem('token');
  // let token = store.state.token

  // if (!token && to.path != '/login'){
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
