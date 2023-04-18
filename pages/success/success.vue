<template>
	<view class="success-page">
		<image class="state-img" src="../../static/image/done.png" mode="aspectFit"></image>
		<view class="h1">发布审核中，请耐心等待</view>
		<text class="txt">审核通过后，系统将会立即通知您，
			请保持电话畅通，微信可添加！</text>
		<button class="button" @click="toHome">回到首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toHome() {
				uni.switchTab({
					url: '/pages/work/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.success-page {
		display: flex;
		margin-top: 204rpx;
		flex-direction: column;
		align-items: center;

		.state-img {
			width: 128rpx;
			height: 128rpx;
		}

		.h1 {
			color: #333333;
			font-size: 44rpx;
			font-weight: bold;
			line-height: 62rpx;
			margin-top: 26rpx;
		}

		.txt {
			color: #666666;
			font-size: 36rpx;
			line-height: 50rpx;
			text-align: center;
			margin-top: 26rpx;
			margin-bottom: 40rpx;
		}
	}
</style>