<template>
	<view>
		{{type==1?'搜职位':'搜服务'}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1
			};
		},
		onLoad(option) {
			this.type = option.type
			uni.setNavigationBarTitle({
				title: this.type == 1 ? '搜职位' : '搜服务'
			});
		}
	}
</script>

<style lang="scss">

</style>