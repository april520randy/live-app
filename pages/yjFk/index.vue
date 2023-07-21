<template>
	<view class="box" style="background-color: #F4F4F5;">
	
		<var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0;background: #fff;" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle">意见反馈</view>
				</view>
			</template>
		</var-app-bar>
		<view class="content">
			<view style="padding: 64rpx 58rpx;">
				<p style="font-size: 28rpx;color: #333333;">标题：</p>
				<view>
					<input type="text" placeholder="请输入标题" class="input1" v-model="title" />
				</view>
				<p style="font-size: 28rpx;color: #EE2144;margin-top: 10rpx;" v-if="titleing">标题不能为空</p>
				<p style="font-size: 28rpx;color: #333333;margin-top: 60rpx;">内容：</p>
				<view class="input2">
					<textarea type="text" minlength="20" placeholder="请输入大于20字内容"
						style="font-size: 26rpx;color: #C0C2CB;" v-model="content" />
				</view>
				<p style="font-size: 28rpx;color: #FC683E;margin-top: 10rpx;" v-if="contenting">内容不能为空</p>
			</view>
			<view class="btn" @click="submit()">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '@/api/index.js'
	export default {
		data() {
			return {
				title: '',
				content: '',
				titleing: false,
				contenting: false,
				show: false,
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				if (this.title !== '') {
					this.titleing = false
				}
				if (this.content !== '') {
					this.contenting = false
				}
				if (this.title == '') {
					this.titleing = true
					return
				}
				if (this.content == '') {
					this.contenting = true
					return
				} else {
					ajaxTemplate('/Center/Submit_Opinion', {
						Opinion_Title: this.title,
						Opinion_User_Id: this.$store.state.userInfo.User_Id,
						Opinion_Content: this.content
					}).then(res => {
						uni.showToast({
							title: '已提交成功',
							icon: 'success',
							duration: 2000
						})
						console.log('submit', res);
						this.title = ''
						this.content = ''
						
						uni.switchTab({
							url: "/pages/myView/index",
						});
						
					})

				}
			}
		},
		onPageScroll(e) {
			console.log(e)
			if (e.scrollTop > 0) {
				this.show = true
			} else {
				this.show = false
			}
		},
	}
</script>

<style scoped lang="less">
	.box {
		background-color: #F4F4F5;
		.nav {
			height: 88rpx;
			display: flex;
			align-items: center;
		
			.navtitle {
				font-size: 32rpx;
				font-weight: 500;
				color: #333;
				margin-left: 252rpx;
			}
		
		}
		

		.header {
			height: 176rpx;
			background: #E73449 url(/static/image/headerball.png) no-repeat top center/100%;
			position: relative;
		}

		.content {
			// margin-top: 180rpx;
			height: 100vh;

			.input1 {
				font-size: 26rpx;
				color: #C0C2CB;
				background: #FFFFFF;
				border-radius: 8rpx;
				height: 56rpx;
				padding: 16rpx 12rpx;
				margin-top: 16rpx;
			}

			.input2 {
				background: #FFFFFF;
				border-radius: 8rpx;
				height: 356rpx;
				padding: 16rpx 12rpx;
				margin-top: 16rpx;
			}

			.btn {
				height: 88rpx;
				background: linear-gradient(180deg, #FC683E 0%, #FC683E 100%);
				border-radius: 16rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 88rpx;
				margin: 100rpx 72rpx;
			}
		}
	}
</style>
