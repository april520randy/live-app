<template>
	<view style="background-color:#F5F5F5;min-height: 100vh;">
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2;background-color: #fff;" round  :elevation='false'>
			<template #content>
				<view class='nav'>
					<view class='navsearch'>
						<image src="../../static/image/search.png" style="width: 26rpx;height: 26rpx;">
						</image>
						<input type="text" v-model='searchvalue' @input="doSearch" placeholder-style='fontSize:26rpx;'
							style="color: #333333;font-size: 26rpx;" placeholder="搜索主播/直播" />
					</view>
					<view style='font-size: 26rpx;color:#333333' @click="back">取消</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0" round image="/static/image/beij.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<view class='navsearch'>
						<image src="../../static/image/search.png" style="width: 26rpx;height: 26rpx;">
						</image>
						<input type="text" v-model='searchvalue' @input="doSearch" placeholder-style='fontSize:26rpx'
							style="color:#97878A" placeholder="搜索主播/直播">
					</view>
					<view style='font-size: 26rpx;' @click="back">取消</view>
				</view>
			</template>
		</var-app-bar> -->
		<view style="height:180rpx">
			
		</view>
		<!-- 推荐 -->
		<view v-if="(zbList.length>0 || hotLive.length>0)&&searchvalue==null"
			style="background-color: #F5F5F5;height:100%;padding:20rpx">
			<view v-if="zbList.length>0">
				<view class="bodyheader" style="margin-top:0;">
					<image src="../../static/image/newzhub.png" style="width: 60rpx;height: 60rpx;margin-right:24rpx;margin-top:20rpx">
					</image>
					<view style="font-size: 28rpx;color: #333333;font-weight: bold;">
						<view style="font-size: 28rpx;
						font-family: Source Han Sans CN-Bold, Source Han Sans CN;
						font-weight: bold;
						color: #333333;">推荐主播</view>
													<view style="font-size: 20rpx;
						font-family: DIN-Regular, DIN;
						font-weight: 400;
						color: #888C94;">RECOMMENDED ANCHOR</view>
					</view>
				</view>
				<view>
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
						<view v-for="item in zbList" class="zhuboitem" :key="item.Anchoer_Id">
							<view class="zhuboimg">
								<image :src="item.Anchoer_Logo"
									style="width: 110rpx;height: 110rpx;border-radius: 50%;"></image>
								<div class='zhubgz' @click='submit2Debounced(item.Anchoer_Id)' v-if="item.IsInterest==1">
									<!-- <image src="../../static/image/ygz.png"
										style="width: 20rpx;height: 20rpx;margin-right:2rpx"></image> -->
									<div>已关注</div>
								</div>
								<div class='zhubwgz' v-if="item.IsInterest==0" @click='cancel2Debounced(item.Anchoer_Id)'>
									<!-- <image src="../../static/image/gz.png"
										style="width: 20rpx;height: 20rpx;margin-right:2rpx"></image> -->
									<div>关注</div>
								</div>
							</view>
							<view class="zhubotitle">
								<view>{{item.Anchoer_Name}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view v-if="hotLive.length>0">
				<view class="bodyheader">
					<image src="../../static/image/nezbb.png" style="width: 60rpx;height: 60rpx;margin-right:24rpx">
					</image>
					<view style="font-size: 28rpx;color: #333333;font-weight: bold;">
						<view style="font-size: 28rpx;
						font-family: Source Han Sans CN-Bold, Source Han Sans CN;
						font-weight: bold;
						color: #333333;">推荐直播</view>
													<view style="font-size: 20rpx;
						font-family: DIN-Regular, DIN;
						font-weight: 400;
						color: #888C94;">RECOMMENDED LIVEs</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;flex-wrap: wrap;">
					<view class="zhiboitem" v-for="item in hotLive" :key="item.Match_Id">
						<view class="zhiboitemimg">
							<image :src="item.Match_Img" style="width: 346rpx;height: 196rpx;"></image>
							<!-- <view class="itemtitle">
								<image src="../../static/image/bo.png" style="width: 24rpx;height: 24rpx;"></image>
								<view>直播中</view>
							</view> -->
							<view class="bq">
								<image :src="'../../static/image/bqq/' + item.Anchoer_Tab + '.png'" alt=""
									mode="heightFix" />
							</view>
						</view>
						<view class="zhibotitle"
							style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 330rpx;height: 50rpx;">
							{{item.Match_Title}}
						</view>
						<view class="zhibotitle"
							style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 330rpx;"
							v-if="item.Match_Title ==''"></view>
						<view class="zhibocontent">
							<view>{{item.Anchoer_Name}}</view>
							<view style="display: flex;align-items: center;">
								<image src="../../static/image/huo.png" style="width: 20rpx;height: 20rpx;"></image>
								<view>{{item.Popularity_Value}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view v-if="hotLive.length==0&&zbList.length==0&& searchvalue==null"
			style="text-align: center;height:80vh;display: flex;flex-direction: column;align-items: center;justify-content: center;">
			<image src="/static/image/sckong.png" mode="" style="width: 400rpx; height: 400rpx; "></image>
			<view style="color: #9ea2af; font-size: 26rpx; margin-top: 15rpx">
				暂无数据
			</view>
		</view>
		<!-- 搜索结果 -->
		<view v-if="userList.length>0&&searchvalue!=null"  class="bodyheader" style="margin-top:0;">
			<image src="../../static/image/newzhub.png" style="width: 60rpx;height: 60rpx;margin-right:24rpx;margin-left:20rpx;margin-top:20rpx">
			</image>
			<view style="font-size: 28rpx;color: #333333;font-weight: bold;margin-top:20rpx">相关主播</view>
		</view>
		<view v-if="userList.length>0&&searchvalue!=null" style="background-color: #F5F5F5;height:100%;padding:0 20rpx 20rpx">
		
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
				<view v-for="item in userList" class="zhuboitem" :key="item.Anchoer_Id">
					<view class="zhuboimg">
						<image :src="item.User_Logo" style="width: 110rpx;height: 110rpx;border-radius: 50%;"></image>
						<div v-if="item.IsInterest==1" class='zhubgz' @click='submitDebounced(item.Interest_Id)'>
							<!-- <image src="../../static/image/ygz.png"
								style="width: 20rpx;height: 20rpx;margin-right:2rpx"></image> -->
							<div>已关注</div>
						</div>
						<div class='zhubwgz' @click='cancelDebounced(item.Anchoer_Id)' v-else>
							<!-- <image src="../../static/image/gz.png" style="width: 20rpx;height: 20rpx;margin-right:2rpx">
							</image> -->
							<div>关注</div>
						</div>
					</view>
					<view class="zhubotitle">
						<view>{{item.User_Name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="bodyheader" v-if="matchList.length>0&&searchvalue!=null">
			<image src="../../static/image/nezbb.png" style="width: 60rpx;height: 60rpx;margin-right:24rpx;margin-left:20rpx">
			</image>
			<view style="font-size: 28rpx;color: #333333;font-weight: bold;">相关直播</view>
		</view>
		<view v-if="matchList.length>0&&searchvalue!=null"
			style="display: flex;justify-content: space-between;flex-wrap: wrap;padding:0 20rpx 20rpx;background-color: #F5F5F5;">
			
			<view class="zhiboitem" v-for="item in matchList" :key="item.Match_Id">
				<view class="zhiboitemimg">
					<image :src="item.Img" style="width: 346rpx;height: 196rpx;"></image>
					<!-- <view class="itemtitle" v-if="item.IsLive==1">
						<image src="../../static/image/bo.png" style="width: 24rpx;height: 24rpx;"></image>
						<view>直播中</view>
					</view> -->

					<view class="bq">
						<image :src="'../../static/image/bqq/' + item.Anchoer_Tab + '.png'" alt="" mode="heightFix" />
					</view>
				</view>
				<view class="zhibotitle" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
					{{item.Title}}
				</view>
				<view class="zhibocontent">
					<view>{{item.User_Name}}</view>
					<view style="display: flex;align-items: center;">
						<image src="../../static/image/huo.png" style="width: 20rpx;height: 20rpx;"></image>
						<view>{{item.Num}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="matchList.length==0&& userList.length==0&& searchvalue!=null"
			style="text-align: center;height:80vh;display: flex;flex-direction: column;align-items: center;justify-content: center;">
			<image src="/static/image/sckong.png" mode="" style="width: 400rpx; height: 400rpx; "></image>
			<view style="color: #9ea2af; font-size: 26rpx; margin-top: 15rpx">
				暂无数据
			</view>
		</view>
	</view>


</template>
<script>
	import {
		ajaxTemplate
	} from '../../api/index.js'
	import store from "@/store/index.js";
	import _ from 'lodash'
	export default {
		data() {
			return {
				show: false,
				User_Id: '',
				searchvalue: null,
				matchList: [],
				userList: [],
				zbList: [],
				hotLive: []
			}
		},
		onLoad() {
			this.getRecommend()
			this.getHotLive()
			// this.getList()
		},
		methods: {
			cancelDebounced: _.debounce(function (id) {
			      this.cancel(id)
			    }, 500),
			cancel(id) {
				console.log({
					User_Id: this.$store.state.userInfo.User_Id ? this.$store.state.userInfo.User_Id : '',
					Anchoer_Id: id
				});
				if (this.$store.state.userInfo.User_Id != undefined) {
					ajaxTemplate('/Interest/Add_InterestList', {
						User_Id: this.$store.state.userInfo.User_Id ? this.$store.state.userInfo.User_Id : '',
						Anchoer_Id: id
					}).then(res => {
						// console.log(res,'aaaaaaa')
						uni.showToast({
							icon: 'none',
							title: res.Message,
							mask: true
						})
						this.getRecommend()
						this.getHotLive()
						this.getList()

					})
				} else {
					uni.navigateTo({
						url: "/pages/login/index",
					});

					return;

				}
			},
			cancel2Debounced: _.debounce(function (id) {
			      this.cancel2(id)
			    }, 500),
			cancel2(id) {

				if (this.$store.state.userInfo.User_Id != undefined) {
					ajaxTemplate('/Interest/Add_InterestList', {
						User_Id: this.$store.state.userInfo.User_Id ? this.$store.state.userInfo.User_Id : '',
						Anchoer_Id: id
					}).then(res => {
						// console.log(res,'aaaaaaa')
						uni.showToast({
							icon: 'none',
							title: res.Message,
							mask: true
						})
						this.getRecommend()
					})
				} else {
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;

				}
			},
			submitDebounced: _.debounce(function (id) {
			      this.submit(id)
			    }, 500),
			submit(id) {
				if (this.$store.state.userInfo.User_Id != undefined) {
					ajaxTemplate('/Interest/Cancel_InterestList', {
						Interest_Id: id
					}).then(res => {
						// console.log(res,'aaaaaaa')
						uni.showToast({
							icon: 'none',
							title: res.Message,
							mask: true
						})
						this.getRecommend()
						this.getHotLive()
						this.getList()

					})
				} else {
					uni.navigateTo({
						url: "/pages/login/index",
					});

					return;
				}
			},
			submit2Debounced: _.debounce(function (id) {
			      this.submit2(id)
			    }, 500),
			submit2(id) {
				if (this.$store.state.userInfo.User_Id != undefined) {
					ajaxTemplate('/Interest/Cancel_InterestList', {
						User_Id: this.$store.state.userInfo.User_Id,
						Anchoer_Id: id
					}).then(res => {
						// console.log(res,'aaaaaaa')
						uni.showToast({
							icon: 'none',
							title: res.Message,
							mask: true
						})
						this.getRecommend()


					})
				} else {
					uni.navigateTo({
						url: "/pages/login/index",
					});

					return;
				}
			},
			//搜索
			doSearch() {
				console.log(this.searchvalue)
				if (this.searchvalue == '') {
					this.searchvalue = null
				} else {
					this.getList()
				}
				console.log(this.searchvalue)
				// if (this.searchvalue != '') {
				// 	this.getList()
				// } else {
				// 	this.matchList = []
				// 	this.userList = []
				// 	this.getRecommend()
				// 	this.getHotLive()
				// }

			},
			getRecommend() {
				if (this.$store.state.userInfo.User_Id == undefined) {
					ajaxTemplate('/LiveIndex/GetRecommend_AnchoerList', {
						Page: 1,
						Limit: 100,
					}).then((res) => {
						console.log('主播0', res)
						this.zbList = res.Data

					})
					return
				}
				console.log(this.$store.state.userInfo.User_Id)
				this.User_Id = this.$store.state.userInfo.User_Id
				ajaxTemplate('/LiveIndex/GetRecommend_AnchoerList', {
					User_Id: this.User_Id,
					Page: 1,
					Limit: 100,
				}).then((res) => {
					console.log('主播1', res)
					this.zbList = res.Data

				})

			},
			getHotLive() {
				ajaxTemplate('/LiveIndex/GetRecommend_LiveList', {

				}).then(res => {
					console.log(res, "hot")
					this.hotLive = res.Result.hot



				})

			},
			getList() {
				ajaxTemplate('/Search/Get_search_Result', {
					Search_Parm: this.searchvalue,
					User_Id: this.$store.state.userInfo.User_Id ? this.$store.state.userInfo.User_Id : ''
				}).then(res => {
					console.log(res, '00000')
					this.matchList = res.Result.Match.MatchLists

					this.userList = res.Result.User.UserLists
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}

		},
		onPageScroll(e) {
			console.log(e)
			if (e.scrollTop > 0) {
				this.show = true
			} else {
				this.show = false
			}
		},
	}
</script>




<style lang='scss' scoped>
	.nav {
		/* height: 88rpx;
		display: flex;
		align-items: center; */

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx ;
		
		height:88rpx;


		.navsearch {
			/* width: 702rpx;
			height: 58rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			opacity: 0.9;
			/* margin: 0 10px 0 12px; */
			/* display: flex;
			align-items: center; */
			width: 80%;
			height: 58rpx;
			line-height: 58rpx;
			
background: #EFEFEF;
			border-radius: 15px 15px 15px 15px;
			opacity: 0.9;
			position: relative;
			font-size: 13rpx;
			display: flex;
			align-items: center;
			padding-left: 68rpx;
		}

		.navsearch image {
			position: absolute;
			top: 50%;
			left: 12px;
			transform: translateY(-50%);
		}

	}

	.bodyheader {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}


	.zhuboitem {
		display: inline-block;
		width: 184rpx;
		height: 168rpx;
		padding: 20rpx 0;
		background: #FFFFFF;
		border-radius: 12rpx;
		opacity: 1;
		margin-right: 18rpx;
		text-align: center;

		.zhuboimg {
			width: 110rpx;
			height: 110rpx;
			margin: auto;
			border-radius: 50%;
			border: 1px solid #FC683E;
			position: relative;

			.zhubgz {
				width: 116rpx;
				height: 40rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				opacity: 1;
				border: 2rpx solid #FC683E;
				position: absolute;
				bottom: -22rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 22rpx;
				font-weight: 400;
				color: #FC683E;
			}

			.zhubwgz {
				width: 116rpx;
				height: 40rpx;
				background: #FC683E;
				border-radius: 20rpx;
				opacity: 1;
				border: 2rpx solid #FC683E;
				position: absolute;
				bottom: -22rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 22rpx;
				font-weight: 400;
				color: #fff;
			}
		}

		.zhubotitle {
			margin-top: 20rpx;
			font-size: 22rpx;
			color: #333333;
			font-weight: 500;
		}
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.zhiboitem {
		width: 346rpx;
		height: 292rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 12rpx 2rpx #E7E8EB;
		border-radius: 8rpx;
		opacity: 1;
		margin-bottom: 18rpx;
		overflow: hidden;

		.zhiboitemimg {
			position: relative;

			.itemtitle {
				width: 100rpx !important;
				height: 32rpx;
				background: #F0222C;
				border-radius: 4rpx;
				opacity: 1;
				position: absolute;
				top: 12rpx;
				right: 12rpx;
				display: flex;
				align-items: center;
				font-size: 20rpx;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		.zhibotitle {
			padding: 0 12rpx;
			font-size: 28rpx;
			color: #333333;
			font-weight: 500;
		}

		.zhibocontent {
			padding: 0 12rpx 20rpx;
			font-size: 22rpx;

			color: #8E92A4;
			display: flex;
			justify-content: space-between;
		}
	}

	input {
		color: #333333
	}

	/* page {
		background-color: #f5f5f5;
	} */

	.bq {
		width: 104px;
		text-align: right;
		top: -2px;
		right: -20px;
		position: absolute;
		transform: scale(0.5);
		z-index: 1;
		height: 32px;

		image {
			height: 32px;
		}
	}
	
	.uni-input-input{
		color: #333333 !important;
		font-size: 26rpx;
	}
	.uni-input-placeholder{
		font-size: 26rpx !important; 
	}
	
	input{
		color: #333333 !important;
		font-size: 26rpx;
	}
</style>