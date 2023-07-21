<template>
	<view style="background-color: #F4F4F5;height:100vh">
		<var-app-bar style="border-radius:0;background: #fff;" round  :elevation='false'>
			<template #content>
				<view class='nav1'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="/static/image/bq/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle1">消息通知</view>
				</view>
			</template>
		</var-app-bar>

		<view style="position: relative;" class="profile-cells">
			<view class="cell">
				<var-cell title="主播开播提醒">

					<template #extra>
						<span></span>
						<var-switch v-model="value" color="#FC683E" close-color="#FFFFFF" />


					</template>
				</var-cell>
				<span style=" position: absolute;left: 40% ;top: 33%;color: #9094A5;font-size: 12px;">关注的主播开播后通知</span>
			</view>


		</view>
		<view style="position: absolute;left: 30%;font-size: 11px;color: #333333;" >
			建议保持开启状态，接受最新动态
		</view>



	</view>
</template>

<script>
	import store from "@/store/index.js";

	export default {
		data() {
			return {
				user_Logo_pop: false,
				value: ''

			}
		},
		onLoad() {

		},

		computed: {

			userInfo() {
				return store.state.userInfo;
			},
		},
		methods: {
			togglePop() {
				this.user_Logo_pop = !this.user_Logo_pop
			},
			back() {
				uni.navigateBack(-1)
			},
			jump(url) {
				uni.navigateTo({
					url
				});
			},

		},
		onPageScroll(e) {

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
			color: #FFFFFF;
			margin-left: 252rpx;
		}

	}

	.profile-cells {

		margin-top: 9px;

		.cell {
			padding: 0 17px;
			background-color: white;
			margin-bottom: 9px;

			::v-deep .var-cell {


				padding-top: 24rpx;
				padding-bottom: 24rpx;

				.var-cell__extra {

					// flex-shrink: 0;
					display: flex;

					.var-icon {
						opacity: .5;
					}

					&>text {
						margin-right: 18rpx;
						width: 200rpx;
						flex-shrink: 0;
						text-align: right;
					}
				}
			}
		}
	}

	.popup-example-block {
		height: 600rpx;
		display: flex;
		flex-direction: column;

		.title {
			flex-shrink: 0;
			height: 104rpx;
			width: 100%;
			line-height: 104rpx;
			text-align: center;
			border-bottom: 1rpx solid #ddd;
		}

		.list {
			padding-top: 26rpx;
			height: 0;
			flex: 1;
			overflow: auto;
			display: flex;
			flex-wrap: wrap;

			// margin-right: -48px;
			.item {
				width: 25%;
				text-align: center;
				margin-bottom: 26px;
				// margin-right: 48px;
			}

			.var-image {

				margin: auto;

			}
		}
	}
	.nav1 {
		height: 88rpx;
		display: flex;
		align-items: center;
	
		.navtitle1 {
			font-size: 32rpx;
			font-weight: 500;
			color: #333;
			margin-left: 252rpx;
		}
	
	}
</style>
