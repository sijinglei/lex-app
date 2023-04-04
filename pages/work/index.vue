<template>
	<view class="work">
		<view class="head" :class="{fixed:isFixed}"
			:style="{'padding-top':statusBarHeight+'px','height':(!isFixed?titleBarHeight:0)+'px'}">
			<image class="logo" src="/static/image/logo.jpg" mode="aspectFill"></image>
			<view class="title">
				<text class="h1">乐享零工</text>
				<text class="txt">随时随地，轻松工作！</text>
			</view>
		</view>
		<view class="top-bar" :class="{fixed:isFixed}" :style="isFixed?'top:'+(statusBarHeight-2)+'px':''">
			<div class="content">
				<view class="position">
					南山区
					<uni-icons type="bottom" size="20"></uni-icons>
				</view>
				<view class="search" @click="toSearch">
					<uni-icons type="search" size="20"></uni-icons>
					搜职位
				</view>
				<view class="qiuzhi" :class="{fixed:isFixed}">
					<image class="lingdang" src="/static/image/icon/ico_qzyx.png" mode="aspectFill" />
					求职意向
				</view>
			</div>
		</view>
		<view class="main" @touchstart="touchStart" @touchend="touchEnd">
			<view class="fillters" :class="{fixed:isFixed}" :style="isFixed?'top:'+(statusBarHeight+45)+'px':''">
				<view class="left">
					<view :class="{active:d.id==currentId}" v-for="d in filters" @click.stop="tabClick(d)">{{d.text}}
					</view>

				</view>
				<view class="right">
					筛选
					<van-icon name="arrow-down" />
				</view>
			</view>
			<view class="list" :animation="animationData">
				<block v-for="d in list" :key="d">
					<comItem :item="d" :type="1" />
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import comItem from '@/components/comItem.vue'
	import {
		mapActions
	} from 'vuex'
	export default {
		components: {
			comItem
		},
		data() {
			return {
				statusBarHeight: 0,
				titleBarHeight: 44,
				wHeight: "",
				keywords: "", //搜索关键字
				currentId: 1,
				filters: [{
						id: 1,
						text: '推荐'
					},
					{
						id: 2,
						text: '附近'
					},
					{
						id: 3,
						text: '急招'
					}
				],
				startX: 0,
				isLeft: true,
				animation: null,
				animationData: {},
				list: [],
				rowData: [],
				isloading: false,
				total: 30,
				isFixed: false
			}
		},
		onLoad() {
			let that = this;
			// 创建动画实例
			this.animation = uni.createAnimation({
				timingFunction: 'ease',
				duration: 120
			})
			uni.getSystemInfo({
				success(res) {
					let headerH = uni.getWindowInfo();
					console.log('11111==', headerH)
					that.statusBarHeight = res.statusBarHeight
					that.wHeight = res.windowHeight
					// that.titleBarHeight = headerH.bottom + headerH.top - res.statusBarHeight * 2 + 20
				},
			});
			// 生生模拟数据
			that.rowData = this.initData(20)
			console.log(this.list)
			this.getList()
		},
		onShow() {
			console.log('page Show')
		},
		onHide() {
			console.log('page Hide')
		},
		methods: {
			...mapActions({
				login: 'user/login'
			}),
			onPullDownRefresh() {
				uni.stopPullDownRefresh();
			},
			initData(n) {
				let arr = new Array(n).fill(0).map((d, i) => {
					let min = Math.ceil(1);
					let max = Math.floor(3);
					let type = Math.floor(Math.random() * (max - min + 1)) + min
					return {
						id: i + 1,
						type: type,
						title: `餐厅服务员${type}`
					}
				})
				return arr
			},
			tabClick({
				id
			}) {
				this.isLeft = id > this.currentId
				this.currentId = id
				this.getList()
			},
			touchStart(e) {
				if (e.touches.length == 1) {
					this.startX = e.touches[0].clientX;
				}
			},
			touchEnd(e) {
				if (e.changedTouches.length == 1) {
					var endX = e.changedTouches[0].clientX;
					let diff = endX - this.startX;
					if (Math.abs(diff) > 100) {
						if (diff > 0) {

							//左滑
							console.log('1111')
							if (this.currentId == 1) {
								this.currentId = 3
							} else {
								this.currentId--
							}
							// 动画：右出左进
							this.animation.translateX('100%').step() //先横向向右移至100%，即整块移没
								.opacity(0).step({
									duration: 10
								}) // 再使题目部分透明
								.translateX('-100%').step({
									duration: 10
								}) // 然后趁透明横向向左移至-100%
								.translateX(0).opacity(1).step() //接着横向向右移动至初始位置并恢复透明度

						} else {
							console.log('22222')
							//右滑
							if (this.currentId == 3) {
								this.currentId = 1
							} else {
								this.currentId++
							}
							// 动画：左出右进
							this.animation.translateX('-100%').step()
								.opacity(0).step({
									duration: 10
								})
								.translateX('100%').step({
									duration: 10
								})
								.translateX(0).opacity(1).step()

						}

						this.animationData = this.animation.export()

						setTimeout(() => {
							this.animationData = {}
						}, 250)
						this.getList()
					}
				}
			},
			getList() {
				this.isloading = true
				this.list = this.rowData.filter(d => d.type == this.currentId)
				this.isloading = false
			},
			onReachBottom() {
				console.log('上拉加载更多。。。')
				if (this.rowData.length >= this.total) return this.showMsg('数据加载完毕')
				if (this.isloading) return
				setTimeout(() => {
					this.rowData = [...this.rowData, ...this.initData(10)]
					this.getList()
				}, 1000)
			},
			onPageScroll(e) {
				this.isFixed = e.scrollTop >= this.titleBarHeight
			},
			toSearch() {
				uni.navigateTo({
					url: "/pages/search/search?type=1"
				})
			},
			clickLogin() {
				let postData = {
					username: '111',
					password: '22222'
				}
				this.login(postData).then(res => {
					console.log('登录成功', res)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>