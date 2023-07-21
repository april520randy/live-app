<template>
	<view>
		<var-app-bar :style="{opacity:show2==true?1:0,zIndex:show2==true?999:0 }"
			style="position:fixed;top:0;border-radius:0;background: #fff" round image="" :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="backMy" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle" style="color: #333;">充值记录</view>
					<view style="display: flex;align-items: center;margin-left: 120rpx;width: 80px;position: relative;justify-content: center;">
						<image src="../../static/image/rl.png" style="width: 28rpx;height: 28rpx;"></image>
						<view style="color: #333;margin: 8rpx 5rpx 0rpx 5rpx;font-size: 26rpx;width:78rpx;">{{date.substring(date.length-1,date.length)}}月</view>
						<image src="../../static/image/rll.png" style="width: 32rpx;height: 32rpx;"></image>
						<picker style="position: absolute;opacity: 0;" fields='month' mode="date" :value="date"
							:start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</template>
		</var-app-bar>
		<var-app-bar :style="{opacity:show2==false?1:0}" style="border-radius:0;background: #fff;" round image=""
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="backMy" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle" style="color: #333;" >充值记录</view>
					<view style="display: flex;align-items: center;margin-left: 140rpx;width: 80px;position: relative;justify-content: center;">
						<image src="../../static/image/rl.png" style="width: 28rpx;height: 28rpx;"></image>
						<view style="color: #333;margin: 8rpx 16rpx 0rpx;font-size: 26rpx;width:78rpx;">{{date.substring(5,date.length)}}月</view>
						<image src="../../static/image/rll.png" style="width: 32rpx;height: 32rpx;"></image>
						<picker style="position: absolute;opacity: 0;" fields='month' mode="date" :value="date"
							:start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <view class="anchor_top">
			<view class="top_title">
				<view style="width: 80px;">
					<image style="margin-left: 20rpx;" src="../../static/image/zbback.png" mode="" @click="backMy()">
					</image>
				</view>
				<view class="title" style="width: 80px;">
					充值记录
				</view>
				<view style="display: flex;align-items: center;margin-right: 20rpx;width: 80px;position: relative;justify-content: center;">
					<image src="../../static/image/rl.png" style="width: 28rpx;height: 28rpx;"></image>
					<view style="color: #fff;margin: 8rpx 16rpx 0rpx;font-size: 26rpx;">{{date.substring(date.length-1,date.length)}}月</view>
					<image src="../../static/image/rll.png" style="width: 32rpx;height: 32rpx;"></image>
					<picker style="position: absolute;opacity: 0;" fields='month' mode="date" :value="date"
						:start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
		</view> -->
		<!-- <view style="height: 176rpx;"></view> -->
		<view v-if="List.length>0">
			<view class="box" v-for="item in List">
				<view style="display: flex;align-items: center;justify-content: space-between;margin-left: 20rpx;">
					<image :src="item.Pay_Type==2?'../../static/image/alpay.png':'../../static/image/wxpay.png'" style="width: 48rpx;height: 48rpx;"></image>
					<view style="margin-left: 24rpx;">
						<view>
							{{item.Pay_Type==2?'支付宝充值':'微信支付'}}
						</view>
						<view style="font-size: 12px;font-weight: 400;color: #8E92A4;">
							2023-03-09 10:26
						</view>
					</view>
				</view>
				<view style="margin-right: 20rpx;">

					<view style="font-size: 14px;font-weight: 500;color: #F0222C;">
						{{item.GoldCoin_Num}}金币
					</view>
					<view style="font-size: 12px;font-weight: 400;color: #8E92A4; text-align: right;">
						¥{{Number(item.Pay_Price).toFixed(2)}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="List.length==0" style="margin-top: 200rpx;text-align: center;">
			<image src="../../static/image/clear.png" style="width: 400rpx;height: 400rpx;"></image>
			<view style="color: #9ea2af; font-size: 26rpx;">暂无数据</view>
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				show2:false,
				date: currentDate,
				total:0,
				List:[],
				Page:1,
				Limit:10
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			isLogin() {
				return store.getters.is_login;
			},
			userInfo() {
				if (this.isLogin) {
					return store.state.userInfo;
			
				}
				return this.default_userInfo;
			},
		},
		onShow() {
			this.List=[]
			this.getList()
		}, 
		onReachBottom() {
			if(this.List.length<this.total){
				this.Page++
				this.getList()
			}
		},
		methods: {
			getList(){
				ajaxTemplate('/Recharge/GetRecharge_DetailList',{
					User_Id:this.userInfo.User_Id,
					App_Start_Pay_Time:this.date,
					Page:this.Page,
					Limit:this.Limit
				}).then(res => {
					console.log(res,'aaaaaaaaa');
					this.total=res.Count
					if(this.List.length<res.Count){
						this.List=this.List.concat(res.Data)
					}else{
						this.List=res.Data
					}
				})
			},
			backMy(){
				uni.navigateBack({
					delta:1
				})
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
				console.log(this.date);
				this.Page=1
				this.List=[]
				this.getList()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			}
		},
		onPageScroll(e) {
			console.log(e)
			if (e.scrollTop > 0) {
				this.show2 = true
			} else {
				this.show2 = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.anchor_top {
		z-index: 999;
		position: fixed;
		top: 0;
		width: 750rpx;
		height: 176rpx;
		background: RGBA(226, 26, 38, 1) url('../../static/image/zuqiubg.png') no-repeat bottom center/100% 100%;
		overflow: hidden;
	}

	.top_title {
		display: flex;
		align-items: center;
		width: 100%;
		height: 40rpx;
		margin-top: 110rpx;
		justify-content: space-between;


	}

	image {
		width: 40rpx;
		height: 40rpx;
		margin-top: 10rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		// margin-left: 35%;
	}

	.box {
		width: 100%;
		// line-height: 68rpx;
		border-bottom: 1rpx solid #E7E9EE;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx 0;
	

	}
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
	.uni-picker-container .uni-picker-action .uni-picker-action-confirm{
		color:#F0222C !important;
	}
</style>
