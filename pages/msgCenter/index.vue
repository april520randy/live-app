<template>
	<view>
		<var-app-bar :style="{opacity:show==true?1:0,zIndex:show==true?999:0 }"
			style="position:fixed;top:0;border-radius:0;background-color: #fff;" color="#fff" round  :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">消息中心</view>
				</view>
			</template>
		</var-app-bar>
		<var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0;background-color: #fff;"  color="#fff" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">消息中心</view>
				</view>
			</template>
		</var-app-bar>

		<view>
			<view class="message" @click="tomessages" v-if="messageList">
				<image style="width: 56rpx;height: 56rpx;margin-right:28rpx;margin-left:36rpx"
					src="../../static/image/message.png" mode="widthFix">
				</image>
				<div class="mgbody">
					<div>系统通知</div>
					<div class="content">{{messageList.Message}}</div>
				</div>
				<div style="font-size: 24rpx;">{{ messageList.Time?messageList.Time.substring(5, 16).replace('T', ' '):''}}</div>
			</view>
			<view v-else style="
			  display: flex;
			  justify-content: center;
			  flex-direction: column;
			  align-items: center;
			  width:100%;
			  height:100%;
			  margin-top:250rpx;
			">
				<image src="/static/image/sckong.png" mode="" style="width: 400rpx; height: 400rpx; ">
				</image>
				<view style="color: #9ea2af; font-size: 26rpx; margin-top: 15rpx">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '../../api/index.js'
	export default {
		data() {
			return {
				show: false,
				searchvalue: '',
				tatal: 0,
				data: {
					User_Id: '',
				},
				messageList:{}
			}
		},
		onLoad() {
			this.data.User_Id = this.$store.state.userInfo.User_Id
			this.getList()
		},
		methods: {
			getList() {
				ajaxTemplate(
					'/User/Get_MessageToCenter',
					this.data
				).then(res => {
					console.log(res,'sdfsg')
					this.messageList=res.Result[0]
			
				})
			},
			tomessages(){
				uni.navigateTo({
					url:'/pages/msgCenter/messages'
				})
			},
			back() {
				uni.navigateBack(-1)
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
		height: 88rpx;
		display: flex;
		align-items: center;

		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			margin-left: 252rpx;
		}

	}

	.message {
		height: 156rpx;
		width: 100%;
		display: flex;
		align-items: center;

		.mgbody {
			
			font-size: 30rpx;
			font-weight: 500;
			color: #333333;
			margin-right: 200rpx;
			white-space: nowrap;
			
		}

		.content {
			width: 284rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #8E92A4;
			margin-top: 12rpx;
			white-space: nowrap;
			text-overflow:ellipsis;
			overflow: hidden;
		}
	}
</style>
