<template>
	<view class="content">
		<view class="shop_top">
			<view class="top_title">
				<image src="../../../static/image/fanhui.png" alt="" @click="backMy" style="margin-top: 70rpx;" />
				<view style="margin-left:10%;margin-top: 70rpx;">我的商城</view>
				<view style="font-size: 28rpx;margin-top: 70rpx;" @click="gotoRecord">购买记录</view>
			</view>
		</view>
		<view class="shop_center">

		</view>
		<view class="shop_btm">
			<view class="btm_top">
				<image src="../../../static/image/hot.png" alt="" style="width: 36rpx;height: 36rpx;" />
				<image src="../../../static/image/words1.png" alt="" style="width: 138rpx;height: 33rpx;" />
			</view>
			<view class="btm_center">
				<view class="center_box" v-for="(item,index) in hotsellList" :key="index">
					<view class="imgbox">
						<image :src="item.Gift_Img" alt="" style="width: 168rpx;height: 168rpx;	border-radius: 28rpx 28rpx 28rpx 28rpx;" />
					</view>
					<view>
						<view v-if="userInfo.Nobility_Level==1"
							style="display: flex;align-items: center;margin-top: -35rpx;">
							<image src="../../../static/image/qilogo.png" alt=""
								style="width:50rpx;height: 50rpx;margin-right: -40rpx;z-index: 2;" />
							<view
								style="font-size: 12prx;width: 170rpx;background: linear-gradient(90deg, #D6FFCF 0%, #A7EC9C 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;z-index: 1;color: #51B04C;padding-left: 45rpx;height: 40rpx;line-height: 40rpx;">
								贵族享{{userInfo.Nobility_Discount}}折</view>
						</view>
						<view v-if="userInfo.Nobility_Level==2"
							style="display: flex;align-items: center;margin-top: -35rpx;">
							<image src="../../../static/image/juelogo.png" alt=""
								style="width:50rpx;height: 50rpx;margin-right: -40rpx;z-index: 2;" />
							<view
								style="font-size: 12prx;width: 170rpx;background: linear-gradient(90deg, #FFEECF 0%, #FFDDA1 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;z-index: 1;color: #B86E00;padding-left: 45rpx;height: 40rpx;line-height: 40rpx;">
								贵族享{{userInfo.Nobility_Discount}}折</view>
						</view>
						<view v-if="userInfo.Nobility_Level==3"
							style="display: flex;align-items: center;margin-top: -35rpx;">
							<image src="../../../static/image/dilogo.png" alt=""
								style="width:50rpx;height: 50rpx;margin-right: -40rpx;z-index: 2;" />
							<view
								style="font-size: 12prx;width: 170rpx;background: linear-gradient(90deg, #FFEADF 0%, #FFC3A4 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;z-index: 1;color: #FF471D;padding-left: 45rpx;height: 40rpx;line-height: 40rpx;">
								贵族享{{userInfo.Nobility_Discount}}折</view>
						</view>

						<!-- <image src="item.../../../static/image/guizu.png" alt="" style="width: 150rpx;height: 30rpx;" /> -->
					</view>
					<view style="font-size: 28rpx;font-weight: 500;margin: 10rpx;">{{item.Gift_Name}}</view>
					<view class="moneybox">
						<view style="" v-if="item.Spend_Gold_Coin">
							<image src="../../../static/image/myView/jinbi.png" alt=""
								style="width: 32rpx;height: 32rpx;margin-right: 10rpx;" />
							<text style="font-size: 24rpx;color: #8E92A4;">{{item.Spend_Gold_Coin}}</text>
						</view>
						<view class="" style="margin-left: 30rpx;" v-if="item.Spend_Silver_Coin">
							<image src="../../../static/image/myView/yinbi.png" alt=""
								style="width: 32rpx;height: 32rpx;margin-right: 10rpx;" />
							<text style="font-size: 24rpx;color: #8E92A4;">{{item.Spend_Silver_Coin}}</text>
						</view>
					</view>
					<button @click="popBtn(item)">立即购买</button>
				</view>

			</view>
		</view>

		<view v-if="show"
			style=" background: rgba(0, 0, 0, 0.5);position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index: 999;display: flex;align-items: center;justify-content: center;">
			<view v-if="pops==1"
				style="font-size: 28rpx;width: 530rpx;height: 468rpx;background: #FFFFFF;border-radius: 24rpx 24rpx 24rpx 24rpx;display: flex;flex-direction: column;align-items: center;box-sizing: border-box;">
				<image @click="buyBtn('关')" src="../../../static/image/close.png" alt=""
					style="width: 20rpx;height: 20rpx;margin: 26rpx 0 0 465rpx;" />
				<image :src="popData.Gift_Img" alt="" style="width: 168rpx;height:168rpx; margin: 30rpx 0;border-radius: 28rpx;" />
				<view style="font-weight: 500;color: #333333;">{{popData.Gift_Name}}</view>
				<view style="display: flex;align-items: center;justify-content: space-around;margin-top: 40rpx;">
					<view @click="buyBtn('银币购买')" v-if="popData.Spend_Silver_Coin"
						style="border: 1rpx solid #ED5E2C;border-radius: 38rpx 38rpx 38rpx 38rpx;width: 200rpx;height: 64rpx;text-align: center;line-height:64rpx ;color: #fff;margin-right: 20rpx;background: #ED5E2C;">
						银币购买</view>
					<view @click="buyBtn('金币购买')" v-if="popData.Spend_Gold_Coin"
						style="width: 200rpx;height: 64rpx;background: #ED5E2C;text-align: center;line-height:64rpx ;color: #FFFFFF;border-radius: 38rpx 38rpx 38rpx 38rpx;">
						金币购买</view>
				</view>
			</view>

			<view v-if="pops==2"
				style="width: 530rpx;height: 320rpx;background: #FFFFFF;border-radius: 24rpx 24rpx 24rpx 24rpx;display: flex;flex-direction: column;align-items: center;box-sizing: border-box;padding: 40rpx;">
				<view style="font-size: 28rpx;color: #333333;">温馨提示</view>
				<view style="font-size: 26rpx;color: #6D6E73;margin:45rpx 0 45rpx 0 ;">余额不足，请前往充值</view>
				<view style="display: flex;justify-content: space-between;width: 100%;">
					<view @click="promptBtn('取消')"
						style="width: 212rpx;height: 64rpx;border-radius: 38rpx 38rpx 38rpx 38rpx;border: 2rpx solid #FC683E;text-align: center;line-height: 64rpx;color:#FC683E;">
						取消
					</view>
					<view @click="promptBtn('立即充值')"
						style="color: #FFFFFF;width: 212rpx;height: 64rpx;border-radius: 38rpx 38rpx 38rpx 38rpx;text-align: center;line-height: 64rpx;background: #FC683E;">
						立即充值
					</view>
				</view>
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
				show: false,
				hotsellList: [],
				popData: null,
				Gift_Id: null,
				pops: 1,
				userInfo: {}
			}
		},
		onShow() {
			this.userInfo = this.$store.state.userInfo
		},
		onLoad() {
			
			
			this.userInfo = this.$store.state.userInfo
			console.log(1111, this.$store.state.userInfo)
			// 商城
			ajaxTemplate('/Gift/Get_Gift_List').then(res => {
				console.log('商城', res);
				this.hotsellList = res.Result

			})

		},
		methods: {
			gotoRecord() {
				uni.navigateTo({
					url: '/pages/myView/shop/shopRecord'
				})
			},
			backMy() {
				uni.switchTab({
					url: '/pages/myView/index'
				})

			},
			// 弹框显示
			popBtn(item) {
				if (this.userInfo.User_Id ==undefined) {
					uni.showToast({
									title: '请先登录',
									icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
									duration: 2000    //持续时间为 2秒
								})  
					uni.reLaunch({
						url: '/pages/login/index'
					})
					return
				}
				this.popData = item
				this.Gift_Id = item.Gift_Id
				this.show = true
				console.log(this.popData);
			},
			//购买
			purchase(url, data) {
				ajaxTemplate(url, data).then(res => {
					console.log(111111, res);
					this.pops = 1
					uni.showToast({
						title: "购买成功",
						icon: "none",
					});
					uni.$emit("getUserInfo")
					
				})
			},
			// 弹框内部按钮
			buyBtn(type) {
				this.show = true
				if (type == '关') {
					this.show = false
				}
				if (type == '银币购买') {
					if (this.$store.state.userInfo.Silver_Coin < this.popData.Spend_Silver_Coin) {
						this.pops = 2
						return
					}
					this.purchase('/Gift/Buy_Gift', {
						User_Id: this.$store.state.userInfo.User_Id,
						Gift_Id: this.Gift_Id,
						CoinType: 1
					})
					this.show = false
				}
				if (type == '金币购买') {
					if (this.$store.state.userInfo.Gold_Coin < this.popData.Spend_Gold_Coin) {
						this.pops = 2
						return
					}
					this.purchase('/Gift/Buy_Gift', {
						User_Id: this.$store.state.userInfo.User_Id,
						Gift_Id: this.Gift_Id,
						CoinType: 0
					})
					this.show = false
				}

			},
			// 温馨提示
			promptBtn(type) {
				if (type == '取消') {
					this.show = false
					this.pops = 1
				}
				if (type == '立即充值') {
					this.show = false
					uni.navigateTo({
						url: '/pages/myView/recharge/recharge'
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		background: #F4F4F5;
	}

	.shop_top {
		z-index: 999;
		width: 100%;
		height: 420rpx;
		// background-color: #C50915;
		overflow: hidden;
		background: url('../../../static/image/zxx.png') no-repeat top center/100% 100%;




		.top_title {
			z-index:999;
			position: fixed;
			top: 0;
			width: 100%;
			height: 178rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 36rpx;
			font-weight: 500;
			color: #FFFFFF;
			padding: 25rpx;
			box-sizing: border-box;
			background: url('../../../static/image/zxx.png') no-repeat top center/100%;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.shop_center {
		z-index: 2;
		margin-top: 400rpx;
		margin: auto;
		margin-top: -240rpx;
		width: 690rpx;
		height: 300rpx;
		background: url('../../../static/image/hhb.png') no-repeat center/100%;
	}

	.shop_btm {
		z-index: 1;
		width: 100%;
		box-sizing: border-box;
		padding: 0 25rpx;

		.btm_top {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
		}

		.btm_center {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.center_box {
				width: 340rpx;
				height: 436rpx;
				background-color: red;
				margin-bottom: 15rpx;
				border-radius: 12rpx 12rpx 12rpx 12rpx;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				font-weight: 500;
				color: #333333;

				.imgbox {
					border-radius: 28rpx 28rpx 28rpx 28rpx;
					border: 2rpx solid #E7E9EE;
					display: flex;
					align-items: center;
				}
			}

			.moneybox {
				display: flex;
				margin: 10rpx;

				view {
					display: flex;
					align-items: center;
					justify-content: center;
				}

			}

			button {
				width: 160rpx;
				height: 56rpx;
				margin-top: 15rpx;
				background: #ED5E2C;
				border-radius: 38rpx 38rpx 38rpx 38rpx;
				font-size: 26rpx;
				color: #FFFFFF;
				line-height: 56rpx;
				padding: 0 !important;
			}
		}
	}
</style>
