<template>
	<view>
		<template>
			<view class="replease">
				<uni-forms ref="form" :modelValue="formData" validate-trigger="bind" label-width="120">
					<view class="form-cell">
						<view class="label tip">服务标题</view>
					</view>
					<view class="form-cell line05">
						<input v-model="formData.title" placeholder="检测漏水与维修" />
					</view>
					<view class="form-cell">
						<view class="label tip">服务内容</view>
					</view>
					<view class="form-cell line05">
						<uni-easyinput type="textarea" v-model="formData.content" placeholder="请填写服务内容" />
					</view>
					<view class="form-cell">
						<view class="label tip">服务时间</view>
					</view>
					<view class="form-cell line05">
						<input v-model="formData.serviceTime" placeholder="请填写服务时间" />
					</view>
					<view class="form-cell">
						<view class="label tip">服务费用说明</view>
					</view>
					<view class="form-cell line05">
						<uni-easyinput type="textarea" v-model="formData.expense" placeholder="请填写服务费用说明" />

					</view>
					<view class="form-cell">
						<view class="label tip">服务区域</view>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="area" label="选择区域">
							<view>请选择位置</view>
							<uni-icons type="forward" size="20" color="#333"></uni-icons>
						</uni-forms-item>
					</view>
					<view class="form-cell">
						<view class="label tip">联系地址</view>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="address" label="定位位置">
							<view @click="chooseAddr">{{currentChooseAddr||'请选择位置'}}</view>
							<uni-icons type="forward" size="20" color="#333"></uni-icons>
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="address" label="详细地址">
							<input v-model="formData.address" placeholder="请填写详细地址(门牌号等)" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="mobile" label="联系电话">
							<input v-model="formData.mobile" placeholder="13599999999" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="weixin" label="联系微信">
							<input v-model="formData.weixin" placeholder="13599999999" />
						</uni-forms-item>
					</view>
					<button class="button" @click="submit">确认并发布</button>
				</uni-forms>
				<u-toast ref="uToast"></u-toast>
			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					id: '',
					title: '',
					content: '',
					serviceTime: '',
					mobile: '',
					weixin: '',
					address: '',
					longitude: '', // 经度
					latitude: '' //纬度
				},
				currentChooseAddr: ''
			};
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			valChange(value) {
				console.log('当前值为: ' + value)
			},
			change(e) {
				console.log('change', e);
			},
			chooseAddr() {
				let that = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.currentChooseAddr = res.address
						that.formData.longitude = res.longitude
						that.formData.latitude = res.latitude
						that.formData.address = res.name
					}
				});
			},
			showToast(message) {
				this.$refs.uToast.show({
					message
				})
			},
			validData() {
				if (this.formData.title == '') {
					this.showToast('标题不能为空')
					return false
				}
				if (this.formData.content == '') {
					this.showToast('请填写服务内容')
					return false
				}
				if (this.formData.serviceTime == '') {
					this.showToast('请填写服务时间')
					return false
				}
				if (this.formData.longitude == '' || this.formData.latitude == '') {
					this.showToast('请选择服务位置')
					return false
				}
				if (this.formData.address == '') {
					this.showToast('请填写具体位置')
					return false
				}
				if (this.formData.mobile == '') {
					this.showToast('手机号码不能为空')
					return false
				}

				if (!/^1[3456789]\d{9}$/.test(this.formData.mobile)) {
					this.showToast('手机号码格式错误');
					return false;
				}
				return true
			},
			/**
			 * 表单提交
			 * @param {Object} event
			 */
			submit() {
				if (!this.validData()) return

				uni.showLoading()
				this.$store.dispatch('user/addService', this.formData).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.showToast(this.formData.id ? '发布成功！' : '更新成功');
						uni.navigateTo({
							url:'/pages/success/success'
						})
					}
				})
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	@import '../release/release.scss';
</style>