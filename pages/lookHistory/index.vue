<template>
	<view style="background-color: #F4F4F5;min-height:100vh">
		<var-app-bar color="#fff" style="border: none; position: fixed; top:0;z-index:2;background-color: #fff;" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">观看历史</view>
					<view class="qk" @click="clean=true">清空</view>
				</view>
				<view class="title">
					<view :class="{content1:index==i,content:index!=i}" @click="change(i)" v-for="(item,i) in list"
						:key="i" style="margin:0 70rpx">{{item}}</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0" round image="/static/image/beij4.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle">观看历史</view>
					<view class="qk" @click="clean=true">清空</view>
				</view>
				<view class="title">
					<view :class="{content1:index==i,content:index!=i}" v-for="(item,i) in list" :key="i"
						@click="change(i)" style="margin:0 70rpx">{{item}}
					</view>
				</view>
			</template>
		</var-app-bar> -->
		<view style="height:280rpx"></view>
		<view class="list" v-for="(item,index) in dataList" @click="toBroadcast(item)">
			<view class="listimg">
				<image style="width: 208rpx;height: 120rpx;" :src="item.Img" >
				</image>
				<view class="fixed" v-if="item.IsLive==1">
					<!-- <image style="width: 24rpx;height: 24rpx;" src="../../static/image/yingy.png" mode="widthFix">
					</image> -->
					<view>直播中</view>
				</view>
			</view>
			<view class="listcontent">
				<view
					style="font-size: 28rpx;color: #333333;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 88%;display: flex;align-items: center;font-weight: 500;">
					<text
						style="display: inline-block;width: 200rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.Competition_Name}}</text>
					&nbsp;
					<text
						style="display: inline-block;width:  130rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
						{{item.Home_team_Name}}</text>VS <text
						style="display: inline-block;width:  100rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.Away_team_Name}}</text>
				</view>

				<view style="display: flex;align-items: center;font-size: 24rpx;margin:8rpx 0">
					<view>
						<text v-if="item.Category_id==1">足球</text>
						<text v-if="item.Category_id==2">篮球</text>
					</view>
					<view style="width: 0px;height: 20rpx;border-left: 1rpx solid #8E92A4;margin:0 14rpx"></view>
					<view>主播：{{item.Anchoer_Name}}</view>
				</view>
				<view style="display: flex;align-items: center;font-size: 24rpx;">
					<image style="width: 20rpx;height: 20rpx;" src="../../static/image/shouji.png" mode="widthFix">
					</image>
					<view>{{item.Watch_Time1}}&nbsp;{{item.Watch_Time2}}</view>
				</view>
				<image v-if="item.IsCollect
==0" style="width: 28rpx;height: 28rpx;position: absolute;bottom:10rpx;right:60rpx" @click.stop="record(item,index)"
					src="../../static/image/xin2.png" mode="widthFix">
				</image>
				<image v-if="item.IsCollect
==1" style="width: 28rpx;height: 28rpx;position: absolute;bottom:10rpx;right:60rpx" @click.stop="record(item,index)"
					src="../../static/image/xin.png" mode="widthFix">
				</image>
			</view>
		</view>

		<!-- <view style="text-align: center;">
			<image src="../../static/image/clear.png" style="" mode="widthFix"></image>
			<view>暂无数据</view>
		</view> -->
		<!-- 清空弹框 -->
		<view v-if="clean" class="clean">
			<view class="cleancontent">
				<view style="color:#333333;font-size: 30rpx;margin:60rpx auto;">确定清空所有观看记录？</view>
				<view class="foot">
					<view class="left" @click="clean=false">取消</view>
					<view class="right" @click="submit">确定</view>
				</view>
			</view>
		</view>
		<view v-if="dataList.length==0" style="text-align: center;">
			<image style="margin-top: 180px;width:420rpx;height:420rpx" src="../../static/image/clear.png"></image>
			<view style="font-size: 13px;font-weight: 400;color: #9EA2AF;">暂无数据~</view>
		</view>
	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '../../api/index.js'
	// /History/GetWatch_HistoryList
	export default {
		data() {
			return {
				show: false,
				searchvalue: '',
				clean: false,
				index: 0,
				list: [
					'全部', '直播中'
				],
				tatal: 0,
				data: {
					User_Id: '',
					IsLive: 0,
					Page: 1,
					Limit: 10
				},
				dataList: []

			}
		},
		onLoad() {
			this.data.User_Id = this.$store.state.userInfo.User_Id
			console.log(this.$store.state.userInfo.User_Id)
		},
		onShow() {
			this.getList()

		},
		methods: {
			getList() {
				console.log(this.data,this.dataList.length);
				ajaxTemplate(
					'/History/GetWatch_HistoryList',
					this.data
				).then(res => {
					this.tatal = res.Count
					if (this.dataList.length < res.Count) {
						this.dataList = this.dataList.concat(res.Data)
					} else {
						this.dataList = res.Data
					}


					this.dataList.forEach((item) => {
						item.Watch_Time1 = item.Watch_Time.slice(5, 10)
						item.Watch_Time2 = item.Watch_Time.slice(11, 16)
						console.log()
					})

				})
			},
			// 收藏
			record(item,index) {
				console.log(item, '=======');

				ajaxTemplate(
					'/Immediately/Collect_Match', {
						Match_Id: item.Match_Id,
						User_Id: this.data.User_Id,
						Type: item.IsCollect == 0 ? 1 : 0
					}
				).then(res => {
					// this.getList()
					this.dataList[index].IsCollect=item.IsCollect == 0 ? 1 : 0
					uni.showToast({
						title: item.IsCollect == 0 ? '取消收藏' : '收藏成功',
						icon: 'none'
					})
					
				})

			},
			back() {
				uni.navigateBack(-1)
			},
			change(e) {

				this.dataList = []
				this.index = e
				this.data.IsLive = e
				this.data.Page = 1
				this.data.Limit = 10
				this.getList()
			},
			submit() {
				ajaxTemplate(
					'/History/ClearWatch_History', {
						User_Id: this.data.User_Id
					}
				).then(res => {
					this.getList()
					this.clean = false
				})

			},
			toBroadcast(item) {
				console.log(item)
				if(item.IsLive!=1) return
				if (uni.getStorageSync("Animation_State") == 1) {
					//动画直播开了
					this.Animation_State = 2
				} else {
					//动画直播关了
					this.Animation_State = 1
				}


				const {
					Anchoer_Id,
					Match_Id,
					
				} = item
				uni.navigateTo({
					url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&activeIndex=${this.Animation_State}`
					// url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}`
				})
			},

		},
		onPageScroll(e) {

			if (e.scrollTop > 60) {
				this.show = true
			} else {
				this.show = false
			}
		},
		onReachBottom() {
			// this.data.Page++
			// this.getList()


			if (this.dataList.length < this.tatal) {
				this.data.Page++
				this.getList()
			} else {
				console.log(123);
				// uni.showToast({
				// 	title: "没有更多了",
				// 	mask: true,
				// 	icon: "none"
				// })
			}
		}
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
			color: #333333;
			margin-left: 252rpx;
		}

		.qk {
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			margin-left: 234rpx;
		}

	}

	.title {
		/* background: url('../../static/image/beij4.png')  ; */
		background-position: 0px 0px;
		height: 76rpx;
		display: flex;


		.content {
			font-size: 30rpx;
			font-weight: 400;
			color: #333333;
		}

		.content1 {
			font-size: 30rpx;
			font-weight: 500;
			color: #333333;
			position: relative;
		}

		.content1:after {
			display: block;
			position: absolute;
			content: '';
			width: 30rpx;
			border-radius: 8px;
			background-color: #FC683E;
			bottom: 8rpx;
			z-index: 9;
			height: 8rpx;
			left: 50%;
			transform: translateX(-50%);

		}
	}

	.list {
		width: 670rpx;
		height: 126rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		opacity: 1;
		margin: 18rpx 20rpx 0;
		padding: 16rpx 20rpx 20rpx;
		display: flex;

		.listimg {
			position: relative;
		}

		.fixed {
			position: absolute;
			width: 80rpx;
			height: 32rpx;
			top: 10rpx;
			right: 10rpx;
			justify-content: center;
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			font-size: 20rpx;
			font-weight: 400;
			color: #FFFFFF;
			padding: 2rpx;
			background: #F14578;

		}

	}

	.listcontent {
		color: #8E92A4;
		margin-left: 24rpx;
		position: relative;
		width: 100%;
	}

	.clean {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);

		position: fixed;
		top: 0;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;

		.cleancontent {
			width: 530rpx;
			height: 274rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin: auto;
			text-align: center;
		}

		.foot {
			margin: auto;
			display: flex;


			font-size: 28rpx;

			.left {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				border-radius: 38rpx;
				opacity: 1;
				
				color: #8B8C91;
				background: #EFEFEF;
				margin: 0 20rpx 0 38rpx;
			}

			.right {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				background: #ED5E2C;
				border-radius: 38rpx;
				opacity: 1;
			}
		}
	}
</style>