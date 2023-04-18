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
		loginWx({
			commit
		}, params) {
			return http.post('/app/member/loginByCode', params).then(res => {
				console.log('是否登录成功', res)
				if (res.code == 0) {
					commit('SET_USERINFO', res.data)
				}
				return res
			})
		},
		login({
			commit
		}, params) {
			return http.post('/app/member/login', params).then(res => {
				console.log('登录成功===', res)
				if (res.code == 0) {
					uni.setStorageSync('token', res.obj.token)
					commit('SET_USERINFO', res.obj)
				}
				return res
			})
		},
		loginout() {
			commit('SET_USERINFO', null)
			uni.removeStorageSync('user')
		},
		getSmsCode({
			commit
		}, params) {
			return http.post('/app/member/sendVerifyCode', params)
		},
		register({
			commit
		}, params) {
			delete params.password2
			return http.post('/app/member/reg', params).then(res => {
				if (res.code == 0) {
					uni.setStorageSync('token', res.obj.token)
					commit('SET_USERINFO', res.obj)
				}
				return res
			})
		},
		getDictType({
			commit
		}, params) {
			return http.get('/app/dictionary/queryByType', params).then(res => {
				return res.items || []
			})
		},
		addJob({
			commit
		}, params) {
			return http.post('/app/job', params)
		},
		addService({
			commit
		}, params) {
			return http.post('/app/convenientService', params)
		},
		/**
		 * 推荐列表
		 */
		recommend({
			commit
		}, params) {
			return http.get('/app/job/recommend', params)
		},
		/**
		 * 附近列表
		 */
		nearby({
			commit
		}, params) {
			return http.get('/app/job/nearby', params)
		},
		/**
		 * 急招列表
		 */
		urgent({
			commit
		}, params) {
			return http.get('/app/job/urgent', params)
		}
	},
	mutations: {
		SET_USERINFO(state, data) {
			uni.setStorageSync('user', data)
			state.userInfo = data
		}
	}
}