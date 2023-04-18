<template>
	<view class="form-main">
		<image class="logo" src="../../static/image/logo.jpg" mode="aspectFit"></image>
		<view class="form-group line05">
			<input name="mobile" type="number" v-model="form.mobile" placeholder="请输入您的手机号码" />
		</view>
		<view class="form-group line05">
			<input name="name" type="text" v-model="form.name" placeholder="请输入用户名" />
		</view>
		<view class="form-group line05">
			<input name="password" password type="text" v-model="form.password" placeholder="请输入登录密码" />
		</view>
		<view class="form-group line05">
			<input name="password2" password type="text" v-model="form.password2" placeholder="请确认登录密码" />
		</view>
		<view class="form-group line05">
			<input name="validateCode" id="codeField" type="number" v-model="form.validateCode"
				placeholder="请输入短信验证码" />
			<text class="yzm" v-if="isShowYan" @click="getSmsCode">获取验证码</text>
			<text class="yzm" v-else>{{countTime}}S</text>
		</view>
		
		<button type="save" @click="register">注册</button>
		<view class="hasuser" @click="toLogin">已有账号，去登录</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				isShowYan: true,
				countTime: 60,
				form: {
					inviterCode: '', //邀请码
					mobile: '',
					password: '',
					validateCode: '',
					name: '',
					code: ''
				}
			};
		},
		onLoad(options) {
			this.form.code = options.code
		},
		methods: {
			...mapActions({
				smsCode: 'user/getSmsCode'
			}),
			showToast(message) {
				this.$refs.uToast.show({
					message
				})
			},
			validData() {
				if (this.form.mobile == '') {
					this.showToast('手机号码不能为空')
					return false
				}

				if (!/^1[3456789]\d{9}$/.test(this.form.mobile)) {
					this.showToast('手机号码格式错误');
					return false;
				}
				return true
			},
			getSmsCode(e) {
				if (!this.validData()) return
				this.smsCode({
					mobile: this.form.mobile
				}).then(res => {
					console.log('验证码', res)
					this.startCountdown()
					this.isShowYan = false
				}).catch(err => {})


			},
			startCountdown() {
				let time = 59
				let timer = setInterval(() => {
					this.countTime = time--
					if (time == 0) {
						clearInterval(timer)
						this.isShowYan = true
					}
				}, 1000)
			},
			register() {
				if (!this.validData()) return
				if (this.form.name == '') {
					this.showToast('用户名不能为空')
					return false
				}
				if (this.form.password == '' || this.form.password2 == '') {
					this.showToast('密码不能为空')
					return false
				}
				if (this.form.password != this.form.password2) {
					this.showToast('两次密码不一致，请重新输入')
					return false
				}
				if (this.form.validateCode == '') {
					this.showToast('手机验证码不能为空')
					return false
				}
				// #ifdef MP-WEIXIN
				let res = uni.login({
					provider: 'weixin'
				})
				this.form.code = res.code
				// #endif
				// #ifndef MP-MP-WEIXIN
					this.form.code = ''
				// #endif
				this.$store.dispatch('user/register', this.form).then(res => {
					console.log('注册返回', res)
					if (res.code == 0) {
						uni.switchTab({
							url: '/pages/work/index'
						})
					}
				})
			},
			toLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss">
.hasuser{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80rpx;
	color: #ccc;
	text-decoration: underline;
	padding: 4rpx;
}
</style>