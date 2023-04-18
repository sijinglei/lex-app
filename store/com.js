import http from '../utils/http.js'
export default {
	namespaced: true,
	state: {},
	getters: {

	},
	actions: {
		/**
		 * 省
		 */
		getProvinces({
			commit
		}, params) {
			return http.get('/app/province/getProvinces', {})
		},
		/**
		 * 市
		 * @params  provinceId
		 */
		getCitys({
			commit
		}, params) {
			return http.get('/app/city/getCitys', params)
		},
		/**
		 * 县/区
		 * @params  cityId
		 */
		getAreas({
			commit
		}, params) {
			return http.get('/app/area/getAreas', params)
		}
	},
	mutations: {

	}
}