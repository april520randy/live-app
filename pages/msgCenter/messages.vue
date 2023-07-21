<template>
	<view style="background-color: #F4F4F5;height:100vh">
		<var-app-bar :style="{opacity:show==true?1:0,zIndex:show==true?999:0 }"
			style="position:fixed;top:0;border-radius:0;background-color: #fff;"  color="#fff" round  :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">系统通知</view>
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
					<view class="navtitle">系统通知</view>
				</view>
			</template>
		</var-app-bar>

		<view>
			<view v-for="item in messageList">
				<view class="title">{{ item.Time.substring(0, 16).replace('T', ' ')}}</view>
				<view class="body">
					<image  style="width: 48rpx;height: 48rpx;margin-left:20rpx;margin-right:10rpx"
						src="../../static/image/xttx.png" mode="widthFix">
					</image>
					<view class="content">
						<p>{{item.Message}}</p>
						<!-- <p>恭喜您已完成：连续签到1天任务(ID:31),奖励如下：</p>
						<p>经验值×20、银币×29</p> -->
					</view>
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
					this.messageList=res.Result
			
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
	.title{
		width: 232rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		opacity: 1;
		margin: 30rpx auto 26rpx;
		text-align: center;
		font-size: 26rpx;
		font-weight: 400;
	}
	.body{
		display: flex;
		
		.content{
			width: 632rpx;
			height: 90rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			opacity: 1;
			padding:24rpx 0 0 12rpx;
			
			white-space: normal;
			font-size: 26rpx;
			line-height: 34rpx;
			font-weight: 400;
			color: #333333;
		}
	}
	
</style>
