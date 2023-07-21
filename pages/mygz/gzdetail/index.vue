<template>
	<view style="min-height: 100vh;background: linear-gradient(135deg, #FFF0EC 0%, #FFFCF8 50%, #FFF2DF 100%);">
		<view class="anchor_top">
			<view class="top_title">
				<image src="../../../static/image/newback.png" mode="" @click="backMy()"></image>
				<view style="display: flex;">
					<!-- <view class="chat">
						<image src="../../../static/image/cahtnew.png"
							style="width: 28rpx;height: 28rpx;margin-right:4rpx"></image>
						<view>与主播私聊</view>
					</view> -->
					<view class="gz" style="height:50rpx"
						:style="{background:IsInterest == 1?'#DADBDB':'#FC683E'}">
						<image v-if="IsInterest == 0" src="../../../static/image/jia.png"
							style="width: 28rpx;height: 28rpx;margin-left:0;margin-top:0"></image>
						<image v-if="IsInterest == 1" src="../../../static/image/duiduidui.png"
							style="width: 28rpx;height: 28rpx;margin-left:0;margin-top:0"></image>
						<view @click="GZfnDebounced" :style="{color:IsInterest == 1?'#9094A5':'#FFFFFF'}">
							{{ IsInterest == 1?"已关注":"关注" }}
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;text-align: center;margin-top: 68rpx;">
				<image :src="User_Logo" style="width: 160rpx;height:  160rpx;border-radius: 50%;
border: 4rpx solid #FC683E;"></image>
			</view>
			<view style="display: flex;justify-content: center;margin-top: 16rpx;align-items: center;">
				<view style="font-size: 18px;font-weight: 500;color: #333333;">{{User_Name}}</view>
				<!-- <image src="../../../static/image/lv12.png" style="width: 120rpx;height: 36rpx;margin-left: 12rpx;"></image> -->
				<image :src=" `../../../static/image/myView/dd${User_Level}.png`"
					style="width: 120rpx;margin-left: 12rpx;" mode="widthFix"></image>
				<!-- <view style="font-size: 24rpx;font-weight: 500;color: #9094A5;">用户等级：{{this.User_Level}}</view> -->
			</view>

			<view class="useid">
				直播ID：{{this.Anchoer_Id}}
			</view>

			<view
				style="font-size: 12px;font-weight: 400;color: #9094A5;display: flex;justify-content: space-around;align-items: center;margin-top: 10px;">

				<view style="width: 100px;text-align: center;">最高人气</view>


				<image src="../../../static/s.png" style="width: 1rpx;height: 32rpx;"></image>
				<view style="width: 100px;text-align: center;">粉丝数量</view>
				<image src="../../../static/s.png" style="width: 1rpx;height: 32rpx;"></image>
				<view style="width: 100px;text-align: center;">主播分类</view>
			</view>
			<view
				style="font-size: 18px;font-weight: bold;color: #333333;display: flex;justify-content: space-around;align-items: center;margin-top: 10px;">
				<view style="width: 100px;text-align: center;">{{Popularity_Value}}</view>

				<view style="width: 100px;text-align: center;">{{Funs_Num}}</view>

				<view style="width: 100px;text-align: center;">{{Live_TypName}}</view>
			</view>
		</view>
		<view style="height: 720rpx;"></view>
		<view class="center">
			<view style="font-size: 28rpx;font-weight: bold;color: #333333;padding: 12rpx 0 10rpx 15rpx;">主播简介</view>
			<view style="margin-top:20rpx;width: 710rpx;font-size: 22rpx;font-weight: 400;color: #333333;background: #FFFCFC;border-radius: 16rpx 16rpx 16rpx 16rpx;opacity: 1;border: 2rpx solid #FFE7D5;height: 154rpx;margin:auto">
				{{Anchoer_Introduction||"暂无主播简介"}}
			</view>
		</view>
		<!-- <view class="qunChat" v-if="GroupList.length>0"> -->
		<view class="qunChat"  v-if="GroupList.length>0">
			主播的群聊
		</view>
		<view>
			<view class="footer" v-for="item in GroupList">
				<view style="margin-left: 12px;">
					<view>{{item.Group_Name}}</view>
					<view class="item">
						<image src="../../../static/image/newfans.png" style="width: 24rpx;height: 24rpx;"></image>
						<view>{{item.Group_Members}}/{{item.Group_MaxMembers}}</view>
					</view>
				</view>
				<view class="look" 
					:style="{background:item.Is_Join== 1?'#DADBDB':'#FC683E'}"
					@click="lookDetail(item)" style="margin-right: 12px;height:52rpx">{{changeIs_Join(item.Is_Join)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { joinGroup } from '/utils/iM.js'
	import {
		Result
	} from '@varlet/ui'
	import _ from 'lodash'
	import {
		ajaxTemplate
	} from '../../../api/index.js'
	export default {
		data() {
			return {
				User_Logo: '',
				User_Name: '',
				User_Level: 0,
				Popularity_Value: '',
				Funs_Num: '',
				Live_TypName: '',
				Anchoer_Introduction: '',
				IsInterest: '',
				GroupList: [{}],
				Anchoer_Id: ''
			}
		},
		methods: {
			gochat(){
				///pages/TUIKit/TUIPages/TUIChat/index?conversationName=官方主播01
				// uni.switchTab({
				// 	url:"/pages/TUIKit/TUIPages/TUIConversation/index"
				// })
				console.log(9999)
				// uni.navigateTo({
				// 	url:`/pages/TUIKit/TUIPages/TUIChat/index?conversationName=${this.User_Name}`
				// })
			},
			GZfnDebounced: _.debounce(function () {
			      this.GZfn()
			    }, 500),
			GZfn() {
				if(this.IsInterest == 0){
					ajaxTemplate("/Interest/Add_InterestList", {
						User_Id: this.$store.state.userInfo.User_Id,
						Anchoer_Id: this.Anchoer_Id
					}).then((res) => {
						console.log(res)
						if (res.Code == 200) {
							uni.showToast({
								title: res.Message,
								mask: true,
								icon: "none"
							})
					
						} else {
							uni.showToast({
								title: res.Message,
								mask: true,
								icon: "none"
							})
						}
					
						this.GetAnchoerInfo()
					})
				}else{
					ajaxTemplate('/Interest/Cancel_InterestList', {
						User_Id:this.$store.state.userInfo.User_Id,
						Anchoer_Id: this.Anchoer_Id
					}).then(res => {
						if (res.Code == 200) {
							uni.showToast({
								title: res.Message,
								mask: true,
								icon: "none"
							})
											
						} else {
							uni.showToast({
								title: res.Message,
								mask: true,
								icon: "none"
							})
						}
											
						this.GetAnchoerInfo()
					})
				}
				
			},
			backMy() {
				uni.navigateBack({
					delta: 1
				})
			},
			lookDetail(item) {
				console.log(item)
				if(item.Is_Join==0){
					ajaxTemplate('/Interest/Join_Group', {
					  Group_Id: item.Group_Id,
					  User_Id: this.$store.state.userInfo.User_Id
					}).then((res) => {
					  console.log(res)
					  if(res.Code==200){
						this.GetAnchoerInfo()
						  uni.showToast({
						  	title: res.Message,
						  	mask: true,
						  	icon: "none"
						  })
						  
					  }
					 
					})
					// joinGroup(item.Group_Id, (res) => {
					//   console.log(res, 'joinGroup')
					//   setTimeout(() => {
					//     mitt.emit('sendMessage', true)
					//   }, 500)
					// })
				}
				
			},
			changeIsInterest(type) {
				switch (type) {
					case 0:
						return '未关注'
					case 1:
						return '已关注'
				}
			},
			changeIs_Join(type) {
				switch (type) {
					case 0:
						return '加入'
					case 1:
						return '已加入'
				}
			},
			GetAnchoerInfo() {
				ajaxTemplate('/Interest/GetAnchoerInfo', {
					Anchoer_Id: this.Anchoer_Id,
					User_Id: this.$store.state.userInfo.User_Id
				}).then(res => {
					console.log('res--y', res)
					this.User_Logo = res.Result.User_Logo
					this.User_Name = res.Result.User_Name
					this.User_Level = res.Result.User_Level
					this.Popularity_Value = res.Result.Popularity_Value
					this.Funs_Num = res.Result.Funs_Num
					this.Live_TypName = res.Result.Live_TypName
					this.Anchoer_Introduction = res.Result.Anchoer_Introduction
					this.IsInterest = res.Result.IsInterest
					this.GroupList = res.Result.GroupList
					console.log(this.GroupList,this.User_Level);
				})
			}

		},
		onLoad(option) {
			console.log(option.Anchoer_Id)
			this.Anchoer_Id = Number(option.Anchoer_Id)
		},
		onShow() {
			ajaxTemplate('/Interest/GetSelf_FunsList', {
					Anchoer_Id: this.Anchoer_Id
				}).then(res => {
					// console.log('res',res.Result)
					// console.log(res.Result.length)
					// this.fscount = res.Result.length
				}),

				ajaxTemplate('/Interest/GetAnchoerInfo', {
					Anchoer_Id: this.Anchoer_Id,
					User_Id: this.$store.state.userInfo.User_Id
				}).then(res => {
					console.log('res--y', res)
					this.User_Logo = res.Result.User_Logo
					this.User_Name = res.Result.User_Name
					this.User_Level = res.Result.User_Level
					this.Popularity_Value = res.Result.Popularity_Value
					this.Funs_Num = res.Result.Funs_Num
					this.Live_TypName = res.Result.Live_TypName
					this.Anchoer_Introduction = res.Result.Anchoer_Introduction
					this.IsInterest = res.Result.IsInterest
					this.GroupList = res.Result.GroupList
					// console.log(this.GroupList);
				})
		},
	}
</script>

<style scoped lang="scss">
	page {

		background: #F4F4F5;
	}

	.useid {
		font-size: 28rpx;
		font-weight: 400;
		color: #9094A5;
		display: flex;
		justify-content: center;
		margin-top: 28rpx;
		margin-bottom:20rpx;
		align-items: center;
	}

	.anchor_top {
		z-index: 999;
		position: fixed;
		top: 0;
		width: 100%;

		height: 720rpx;
		// background: linear-gradient(135deg, #FFF2EC 0%, #FFFFF8 50%, #DFFBFF 100%);
		background: url("../../../static/image/grayleftnew.png") no-repeat;
		overflow: hidden;

		.top_title {
			display: flex;
			align-items: center;
			// width: 100%;
			height: 40rpx;
			margin-top: 110rpx;
			// padding: 0 20rpx; 
			justify-content: space-between;
			padding-right: 20rpx;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-top: 10rpx;
				margin-left: 20rpx;
			}

			// view {
			// 	font-size: 32rpx;
			// 	font-weight: 500;
			// 	color: #FFFFFF;
			// 	margin-left: 35%;
			// }
		}
	}

	.chat {
		width: 100px;
		line-height: 28px;
		
		background: #FFEFE4;
		border-radius: 14px 14px 14px 14px;
		opacity: 1;
		display: flex;
		// justify-content: center;
		align-items: center;
		font-size: 12px;
		font-weight: 400;
		color: #FC683E;
	}

	.gz {
		width: 120rpx;
		// line-height: 28px;
		background: linear-gradient(126deg, #EE2144 0%, #E3121E 100%);
		border-radius: 14px;
		margin-left: 17px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
		// margin-right: 20rpx;

		// text-align: center;
	}

	.center {
		// width: 100%;
		// height: 80px;
		border-radius: 0px 0px 8px 8px;
		opacity: 1;
		// padding-left: 44rpx;
		padding-top: 24rpx;
	}

	.qunChat {
		background: url('../../../static/image/qlnew.png') no-repeat;
		text-align: center;
		width: 352rpx;
		line-height: 80rpx;
		background-size: cover;
		margin: 24px auto;
		
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.footer {
		width: 710rpx;
		height: 70px;
		background: #FFFFFF;
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		// margin: 0 24rpx;
	}

	.item {
		width: 64px;
		height: 20px;
		line-height: 20px;
		background: #F2F3F3;
		border-radius: 2px;
		font-size: 11px;
		color: #FC683E;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 6px;
	}

	.look {
		width: 128rpx;
		height:52rpx;
		line-height: 52rpx;
		background: linear-gradient(93deg, #EE2144 0%, #E3121E 100%);
		border-radius: 13px 13px 13px 13px;
		opacity: 1;
		text-align: center;
		font-size: 12px;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>