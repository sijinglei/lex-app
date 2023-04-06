import http from '../utils/http.js'
export default {
	namespaced: true,
	state: {
		userInfo: null
	},
	getters: {
		isLogin: (state) => {
			let token = uni.getStorageSync('token')
			return state.userInfo && token
		}
	},
	actions: {
		async loginWx({
			commit
		}, params) {
			return http.post('/app/member/loginByCode', params).then(res => {
				console.log('是否登录成功', res)
				commit('SET_USERINFO', res.data)
				return res
			})

		},
		loginout() {
			commit('SET_USERINFO', null)
			uni.removeStorageSync('user')
		},
		async getSmsCode({
			commit
		}, params){
			// 
			return  await http.post('/app/member/sendVerifyCode',params)
		}
	},
	mutations: {
		SET_USERINFO(state, data) {
			uni.setStorageSync('user', data)
			state.userInfo = data
		}
	}
}