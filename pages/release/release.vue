<template>
	<view>
		<template>
			<view class="replease">
				<uni-forms ref="form" :modelValue="formData" validate-trigger="bind" label-width="120">
					<view class="form-cell">
						<view class="label tip">岗位信息</view>
						<view class="between item">是否急招
							<u-switch v-model="formData.isJobHot" @change="change"></u-switch>
						</view>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="title" label="发布标题">
							<!-- input 的校验时机 -->
							<input v-model="formData.title" placeholder="如餐厅服务员/工地焊工" />
						</uni-forms-item>
					</view>


					<view class="form-cell line05">
						<uni-forms-item ref="input" name="title" label="岗位类型">
							<!-- input 的校验时机 -->
							<input v-model="formData.jobType" placeholder="如餐厅服务员/工地焊工" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="title" label="需求人数">
							<!-- input 的校验时机 -->
							<uni-number-box v-model="formData.jobPerson" :min="1" @change="valChange" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="title" label="性别">
							<u-radio-group v-model="formData.sex" placement="row" active-color="#07C160">
								<u-radio label="男" iconSize="24" labelSize="24"></u-radio>
								<u-radio label="女" iconSize="24" labelSize="24"></u-radio>
								<u-radio label="未知" iconSize="24" labelSize="24"></u-radio>
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
						<input v-model="formData.remark" placeholder="如有其他要求，请填写（非必填）" />
					</view>
					<view class="form-cell">
						<view class="label tip">工作内容</view>
					</view>
					<view class="form-cell line05">
						<input v-model="formData.jobContent" placeholder="请填写工作内容" />
					</view>
					<view class="form-cell">
						<view class="label tip">工作时间</view>
					</view>
					<view class="form-cell line05">
						<input v-model="formData.jobTime" placeholder="请填写工作时间" />
					</view>
					<view class="form-cell">
						<view class="label tip">位置信息</view>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="address" label="定位位置">
							<!-- input 的校验时机 -->
							<!-- <input v-model="formData.title" placeholder="请选择位置" /> -->
							<view>请选择位置</view>
							<uni-icons type="forward" size="20" color="#333"></uni-icons>
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="detailAddress" label="详细地址">
							<!-- input 的校验时机 -->
							<input v-model="formData.detailAddress" placeholder="请填写详细地址(门牌号等)" />
						</uni-forms-item>
					</view>
					<view class="form-cell">
						<view class="label tip">报酬信息</view>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="settleMethod" label="结算方式">
							<u-radio-group v-model="formData.settleMethod" placement="row" active-color="#07C160">
								<u-radio label="月结" iconSize="24" labelSize="24"></u-radio>
								<u-radio label="周结" iconSize="24" labelSize="24"></u-radio>
								<u-radio label="日结" iconSize="24" labelSize="24"></u-radio>
								<u-radio label="完工结" iconSize="24" labelSize="24"></u-radio>
							</u-radio-group>
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="salaryDesc" label="薪酬说明">
							<!-- input 的校验时机 -->
							<!-- <input v-model="formData.title" placeholder="请填写详细地址(门牌号等)" /> -->
							<uni-easyinput type="textarea" v-model="formData.salaryDesc" placeholder="请填写薪酬说明" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="benefitDesc" label="福利说明">
							<!-- input 的校验时机 -->
							<uni-easyinput type="textarea" v-model="formData.benefitDesc" placeholder="请填写福利说明" />
							<!-- <input v-model="formData.title" placeholder="请填写详细地址(门牌号等)" /> -->
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="mobile" label="联系电话">
							<!-- input 的校验时机 -->
							<input v-model="formData.mobile" placeholder="13599999999" />
						</uni-forms-item>
					</view>
					<view class="form-cell line05">
						<uni-forms-item ref="input" name="wechat" label="联系微信">
							<!-- input 的校验时机 -->
							<input v-model="formData.wechat" placeholder="13599999999" />
						</uni-forms-item>
					</view>
					<!-- 				<uni-forms-item name="age" label="年龄">
						<uni-easyinput v-model="formData.age" type="text" placeholder="请输入年龄" />
					</uni-forms-item>
					<uni-forms-item ref="input" name="email" label="邮箱">
						<input v-model="formData.email" placeholder="请输入邮箱" />
					</uni-forms-item> -->
					<button class="button" @click="submit">确认并发布</button>
				</uni-forms>
			</view>
		</template>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					isJobHot: true,
					jobType: 1,
					age: 0,
					sex: 0,
					jobPerson: 1,
					settleMethod: 1,
					title: '',
					jobContent: '',
					jobTime: '',
					address: '',
					detailAddress: '',
					salaryDesc: '',
					benefitDesc: '',
					mobile: '',
					wechat: '',
					remark: '' // 其他
				},
				rules: {
					age: {
						rules: [{
							required: true,
							errorMessage: '请输入年龄',
						}, {
							validateFunction: (rule, value, data, callback) => {
								// 异步需要返回 Promise 对象
								return new Promise((resolve, reject) => {
									setTimeout(() => {
										if (value > 10) {
											// 通过返回 resolve
											resolve()
										} else {
											// 不通过返回 reject(new Error('错误信息'))
											reject(new Error('年龄必须大于十岁'))
										}
									}, 2000)
								})
							}
						}]
					},
					email: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					}
				}
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
			/**
			 * 表单提交
			 * @param {Object} event
			 */
			submit() {
				uni.showLoading()
				this.$refs.form.validate().then(res => {
					uni.hideLoading()
					console.log('表单数据信息：', res);
				}).catch(err => {
					uni.hideLoading()
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>
<style lang="scss">
	@import './release.scss';
</style>