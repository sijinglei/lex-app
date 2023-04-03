<template>
	<view class="no-data" :style="{'height':bodyHeight+'px'}">
		<image src="/static/image/no-data.png"></image>
		<text>{{ title }}</text>
	</view>
</template>

<script>
	export default {
		name: "noData",
		data() {
			return {
				bodyHeight: 0
			};
		},
		created() {
			console.log('no-data', uni.getWindowInfo())
			let {
				windowHeight
			} = uni.getWindowInfo();
			this.bodyHeight = windowHeight / 2
		}
	}
</script>

<style scoped>
	.no-data {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>