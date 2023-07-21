<template>
	<view style="background-color: #F4F7FE;min-height:100vh">
		<var-app-bar style="border-radius:0;background: #fff;" round  :elevation='false'>
			<template #content>
				<view class='nav1'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="/static/image/bq/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle1">关于我们</view>
				</view>
			</template>
		</var-app-bar>
		<view style="width: 100%;height: 80vh;background: #F4F7FE;position: relative;">
			<image style="width: 99px;height: 99px;position: absolute;top: 20%;left: 36%;" src="../../../static/hhb2.png" mode=""></image>
			<view style="position: absolute;top: 35%;left: 31%;">
				<image style="width: 200px;height: 18px;margin-top: 10px;margin-left: -50rpx;" src="../../../static/lhhb.png" mode=""></image>
				<!-- <view style="font-size: 14px;color: #F0222C;margin-bottom: 25px;">来欢呼吧，看精彩赛事</view> -->
				<view style="margin-top: 20px;margin-left: 35px; font-size: 12px;color: #9094A5; ">版本号：v 1.0</view>
				<!-- <view style="font-size: 12px;color: #333333">下载渠道：xxxxxxxxxxxxx</view> -->
			</view>
			<view style="position: absolute;bottom: 3%;left: 35%;">
				<span @click="goyonhu()" style="border-right: #333 1px solid;padding-right: 5px;color: #333;font-size: 12px;">用户协议</span>
				<span @click="goxieyi()" style="padding-left: 5px;color: #333;font-size: 12px;">隐私政策</span>
			</view>
			<view style="position: absolute;bottom: 18%;left: 27%;">
				<!-- <view style="color: #F0222C;font-size: 12px;font-size: 13px;color: #333333;margin-bottom: 5px;">客服邮箱：xxxxxxxxxx@xxx.com</view> -->
				<!-- <view style="color: #F0222C;font-size: 12px;font-size: 13px;color: #333333;">商务邮箱：xxxxxxxxxx@xxx.com</view> -->
			</view>
			
		</view>
	
	</view>
</template>

<script>
	import store from "@/store/index.js";

	export default {
		data() {
			return {
				user_Logo_pop: false,
				value: ''

			}
		},
		onLoad() {

		},

		computed: {

			userInfo() {
				return store.state.userInfo;
			},
		},
		methods: {
			goyonhu(){
				uni.navigateTo({
					
					url:'/pages/userXy/index'
				})
				
			},
			goxieyi(){
				uni.navigateTo({
					
					url:'/pages/ysXy/index'
				})
			},
			togglePop() {
				this.user_Logo_pop = !this.user_Logo_pop
			},
			back() {
				uni.navigateBack(-1)
			},
			jump(url) {
				uni.navigateTo({
					url
				});
			},

		},
		onPageScroll(e) {

		},
	}
</script>

<style lang='scss' scoped>
	.nav {
		height: 88rpx;
		display: flex;
		align-items: center;

		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			margin-left: 252rpx;
		}

	}

	.profile-cells {

		margin-top: 9px;

		.cell {
			padding: 0 17px;
			background-color: white;
			margin-bottom: 9px;

			::v-deep .var-cell {


				padding-top: 24rpx;
				padding-bottom: 24rpx;

				.var-cell__extra {

					// flex-shrink: 0;
					display: flex;

					.var-icon {
						opacity: .5;
					}

					&>text {
						margin-right: 18rpx;
						width: 200rpx;
						flex-shrink: 0;
						text-align: right;
					}
				}
			}
		}
	}

	.popup-example-block {
		height: 600rpx;
		display: flex;
		flex-direction: column;

		.title {
			flex-shrink: 0;
			height: 104rpx;
			width: 100%;
			line-height: 104rpx;
			text-align: center;
			border-bottom: 1rpx solid #ddd;
		}

		.list {
			padding-top: 26rpx;
			height: 0;
			flex: 1;
			overflow: auto;
			display: flex;
			flex-wrap: wrap;

			// margin-right: -48px;
			.item {
				width: 25%;
				text-align: center;
				margin-bottom: 26px;
				// margin-right: 48px;
			}

			.var-image {

				margin: auto;

			}
		}
	}
	.nav1 {
		height: 88rpx;
		display: flex;
		align-items: center;
	
		.navtitle1 {
			font-size: 32rpx;
			font-weight: 500;
			color: #333;
			margin-left: 252rpx;
		}
	
	}
</style>
