<script>
	import env from './utils/env.js'
	import http from './utils/http.js'
	import utils from './utils/utils.js'
	import QQMapWX from './common/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				isIos: false,
				hasLocation: false,
				location: {}
			}
		},
		onLaunch: function() {
			this.getSysInfo()
			this.getCurrentLocation()
			let token = uni.getStorageSync('token') || ''
			let userInfo = uni.getStorageSync('user') || null
			console.log('token', token, userInfo)
			let isLogin = token && userInfo
			console.log('isLogin', isLogin)
			if (!isLogin) {
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/register/register'
				})
				// #endif

				// #ifdef MP-WEIXIN
				this.login()
				// #endif
			}
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
						let locationEnabled = e.locationEnabled; //判断手机定位服务是否开启
						let locationAuthorized = e.locationAuthorized; //判断定位服务是否允许微信授权
						if (!locationEnabled || !locationAuthorized) {
							//手机定位服务（GPS）未授权
							uni.showToast({
								title: "请打开手机GPS",
								icon: "none",
							});
							return
						}
					},
				});
			},
			// 通过自带的方法获取到当前的经纬度，调用方法获取到地址获取到地址的中文信息
			async getCurrentLocation() {
				const position = await this.getLocationInfo();
				this.$store.commit('SET_LONG_LAT', {
					longitude: position.longitude,
					latitude: position.latitude
				})
				this.$store.commit('SET_CURRENT_ADDRESS', position.area)

			},
			//获取位置信息
			async getLocationInfo() {
				let that = this;
				let sys = uni.getSystemInfoSync()
				let isIos = sys.platform == 'ios';
				return new Promise((resolve) => {
					//位置信息默认数据
					let location = {
						longitude: 0,
						latitude: 0,
						province: "",
						city: "",
						area: "",
						street: "",
						address: "",
					};
					uni.getLocation({
						type: 'wgs84', //"gcj02",
						// #ifdef APP
						geocode: true,
						// #endif
						success(res) {
							location.longitude = res.longitude;
							location.latitude = res.latitude;
							if (isIos) {
								location.longitude = res.longitude.toFixed(6);
								location.latitude = res.latitude.toFixed(6);
							}

							// 腾讯地图Api
							const qqmapsdk = new QQMapWX({
								key: env.mapKey //这里填写自己申请的key
							});
							qqmapsdk.reverseGeocoder({
								location,
								success(response) {
									let info = response.result;
									console.log(info);
									location.province = info.address_component.province;
									location.city = info.address_component.city;
									location.area = info.address_component.district;
									location.street = info.address_component.street;
									location.address = info.address;
									resolve(location);
								},
							});
						},
						fail(err) {
							console.log(err)
							resolve(location);
						},
					});
				});
			},
			// getAreaCode通过经纬度(wgs84)坐标获取区域码
			getAreaCode(latitude, longitude) {
				let that = this;
				that.$u.api
					.getAreaCode({
						latitude: latitude,
						longitude: longitude,
					})
					.then((res) => {
						if (res.code == 200) {
							console.log("通过经纬度坐标获取区域码:", res);
							// console.log(res, 'areaCode');
							that.bindList.areaCode = res.data.areaCode;
							that.bindList.specificAddress = res.data.detailLocation;
							that.bindList.address = res.data.areaLocation;
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
						}
					})
					.catch((err) => {
						that.loadState = "加载失败err";
						console.log("getDevList_err:", err); //--------------------
					});
			},
			login() {
				let that = this
				console.log('login')
				uni.login({
					provider: 'weixin',
					success: function(res) {
						let openCode = res.code
						uni.getUserInfo({
							provider: 'weixin',
							success: function(user) {
								let userInfo = user.userInfo
								console.log(userInfo)
								that.$store.commit('SET_WXUSER_INFO', userInfo)
								that.$store.dispatch('user/loginWx', {
									code: openCode
								}).then(logRes => {
									console.log('是否登录', logRes)
									if (logRes.code == 100) {
										uni.navigateTo({
											url: '/pages/login/login'
										})
									} else {
										uni.navigateTo({
											url: '/pages/work/index'
										})
									}
								})
							}
						})
					},
					fail(e) {
						console.log(e)
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	@import '/static/css/common.css';
	@import "@/uni_modules/uview-ui/index.scss";
	@import './common/css/common.scss';

	page {
		--tc: #ffd200;
		--theam-color: #ffd200;
		--fcolor: #333333;
		--ww: 0.872;
		background-color: #efefef;
	}
</style>