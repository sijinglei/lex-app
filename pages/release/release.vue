<template>
	<view>
		<template>
			<view class="replease">
				<uni-forms ref="form" :modelValue="formData" label-width="120">
					<view class="form-cell">
						<view class="label tip">岗位信息</view>
						<view class="between item">是否急招
							<u-switch  v-model="formData.urgent" @change="change" :activeValue="1"
								:inactiveValue="0"></u-switch>
						</view>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="title" label="">
							<label slot="label"><text class="red">*</text>发布标题</label>
							<!-- input 的校验时机 -->
							<input v-model="formData.title" placeholder="如餐厅服务员/工地焊工" />
						</uni-forms-item>
					</view>

					<view class="form-cell line05">

						<uni-forms-item ref="input" name="type" label="岗位类型">
							<view @click="openGw">{{currentJobName||'岗位类型'}}</view>
							<uni-icons type="forward" size="20" color="#333"></uni-icons>
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="quantity" label="需求人数">
							<uni-number-box v-model="formData.quantity" :min="1" @change="valChange" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="sex" label="性别">
							<u-radio-group v-model="formData.sex" placement="row" active-color="#07C160">
								<u-radio :name="1" label="男" labelSize="24"></u-radio>
								<u-radio :name="2" label="女" labelSize="24"></u-radio>
								<u-radio :name="0" label="未知" labelSize="24"></u-radio>
							</u-radio-group>
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="title" label="年龄">
							<!-- input 的校验时机 -->
							<input v-model="formData.age" placeholder="不限" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-easyinput type="textarea" v-model="formData.other" placeholder="如有其他要求，请填写（非必填）" />
					</view>
					<view class="form-cell">
						<view class="label tip">工作内容</view>
					</view>
					<view class="form-cell line05">
						<input v-model="formData.content" placeholder="请填写工作内容" />
					</view>
					<view class="form-cell">
						<view class="label tip">工作时间</view>
					</view>
					<view class="form-cell line05">
						<input v-model="formData.jobTime" placeholder="请填写工作时间" />
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="address" label="发布区域">
							<view @click="chooseArea">{{publishingArea||'请选择发布区域'}}</view>
							<uni-icons type="forward" size="20" color="#333"></uni-icons>
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="address" label="定位位置">
							<view @click="chooseAddr">{{currentChooseAddr||'请选择位置'}}</view>
							<uni-icons type="forward" size="20" color="#333"></uni-icons>
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="address" label="详细地址">
							<!-- input 的校验时机 -->
							<input v-model="formData.address" placeholder="请填写详细地址(门牌号等)" />
						</uni-forms-item>
					</view>
					<view class="form-cell">
						<view class="label tip">报酬信息</view>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="settlement" label="结算方式">
							<u-radio-group v-model="formData.settlement" placement="row" active-color="#07C160">
								<u-radio :name="1" label="月结" iconSize="24" labelSize="24"></u-radio>
								<u-radio :name="2" label="周结" iconSize="24" labelSize="24"></u-radio>
								<u-radio :name="3" label="日结" iconSize="24" labelSize="24"></u-radio>
								<u-radio :name="4" label="完工结" iconSize="24" labelSize="24"></u-radio>
							</u-radio-group>
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="salary" label="薪酬说明">
							<uni-easyinput type="textarea" v-model="formData.salary" placeholder="请填写薪酬说明" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="welfare" label="福利说明">
						<uni-easyinput type="textarea" v-model="formData.welfare" placeholder="请填写福利说明" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="mobile" label="联系电话">
							<input v-model="formData.mobile" placeholder="联系电话" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="weixin" label="联系微信">
							<input v-model="formData.weixin" placeholder="联系微信" />
						</uni-forms-item>
					</view>

					<button class="button" @click="submit">确认并发布</button>

				</uni-forms>
				<!-- 普通弹窗 -->
				<u-popup :show="showGw" @close="closeGw" :round="10" @open="openGw">
					<view class="popup-main">
						<view class="head">
							<view @click="showGw=false">取消</view>
							<view @click="sureGw">确认</view>
						</view>
						<view class="content gw">

							<view class="popup-box line05" v-for="d in gwList" :key="d.id" @click="ok(d)"
								:class="{checked:d.code==currentJobItem.code}">
								<view>{{d.value}}</view>
								<text>描述：{{d.memo}}</text>
							</view>
						</view>
					</view>
				</u-popup>
				<u-toast ref="uToast"></u-toast>
			</view>
		</template>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				showGw: false,
				currentJobItem: '',
				currentJobName: '',
				formData: {
					id: '',
					urgent: 1,
					type: 1,
					age: '',
					sex: 1,
					quantity: 1,
					settlement: 1,
					title: '',
					content: '',
					jobTime: '',
					salary: '',
					welfare: '',
					mobile: '',
					weixin: '',
					address: '',
					longitude: '', // 经度
					latitude: '' //纬度
				},
				gwList: [],
				currentChooseAddr: '',
				publishingArea:''

			};
		},
		onReady() {

		},
		onShow() {
			this.getGwList()
		},
		methods: {
			async getGwList() {
				this.gwList = await this.$store.dispatch('user/getDictType', {
					type: 'jobType'
				})
			},
			ok(d) {
				this.currentJobItem = d
			},
			openGw() {
				this.showGw = true
			},
			closeGw() {
				this.showGw = false
			},
			valChange(value) {
				console.log('当前值为: ' + value)
			},
			change(e) {
				console.log('change', e);
			},
			sureGw() {
				this.formData.type = this.currentJobItem.code
				this.currentJobName = this.currentJobItem.value
				this.showGw = false
			},
			chooseArea(){
				uni.navigateTo({
					url:'/pages/chooseAddress/chooseAddress?isMore=1'
				})
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
				if (this.formData.type == '') {
					this.showToast('请选择岗位类型')
					return false
				}
				if (this.formData.content == '') {
					this.showToast('请填写工作内容')
					return false
				}
				if (this.formData.jobTime == '') {
					this.showToast('请填写工作时间')
					return false
				}
				if (this.formData.longitude == '' || this.formData.latitude == '') {
					this.showToast('请选择发布位置')
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
				this.$store.dispatch('user/addJob', this.formData).then(res => {
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
	@import './release.scss';
</style>