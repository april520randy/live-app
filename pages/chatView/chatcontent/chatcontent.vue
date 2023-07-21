<template>
	<view class="box">
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2" round image="/static/image/beij4.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" src="/static/image/left-arrowhead.png"
						style="width: 40rpx;height: 40rpx;position: absolute;left:20rpx" />
					<view class="navtitle">老詹说球</view>
					<view style="font-size: 28rpx;color: #FFFFFF;position: absolute;right:20rpx">清空</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <view class="header" style="position: fixed;top: 0;width: 100vw;z-index: 1;">
			<view style="display: flex;align-items: center; justify-content:space-between;padding: 116rpx 20rpx 28rpx 20rpx;">
				<image @click="back" src="/static/image/left-arrowhead.png"
					style="width: 40rpx;height: 40rpx;"/>
				<p style="font-size: 36rpx;color: #FFFFFF;">老詹说球</p>
				<p style="font-size: 28rpx;color: #FFFFFF;">清空</p>
			</view>
		</view> -->
		<view class="content">
			<p style="font-size: 22rpx;color: #9EA2AF;text-align: center;padding-top: 34rpx;">03-09 10:26</p>
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
				<image src="/static/image/send.png" style="width: 64rpx;height: 64rpx;margin-right: 30rpx;"
					@click="send" />
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
			// send(){

			// 	let onSdkReady = function(event) {
			// 	  let message = uni.$tim.createTextMessage({ to: 'user1', conversationType: 'C2C', payload: { text: 'Hello world!' }});
			// 	  uni.$tim.sendMessage(message);
			// 	};
			// 	// tim.on(TIM.EVENT.SDK_READY, onSdkReady);
			// 	// 发送文本消息，Web 端与小程序端相同
			// 	// 1. 创建消息实例，接口返回的实例可以上屏
			// 	let message = uni.$tim.createTextMessage({
			// 	  to: 231327,
			// 	  conversationType: uni.$TIM.TYPES.CONV_C2C,
			// 	  // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
			// 	  // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
			// 	  // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
			// 	  payload: {
			// 	    text: 'Hello world!'
			// 	  },
			// 	  // v2.20.0起支持C2C消息已读回执功能，如果您发消息需要已读回执，需购买旗舰版套餐，并且创建消息时将 needReadReceipt 设置为 true
			// 	  needReadReceipt: true
			// 	  // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
			// 	  // cloudCustomData: 'your cloud custom data'
			// 	});
			// 	// 2. 发送消息
			// 	let promise = uni.$tim.sendMessage(message);
			// 	promise.then(function(imResponse) {
			// 	  // 发送成功
			// 	  console.log(imResponse);
			// 	}).catch(function(imError) {
			// 	  // 发送失败
			// 	  console.warn('sendMessage error:', imError);
			// 	});
			// }
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