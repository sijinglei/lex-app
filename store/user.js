import http from '../utils/http.js'
export default {
	namespaced: true,
	state: {},
	getters: {},
	actions: {
		async login({
			commit
		}, params) {
			return http.post('/login', params).then(res => {
				console.log('params', params)
				let data = res.data || {
					name: 'aaa'
				}
				commit('SET_USERINFO', data)
				return data
			})

		},
	},
	mutations: {
		SET_USERINFO(state, data) {
			uni.setStorageSync('user', data)
			state.userInfo = data
		}
	}
}