<script>
	export default {
		onLaunch: function() {
			this.getSysInfo()
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
			}
		}
	}
</script>
<style>
	@import '/static/css/common.css';

	page {
		--tc: #ffd200;
		--theam-color: #ffd200;
		--fcolor: #333333;
		--ww: 0.872;
		background-color: #efefef;
	}
</style>