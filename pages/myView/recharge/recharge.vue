<template>
	<view class="box" style="background-color: #F4F4F5;overflow: hidden;">
		<view class="header" style="position: fixed;top: 0;width: 100vw;z-index: 1;">
			<view style="display: flex;align-items: center; justify-content: center;padding-top: 116rpx;">
				<image @click="back" src="/static/image/newback.png"
					style="width: 40rpx;height: 40rpx;position: absolute;left: 20rpx;" />
				<p style="font-size: 32rpx;color: #333333;">我的钱包</p>
				<p style="font-size: 26rpx;color: #3333333;position: absolute;right: 20rpx;" @click="details()">明细</p>
			</view>
		</view>
		<view class="middle" style="padding-top:20px;">
			<!-- <image src="/static/image/species.png" style="width: 52rpx;height: 52rpx;" /> -->
			<div style="font-size: 36rpx;color: #333333;margin-left: 56rpx;">金币数量</div>
			<div style="font-size: 56rpx;color: #FC683E;font-weight: bold;margin-left: 56rpx;">{{this.goldnumbers}}</div>
		</view>
		<view class="paytypes">
			<view class="title">
				<p style="font-size: 24rpx;color: #333333;">选择支付方式</p>
			</view>
			<view class="zfbpay">
				<view style="display: flex;align-items: center;">
					<image src="/static/image/zfbrecharge.png" style="width: 40rpx;height: 40rpx;" />
					<p style="font-size: 28rpx;color: #333333;margin-left: 16rpx;">支付宝支付</p>
				</view>
				<view class="" @click="isCheck = !isCheck">
					<image :src="checkIcon"></image>
				</view>
			</view>
		</view>
		<view class="payquantity">
			<view class="title">
				<p style="font-size: 24rpx;color: #333333;">选择购买数量</p>
			</view>
			<view class="payquantity-types">
				<view class="content" v-for="(item,index) in chargelist" :key="index" @click="moneytypes(index)"
					:style="{border:item.chooseState?'1px solid #FC683E':'1px solid #B0B2BE',marginRight:(index+1)%3==0?'':'14rpx'}">
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 34rpx;">
						<p style="font-size: 28rpx;color: #333333;">{{item.GoldCoin_Num}}金币</p>
						<image src="/static/image/changeyellow.png" style="width: 32rpx;height: 32rpx;" />
					</view>
					<p style="font-size: 24rpx;color: #8E92A4;text-align: center;margin-top: 8rpx;">
						¥{{item.GoldCoin_Price}}</p>
					<image v-if="img == index" src="/static/image/rightdownnew.png"
						style="width: 34rpx;height: 34rpx;position: absolute;left: 187rpx;bottom: -1rpx;" />
				</view>
			</view>
		</view>
		<view class="foot">
			<p>1.充值兑换比例为1元=10金币。</p>
			<p style="margin-top: 12rpx;">2.充值成功后，到账可能有一定延迟，请您耐心等待。</p>
			<p style="margin-top: 12rpx;" @click="rechargexy()">3.阅读并同意<span style="color: #FC683E;">《充值服务协议》</span></p>
			<p style="margin-top: 12rpx;">4.充值金额仅用于购买道具使用。</p>
		</view>
		<view class="btns">
			<view class="btn" @click="paymoney()">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '@/api/index.js'

	import store from "@/store/index.js";
	export default {
		data() {
			return {
				img: -1,
				ok: 0,
				chargelist: [],
				isCheck: false,
				priceid: '',
				goldnumbers: ''
			}
		},
		computed: {

			checkIcon() {
				if (this.isCheck) {
					return '/static/image/null.png'
				}
				return '/static/image/zfbrechargenew.png'
			}
		},
		methods: {
			getunm(){
				console.log(this.$store.state.userInfo.Gold_Coin);
				this.goldnumbers = this.$store.state.userInfo.Gold_Coin
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			rechargexy(){
				uni.navigateTo({
					url: '/pages/myView/recharge/rechargexy/rechargexy'
				})
			},
			moneytypes(index) {
				this.img = index
				this.chargelist.forEach((item, i) => {
					if (i === index) {
						item.chooseState = true 
					} else {
						item.chooseState = false
					}
				})
				this.priceid = this.chargelist[index].Price_Id
				console.log(this.priceid);
			},
			details() {
				uni.navigateTo({
					url: '/pages/myView/recharge/details/details'
				})
			},
			paymoney() {
				if (this.priceid === '') {
					uni.showToast({
						title: '请选择金额',
						icon: 'error'
					})
					return
				}
				uni.request({
					url: 'https://api.dltkh.top/Wallet/InitiatePayToApp', //仅为示例，并非真实接口地址。
					data: {
						data: uni.$Crypto.encrypt(JSON.stringify({
							Price_Id: this.priceid,
							User_Id: 231320
						})),
					},
					method: "POST",
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					success: (callback) => {

						let paymentData = callback.data
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: paymentData,
							success: function(res) {
								uni.showToast({
									title: '支付成功'
								})
								uni.$emit("getUserInfo")
								
								this.getunm()
							},
							fail: function(err) {
								uni.showToast({
									title: '支付失败',
									icon: 'error',
									success: () => {
										setTimeout(() => {
											uni.switchTab({
												url: '/pages/myView/index'
											})
										})
									}
								})
							}
						})
					},
					fail: (callback) => {
						reject(callback);
					}
				});
			}
		},
		onShow() {
			ajaxTemplate('/Wallet/GetRechargeList').then(res => {
				this.chargelist = res.Result
			})
		},
		onLoad() {
			// console.log(this.$store.state.userInfo.Gold_Coin);
			// this.goldnumbers = this.$store.state.userInfo.Gold_Coin
			this.getunm()
		}
	}
</script>

<style scoped lang="less">
	.header {
		height: 176rpx;
		// background: #E73449 url(/static/image/back-y.png) no-repeat top center/100%;
		background-color: #fff;
		color:#333333;
		position: relative;
	}

	.middle {
		height: 330rpx;
		margin-top:176rpx;
		background: url(/static/image/newmoneybackground.png) no-repeat top center/100%;
		// margin: 200rpx 20rpx 30rpx 20rpx;
		// display: flex;
		// align-items: center;
		// justify-content: center;
	}

	.paytypes {
		background: #FFFFFF;

		.title {
			border-bottom: 1rpx solid #E7E9EE;
			padding: 22rpx 582rpx 18rpx 24rpx;
		}

		.zfbpay {
			border-bottom: 1rpx solid #E7E9EE;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 28rpx 48rpx 18rpx 28rpx;

			image {
				width: 16px;
				height: 16px;
			}
		}

		.wxpay {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 28rpx 48rpx 18rpx 28rpx;
		}

	}

	.payquantity {
		background: #FFFFFF;
		margin-top: 20rpx;

		.title {
			border-bottom: 1rpx solid #E7E9EE;
			padding: 22rpx 582rpx 18rpx 24rpx;
		}

		.payquantity-types {
			display: flex;
			align-items: center;
			// justify-content: space-between;
			flex-wrap: wrap;
			padding: 20rpx 24rpx;

			.content {
				width: 220rpx;
				height: 124rpx;
				border-radius: 12rpx;
				border: 2rpx solid #B0B2BE;
				margin-bottom: 22rpx;
				position: relative;
			}
		}
	}

	.foot {
		background-color: #F4F4F5;
		font-size: 24rpx;
		color: #9EA2AF;
		padding: 28rpx 20rpx;
	}

	.btns {
		background-color: #FFFFFF;
		padding: 22rpx 20rpx;

		.btn {
			height: 92rpx;
			background: #FC683E;
			border-radius: 46rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 92rpx;
		}
	}
</style>
