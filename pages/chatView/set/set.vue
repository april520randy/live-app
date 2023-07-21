<template>
	<view class="box">
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2" round image="/static/image/beij4.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" src="/static/image/left-arrowhead.png"
						style="width: 40rpx;height: 40rpx;position: absolute;left:20rpx" />
					<view class="navtitle">群聊设置</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <view class="header" style="position: fixed;top: 0;width: 100vw;z-index: 1;">
			<view style="display: flex;align-items: center; justify-content: center;padding-top: 116rpx;">
				<image @click="back" src="/static/image/left-arrowhead.png"
					style="width: 40rpx;height: 40rpx;position: absolute;left: 20rpx;" />
				<p style="font-size: 36rpx;color: #FFFFFF;">群聊信息</p>
				<image src="/static/image/set.png"
					style="width: 40rpx;height: 40rpx;position: absolute;right: 20rpx;" />
			</view>
		</view> -->
		<view class="content">
			<view class="crowd">
				<image src="/static/image/head-sculpture.png" style="width: 100rpx;height: 100rpx;" />
				<view style="margin-left: 20rpx;">
					<p style="font-size: 30rpx;color: #333333;">鲁班说球粉丝群</p>
					<p style="font-size: 26rpx;color: #9EA2AF;margin-top: 20rpx;">群聊号码：0000000</p>
				</view>
			</view>
			<view style="margin-top: 18rpx;background-color: #FFFFFF;height: 280rpx;">
				<view class="member-top">
					<view style="display: flex;align-items: center;">
						<p style="font-size: 28rpx;color: #333333;">群成员</p>
						<p style="font-size: 26rpx;color: #9EA2AF;margin-left: 8rpx;">18/500</p>
					</view>
					<view style="display: flex;align-items: center;">
						<p style="font-size: 26rpx;color: #333333;">查看全部</p>
						<image @click="look" src="/static/image/right-arrow.png"
							style="width: 28rpx;height: 28rpx;margin-left: 6rpx;" />
					</view>
				</view>
				<view style="border: 1rpx solid #E7E9EE;"></view>
				<view class="member-bottom">
					<view v-for="(item,index) in 5" :key="index">
						<view style="display: flex;flex-direction: column;align-items: center;">
							<image src="/static/image/head-sculpture.png" style="width: 80rpx;height: 80rpx;" />
							<span style="font-size: 24rpx;color: #333333;margin-top: 14rpx;">大牛</span>
						</view>
					</view>
				</view>
			</view>
			<view style="background-color: #FFFFFF;margin-top: 18rpx;height: 328rpx;">
				<p style="font-size: 28rpx;color: #333333;padding: 34rpx 24rpx;">群介绍</p>
				<view style="border: 1rpx solid #E7E9EE;"></view>
				<p style="font-size: 28rpx;color: #8E92A4;padding: 102rpx 24rpx;">暂无介绍</p>
			</view>
			<view style="background-color: #FFFFFF;margin-top: 18rpx;height: 92rpx;">
				<p style="font-size: 26rpx;color: #333333;text-align: center;padding: 34rpx 0;">清空聊天记录</p>
			</view>
			<view style="background-color: #FFFFFF;margin-top: 18rpx;height: 92rpx;">
				<p style="font-size: 26rpx;color: #F0222C;text-align: center;padding: 34rpx 0;">删除并退出</p>
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
			look() {
				uni.navigateTo({
					url: '/pages/chatView/member/member'
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

			.crowd {
				display: flex;
				align-items: center;
				padding: 24rpx 24rpx;
				background-color: #FFFFFF;
				height: 148rpx;
			}

			.member-top {
				padding: 34rpx 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.member-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 32rpx;
			}
		}
	}
</style>
