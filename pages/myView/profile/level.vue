<template>
	<view class="box" style="background-color: #F4F4F5;overflow: hidden;min-height:100vh">
		
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2;background-color:#fff;" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="/static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">我的等级</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <view class="header" style="position: fixed;top: 0;width: 100vw;z-index: 1;">
			<view style="display: flex;align-items: center; justify-content: center;padding-top: 116rpx;">
				<image @click="back" src="/static/image/left-arrowhead.png"
					style="width: 40rpx;height: 40rpx;position: absolute;left: 20rpx;" />
				<p style="font-size: 36rpx;color: #FFFFFF;">我的等级</p>
			</view>
		</view> -->
		<view class="content">
			<view class="top">
				<view style="display: flex;align-items: center;padding: 34rpx 40rpx;">
					<image :src="User_Logo" style="width: 40rpx;height: 40rpx;border-radius: 50%;" />
					<p style="font-size: 28rpx;color: #FFFFFF;margin-left: 10rpx;">{{User_Name}}</p>
				</view>
				<view style="display: flex;align-items: center;margin-left: 40rpx;">
					<p style="font-size: 52rpx;color: #FFFFFF;">LV{{User_Level}}</p>
					<p style="font-size: 24rpx;color: #FFFFFF;margin-left: 8rpx;">(当前等级)</p>
				</view>
				<view class="progress">
					
					<view style="width: 626rpx;height: 8rpx;background: #FFFFFF;border-radius: 10rpx;opacity: 0.5;">
					</view>
					<view :style="{width:progress+'rpx'}"
						style="height: 8rpx;background: #FFFFFF;border-radius: 10rpx;position: absolute;top: -1rpx;">
					</view>
					<view  :style="{left:(progress-20)+'rpx'}"
						style="width: 20rpx;height: 20rpx;background: #FFFFFF;border-radius: 10rpx;position: absolute;top: -7rpx;">
					</view>
				</view>
				<view class="point">
					<p>Lv{{User_Level}}</p>
					<p>{{User_EXP}}/{{Next_User_EXP+User_EXP }}(还需要{{Next_User_EXP}}经验值升级到Lv{{Next_User_Level}})</p>
					<p>Lv{{Next_User_Level}}</p>
				</view>
			</view>
			<view class="middle">
				<p style="font-size: 32rpx;color: #333333;padding:28rpx 0 0 32rpx;font-weight: 500;">等级特权</p>
				<view class="encourages">
					<view v-for="(item,index) in djList" :key="index"
						style="display: flex;align-items: center;justify-content: center;flex-direction: column;width:25%;margin-top:30rpx;margin-bottom:26rpx">
						<image :src="item.img" style="width: 72rpx;height: 72rpx;" />
						<p style="font-size: 28rpx;color: #333333;margin-top: 16rpx;">{{item.name}}</p>
						<view v-if="User_Level<item.lv" style="font-size: 24rpx;color: #9094A5;margin-top: 10rpx;display: flex;align-items: center;">
							<image src="/static/image/suo.png"  style="width:20rpx;height:20rpx;margin-right:6rpx"/>
							<view>lv{{item.lv}}解锁</view>
						</view>
						<view v-else style="font-size: 24rpx;color: #9094A5;margin-top: 10rpx;">
							已获得
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				EXP_Rate:'',
				progress:'',
				User_Logo: '',
				User_Level: '',
				User_Name:'',
				Next_User_Level: '',
				User_EXP:'',
				Next_User_EXP:'',
				show: false,
				djList:[
					{
						name:"等级标签",
						img:"/static/image/djbq.png",
						lv:1
					},
					{
						name:"进场特效",
						img:"/static/image/jctx.png",
						lv:3
					},
					{
						name:"道具礼包",
						img:"/static/image/djlb.png",
						lv:8
					},
					{
						name:"主题弹幕",
						img:"/static/image/ztdm.png",
						lv:12
					},
					{
						name:"VIP客服",
						img:"/static/image/vipk.png",
						lv:16
					},
					{
						name:"神秘宝箱",
						img:"/static/image/smbx.png",
						lv:20
					},
				]
					
					

				
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
		},
		onShow() {
			setTimeout(() => {
				console.log(this.$store.state.userInfo)
				this.User_Logo = this.$store.state.userInfo.User_Logo
				this.User_Name = this.$store.state.userInfo.User_Name
				this.User_Level = this.$store.state.userInfo.User_Level
				this.Next_User_Level = this.$store.state.userInfo.Next_User_Level
				this.User_EXP=this.$store.state.userInfo.User_EXP
				this.Next_User_EXP=this.$store.state.userInfo.Next_User_EXP
				this.EXP_Rate=this.$store.state.userInfo.EXP_Rate
				this.progress=this.EXP_Rate*6.26
				console.log(this.progress)
			}, 500)
		}
	}
</script>

<style scoped lang="less">
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
	.box {
		background-color: #F4F4F5;

		.header {
			height: 176rpx;
			// background: #E73449 url(/static/image/headerball.png) no-repeat top center/100%;
			background-color: #fff;
			position: relative;
		}

		.content {
			margin-top: 220rpx;

			.top {
				margin: 24rpx 22rpx;
				height: 260rpx;
				background: url("/static/image/hybackground.png");
				background-size: 100% 100%;

				.progress {
					margin-left: 40rpx;
					margin-top: 24rpx;
					position: relative;
				}

				.point {
					font-size: 24rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 16rpx 40rpx;
				}

			}

			.middle {
				height: 512rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				// padding: 28rpx 38rpx 10rpx;
				margin: 22rpx;

				.encourages {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}
			}

			.foot {
				margin: 18rpx 22rpx;

				.first {
					height: 164rpx;
					background: #FFFFFF;
					border-radius: 16rpx;
					padding: 0 34rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.new {
						width: 64rpx;
						height: 34rpx;
						background: #D9F1F1;
						border-radius: 0px 12px 0px 12px;
						font-size: 24rpx;
						color: #11A6A2;
						text-align: center;
						line-height: 34rpx;
						margin-left: 12rpx;
					}

					.accomplish {
						width: 136rpx;
						height: 64rpx;
						border-radius: 32rpx;
						border: 2rpx solid #F0222C;
						font-size: 24rpx;
						color: #F0222C;
						text-align: center;
						line-height: 64rpx;
					}
				}

			}
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

		.imgbox {
			width: 299px;
			height: 253px;
			background: url('/static/image/qdbc.png');
			background-size: 100% 100%;
			background-position: center;
		}

		.day {
			margin-top: 10px;
			color: #333333;
			font-weight: bold;
			font-size: 16px;
			margin-right: 20px;

			.day_number {
				color: #FF9018;
				font-size: 38px;
				font-weight: bold;
				margin-right: 5px;
			}
		}

		.qiandao_box {
			padding: 0 10px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			.qiandao {
				margin: 15px 0 3px 0;
				width: 59px;
				height: 64px;
				border-radius: 6px 6px 6px 6px;
				opacity: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background: #F4F4F4;
				position: relative;
			}

			.qiandao_seven {
				margin-top: 15px;
				display: flex;
				justify-content: space-around;
				width: 128px;
				height: 65px;
				background: #F4F4F4;
				border-radius: 6px 6px 6px 6px;
				position: relative;

				.qd {
					margin-top: 10px;
					font-size: 15px;
					color: #333333;
					font-weight: bold;
					margin-bottom: 15px;
				}

				image {
					width: 31px;
					height: 31px;
					margin: 25px -10px 0 0;
				}
			}
		}

		.qiandao_btn {
			margin: 15px 0 10px 20px;
			text-align: center;
			line-height: 39px;
			font-size: 14px;
			color: #FFFFFF;
			width: 267px;
			height: 39px;
			background: linear-gradient(90deg, #E2E4E3 0%, #C7C9CE 100%);
			border-radius: 20px 20px 20px 20px;
			font-weight: 500;

		}

		.qiandao_bottom {
			margin-top: 5px;
			width: 100%;
			text-align: center;
			font-size: 11px;
			font-weight: 400;
			color: #999999;
		}
	}
</style>
