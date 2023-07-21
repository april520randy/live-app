<template>
	<view class="box">
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2" round image="/static/image/beij4.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" src="/static/image/left-arrowhead.png"
						style="width: 40rpx;height: 40rpx;position: absolute;left:20rpx" />
					<view class="navtitle">鲁班说球粉丝群(18)</view>
					<image @click="set" src="/static/image/set.png"
						style="width: 40rpx;height: 40rpx;position: absolute;right: 20rpx;"/>
				</view>
			</template>
		</var-app-bar>
		<!-- <view class="header" style="position: fixed;top: 0;width: 100vw;z-index: 1;">
			<view style="display: flex;align-items: center; justify-content: center;padding-top: 116rpx;">
				<image @click="back" src="/static/image/left-arrowhead.png"
					style="width: 40rpx;height: 40rpx;position: absolute;left: 20rpx;"/>
				<p style="font-size: 36rpx;color: #FFFFFF;">鲁班说球粉丝群(18)</p>
				<image @click="set" src="/static/image/set.png"
					style="width: 40rpx;height: 40rpx;position: absolute;right: 20rpx;"/>
			</view>
		</view> -->
		
		
		<view class="content">
			<p style="font-size: 22rpx;color: #9EA2AF;text-align: center;padding-top: 34rpx;">03-09 10:26</p>
			<view style="display: flex;align-items: center;justify-content: center;margin-top: 40rpx;">
				<div style="width: 88rpx;height: 2rpx;background: linear-gradient(90deg, rgba(210,210,210,0) 0%, #D2D2D2 100%);"></div>
				<p style="font-size: 22rpx;color: #9EA2AF;margin: 0 22rpx;">您已加入群聊</p>
				<div style="width: 88rpx;height: 2rpx;background: linear-gradient(270deg, rgba(210,210,210,0) 0%, #D2D2D2 100%);"></div>
			</view>
			<!-- <view class="chat-box1">
				<image src="/static/image/head-sculpture.png" style="width: 72rpx;height: 72rpx;"/>
				<image src="/static/image/white-triangle.png" style="width: 19rpx;height: 22rpx;"/>
				<view class="chatting1">
					欢迎来到直播间
				</view>
			</view>
			<view class="chat-box2">
				<view class="chatting2">
					不错啊！！！
				</view>
				<image class="chatting2-img1" src="/static/image/pink-triangle.png" style="width: 19rpx;height: 22rpx;"/>
				<image class="chatting2-img2" src="/static/image/head-sculpture.png" style="width: 72rpx;height: 72rpx;"/>
			</view> -->
			<view class="chat-box1">
				<image src="/static/image/head-sculpture.png" style="width: 72rpx;height: 72rpx;" />
				<image src="/static/image/white-triangle.png" style="width: 19rpx;height: 22rpx;" />
				<view class="chatting1">
					欢迎来到直播间
				</view>
			</view>
			<view class="chat-box2">
				<view class="chatting2">
					不错啊！！！
				</view>
				<image class="chatting2-img1" src="/static/image/pink-triangle.png"
					style="width: 19rpx;height: 22rpx;" />
				<image class="chatting2-img2" src="/static/image/head-sculpture.png"
					style="width: 72rpx;height: 72rpx;" />
			</view>
		</view>
		<view class="foot" style="position: fixed;bottom: 0;">
			<input type="text" placeholder="你好呀,主播!" class="input">
			<view style="display: flex;align-items: center;">
				<image src="/static/image/smile.png" style="width: 64rpx;height: 64rpx;margin-right: 22rpx;" />
				<image src="/static/image/send.png" style="width: 64rpx;height: 64rpx;margin-right: 30rpx;"/>
			</view>
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			set() {
				uni.navigateTo({
					url: '/pages/chatView/set/set'
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.nav {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	
		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
		}
	
	}
	.box {
		background-color: #F4F4F5;
		min-height: 100vh;
		.header {
			height: 176rpx;
			background: #E73449 url(/static/image/back-y.png) no-repeat top center/100%;
			position: relative;
		}

		.content {
			padding-top: 180rpx;
			.chat-box1 {
				height: 68rpx;
				margin-top:18rpx;
				position: relative;
				display: flex;
				align-items: flex-end;
				justify-content: flex-start;
				margin-left:20rpx;
			
				.chatting1 {
					width: 244rpx;
					height: 68rpx;
					background: #FEFEFE;
					border-radius: 20rpx 20rpx 20rpx 0rpx;
					font-size: 30rpx;
					color: #333333;
					text-align: center;
					line-height: 68rpx;
					// position: absolute;
					// left: 110rpx;
					// bottom:0rpx;
				}
			}
			
			.chat-box2 {
				display: flex;
				margin-top:18rpx;
				align-items: center;
				text-align: right;
				height: 68rpx;
				position: relative;
				justify-content: flex-end;
				align-items: flex-end;
				margin-right:20rpx;
			
				// .chatting2-img2 {
				// 	position: absolute;
				// 	right: 30rpx;
				// }
			
				// .chatting2-img1 {
				// 	position: absolute;
				// 	right: 95rpx;
				// 	top: 230rpx;
				// }
			
				.chatting2 {
					width: 244rpx;
					height: 68rpx;
					background: #F9E5E7;
					border-radius: 20rpx 20rpx 0rpx 20rpx;
					font-size: 30rpx;
					color: #333333;
					text-align: center;
					line-height: 68rpx;
					
				}
			}

		}

		.foot {
			height: 100rpx;
			background: #FFFFFF;
			position: absolute;
						bottom: 68rpx;
						background: #FFFFFF;
						width: 100%;
			display: flex;
			align-items: center;
			.input {
				width: 100%;
				height: 68rpx;
				background: #F5F5F5;
				border-radius: 38rpx;
				font-size: 26rpx;
				color: #C0C2CB;
				line-height: 68rpx;
				padding-left: 24rpx;
				margin-left: 20rpx;
				margin-right: 24rpx;
			}
		}


	}
</style>
