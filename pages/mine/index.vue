<template>
	<view class="work">
		<view class="head mine" :style="{'padding-top':statusBarHeight+'px'}">
			<view class="info">
				<image v-if="wxuserInfo&&wxuserInfo.avatarUrl" class="logo" :src="wxuserInfo.avatarUrl" mode="aspectFill"></image>
				<image v-else class="logo" src="/static/image/logo.jpg" mode="aspectFill"></image>
				<view class="title">
					<text class="h1">{{(wxuserInfo&&wxuserInfo.nickName)||'--'}}</text>
					<text class="txt">176****6879</text>
				</view>
			</view>
			<view class="tabs">
				<view class="tab-box">
					<text class="num">99</text>
					<text class="tip">查看</text>
				</view>
				<view class="tab-box">
					<text class="num">2</text>
					<text class="tip">沟通</text>
				</view>
				<view class="tab-box">
					<text class="num">20</text>
					<text class="tip">收藏</text>
				</view>
			</view>
		</view>

		<view class="main">
			<div class="box">
				<view class="tip">常用功能</view>
				<view class="menus">
					<div class="item">
						<uni-icons type="eye" size="24"></uni-icons>
						<text>我查看的</text>
					</div>
					<div class="item">
						<uni-icons type="folder-add" size="24"></uni-icons>
						<text>我发布的</text>
					</div>
					<div class="item">
						<uni-icons type="star" size="24"></uni-icons>
						<text>我收藏的</text>
					</div>
					<div class="item">
						<uni-icons type="gear" size="24"></uni-icons>
						<text>设置</text>
					</div>
					<div class="item">
						<uni-icons type="help" size="24"></uni-icons>
						<text>意见反馈</text>
					</div>
				</view>
			</div>
			<button @click="logout()">退出登录</button>
			<view class="copy">
				<view>客服电话：17665256666 工作时间：9:30-18:30</view>
				<view>人力资源许可证｜营业执照</view>
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
			}
		},
		computed:{
				wxuserInfo(){
					return this.$store.state.wxuserInfo
				}
		},
		onLoad() {
			let that = this;
			uni.getSystemInfo({
				success(res) {
					let headerH = uni.getWindowInfo();
					that.statusBarHeight = res.statusBarHeight + 44
					that.wHeight = res.windowHeight
					that.titleBarHeight = headerH.bottom + headerH.top - res.statusBarHeight * 2 + 20
				},
			});
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
			logout() {
				uni.clearStorageSync()
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../work/index.scss';
	.tabs {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.tab-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.num {
				font-size: 30rpx;
				font-weight: bold;
			}

			.tip {
				margin-top: 8rpx;
				font-size: 24rpx;
				color: #666;
			}
		}
	}

	.main {
		padding: 0 30rpx;

		.box {
			background: #fff;
			border-radius: 24rpx;
			min-height: 100rpx;
			height: auto;
			overflow: hidden;
			padding: 30rpx;

			.tip {
				font-size: 28rpx;
				margin-bottom: 40rpx;
			}

			.menus {
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.item {
					width: calc(100% / 4);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-bottom: 40rpx;

					text {
						font-size: 24rpx;
						color: #666;
					}
				}
			}
		}

		button {
			margin-top: 40rpx;
			color:#444;
		}

		.copy {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			color:#999;
			margin-top: 40rpx;
		}
	}
</style>