<template>
	<view class="details">
		<view class="between head">
			<view class="f-start title">
				餐厅服务员<text class="hot">急招</text>
			</view>
			<text>需5人</text>
		</view>
		<view class="between card">
			<view class="f-start left">
				<image src="../../static/image/logo.jpg" mode="aspectFill"></image>
				<view class="info">
					<view class="t1">潮味轩</view>
					<view class="t2">南山区·世界之窗正门口左边</view>
					<view class="t3">距您2.3公里</view>
				</view>
			</view>
			<uni-icons type="forward" color="#333" size="20"></uni-icons>
		</view>
		<view class="infos">
			<view class="t-box">
				<view class="label">岗位要求</view>
				<view class="txt">55岁以下，最少工作3天，带车</view>
			</view>
			<view class="t-box">
				<view class="label">薪酬说明</view>
				<view class="txt">日结、每天200元</view>
			</view>
			<view class="t-box">
				<view class="label">福利说明</view>
				<view class="txt">日结、每天200元</view>
			</view>
			<view class="t-box">
				<view class="label">工作时间</view>
				<view class="txt">2021-11-19 至 2021-11-21 17:00 - 24:00 </view>
			</view>
			<view class="t-box">
				<view class="label">工作内容</view>
				<view class="txt">刷盘子洗碗</view>
			</view>
		</view>
		<view class="between waining-box">
			<view class="content">
				<view class="t-tip">求职安全提醒</view>
				<view class="txt">该职位承诺不收取任何费用
					如有疑问请<text>举报</text>
				</view>
			</view>
			<view class="icon">
				<text>!</text>
			</view>
		</view>
		<view class="bot-btn">
			<view class="share">分享</view>
			<view class="contact">获取联系方式</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.details {
		padding: 30rpx;
		color: var(--fcolor);

		.head {
			.title {
				font-size: 40rpx;
				font-weight: bold;
			}
		}

		.card {
			height: 160rpx;
			background: #FFFFFF;
			box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
			padding: 30rpx 20rpx;
			border-radius: 20rpx;
			margin: 30rpx 0;
			.left {
				image {
					width: 80rpx;
					height: 80rpx;
				}

				.info {
					font-size: 24rpx;
					margin-left: 10rpx;

					.t1 {
						font-size: 36rpx;
					}

					.t2 {
						margin: 6rpx;
					}

					.t3 {
						color: #888888;
					}
				}
			}
		}

		.infos {
			.t-box{
				margin-bottom: 10rpx;
				.label{
					font-weight: bold;
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}
				.txt{
					font-size: 24rpx;
				}
			}
		}

		.waining-box {
			background: #F7D7BD;
			border-radius: 20rpx;
			height: 160rpx;
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			position: absolute;
			bottom: 120rpx;
			width: calc(100% - 60rpx);
			.content{
				padding-right: 150rpx;
				.t-tip{
					font-weight: bold;
				}
				.txt{
					line-height: 40rpx;
					text{
						color: #FF6600;
					}
				}
			}
			.icon{
				width: 120rpx;
				height: 120rpx;
				
				text{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background: #FA5151;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 52rpx;
					font-weight: bold;
					color: #fff;
				}
			}
		}
		.bot-btn{
			position: fixed;
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			background: var(--tc);
			font-weight: bold;
			bottom: 0;
			left: 0;
			.share{
				width: 200rpx;
				background: #D6B208;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.contact{
				flex: 1;
				text-align: center;
				
			}
		}
	}
</style>