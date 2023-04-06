import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user
	},
	state: {
		isIOS: true,
		statusBar: 0,
		customBar: 0,
		systemInfo: null,
		currentAddress: ''
	},
	mutations: {
		SET_STATUS_BAR(state, data) {
			state.statusBar = data
			console.log('状态栏=', data)
		},
		SET_CUSTOM_BAR(state, data) {
			state.customBar = data
			console.log('状态栏+导航栏=', data)
		},
		SET_SYSTEM_INFO(state, data) {
			state.systemInfo = data
			console.log('状态', data)
		},
		SET_SYSTEM_IOSANDROID(state, data) {
			state.isIOS = data
		},
		SET_CURRENT_ADDRESS(state, data) {
			state.currentAddress = data
		}
	}
})
export default store