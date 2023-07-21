<template>
	<view class="content">
		
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2;background-color: #fff;" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="backShop" src="/static/image/newback.png"
						style="width: 40rpx;height: 40rpx;position: absolute;left:20rpx" />
					<view class="navtitle">购买记录</view>
					<image @click="gokf" src="../../../static/image/newkefu.png" style="width:44rpx;height:44rpx;position: absolute;right:20rpx" alt="" />
				</view>
			</template>
		</var-app-bar>
		<!-- <view class="record_top">
			<view class="top_title">
				<image src="../../../static/image/fanhui.png" alt="" @click="backShop" />
				<view style="margin-left:3%;">购买记录</view>
				<image src="../../../static/image/kefu.png" alt="" />
			</view>
		</view> -->

		<view class="record_btm">
			<view class="btm_box" v-for="(item,index) in recordList" :key="index">
				<view class="imgbox">
					<image :src="item.Gift_Img" alt="" style="width: 108rpx;height: 108rpx;" />
				</view>
				<view class="namebox">
					<view style="font-weight: 500;font-size: 26rpx;margin-bottom: 15rpx;font-weight: 500;color: #333333;">
						{{item.Gift_Name}}
					</view>
					<view style="display: flex;align-items: center;就">
						<!-- 银 -->
						<image src="../../../static/image/yin.png" alt="" style="width: 32rpx;margin-right:10rpx ;height: 32rpx;" v-if="item.Spend_Silver_Coin"/>
						<text style="font-size: 24rpx;color: #8E92A4;" v-if="item.Spend_Silver_Coin">{{item.Spend_Silver_Coin}}</text>
						<!-- 金 -->
						<image src="../../../static/image/jin.png" alt="" style="width: 32rpx;margin-right:10rpx ;height: 32rpx;"  v-if="item.Spend_Gold_Coin"/>
						<text style="font-size: 24rpx;color: #8E92A4;" v-if="item.Spend_Gold_Coin">{{item.Spend_Gold_Coin}}</text>
					</view>
				</view>
				<view class="timebox">
					<view style="font-size: 28rpx;color: #9EA2AF;margin-bottom: 15rpx;">
						{{item.Buy_Gift_Time.substring(0, 19).replace('T', ' ')}}
					</view>
					<view style="color: #F0222C;font-size: 24rpx;">
						已发货
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
				recordList: []
			}
		},
		onLoad() {
			console.log(111,this.$store.state.userInfo);
			ajaxTemplate('/Gift/GetBuy_Gift_List',{User_Id:this.$store.state.userInfo.User_Id}).then(res=>{
				console.log('购买记录',res);
				this.recordList=res.Data

			})
		},
		methods: {
			backShop() {
				uni.navigateBack({
					url: '/pages/myView/shop/shop'
				})
			},
			gokf(){
				console.log(123);
			uni.navigateTo({
				//在线客服
				url: "/pages/zxkf/index",
			});
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.nav {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	
		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
		}
	
	}
	.content {

		background: #F4F4F5;
		imin-height: 100vh;
	}

	.record_top {
		z-index: 2;
		position: fixed;
		top: 0;
		width: 100%;
		height: 176rpx;
		overflow: hidden;
		background: #E81D29 url('../../../static/image/zuqiubg.png') no-repeat bottom center/100%;
		padding: 0 20rpx;
		box-sizing: border-box;

		.top_title {
			margin-top: 16%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 36rpx;
			font-weight: 500;
			color: #FFFFFF;


			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.record_btm {
		margin-top: 176rpx;
		width: 100%;
		z-index: 1;

		.btm_box {
			width: 100%;
			height: 176rpx;
			border-bottom: 1rpx solid #E7E9EE;
			background: #FFFFFF;
			display: flex;
			box-sizing: border-box;
			padding: 0 20rpx;
			align-items: center;
			// justify-content: space-between;

			.imgbox {
				width: 108rpx;
				height: 108rpx;
				border-radius: 28rpx 28rpx 28rpx 28rpx;
				border: 2rpx solid #E7E9EE;
			}

			.namebox {
				width: 200rpx;
				margin-left: 30rpx;
			}

			.timebox {
				width: 50%;
				// margin-left: 230rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
			}
		}
	}
</style>
