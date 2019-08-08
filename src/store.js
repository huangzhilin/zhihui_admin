import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  		//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
		user: window.sessionStorage.getItem('user'),
		token: window.sessionStorage.getItem('token')
  },
  mutations: {
		//将token保存到sessionStorage里，token表示登陆状态
		SET_TOKEN: (state, data) => {
			state.token = data
			window.sessionStorage.setItem('token', data) 
		},
		//获取用户名
		SET_USER: (state, data) => {
			// 把用户名存起来
			state.user = data
			window.sessionStorage.setItem('user', data)
		},
		//登出
		LOGOUT: (state) => {
			// 登出的时候要清除token
			state.token = null
			state.user = null
			window.sessionStorage.removeItem('token')
			window.sessionStorage.removeItem('user')
		}
  },
  actions: {

  }
})
