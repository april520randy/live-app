<template>
	<view class="box" style="background-color: #F4F4F5;min-height: 100vh;">
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2" round image="/static/image/zxx.png"
			:elevation='false'>
			<template #content>
				<view style="
				  display: flex;
				  align-items: center;
				  justify-content: flex-start;
				  height: 86rpx;
				
				">
					<view @click="headerFn(index,item)" :class="choose == index ? 'items' : 'item'"
						v-for="(item, index) in headers" :key="index">{{ item.Info_Type_Name }}
					</view>
				</view>
			</template>
		</var-app-bar>

		<!-- <view class="header"> -->
		<!-- <view class="types" style="position: fixed;z-index: 1;top: 0;"> -->
		<!-- <yui-tabs :tabs="headers" v-model="activeIndex" @click="tabClick"
					@change="tabChange" background="none" color="#fff" title-active-color="#fff"
					title-inactive-color="#E2D8D8">
				</yui-tabs> -->
		<!-- <view style="
				  display: flex;
				  align-items: center;
				  justify-content: flex-start;
				  height: 90rpx;
				
				">
					<view @click="headerFn(index,item)" :class="choose == index ? 'items' : 'item'"
						v-for="(item, index) in headers" :key="index">{{ item.Info_Type_Name }}
					</view>
				</view> -->
		<!-- 	</view> -->
		<!-- </view> -->
		<view class="middle"
			style="background-position: top center ;background-size: 100% 420rpx;background-repeat: no-repeat;"
			:style="{backgroundImage:LBlist.length>0?'url('+'/static/image/zxx.png'+')':''}">

			<view style="height: 276rpx;border-radius: 24rpx;margin-bottom: 18rpx;">
				<swiper style="height: 276rpx;border-radius: 24rpx" circular :indicator-dots="indicatorDots"
					:autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item style="border-radius: 24rpx" v-for="(item, i) in LBlist" :key="i">
						<image style="border-radius: 24rpx; width: 100%; height: 100%" :src="item.Info_Rotation_Img"
							mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>


			<!-- <view class="brown-middle" v-if="content!=''">
				<image src="/static/image/celebrate.png" style="width: 68rpx;height: 60rpx;margin-left: 14rpx;" />
				<image src="/static/image/announcement.png" style="width: 48rpx;height: 20rpx;margin-left: 5rpx;" />
				<view style="width: 0; height: 20rpx;border: 2rpx solid #F5BD54;margin: 0 25rpx;"></view>
				<view style="font-size: 22rpx;color: #61330F;margin-right: 70rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width:330rpx">{{content}}</view>
				<view style="font-size: 22rpx;color: #937D5A;width:80rpx" @click="messagecontent2()">更多</view>
				<image src="/static/image/rightarrow.png" style="width: 24rpx;height: 24rpx;" />
			</view> -->
		</view>
		<view class="foot">
			<view @click="messagecontent(item)" class="content" v-for="(item,index) in card" :key="index">
				<p
					style="font-size: 28rpx;color: #333333;flex:1;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
					{{ item.Information_Title }}
				</p>
				<image :src="item.CoverImg"
					style="width: 212rpx;height: 120rpx;border-radius: 8rpx;margin-left:46rpx" />
			</view>
		</view>

		<m-tabbar fixed fill current="1" :tabbar="tabbar" v-if="New_State == 1"></m-tabbar>
	</view>


</template>

<script>
	import TabbarConfig from '/utils/tabbar.js'
	import {
		ajaxTemplate
	} from "../../api/index.js";
	export default {
		data() {
			return {
				New_State: 0,
				tabbar: TabbarConfig,
				show: false,
				headers: [],
				activeIndex: 0,
				autoplay: false,
				LBlist: [],
				choose: 0,
				Page: 1,
				Limit: 10,
				tatal: 0,
				card: [],
				content: '',
				id: '',
				Info_Type:'',
				current: 1,
				key:''
			}
		},
		onShow() {
			uni.hideTabBar()
			
			console.log(uni.getStorageSync("New_State"))
			if (uni.getStorageSync("New_State") == 1) {
				this.New_State = 1
				this.current = 1
			}
			
			
			this.gettype()
			this.getLBlist()
			
			
			
			
		},
		
		onPullDownRefresh() {
			this.xzinit(this.key)

		},

		onReachBottom() {
			console.log(this.card.length, this.tatal)

			if (this.card.length < this.tatal) {
				this.page++
				this.xzinit(this.key)
			} else {
				console.log(123);
				// uni.showToast({
				// 	title: "没有更多了",
				// 	mask: true,
				// 	icon: "none"
				// })
			}

		},
		onPageScroll(e) {

			if (e.scrollTop > 0) {
				this.show = true
			} else {
				this.show = false
			}
		},
		methods: {
			saveData(key, value) {
				console.log(value, "saveData")
				uni.setStorageSync(key, JSON.stringify(value))
			},
			getData(key) {
				let data = null
				if (uni.getStorageSync(key)) {
					data = JSON.parse(uni.getStorageSync(key)) || null
				}
				if (data === null) {
					uni.removeStorageSync(key)
				}
				return data
			},
			
			gettype() {
				//类名
				ajaxTemplate("/Information/GetInfo_Type_List").then((res) => {
					console.log(res)
					if (this.choose == 0) {
						this.headers = res.Result
						this.Info_Type = res.Result[0].Info_Type_Id
						
						
						this.key=res.Result[0].Info_Type_Name+'ZX'
						console.log(this.key)
						if (this.getData(this.key) !== null) {
							console.log(111)
							//获取本地数据
							//赋值
							// this.card = this.getData(this.key)
							// uni.startPullDownRefresh()
							this.xzinit(this.Info_Type)
						} else {
							uni.startPullDownRefresh()
							//调接口获取新数据
							// this.xzinit(this.Info_Type)
						}
					}
					
					
					
				})
			},
			getLBlist() {

				//轮播/Information/GetRotation_List
				ajaxTemplate("/Information/GetRotation_List").then((res) => {
					console.log(res)
					this.LBlist = res.Result
				})
			},
			xzinit(key) {
				console.log(this.Info_Type)
				//资讯列表
				ajaxTemplate("/Information/GetInformation_List", {
					Page: this.Page,
					Limit: this.Limit,
					Info_Type: this.Info_Type
				}).then((res) => {

					console.log(res)
					this.content = ''
					this.id = ''
					this.tatal = res.Count
					if (res.Data.length > 0) {
						this.content = res.Data[0].Information_Title
						this.id = res.Data[0].Information_Id
					}
					// this.card = this.card.concat(res.Data)
					if (this.card.length < res.Count) {
						this.card = this.card.concat(res.Data)
						this.saveData(key, this.card)
					} else {
						this.card = res.Data
						this.saveData(key, this.card)
						
					}
					uni.stopPullDownRefresh()
				})
				
			},
			headerFn(i, item) {
				this.card = []
				this.Page = 1
				this.tatal = 0
				this.choose = i
				this.Info_Type = item.Info_Type_Id
				this.key=item.Info_Type_Name+'ZX'
				
				if (this.getData(this.key) !== null) {
					console.log(111)
					//获取本地数据
					//赋值
					// this.card = this.getData(this.key)
					uni.startPullDownRefresh()
				} else {
					uni.startPullDownRefresh()
					//调接口获取新数据
					// this.xzinit(this.Info_Type)
				}
				

			},
			messagecontent(item) {
				console.log(item.Information_Id);
				uni.navigateTo({
					url: '/pages/messagecontent/index?id=' + item.Information_Id
					// url: "/pages/messagecontent/index",
				})
			},
			messagecontent2() {
				uni.navigateTo({
					url: '/pages/messagecontent/index?id=' + this.id
					// url: "/pages/messagecontent/index",
				})
			},
			tabClick(index, item) {
				console.log("tabClick", index, item);
			},
			// 标签切换事件
			tabChange(index, item) {
				console.log("tabChange", index, item);
			},
		},
	}
</script>

<style lang='scss' scoped>
	.header {
		width: 100%;
		height: 420rpx;
		background: url(/static/image/indexBgc.png) no-repeat center/100% 100%;

		.types {
			width: 100vw;
			height: 178rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-size: 30rpx;
			color: #E2D8D8;
			background: url(/static/image/redbackground.png) no-repeat center/100%;
		}
	}

	.swiper {
		height: 276rpx;
	}

	.swiper-item {
		display: block;
		height: 276rpx;
		line-height: 276rpx;
		text-align: center;
	}

	.middle {
		/* height: 400rpx; */
		padding: 204rpx 20rpx 20rpx 20rpx;

		/* background: url("/static/image/indexBgc.png") no-repeat; */

		.brown-middle {
			height: 64rpx;
			margin: 0 0 0rpx;
			background: #FEF7E9;
			border-radius: 8rpx;
			border: 1px solid #F6C768;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
	}

	.foot {
		background: #FFFFFF;
		margin-top: -8rpx;
		padding: 0 20rpx;

		.content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #E7E9EE;
			padding: 30rpx 0;
		}
	}

	.items {
		font-size: 36rpx;
		font-weight: 500;
		position: relative;
		color: #ffffff;
		padding: 5px 10px;
	}

	.items:after {
		display: block;
		position: absolute;
		content: '';
		width: 16px;
		border-radius: 8px;
		background-color: #ffffff;
		bottom: -4px;
		z-index: 9;
		height: 4px;
		left: 50%;
		transform: translateX(-50%);
	}

	.item {

		font-size: 30rpx;
		font-weight: 400;

		color: #fff;
		padding: 5px 10px;
	}
	::v-deep .var-app-bar{
		background-position: center 0% !important;
	}
</style>
