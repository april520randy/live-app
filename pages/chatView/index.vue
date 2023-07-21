<template>
	<view class="box">
		<var-app-bar   style="border: none; position: fixed; top:0;z-index:2"
			 round image="/static/image/beij4.png" :elevation='false'>
			<template #content>
				<view class='nav'>
					<view class="navtitle">聊天列表</view>
					<view v-if="Anchoer_Attest_Status == 2"
						style="display: flex;align-items: center;position: absolute;right:20rpx" @click="addgroup()" >
						<image src="/static/image/memberaadd.png" style="width: 36rpx;height: 36rpx;" />
						<p style="font-size: 28rpx;color: #FFFFFF;">创建群聊</p>
					</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <view class="header" style="position: fixed;top: 0;z-index: 1;">
			<view style="display: flex;align-items: center;margin-top: 80rpx;margin-left: 270rpx;">
				<p style="font-size: 36rpx;color: #FFFFFF;position: absolute;left: 160px;">聊天列表</p>
			</view>
		</view> -->
		<view style="padding: 200rpx 20rpx 0;">
			<view @click="chatcontent1(index)" class="content" v-for="(item,index) in 5" :key="index">
				<view style="display: flex;align-items: center;">
					<image src="/static/image/head-sculpture.png" style="width: 100rpx;height: 100rpx;" />
					<view style="margin-left: 22rpx;">
						<p style="font-size: 30rpx;color: #333333;">老詹说球</p>
						<p style="font-size: 26rpx;color: #9EA2AF;margin-top: 10rpx;">老铁，求关注~</p>
					</view>
				</view>
				<view style="margin-right: 30rpx;">
					<p style="font-size: 22rpx;color: #8E92A4;">22:19</p>
					<view
						style="margin-left: 20rpx; margin-top: 20rpx; width: 40rpx;height: 40rpx;border-radius:50rpx;line-height: 40rpx;text-align:center;background: #F0222C;font-size: 24rpx;color: #FFFFFF;">
						2
					</view>
				</view>
			</view>

			<view @click="chatcontent2(index)" class="content" v-for="(item,index) in 2" :key="index">
				<view style="display: flex;align-items: center;">
					<image src="/static/image/head-sculpture.png" style="width: 100rpx;height: 100rpx;" />
					<view style="margin-left: 22rpx;">
						<view style="display: flex;align-items: center;">
							<p style="font-size: 30rpx;color: #333333;">鲁班说球粉丝群(18)</p>
							<div
								style="width: 60rpx;height: 36rpx;background: #F5F5F5;border-radius: 4rpx 16rpx 4rpx 16rpx;font-size: 22rpx;color: #9EA2AF;margin-left: 20rpx;text-align: center;line-height: 36rpx;">
								离线
							</div>
						</view>

						<p style="font-size: 26rpx;color: #9EA2AF;margin-top: 10rpx;">老铁，求关注~</p>
					</view>
				</view>
				<view style="margin-right: 30rpx;">
					<p style="font-size: 22rpx;color: #8E92A4;">22:19</p>
					<view
						style="margin-left: 20rpx; margin-top: 20rpx; width: 40rpx;height: 40rpx;border-radius:50rpx;line-height: 40rpx;text-align:center;background: #F0222C;font-size: 24rpx;color: #FFFFFF;">
						2
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import store from "@/store/index.js";
	export default {
		data() {
			return {
				Anchoer_Attest_Status: ''
			}
		},
		onLoad() {
			setTimeout(() => {
				this.Anchoer_Attest_Status = this.$store.state.userInfo.Anchoer_Attest_Status
				console.log('222',	this.Anchoer_Attest_Status);
			}, 1000);
			

		},
		methods: {
			chatcontent1(index) {
				uni.navigateTo({
					url: '/pages/chatView/chatcontent/chatcontent'
				})
			},
			chatcontent2(index) {
				uni.navigateTo({
					url: '/pages/chatView/chatcontent-two/chatcontent-two'
				})
			},
			addgroup() {
				uni.navigateTo({
					url: '/pages/chatView/addgroup/addgroup'
				})
			},
		},
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
	.header {
		width: 100%;
		height: 176rpx;
		background: #C70A16 url(/static/image/back-y.png) no-repeat top center/100%;
		display: flex;
		justify-content: center;
		// position: relative;
		align-items: center;
	}

	.content {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 32rpx;
		border-bottom: 1px solid #E7E9EE;
		padding-bottom: 30rpx;
	}
</style>
