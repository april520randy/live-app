<template>
	<view style="background: #f4f4f5;height: 100vh;">
		<view class="search_top"  style="background: #fff;">
			<view class="top_input">
				<!-- <image src="../../../static/image/sear.png" mode=""></image>
				<input type="text"> -->
				<view class='navsearch' style="background-color: #EFEFEF;">
					<image src="/static/image/search.png" style="width: 24rpx;height: 24rpx;margin:0 24rpx">
					</image>
					<input type="text" v-model='searchvalue' @input="doSearch" placeholder-style='fontSize:20rpx'
						style="color:#000" />
				</view>
				<view class="qx" @click="cancelClick">
					取消
				</view>
			</view>
		</view>



		<view style="padding-bottom:100rpx;" v-if="listData.length != 0">
			<view style="width:100%;height:176rpx">

			</view>
			<view class="btm_box" v-for="(item, index) in listData" :key="index" @click.stop="rowClick(item)">
				<view class="btm_box_top">
					<view class="groups" :style="{
		             color: item.IsCollect == 1 ? '#5934BF' : '',
		             background: item.IsCollect == 1 ? '#EDE4FD' : '',
		             color: item.IsCollect == 0 ? '#C37A2B' : '',
		             background: item.IsCollect == 0 ? '#FEE2B2' : ''
		           }">
						{{ item.Competition_Name }}
					</view>
					<view class="times">
						{{ item.Match_Date.substring(10, 16).replace('T', ' ') }}
					</view>

					<view class="section" style="color: #8e92a4">
						<!-- {{ section(item) }} -->
						{{item.Status_Name}}
					</view>

					<view class="progress" v-if="item.Status_Id != 1 && item.Category_Id
		== 2">
						<!-- <text v-if="item.Status_Id==10" style="color: #F4764A;">完</text> -->
						<!-- <text v-if="item.Status_Id != 10">一</text>
									<text v-if="item.Status_Id != 10">二</text>
									<text v-if="item.Status_Id != 10">三</text>
									<text v-if="item.Status_Id != 10">四</text>
									<text v-if="item.Status_Id == 9">五</text> -->
						<text>一</text>
						<text>二</text>
						<text>三</text>
						<text>四</text>
						<text v-if="item.Status_Id == 9">五</text>

						<text style="color: #F4764A" :style="{
		               'margin-left': item.Status_Id == 9 ? '17rpx' : '20rpx'
		             }">总</text>
					</view>

					<view class="progress" style="color: #F4764A" v-if="item.Status_Id != 1 && item.Category_Id
		== 1">
						<!-- <text v-if="item.Status_Id==10">完</text>
								<text v-if="item.Status_Id==16" style="">上半场</text>
								<text v-if="item.Status_Id==17">中场</text>
								<text v-if="item.Status_Id==18" style="">下半场</text>
								<text v-if="item.Status_Id==9">加时</text>
								<text v-if="item.Status_Id==19">点球</text>
								<text v-if="item.Home_Scores!=-1">角球</text>
									<textstyle="color: #F4764A;margin-left: 22rpx;">总</text> -->
					</view>
				</view>
				<view class="btm_box_btm">
					<image v-if="item.IsCollect == 1" src="/static/image/xin.png" alt="" class="btm1"
						@click.stop="collectionClickDebounced('取消', item)" />
					<image v-if="item.IsCollect == 0" src="/static/image/xin2.png" alt="" class="btm1"
						@click.stop="collectionClickDebounced('收藏', item)" />
					<view class="btm2">
						<view class="btm2_top">
							<image :src="item.Home_Team_Logo" alt="" />
							<view class="btm2_top_name">
								<view style="
		                   overflow: hidden;
		                   text-overflow: ellipsis;
		                   white-space: nowrap;
		                   max-width: 130rpx;
		                 ">
									{{ item.Home_Team_Name }}
								</view>
								<view v-if="item.Home_Scores[2] > 0 && item.Category_Id
		== 1" style="
		                   width: 26rpx;
		                   height: 24rpx;
		                   color: #ffffff;
		                   background: #f56161;
		                   text-align: center;
		                   line-height: 24rpx;
		                   font-size: 20rpx;
		                   border-radius: 2rpx 2rpx 2rpx 2rpx;
		                   margin-left: 6rpx;
		                 ">
									{{ item.Home_Scores[2] }}
								</view>
								<view v-if="item.Home_Scores[3] > 0 && item.Category_Id
		== 1" style="
		                   width: 26rpx;
		                   height: 24rpx;
		                   color: #ffffff;
		                   background: #f5ce61;
		                   text-align: center;
		                   line-height: 24rpx;
		                   font-size: 20rpx;
		                   border-radius: 2rpx 2rpx 2rpx 2rpx;
		                   margin-left: 6rpx;
		                 ">
									{{ item.Home_Scores[3] }}
								</view>
							</view>
						</view>
						<view class="btm2_btm">
							<image :src="item.Away_Team_Logo" alt="" />

							<view class="btm2_btm_name">
								<view style="
		                   overflow: hidden;
		                   text-overflow: ellipsis;
		                   white-space: nowrap;
		                   max-width: 130rpx;
		                 ">
									{{ item.Away_Team_Name }}
								</view>
								<view v-if="item.Away_Scores[2] > 0 && item.Category_Id
		== 1" style="
		                   width: 26rpx;
		                   height: 24rpx;
		                   color: #ffffff;
		                   background: #f56161;
		                   text-align: center;
		                   line-height: 24rpx;
		                   font-size: 20rpx;
		                   border-radius: 2rpx 2rpx 2rpx 2rpx;
		                   margin-left: 6rpx;
		                 ">
									{{ item.Away_Scores[2] }}
								</view>
								<view v-if="item.Away_Scores[3] > 0 && item.Category_Id
		== 1" style="
		                   width: 26rpx;
		                   height: 24rpx;
		                   color: #ffffff;
		                   background: #f5ce61;
		                   text-align: center;
		                   line-height: 24rpx;
		                   font-size: 20rpx;
		                   border-radius: 2rpx 2rpx 2rpx 2rpx;
		                   margin-left: 6rpx;
		                 ">
									{{ item.Away_Scores[3] }}
								</view>
							</view>
						</view>
					</view>

					<view class="btm3" v-if="item.Status_Id != 1 && item.Category_Id
		== 2">
						<view class="btm3_top">
							<view
								:style="{color:index2 == item.Home_Scores.length - 1 &&item.Home_Scores.length - 1 != 0? '#F4764A': '', 'margin-left':index2 == item.Home_Scores.length - 1 ? '15rpx' : ''}"
								v-for="(item2, index2) in item.Home_Scores" :key="index2">
								{{ item2}}
							</view>
						</view>
						<view class="btm3_btm">

							<view :style="{
		                 color:
		                   index3 == item.Away_Scores.length - 1 &&
		                   item.Away_Scores.length - 1 != 0
		                     ? '#F4764A'
		                     : '',
		                 'margin-left':
		                   index3 == item.Away_Scores.length - 1 ? '15rpx' : ''
		               }" v-for="(item3, index3) in item.Away_Scores" :key="index3">{{ item3 >= 0 ? item3 : '-' }}</view>
						</view>
					</view>

					<view class="btm3" v-show="item.Status_Id != 1 && item.Category_Id
		== 1">
						<view class="btm3_top">
							<!-- <view v-if="item.Status_Id==10">
										11
									</view> -->
							<!-- <view style="text-align: center"
											:style="{ width: item.Status_Id == 17 ? '26%' : '35%' }">
											{{ item.Home_Scores[1] >= 0 ? item.Home_Scores[1] : '-' }}
										</view> -->
							<view style="text-align: center">
								{{ item.Home_Scores[0] >= 0 ? item.Home_Scores[0] : '-' }}
							</view>
							<!-- <view style="text-align: center" :style="{width:item.Status_Id==17?'26%':'35%'}"
										v-if="item.Status_Id==16||item.Status_Id==17||item.Status_Id==18">
										{{item.Home_Scores[1]>=0?item.Home_Scores[1]:'-'}}
									</view>
									<view style="width: 20%;text-align: center" v-if="item.Status_Id==9">
										{{item.Home_Scores[5]>=0?item.Home_Scores[5]:'-'}}
									</view>
									<view style="width: 20%;text-align: center" v-if="item.Status_Id==19">
										{{item.Home_Scores[6]>=0?item.Home_Scores[6]:'-'}}
									</view>
									<view style="width: 25%;text-align: center" v-if="item.Home_Scores[4]!=-1">
										{{item.Home_Scores[4]>=0?item.Home_Scores[4]:'-'}}
									</view> -->
						</view>
						<view class="btm3_btm">

							<view style="text-align: center">
								{{ item.Away_Scores[0] >= 0 ? item.Away_Scores[0] : '-' }}
							</view>

						</view>
					</view>

					<!-- <view @click="toClick(item)" v-if="item.Anchoer_Logo" class="btm4" :style="{
		             'margin-left':
		               item.Status_Id == 1 || item.Status_Id == 10 ? '350rpx' : ''
		           }">
									<image :src="item.Anchoer_Logo" alt="" />
								</view> -->
					<view :style="{marginLeft:item.Status_Name=='未开赛' ?'350rpx':''}" @click.stop="toClicklive(item)"
						v-if="item.Anchoer_Logo&&item.Status_Name!=='完场'" class="btm4">
						<image :src="item.Anchoer_Logo" alt="" />
					</view>


					<view :style="{marginLeft:item.Status_Name=='未开赛' ?'350rpx':''}" @click.stop="toClick(item)"
						v-if="!item.Anchoer_Logo&&item.Coverage_Mlive==1||(item.Status_Name=='完场'&&item.Coverage_Mlive==1)"
						class="btm4" style="border: none">
						<image src="/static/image/bzb7.png" alt="" />
					</view>
					<view :style="{marginLeft:item.Status_Name=='未开赛' ?'350rpx':''}" @click.stop="toClick(item)"
						v-if="!item.Anchoer_Logo&&item.Coverage_Mlive==0||(item.Status_Name=='完场'&&item.Coverage_Mlive==0)"
						class="btm4" style="border: none">
						<image src="/static/image/bzb2.png" alt="" />
					</view>
				</view>
			</view>
		</view>

		<view v-if="listData.length == 0" style="
		         display: flex;
		         align-items: center;
		         justify-content: center;
		         height: 100vh;
		         flex-direction: column;
		       ">
			<image src="/static/image/sckong.png" mode="" style="width: 400rpx; height: 400rpx; "></image>
			<view style="color: #9ea2af; font-size: 26rpx; margin-top: 15rpx">
				暂无数据
			</view>
		</view>
		<!-- <view
			style="display: flex;align-items: center;justify-content: center;height: 100vh;flex-direction: column;margin-top: 176rpx;background: #F5F5F5;">
			<image src="../../../static/image/sckong.png" mode=""
				style="width: 400rpx;height: 400rpx;margin-top: -400rpx;"></image>
			<view style="color: #9EA2AF;font-size: 26rpx;margin-top: 15rpx;">
				暂无数据
			</view>
		</view> -->
	</view>
</template>

<script>
	import _ from 'lodash'
	import {
		ajaxTemplate
	} from '@/api/index.js'
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				searchvalue: null,
				Page:1,
				Limit:10,
				listData: [],
				tatal:0
			}
		},
		computed: {
			isLogin() {
				return store.getters.is_login
			},
			userInfo() {
				if (this.isLogin) {
					return store.state.userInfo
				}
				return this.default_userInfo
			}
		},
		onReachBottom() {
			
		
			if (this.listData.length < this.tatal) {
				this.Page++
				this.getList()
			} else {
				console.log(123);
				// uni.showToast({
				// 	title: "没有更多了",
				// 	mask: true,
				// 	icon: "none"
				// })
			}
		
		},
		methods: {
			//搜索
			doSearch() {

				if (this.searchvalue == '') {
					this.searchvalue = null
					this.listData=[]
				} else {
					this.Page=1
					this.listData=[]
					this.getList()
					console.log(this.searchvalue)
				}

			},
			getList() {
				//
				ajaxTemplate("/Search/Get_Competition_searchResult", {
					Search_Parm: this.searchvalue,
					User_Id: this.$store.state.userInfo.User_Id ? this.$store.state.userInfo.User_Id : '',
					Page:this.Page,
					Limit:this.Limit,
				}).then((res) => {
					console.log(res)
					this.listData = res.Result
					this.tatal = res.Count
					
					if (this.listData) {
						for (let item of this.listData) {
							item.Home_Scores =
								typeof item.Home_Scores === 'string' ?
								item.Home_Scores.split(',') :
								item.Home_Scores
							item.Away_Scores =
								typeof item.Away_Scores === 'string' ?
								item.Away_Scores.split(',') :
								item.Away_Scores
							if (item.Home_Scores.length == 6 && item.Status_Name != "加时" && item.Category_Id ==
								2) {
					
								item.Home_Scores.splice(4, 1)
								item.Away_Scores.splice(4, 1)
							}
						}
					}
					
					// if (this.listData.length < res.Count) {
					// 	this.listData = this.listData.concat(res.Data)
						
					// } else {
					// 	this.listData = res.Data
						
						
					// }
				})
			},
			// 返回赛事
			cancelClick() {
				uni.navigateBack({

				})
			},
			rowClick(item) {
				// this.tabsList.Competition_id = item.Match_Id
				console.log(item)
				const {
					Anchoer_Id,
					Match_Id
				} = item
				if (
					this.activeIndex == 0 ||
					this.activeIndex == 1 ||
					this.activeIndex == 2 ||
					this.activeIndex == 3 ||
					this.activeIndex == 4
				) {
					if (this.Animation_State == 1) {
						if (item.Coverage_Mlive == 1) {
							console.log("动画直播间")
							uni.navigateTo({
								// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
								url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&activeIndex=2&Id=${item.Id}`
							})
						} else {
							console.log("无反应")
						}
					} else {
						if (item.Coverage_Mlive == 1) {
							console.log("动画直播间")
							uni.navigateTo({
								// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
								url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&activeIndex=2&Id=${item.Id}`
							})
						} else {
							if (item.Anchoer_Logo) {
								console.log("视频直播间")
								uni.navigateTo({
									// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
									url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&activeIndex=1&Id=${item.Id}`
								})
							}
							console.log("无反应")
						}
					}

					// uni.navigateTo({
					// 	// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
					// 	url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}`
					// })
				}
			},
			// 收藏
			collectData(data) {
				ajaxTemplate('/Immediately/Collect_Match', data).then((res) => {
					// console.log('收藏',res);
					// this.collectNum()
				})
			},
			collectionClickDebounced: _.debounce(function (type, item,index) {
			      this.collectionClick(type, item,index)
			    }, 500),
			collectionClick(type, item) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
					return
				}

				if (type == '取消') {
					console.log('取消', this.userInfo.User_Id)
					item.IsCollect = 0
					this.collectData({
						Match_Id: item.Match_Id,
						User_Id: this.userInfo.User_Id,
						Type: 1
					})
				}
				if (type == '收藏') {
					console.log('收藏', this.userInfo.User_Id)
					item.IsCollect = 1
					this.collectData({
						Match_Id: item.Match_Id,
						User_Id: this.userInfo.User_Id,
						Type: 0
					})
				}
				console.log(88888888, item.Type)
			},
			toClicklive(item) {
				if (this.Animation_State == 1) {
					if (item.Coverage_Mlive == 1) {
						console.log("动画直播间")
						uni.navigateTo({
							// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
							url: `/pages/liveView/broadcast/index?Match_Id=${item.Match_Id}&activeIndex=2&Id=${item.Id}`
						})
					} else {
						console.log("无反应")
					}
				} else {
					if (item.Coverage_Mlive == 1) {
						console.log("视频直播间")
						uni.navigateTo({
							// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
							url: `/pages/liveView/broadcast/index?Match_Id=${item.Match_Id}&activeIndex=1&Id=${item.Id}`
						})
					} else {
						console.log("视频直播间")
						uni.navigateTo({
							// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
							url: `/pages/liveView/broadcast/index?Match_Id=${item.Match_Id}&activeIndex=1&Id=${item.Id}`
						})
					}
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	* {
		::v-deep * {
			box-sizing: border-box;
		}
	}

	.navsearch {
		width: 628rpx;
		height: 58rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		opacity: 0.9;
		margin: 0 10px 0 0px;
		display: flex;
		align-items: center;
	}

	.search_top {
		z-index: 999;
		width: 100%;
		height: 176rpx;
		overflow: hidden;
		// background: url('../../../static/image/bjimg5.png') no-repeat  center/100% ;
		position: fixed;
		top: 0;

		.top_input {
			display: flex;
			margin-top: 90rpx;
			align-items: center;
			// justify-content: space-between;
			position: relative;
			padding: 0 25rpx;

			// input {
			// 	width: 624rpx;
			// 	height: 58rpx;
			// 	background: #FFFFFF;
			// 	border-radius: 30rpx 30rpx 30rpx 30rpx;
			// 	opacity: 0.9;
			// 	z-index: 1;
			// }

			// image {
			// 	width: 24rpx;
			// 	height: 24rpx;
			// 	position: absolute;
			// 	left: 50rpx;
			// 	z-index: 2;
			// }

			.qx {
				width: 52rpx;
				height: 26rpx;
				font-size: 26rpx;
				color: #333333;
			}
		}
	}

	.btm_box {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		margin-top: 10rpx;

		.btm_box_top {
			width: 100%;
			height: 52rpx;
			display: flex;
			align-items: center;
			border-bottom: 2px solid #e7e9ee;

			.groups {
				width: 92rpx;
				height: 32rpx;
				font-size: 20rpx;
				background: #ffe3d8;
				color: #cd6d47;
				text-align: center;
				line-height: 32rpx;
				border-radius: 6rpx 6rpx 6rpx 6rpx;
				margin: 0 30rpx 0 20rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				padding: 0 5rpx;
			}

			.times {
				width: 65rpx;
				color: #8e92a4;
				font-size: 22rpx;
				overflow: hidden;
			}

			.section {
				width: 100rpx;
				font-size: 24rpx;
				color: #F4764A;
				margin: 0 0 0 25rpx;
			}

			.progress {
				margin-left: 7%;
				min-width: 300rpx;
				// display: flex;
				// align-items: center;
				// justify-content: space-around;
				line-height: 52rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #333333;

				text {
					margin: 0 8rpx;
				}
			}
		}

		.btm_box_btm {
			width: 100%;
			display: flex;
			align-items: center;
			height: 122rpx;

			.btm1 {
				width: 40rpx;
				height: 40rpx;
				margin: 0 20rpx 0 20rpx;
			}

			.btm2 {
				width: 15%;
				display: flex;
				flex-direction: column;
				margin: 0 120rpx 0 0;

				.btm2_top,
				.btm2_btm {
					display: flex;
					width: 230rpx;
					margin: 5rpx 0;
					font-weight: 500;
					color: #333333;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 8rpx;
					}

					.btm2_top_name,
					.btm2_btm_name {
						width: 190rpx;
						font-size: 26rpx;
						display: flex;
						align-items: center;
					}
				}
			}

			.btm3 {
				margin-left: 9%;
				width: 250rpx;

				.btm3_top,
				.btm3_btm {
					margin: 5rpx 0 13rpx 0;
					width: 250rpx;
					// display: flex;
					// align-items: center;
					// justify-content: space-around;
					font-size: 24rpx;
					font-weight: 500;
					color: #8e92a4;
					font-weight: bold;
					font-size: 22rpx;
					display: flex;
					margin-left: 4%;

					view {
						width: 14.3%;
						margin-left: 5rpx;
						text-align: center;
						// margin: 0 11rpx 0 16rpx;
					}
				}
			}

			.btm4 {
				width: 52rpx;
				height: 52rpx;
				border: 2rpx solid #F4764A;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 35rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
				}
			}
		}
	}
</style>