<template>
	<view class="box" style="background-color: #F4F4F5;">


		<var-app-bar  color="#fff"  style="border: none; position: fixed; top:0;z-index:2;background-color: #fff;"
			 round  :elevation='false' >
			<!-- <var-app-bar  style="border: none; position: fixed; top:0;z-index:2"
			 	 round image="/static/image/beij4.png" :elevation='false'> -->
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="/static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle" style="color:#333333;
font-weight: 500;">资金明细</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;padding: 0 20rpx;">
					<view class="types">
						<yui-tabs :tabs="types" v-model="activeIndex" @click="tabChange" @change="tabChange"
							background="none" color="#FC683E" title-active-color="#333333" title-inactive-color="#333333" title-active-fontSize="25rpx">
						</yui-tabs>
					</view>
					<view style="display: flex;align-items: center;">

						<view
							style="display: flex;align-items: center;margin-right: 20rpx;width: 80px;position: relative;justify-content: center;">
							<image src="/static/image/rl.png" style="width: 28rpx;height: 28rpx;"></image>
							<view style="color:#333333;margin: 2rpx 16rpx 0rpx;font-size: 26rpx;">
								{{date.substring(5,date.length)}}月
							</view>
							<image src="/static/image/newrll.png" style="width: 32rpx;height: 32rpx;"></image>
							<picker style="position: absolute;opacity: 0;" fields='month' mode="date" :value="date"
								:start="startDate" :end="endDate" @change="ok">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0" round image="/static/image/beij4.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="/static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle">资金明细</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;padding: 0 20rpx;">
					<view class="types">
						<yui-tabs :tabs="types" v-model="activeIndex" @click="tabClick" @change="tabChange"
							background="none" color="#fff" title-active-color="#fff" title-inactive-color="#E2D8D8">
						</yui-tabs>
					</view>
					<view style="display: flex;align-items: center;">

						<view
							style="display: flex;align-items: center;margin-right: 20rpx;width: 80px;position: relative;justify-content: center;">
							<image src="/static/image/rl.png" style="width: 28rpx;height: 28rpx;"></image>
							<view style="color: #fff;margin: 2rpx 16rpx 0rpx;font-size: 26rpx;">
								{{date.substring(date.length-1,date.length)}}月
							</view>
							<image src="/static/image/rll.png" style="width: 32rpx;height: 32rpx;"></image>
							<picker style="position: absolute;opacity: 0;" fields='month' mode="date" :value="date"
								:start="startDate" :end="endDate" @change="ok">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
				</view>
			</template>
		</var-app-bar> -->


		<!-- <view style="display: flex;align-items: center; justify-content: center;padding-top: 116rpx;">
				<image @click="back" src="/static/image/left-arrowhead.png"
					style="width: 40rpx;height: 40rpx;position: absolute;left: 20rpx;" />
				<p style="font-size: 36rpx;color: #FFFFFF;">资金明细</p>
			</view> -->
		<!-- <view style="display: flex;align-items: center;justify-content: space-between;padding: 0 20rpx;">
				<view class="types">
					<yui-tabs :tabs="types" v-model="activeIndex" @click="tabClick" @change="tabChange"
						background="none" color="#fff" title-active-color="#fff" title-inactive-color="#E2D8D8">
					</yui-tabs>
				</view>
				<view style="display: flex;align-items: center;">
					
					<view
						style="display: flex;align-items: center;margin-right: 20rpx;width: 80px;position: relative;justify-content: center;">
						<image src="/static/image/rl.png" style="width: 28rpx;height: 28rpx;"></image>
						<view style="color: #fff;margin: 2rpx 16rpx 0rpx;font-size: 26rpx;">
							{{date.substring(date.length-1,date.length)}}月</view>
						<image src="/static/image/rll.png" style="width: 32rpx;height: 32rpx;"></image>
						<picker style="position: absolute;opacity: 0;" fields='month' mode="date" :value="date"
							:start="startDate" :end="endDate" @change="ok">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view> -->




		<view style="height:280rpx"></view>
		<view class="content" v-for="(item,index) in getpaydetail" :key="index" v-if="activeIndex == 0">
			<view style="display: flex;align-items: center;">
				<view style="width:80rpx">
					<p style="font-size: 24rpx;color: #9EA2AF;">
						{{item.Pay_Time.substring(5, 10) }}
					</p>
					<p style="font-size: 24rpx;color: #9EA2AF;">
						{{item.Pay_Time.substring(10, 16).replace('T', ' ') }}
					</p>
					<!-- <p style="font-size: 24rpx;color: #9EA2AF;">10:26</p> -->
				</view>
				<image src="/static/image/gift-y.png" style="width: 80rpx;height: 80rpx;margin-left: 20rpx;" />
				<view style="margin-left: 24rpx;">
					<p style="font-size: 28rpx;color: #333333;">{{changepaytype(item.Pay_Type)}}</p>
					<p style="font-size: 24rpx;color: #8E92A4;">{{changepaytype(item.Pay_Type)}}</p>
				</view>
			</view>
			<p style="font-size: 28rpx;color: #F0222C;">-{{item.Pay_GoldCoin}}金币</p>

		</view>

		<view v-if="getpaydetail.length == 0&&activeIndex ==0"
			style="width:100%;height:70%;align-items: center;justify-content: center;display: flex;flex-direction: column;">
			<image src="/static/image/zjnone.png" style="width: 400rpx;height: 400rpx;" />
			<p style="font-size: 26rpx;color: #9EA2AF;text-align: center;margin-top: 20rpx;">暂无数据</p>
		</view>



		<view v-if="activeIndex == 1" class="content" v-for="(item,index) in getrevenuedetail" :key="index">
			<view style="display: flex;align-items: center;">
				<view style="width:80rpx">
					<p style="font-size: 24rpx;color: #9EA2AF;">
						{{item.Revenue_Time.substring(5, 10).replace('T', ' ') }}
					</p>
					<p style="font-size: 24rpx;color: #9EA2AF;">
						{{item.Revenue_Time.substring(10, 16).replace('T', ' ') }}
					</p>
					<!-- 	<p style="font-size: 24rpx;color: #9EA2AF;">10:26</p> -->
				</view>
				<image src="/static/image/get--y.png" style="width: 80rpx;height: 80rpx;margin-left: 20rpx;" />
				<view style="margin-left: 24rpx;">
					<p style="font-size: 28rpx;color: #333333;">{{changerevenuetype(item.Revenue_Type)}}</p>
					<p style="font-size: 24rpx;color: #8E92A4;">{{changerevenuetype(item.Revenue_Type)}}</p>
				</view>
			</view>
			<p style="font-size: 28rpx;color: #00B778;">+{{item.Revenue_SilverCoin}}金币</p>

		</view>
		<view v-if="getrevenuedetail.length == 0&&activeIndex === 1"
			style="width:100%;height:70%;align-items: center;justify-content: center;display: flex;flex-direction: column;">
			<image src="/static/image/zjnone.png" style="width: 400rpx;height: 400rpx;" />
			<p style="font-size: 26rpx;color: #9EA2AF;text-align: center;margin-top: 20rpx;">暂无数据</p>
		</view>

	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '@/api/index.js'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				show: false,
				date: currentDate,
				getpaydetail: [],
				getrevenuedetail: [],
				types: ['消费明细', '收入明细'],
				activeIndex: 0,
				show: false,
				// datetimerange: '',
				page: 1,
				limit: 20,
				time: '',
				User_Id: '',
				tatal1: 0,
				tatal2: 0
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},

		},
		methods: {
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
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			tabClick(index, item) {


				//console.log("tabClick", index, item);
			},
			// 标签切换事件
			tabChange(index, item) {

				console.log(this.activeIndex);
				this.page = 1

				this.getData(index == 0 ? '/Wallet/GetPay_Detail' : '/Wallet/GetRevenue_Detail', index)
			},
			changepaytype(type) {
				switch (type) {
					case 1:
						return '礼物'
					case 2:
						return '商城购买'
					case 3:
						return '贵族'
				}
			},
			changerevenuetype(type) {
				switch (type) {
					case 1:
						return '活动'
					case 2:
						return '任务'
					case 3:
						return '充值'
					case 4:
						return '礼物'
				}
			},
			open() {
				this.show = true
			},
			// ok(e) {
			// 	this.datetimerange = e
			// 	this.getData(this.activeIndex === 0 ? '/Wallet/GetPay_Detail' : '/Wallet/GetRevenue_Detail', this
			// 		.activeIndex)
			// },
			ok(e) {
				this.date = e.detail.value
				console.log(this.date);
				this.Page = 1
				// this.List=[]
				this.getData(this.activeIndex === 0 ? '/Wallet/GetPay_Detail' : '/Wallet/GetRevenue_Detail', this
					.activeIndex)
			},
			getData(url, index) {
				ajaxTemplate(url, {
					User_Id: this.User_Id,
					Start_Revenue_Time: this.date,
					End_Revenue_Time: this.date,
					Page: this.page,
					Limit: this.limit
				}).then(res => {
					console.log(res, index);

					if (index == 0) {

						this.tatal1 = res.Count
						if (this.getpaydetail.length < res.Count) {
							this.getpaydetail = this.getpaydetail.concat(res.Data)
						} else {
							this.getpaydetail = res.Data
						}


					}
					if (index == 1) {
						this.tatal2 = res.Count
						if (this.getrevenuedetail.length < res.Count) {
							this.getrevenuedetail = this.getrevenuedetail.concat(res.Data)
						} else {
							this.getrevenuedetail = res.Data
						}


					}
				})
			}
		},
		onShow() {
			setTimeout(() => {
				this.User_Id = this.$store.state.userInfo.User_Id
				this.getData('/Wallet/GetPay_Detail', this.activeIndex)
			}, 500)

		},
		onReachBottom() {

			if (this.activeIndex == 0) {
				if (this.getpaydetail.length < this.tatal1) {
					this.page++
					this.getData('/Wallet/GetPay_Detail', this.activeIndex)
				} else {
					console.log(123);
					// uni.showToast({
					// 	title: "没有更多了",
					// 	mask: true,
					// 	icon: "none"
					// })
				}

			} else {
				if (this.getpaydetail.length < this.tatal2) {
					this.page++
					this.getData('/Wallet/GetRevenue_Detail', this.activeIndex)
				} else {
					console.log(123);
					// uni.showToast({
					// 	title: "没有更多了",
					// 	mask: true,
					// 	icon: "none"
					// })
				}


			}
		},
		onLoad() {

		},
		onPageScroll(e) {
		
			if (e.scrollTop > 0) {
				this.show = true
			} else {
				this.show = false
			}
		},
	}
</script>

<style scoped lang="scss">
	::v-deep .uni-date-single {
		background-color: transparent !important;
		color: white;

	}

	::v-deep .icon-calendar {
		color: #FFFFFF !important;
	}

	::v-deep.uni-datetime-picker--btn[data-v-1d379219] {
		border-radius: 100px;
		height: 40px;
		line-height: 40px;
		background-color: #F0222C;
		color: #fff;
		font-size: 16px;
		letter-spacing: 2px;
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

		.qk {
			font-size: 28rpx;
			font-weight: 400;
			color: #FFFFFF;
			margin-left: 234rpx;
		}

	}

	.box {
		background-color: #F4F4F5;
		height:100vh;
		.header {
			height: 244rpx;
			background: url(/static/image/back-y.png) no-repeat top center/100%;
			position: relative;

			.types {
				font-size: 28rpx;
				color: #E2D8D8;
			}
		}

		.content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 36rpx 20rpx;
			border-bottom: 1rpx solid #E7E9EE;
		}
	}

	.show {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		z-index: 9999;

		.showbox {
			width: 100vw;
			height: 544rpx;
			background: #FFFFFF;
			position: fixed;
			bottom: 0;
		}
	}
</style>
