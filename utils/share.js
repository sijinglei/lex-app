export default {
	data() {
		return {
			share: {
				title: '自定义分享标题',
				path: '/pages/main-assess/assess',
				imageUrl: '图片url',
				withShareTicket: true // 允许分享朋友圈
			}
		}
	},
	onShareAppMessage(res) { //发送给朋友
		let that = this
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			withShareTicket: this.share.withShareTicket
		}
	},
	onShareTimeline(res) { //分享到朋友圈      
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			withShareTicket: this.share.withShareTicket
		}
	}
}