import env from './env.js'

const $request = (url, data, method = 'POST', headers = "application/json;") => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		uni.request({
			url: env.baseUrl + url,
			method: method,
			data: data,
			header: {
				'Content-Type': headers
			},
			success(res) {
				resolve(res)
				uni.hideLoading(); //关闭loading
			},
			fail(error) {
				reject(error);
				throw new Error(error);
				uni.hideLoading(); //关闭loading
			},
			complete() {
				uni.hideLoading(); //关闭loading
			}
		})
	})
}
//get请求
const $get = (url, data) => {
	return $request(url, data, 'GET')
}
//post请求
const $post = (url, data) => {
	return $request(url, data, 'POST')
}
//给uniapp原生的requset赋值
//记得要在mian.js中引用
// uni.$request = $request
// uni.$get = $get
// uni.$post = $post
export default {
	get: $get,
	post: $post
}