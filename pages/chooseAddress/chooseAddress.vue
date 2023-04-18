<template>
	<view class="container" :style="{'height':scrollHeight+'px'}">
		<view class='content'>
			<view class="current-address">
				当前选中位置：<text>{{currentAddress}}</text>
			</view>
			<view class="box">
				<view class="left">
					<scroll-view :scroll-y="true" :style="{'height':(scrollHeight - 50)+'px'}"
						:scroll-top="scrollTopLeft">
						<view v-for="(item,index) in provinces" @click="toScrollView(index,item.key)">
							<view class="left-item" :class="{'left-active':selectedSub==index}">
								<text>{{item.name}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="right">
					<!-- <van-search background="#F2F2F2" value="{{ keyWord }}" placeholder="请输入搜索关键词" /> -->
					<scroll-view :scroll-y="true" :style="{'height':(scrollHeight - 50)+'px'}"
						:scroll-into-view="toView" scroll-top="0" @scroll="scrollTo" scroll-with-animation>
						<view v-for="(item,idx) in citys" :id="'position'+idx">
							<view class="right-item">
								<view class="right-classify-title">{{item.name}}</view>
								<view class="list">
									<block v-for="d in item.children">
										<view class="item" @click="itemHandleClick(d.key,d.name)">
											<!-- <image :src="{{item.imageUrl}}" mode="aspectFit"></image> -->
											<text>{{d.name}}</text>
										</view>
									</block>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let scrollDdirection = 0;
	// import areaList from '@/utils/area.js'
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				selectedSub: 0, // 选中的分类
				// list: [],
				// listCity: [], // 市
				// listCountry: [], //县
				toView: 'position0', // 滚动视图跳转的位置
				scrollTopLeft: 0, //  左边滚动位置随着右边分类而滚动
				provinces: [], //areaList.province_list,
				citys: [], //areaList.city_list,
				countys: [], // areaList.county_list,
				currentAddress: ''
			}
		},
		computed: {
			// 滚动视图的高度
			scrollHeight() {
				return this.$store.state.systemInfo.windowHeight
			}
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		onLoad(props) {
			this.currentAddress = props.address || ''
			uni.setNavigationBarTitle({
				title: '位置选择'
			});
			// this.initData()
			this.getData()
		},
		methods: {
			...mapActions('com', {
				getProvinces: 'getProvinces',
				getCitys: 'getCitys',
				getAreas: 'getAreas',
			}),
			async getData() {
				let resProvinces = await this.getProvinces()
				this.provinces = resProvinces.items
				let resCitys = await this.getCitys({
					provinceId: this.provinces[0].id
				})
				this.citys = resCitys.items

			},
			initData(address = '') {
				let _provinces = Object.keys(this.provinces).map(key => {
					return {
						key: key,
						name: this.provinces[key]
					}
				})

				this.list = _provinces
				this.refreshe(_provinces[0].key)
			},

			/**
			 * 监听滚动条滚动事件
			 */
			scrollTo(e) {
				// console.log(e)
				const scrollTop = e.detail.scrollTop; // +54 滚动的Y轴 54是收索框的高度
				const {
					selectedSub,
					list
				} = this;
				let left_ = 0;
				if (scrollDdirection < scrollTop) {
					// 向上滑动
					scrollDdirection = scrollTop;
					// 计算偏移位置
					if (
						selectedSub < list.length - 1 &&
						scrollTop >= list[selectedSub + 1].offsetTop
					) {
						if (selectedSub > 2) {
							left_ = (selectedSub - 2) * 50;
						}
						this.selectedSub = selectedSub + 1
						this.scrollTopLeft = left_
					}
				} else {
					// 向下滑动
					scrollDdirection = scrollTop;
					// 计算偏移位置
					if (
						selectedSub > 0 &&
						scrollTop < list[selectedSub].offsetTop &&
						scrollTop > 0
					) {
						if (selectedSub > 3) {
							left_ = (selectedSub - 4) * 50;
						}
						this.selectedSub = selectedSub - 1
						this.scrollTopLeft = left_
					}
				}
			},
			/**
			 * 获取右边每个分类的头部偏移量
			 */
			lisenerScroll() {
				// 获取各分类容器距离顶部的距离
				new Promise((resolve) => {
					let query = uni.createSelectorQuery();
					for (let i in this.list) {
						query.select(`#position${i}`).boundingClientRect();
					}
					query.exec(function(res) {
						resolve(res);
					});
				}).then((res) => {
					this.list.forEach((item, index) => {
						item.offsetTop = res[index].top;
					});
					this.scrollInfo = res
					// this.list = this.list
				});
			},
			/**
			 * 跳转滚动条位置
			 */
			toScrollView(index, key) {
				this.refreshe(key)
				const {
					selectedSub
				} = this;
				let _left = 0;
				if (index > 3) {
					_left = (index - 3) * 50; // 左边侧栏item高度为50，可以根据自己的item高度设置
				}
				this.selectedSub = index
				// this.toView = `position${index}`
				this.scrollTopLeft = _left

			},
			refreshe(key) {
				let pKey = key.substring(0, 2)
				let cityKeys = Object.keys(this.citys).filter(d => d.startsWith(pKey))
				this.listCity = cityKeys.map(d => {
					let cKey = d.substring(0, 4)
					let countryKeys = Object.keys(this.countys).filter(d => d.startsWith(cKey))
					let _country = countryKeys.map(key => {
						return {
							key: key,
							name: this.countys[key]
						}
					})
					return {
						key: d,
						name: this.citys[d],
						children: _country
					}
				})

				setTimeout(() => {
					this.toView = 'position0'

				}, 100)

			},
			itemHandleClick(key, name) {
				console.log('选中位置', key)
				this.currentAddress = name
				this.$store.commit('SET_CURRENT_ADDRESS', name)
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background: #F2F2F2;
		overflow: hidden;
	}

	.current-address {
		padding: 20rpx 30rpx;
		height: 60rpx;
		line-height: 60rpx;
	}

	.box {
		display: flex;
	}

	.left {
		// padding-top: 40rpx;
		width: 180rpx;
		margin-right: 24rpx;
		background-color: #fff;
	}

	.left-item {
		padding: 30rpx 20rpx;
		text-align: center;
		font-size: 28rpx;
		color: #23292F;
		position: relative;
	}

	.left-active {
		background-color: #F2F2F2;
		/* border-left: 6rpx solid red; */
	}

	.left-active::before {
		content: '';
		position: absolute;
		width: 6rpx;
		height: 100%;
		top: 0;
		left: 0;
		background-image: linear-gradient(180deg, #FFD5CF 0%, #ffd200 100%);
		border-radius: 3rpx;
	}

	.right {
		flex: 1;
		background: #F2F2F2;
		// padding-top: 30rpx;
		/* padding: 0 20rpx; */
	}

	.right-classify-title {
		font-size: 28rpx;
		color: #23292F;
		// background-color: #F2F2F2;
		font-weight: bold;
		height: 80rpx;
		line-height: 80rpx;
	}

	.list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background: #fff;
	}

	.list .item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: calc(calc(100% / 3));
		height: 74rpx;
		padding: 20rpx 0;
		position: relative;
	}

	.list .item image {
		width: 100%;
	}

	.list .item text {
		text-align: center;
		margin: 14rpx 0;
		font-size: 24rpx;
		color: #23292F;
	}
</style>