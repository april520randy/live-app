<template>
	<view class="box">
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2" round image="/static/image/beij4.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" src="/static/image/left-arrowhead.png"
						style="width: 40rpx;height: 40rpx;position: absolute;left:20rpx" />
					<view class="navtitle">群聊信息</view>
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
			<view class="top">
				<image src="/static/image/search-y.png" style="width: 24rpx;height: 24rpx;" />
				<input style="width:350rpx;font-size: 24rpx;color: #9EA2AF;margin-left: 24rpx;" placeholder="请输入群成员昵称或ID进行搜索" />
			</view>
			<view style="padding: 22rpx 24rpx;">
				<p style="font-size: 28rpx;color: #333333;">群主</p>
			</view>
			<view style="display: flex;align-items: center;background-color: #FFFFFF;padding: 24rpx">
				<image src="/static/image/head-sculpture.png" style="width: 80rpx;height: 80rpx;" />
				<p style="font-size: 30rpx;color: #333333;margin-left: 12rpx;">老詹说球</p>
			</view>
			<view style="padding: 22rpx 24rpx;">
				<p style="font-size: 28rpx;color: #333333;">管理</p>
			</view>
			<view style="background-color: #FFFFFF;" v-for="(item,index) in 2" :key="index">
				<view style="display: flex;align-items: center;padding: 24rpx">
					<image src="/static/image/head-sculpture.png" style="width: 80rpx;height: 80rpx;" />
					<span style="font-size: 24rpx;color: #333333;margin-left: 12rpx;">大牛</span>
				</view>
				<view style="border: 1rpx solid #E7E9EE;"></view>
			</view>
			<view style="padding: 22rpx 24rpx;">
				<p style="font-size: 28rpx;color: #333333;">群成员</p>
			</view>
			<view style="background-color: #FFFFFF;" v-for="(item,index) in 6" :key="index">
				<view style="display: flex;align-items: center;padding: 24rpx">
					<image src="/static/image/head-sculpture.png" style="width: 80rpx;height: 80rpx;" />
					<span style="font-size: 24rpx;color: #333333;margin-left: 12rpx;">JINO</span>
				</view>
				<view style="border: 1rpx solid #E7E9EE;"></view>
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

		.header {
			height: 176rpx;
			background: #E73449 url(/static/image/back-y.png) no-repeat top center/100%;
			position: relative;
		}

		.content {
			margin-top: 180rpx;
			height: 100vh;
			.top {
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				padding: 34rpx 48rpx;
			}
		}
	}
</style>
