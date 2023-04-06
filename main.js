import App from './App'


// #ifndef VUE3
import Vue from 'vue'
// 暂无内容
import noData from 'components/noData/noData.vue'
Vue.component('no-data', noData)
import store from 'store/index.js'
import share from '@/utils/share'
Vue.mixin(share)

import uView from 'uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 30
		},
		switch: {
			size: 30
		}
		// 其他组件属性配置
		// ......
	}
})

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.showMsg = (msg) => {
	uni.showToast({
		title: msg
	})
}

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {
		app
	}
}
// #endif