<template>
	<view>
		<view class="form-group line05">
			<input name="phone" type="number" v-model="phone" placeholder="请输入您的手机号码" />
		</view>
		<view class="form-group line05">
			<input name="code" id="codeField" type="number" v-model="code" placeholder="请输入短信验证码" />
			<text class="yzm" v-if="isShowYan" @click="getSmsCode">获取验证码</text>
			<text class="yzm" v-else>({{countTime}}S)</text>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		name: "smsCode",
		data() {
			return {
				isShowYan: true,
				phone: '',
				code: '',
				countTime: 60
			}
		},
		methods: {
			showToast(message) {
				this.$refs.uToast.show({
					message
				})
			},
			validData() {
				if (this.phone == '') {
					this.showToast('手机号码不能为空')
					return false
				}
				if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					this.showToast('手机号码格式错误');
					return false;
				}
				return true
			},
			getSmsCode(e) {
				if (!this.validData()) return
				utils.post('/app/member/sendVerifyCode', {
					mobile: this.phone
				}).then(res => {
					console.log(res)
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
			}
		}
	}
</script>

<style lang="scss">

</style>