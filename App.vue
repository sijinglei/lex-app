<script>
	import env from './utils/env.js'
	import http from './utils/http.js'
	export default {
		onLaunch: function() {
			this.getSysInfo()
			this.getCurrentLocation()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			getSysInfo() {
				uni.getSystemInfo({
					success: (e) => {
						let statusBar = 0 // 状态拦高度
						let customBar = 0 // 状态栏高度 + 导航栏高度
						// #ifdef MP
						console.log('所有小程序平台')
						statusBar = e.statusBarHeight
						customBar = e.statusBarHeight + 45
						if (e.platform === 'android') {
							this.$store.commit('SET_SYSTEM_IOSANDROID', false)
							customBar = e.statusBarHeight + 50
						}
						// #endif

						// #ifdef MP-WEIXIN
						console.log('微信小程序')
						statusBar = e.statusBarHeight
						// @ts-ignore
						const custom = wx.getMenuButtonBoundingClientRect()
						customBar = custom.bottom + custom.top - e.statusBarHeight
						// #endif

						// #ifdef APP-PLUS
						console.log('app-plus', e)
						statusBar = e.statusBarHeight
						customBar = e.statusBarHeight + 45
						// #endif


						// #ifdef H5
						statusBar = 0
						customBar = e.statusBarHeight + 45
						// #endif
						// 缓存状态栏高度和导航栏高度
						this.$store.commit('SET_STATUS_BAR', statusBar)
						this.$store.commit('SET_CUSTOM_BAR', customBar)
						this.$store.commit('SET_SYSTEM_INFO', e)

					},
				});
			},
			// 通过自带的方法获取到当前的经纬度，调用方法获取到地址获取到地址的中文信息
			getCurrentLocation() {
				let that = this //在uniapp中药定义一下this才能使用
				let positionInfo = {}
				// uni.chooseLocation({
				// 	success:function(res){
				// 		console.log(res)
				// 	}
				// })
				// uni.getLocation({
				// 	type: 'wgs84',
				// 	success: function(res) {
				// 		console.log(res)
				// 		positionInfo.longitude = res.longitude;
				// 		positionInfo.latitude = res.latitude;
				// 		that.loAcquire(positionInfo.longitude, positionInfo.latitude)
				// 	}
				// });
			},
			loAcquire(longitude, latitude) {
				let that = this;
				uni.showLoading({
					title: '获取位置中',
					mask: true
				});
				let str = `output=jsonp&key=${env.mapKey}=${latitude},${longitude}` //记得在这里要输入密钥哦！
				http.get('https://apis.map.qq.com/ws/geocoder/v1/?' + str, {}).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.status == 0) {
						// that.positionInfo.address = '当前位置是:' + res.result.address_component.street_number; //当前定位
						that.$store.commit('SET_CURRENT_ADDRESS', res.result.address_component.street_number)
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import '/static/css/common.css';

	page {
		--tc: #ffd200;
		--theam-color: #ffd200;
		--fcolor: #333333;
		--ww: 0.872;
		background-color: #efefef;
	}
</style>