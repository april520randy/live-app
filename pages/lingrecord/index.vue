<template>
	<view style="background-color: #F4F4F5;min-height: 100vh;">
		<var-app-bar style="position:fixed;top:0;border-radius:0;z-index: 9999;background-color: #fff;" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">领取记录</view>

				</view>
				<!-- 	<view class="title">
					<view :class="{content1:index==i,content:index!=i}" v-for="(item,i) in list" :key="i"
						style="margin:0 70rpx">{{item}}</view>
				</view> -->
			</template>
		</var-app-bar>
		<!-- <var-app-bar style="border-radius:0" round image="/static/image/beij.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle">领取记录</view>
				
				</view>
				<view class="title">
					<view :class="{content1:index==i,content:index!=i}" v-for="(item,i) in list" :key="i"
						@click="index=i" style="margin:0 70rpx">{{item}}
					</view>
				</view>
			</template>
		</var-app-bar> -->
		<view style="height: 200rpx;"></view>
		<view class="foot">
			<view class="first" v-for="(item,index) in receiveList" :key="index">
				<view style="width: 100%;">
					<view style="display: flex;align-items: center;justify-content:space-between;position: relative;">
						<view style="font-size: 28rpx;color: #333333;">{{item.Revenue_Explain}}</view>
						
						
						<view style="color: #9EA2AF;font-size: 26rpx;position: absolute;right:0;top:18px">
							
							<p style="font-size: 24rpx;color: #9EA2AF;">
								{{item.Revenue_Time.substring(5, 10).replace('T', ' ') }}
							</p>
							<p style="font-size: 24rpx;color: #9EA2AF;">
								{{item.Revenue_Time.substring(10, 16).replace('T', ' ') }}
							</p>
						
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-top: 22rpx;">
						<view style="display: flex;align-items: center;">
							<image src="/static/image/experience.png" style="width: 40rpx;height: 40rpx;" />
							<p>×{{item.EXP}}</p>
						</view>
						<!-- <view style="display: flex;align-items: center;margin-left: 28rpx;">
							<image src="/static/image/silver.png" style="width: 32rpx;height: 32rpx;" />
							<p>×20</p>
						</view> -->
						<view style="display: flex;align-items: center;margin-left: 28rpx;">
							<image src="/static/image/metals2.png" style="width: 32rpx;height: 32rpx;" />
							<p>×{{item.Revenue_SilverCoin}}</p>
						</view>
						<view v-if="item.Gift_Name" style="display: flex;align-items: center;margin-left: 28rpx;">
							<image src="/static/image/get--y.png" style="width: 32rpx;height: 32rpx;" />
							<p>×1</p>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="accomplish" @click="open()">去完成</view> -->

		</view>



	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '@/api/index.js'
	export default {
		data() {
			return {
				show: false,
				searchvalue: '',
				clean: false,
				index: 0,
				list: [
					'任务', '活动'
				],
				receiveList:[]

			}
		},
		onLoad() {
			
			ajaxTemplate('/Center/Get_Receiving_Records',{User_Id:this.$store.state.user_Id}).then(res=>{
				console.log(22222,res);
				this.receiveList=res.Result
			})
		},
		methods: {

			back() {
				uni.navigateBack(-1)
			}

		},
		onPageScroll(e) {
			// console.log(e)
			if (e.scrollTop > 60) {
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
			color: #E2D8D8;
		}

		.content1 {
			font-size: 30rpx;
			font-weight: 500;
			color: #FFFCFD;
			position: relative;
		}

		.content1:after {
			display: block;
			position: absolute;
			content: '';
			width: 30rpx;
			border-radius: 8px;
			background-color: #FFFFFF;
			bottom: 8rpx;
			z-index: 9;
			height: 8rpx;
			left: 20%;

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
			top: 2rpx;
			right: 2rpx;
			display: flex;
			align-items: center;
			font-size: 20rpx;
			font-weight: 400;
			color: #FFFFFF;
			padding: 2rpx;
			background: #F0222C;

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

		/* 	.foot {
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
				border: 2rpx solid #E41322;
				color: #E41422;
				margin:0 20rpx 0 38rpx;
			}

			.right {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				background: linear-gradient(90deg, #EE2144 0%, #E3121E 100%);
				border-radius: 38rpx;
				opacity: 1;
			}
		} */
	}

	.foot {
		/* height: 100vh; */

		.first {
			margin: 18rpx 22rpx;
			height: 164rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 0 34rpx;
			display: flex;
			align-items: center;
			/* width: 100%; */
			/* justify-content: space-between; */

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

	/* } */
	/* } */
</style>
