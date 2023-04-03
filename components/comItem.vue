<template>
	<view class="item-box" v-if="item">
		<view class="title">
			<view class="name">
				{{item.title}}
				<text class="hot">急招</text>
			</view>
			<view class="job-num">招5人</view>
		</view>
		<view class="infos">
			<view class="txt add">南山区·世界之窗 | 距您2.3公里</view>
			<view class="txt">薪酬：日结，每天100元</view>
			<view class="txt">要求：性别不限，年龄不限，需求会刷盘子，待客热情</view>
		</view>
		<view class="bot" v-if="type==1">
			<button type="default" @click="toDetail()">查看详情</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comItem",
		props: ['item', 'type'],
		data() {
			return {

			};
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/details/details?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-box {
		min-height: 270rpx;
		height: auto;
		overflow: hidden;
		width: 100%;
		background-color: #fff;
		border-radius: 40rpx;
		margin-bottom: 30rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		color: var(--fcolor);

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 38rpx;

			.name {
				font-family: Source Han Sans CN;
				font-weight: bold;
				display: flex;
				align-items: center;

				.hot {
					background: #E93A3A;
					font-size: 24rpx;
					border-radius: 8rpx;
					padding: 4rpx 8rpx;
					color: #fff;
					margin-left: 10rpx;
				}
			}

			.job-num {
				color: var(--theam-color);
			}
		}

		.infos {
			.txt {
				margin: 4rpx 0;
			}
		}

		.bot {
			display: flex;
			justify-content: flex-end;

			button {
				margin: 0;
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				background-color: var(--tc);
				border: none;

			}
		}
	}
</style>