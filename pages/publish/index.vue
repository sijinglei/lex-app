<template>
	<view class="publish">
		<view class="list-box" @click="doRelease()">
			<view class="left">
				<view class="title">发布招工</view>
				<text>您周围有 2813 人等待工作</text>
			</view>
			<view class="arrow">
				<uni-icons type="arrow-right" color="#FFD200" size="40"></uni-icons>
			</view>
		</view>
		<view class="list-box" @click="doRelease(2)">
			<view class="left">
				<view class="title">发布便民服务</view>
				<text>您周围有 2813 人等待工作</text>
			</view>
			<view class="arrow">
				<uni-icons type="arrow-right" color="#FFD200" size="40"></uni-icons>
			</view>
		</view>
		<view class="list-box">
			<view class="left">
				<view class="title">委托发布</view>
				<text>您周围有 2813 人等待工作</text>
			</view>
			<view class="arrow">
				<uni-icons type="arrow-right" color="#FFD200" size="40"></uni-icons>
			</view>
		</view>
		<view class="list-box">
			<view class="left">
				<view class="title">已委托</view>
				<text>您周围有 2813 人等待工作</text>
			</view>
			<view class="arrow success">
				<uni-icons type="checkmarkempty" color="#fff" size="40"></uni-icons>
			</view>
		</view>
		<view class="list-box">
			<view class="left">
				<view class="title">发布审批</view>
				<text>您周围有 2813 人等待工作</text>
			</view>
			<view class="arrow">
				<uni-icons type="arrow-right" color="#FFD200" size="40"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			doRelease(type = 1) {
				let url = '/pages/release/release'
				if (type == 2) {
					url = '/pages/releaseService/releaseService'
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.publish {
		padding: 30rpx;

		.list-box {
			background: #FFD200;
			margin-bottom: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 140rpx;
			border-radius: 20px;
			padding: 30rpx 20rpx;

			.left {
				.title {
					font-size: 36rpx;
					margin-bottom: 10rpx;
				}

				text {
					font-size: 24rpx;
				}
			}

		}
	}
</style>