<template>
	<view class="content">
		<view style="height:88rpx;width:100%;background-color: #000;"></view>

		<view class="Animate"  @click="AnimatetitleshowFn">
			<view class="AnimateTitle" v-if="Animatetitleshow">
				<image @click="back" style="width: 40rpx;height: 40rpx;" src="/static/back2.png"
					mode="widthFix">
				</image>
			</view>
			
			<image style="width: 100%;height:100%" src="/static/zuq.png" v-if="!anchoer.animation_Url" mode="aspectFill">
			</image>

			<iframe v-if="anchoer.animation_Url&&anchoer.category2_id==2" frameborder="no"
				:src="anchoer.animation_Url"
				style="height: 600rpx; width: 100%;pointer-events: none;">
			</iframe>
			<iframe  v-if="anchoer.animation_Url&&anchoer.category2_id==1" frameborder="no"
				:src="'https://www.dltkh.top/m.html?id='+this.Match_Id"
				style="height: 600rpx; width: 100%;pointer-events: none;">
			</iframe>

		</view>

		<view class="main">
			<!-- <view class="menu">
				<text @click="activeIndex = 1" :class="{ active: activeIndex == 1 }">视频</text>
				<text @click="activeIndex = 2" :class="{ active: activeIndex == 2 }">动画</text>
			</view> -->
			<pageVideo v-if="activeIndex == 1" :anchoer="anchoer" @changeLiveRoomDetail="changeLiveRoomDetail"
				@sendDanmu="sendDanmu">
			</pageVideo>
			<pageAnimate v-if="activeIndex == 2"></pageAnimate>
		</view>




	</view>
</template>

<script>
	import pageVideo from './modules/page_video/index.vue'
	import pageAnimate from './modules/page_animate/index.vue'
	import {
		ajaxTemplate
	} from '../../../api/index.js'
	export default {
		components: {
			pageVideo,
			pageAnimate,
		},
		data() {
			return {
				Animatetime:'',
				Animatetitleshow:false,
				fenxshow: false,
				enabledanmu: true,

				isFullScreen: false,
				gaovalue: "高清",
				showgaoq: false,
				titleshow: true,
				anchoer: {},
				activeIndex: 2,
				// Anchoer_Id: '',
				Match_Id: '',
				message: {},
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 5s 出现的弹幕',
						color: '#ff00ff',
						time: 5
					}
				],
				time: ''
			}
		},
		watch: {
			Animatetitleshow: {
				handler(newvalue,oldvalue) {
					if(this.Animatetime){
						clearTimeout(this.Animatetime)
					}
					console.log("Animatetitleshow",newvalue,oldvalue)
					if(newvalue==true){
						this.Animatetime= setTimeout(()=>{
							this.Animatetitleshow=false
						},5000)
					}
				},
				immediate: true,
			}
		},

		onLoad(options) {
			this.Match_Id = options.Match_Id
			// document.getElementById('iframe').contentWindow.postMessage(this.Match_Id, 'http://www.dltkh.top');
			
			setTimeout(() => {
				this.getAnimationDetail()
				// window.parent.postMessage("Match_Id", this.Match_Id);
			}, 200)
		},

		methods: {
			back() {
				uni.navigateBack(-1)
			},
			AnimatetitleshowFn(){
				console.log(777)
				this.Animatetitleshow=!this.Animatetitleshow
			},

			getAnimationDetail() {
				ajaxTemplate("/LiveIndex/Get_Animation_Detail", {

					Match_Id: Number(this.Match_Id),
				}).then((res) => {
					console.log(res)
					this.anchoer = res.Result;
					console.log('http://www.dltkh.top/ifream?Match_Id='+this.Match_Id)

				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.Animate {
		width: 100%;
		height: 600rpx;
		background: #000000;
		font-size: 0;
		position: relative;

		.AnimateTitle {
			position: absolute;
			top: 0;
			font-size: 28rpx;
			height: 80rpx;
			width:80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 9;
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 50%;
			margin:20rpx;
			


		}
	}

	* {
		::v-deep * {
			box-sizing: border-box;
		}
	}

	.fenx {
		width: 750rpx;
		// height: 500rpx;
		background: #FFFFFF;
		border-radius: 16px 16px 0px 0px;
		opacity: 1;
		position: fixed;
		bottom: 0;
		font-size: 20rpx;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		font-weight: 400;
		color: #666666;

		.fenxcontent {
			display: flex;
			padding: 64rpx 20rpx 20rpx;
			flex-wrap: wrap;

			.contentitem {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 120rpx;
				height: 120rpx;
				margin-right: 10rpx;
				margin-left: 35rpx;
				margin-bottom: 50rpx;
			}
		}

		.fenxbottom {
			font-size: 28rpx;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			font-weight: 400;
			color: #333333;
			border-top: 2rpx solid #E7E9EE;
			width: 100%;
			height: 108rpx;
			line-height: 108rpx;
			text-align: center;
			margin-top: 10rpx;
		}
	}

	.showgaoq {
		width: 750rpx;
		height: 120rpx;
		// background: #000000;
		position: absolute;
		// opacity: 0.6;
		background: rgba(0, 0, 0, 0.5);
		bottom: 0;
		padding-left: 132rpx;
		font-size: 26rpx;
		color: #E1E3E5;
		display: flex;
		align-items: center;

		.gaoq {
			width: 108rpx;
			height: 54rpx;
			border-radius: 28rpx;
			border: 2rpx solid #FFFFFF;
			text-align: center;
			font-size: 24rpx;
			margin-left: 48rpx;
			margin-right: 40rpx;
			line-height: 54rpx;
			display: flex;
			align-items: center;
			justify-content: center;

		}

		.biaoq {
			width: 108rpx;
			height: 54rpx;
			text-align: center;
			border-radius: 28rpx;
			border: 2rpx solid #FFFFFF;
			line-height: 54rpx;
			font-size: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;

		}
	}

	.isFullScreen {
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		// background-color: red;
		transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
	}

	.nav {

		height: 88rpx;
		width: 100%;
		display: flex;
		align-items: center;
		color: #fff;
		// background-color: #E3121E;
		position: absolute;
		left: 0
	}

	.nav2 {

		height: 60rpx;
		width: 100%;
		display: flex;
		align-items: center;
		color: #fff;
		// background-color: #E3121E;
		position: absolute;
		left: 0;
		top: 60rpx;
		margin-left: 68rpx;

		font-size: 20rpx;
	}

	.nav3 {

		height: 80rpx;
		width: 100%;
		display: flex;
		align-items: center;
		color: #fff;
		// background-color: #E3121E;
		position: absolute;
		bottom: 0;

		font-size: 20rpx;
	}

	.content {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	page {
		background-color: #fff;
	}

	.var-app-bar {
		box-shadow: unset;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.uni-video-container {
		//background-color: transparent;
	}

	::v-deep .uni-video-current-time {
		display: none;
	}

	::v-deep .uni-video-duration {
		display: none;
	}

	::v-deep .uni-video-danmu-button-active {
		border-color: #E3121E;
		color: #E3121E;
	}

	.video-container {
		// display: flex;
		position: relative !important;
	}

	::v-deep #myVideo {}


	.tip {
		display: flex;
		align-items: center;
		position: absolute;
		z-index: 99999999;
		top: 15px;

		text {
			font-size: 10px;
			color: #ffffff;
		}
	}


	.gaoqing {
		margin: 0 30rpx 0 142rpx;

		width: 80rpx;
		height: 44rpx;
		border-radius: 22rpx;
		opacity: 1;
		border: 2rpx solid #FFFFFF;
		text-align: center;
		line-height: 44rpx;
	}

	.video-bottom {
		padding: 0 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		width: 100%;
		bottom: 15px;
		z-index: 9;
	}


	.main {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.menu {
			display: flex;
			align-items: center;
			/* background-color: rgb(242, 243, 243); */
			width: 100%;
			height: 38px;
			/* 	background-image: url('/static/image/broadcast/bar-video.png');
			background-position: 0px -13px;
			background-repeat: no-repeat;
			background-size: 104% auto; */

			font-size: 15px;
			font-weight: 500;

			text {
				flex: 1;
				text-align: center;

				align-self: stretch;
				line-height: 38px;
				transition: all 1;
				color: #645a5c;
				background-color: rgb(242, 243, 243);

				&.active {
					color: #f83141;
					background-color: unset;
				}
			}

			&.rt-active {
				text {
					&:first-child {
						color: #645a5c;
						background-color: rgb(242, 243, 243);
					}

					&:last-child {
						color: #f83141;
						background-color: unset;
					}
				}
			}
		}
	}

	.zqleft {
		position: absolute;
		top: 160rpx;
		left: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.zqright {
		position: absolute;
		top: 160rpx;
		right: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.lqtop {
		width: 100%;
		padding: 0 125rpx;
		height: 108rpx;
		display: flex;
		position: absolute;
		top: 100rpx;
		justify-content: space-between;
		align-items: center;
	}

	.lqbottom {
		width: 100%;
		padding: 0 125rpx;
		position: absolute;
		bottom: 90rpx;

		view {
			margin-top: 30rpx;
			font-size: 12px;
		}
	}

	::v-deep .yui-tabs__line {
		background-color: #F0222C !important;
	}
</style>