<template>
	<view class="form-main">
		<form @submit="login">
			<image class="logo" src="../../static/image/logo.jpg" mode="aspectFit"></image>
			<view class="form-group line05">
				<input name="mobile" type="number" focus maxlength="11" 
					placeholder="请输入您的手机号码" />
			</view>
			<view class="form-group line05">
				<input name="password" password type="text"  placeholder="请输入您的登录密码" />
			</view>

			<!-- 	<view class="uni-form-item uni-column">
				<view class="uni-input-wrapper">
					<input class="uni-input" placeholder="请输入您的登录密码" :password="showPassword" />
					<text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']"
						@click="changePassword">&#xe568;</text>
				</view>
			</view> -->

			<button type="save" form-type="submit">登录</button>
			<button type="save" @click="register">去注册</button>
			<u-toast ref="uToast"></u-toast>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					mobile: '',
					password: '',
				},
				showPassword: true
			};
		},
		methods: {
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			showToast(message) {
				this.$refs.uToast.show({
					message
				})
			},
			validData() {
				console.log('this.formData', this.formData)
				if (this.formData.mobile == '') {
					this.showToast('手机号码不能为空')
					return false
				}
				if (!/^1[3456789]\d{9}$/.test(this.formData.mobile)) {
					this.showToast('手机号码格式错误');
					return false;
				}
				if (this.formData.password == '') {
					this.showToast('密码不能为空')
					return false
				}
				return true
			},

			login(e) {
				// const formdata = e.detail.value
				// console.log('formdata', formdata)
				this.formData = e.detail.value
				console.log(this.formData)
				if (!this.validData()) return
				this.$store.dispatch('user/login', this.formData).then(res => {
					console.log('de==', res)
					if (res.code == 0) {
						uni.switchTab({
							url: '/pages/work/index'
						})
					} else {
						this.showToast(res.msg)
					}
				})
			},
			register() {
				uni.navigateTo({
					url: '/pages/register/register'
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

</style>