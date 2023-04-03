<template>
	<view>
		当前页面不存在
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			let timer = setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/work/index'
				})
			},2000)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
