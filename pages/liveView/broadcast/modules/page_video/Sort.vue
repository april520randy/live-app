<template>
	<view class="tabs">
		<text :class="{ active: tabActive == 0 }" @click="tabActiveFn ">贡献日榜</text>
		<text :class="{ active: tabActive == 1 }" @click="tabActiveFn2 ">贡献周榜</text>
	</view>
	<view class="scroll-view">
		<image  v-if="list==0" style="width: 50%;height: 50%;margin: auto;" src="/static/image/sckong.png" mode=""></image>
		<p v-if="list==0" style="width: 50%;height: 50%;margin: auto;text-align: center;" src="/static/image/sckong.png">暂无排行</p>
		<view v-for="(item, index) in list" class="item">
			<view style="width: 40rpx;height: 44rpx;margin-right: 36rpx;" class="sort">
				<image style="width: 100%;height: 100%" src="/static/image/broadcast/star_top_1.png" v-if="index==0" />
				<image style="width: 100%;height: 100%" src="/static/image/broadcast/star_top_2.png" v-if="index==1" />
				<image style="width: 100%;height: 100%" src="/static/image/broadcast/star_top_3.png" v-if="index==2" />
				<text v-else style="color:#8E92A4" v-if="index>2">{{ index + 1 }}</text>
			</view>

			<view style="width: 88rpx;height: 88rpx;margin-right: 18rpx;" class="avatar">
				<view v-if="index==0" style="width: 100%;height: 100%">
					<image style="width: 100%;height: 100%" src="/static/image/broadcast/top1.png" />
					<image style="width: 64rpx;height: 64rpx;" :src="item.User_Logo" class="avatar-icon" />
				</view>
				<view v-if="index==1" style="width: 100%;height: 100%">
					<image style="width: 100%;height: 100%" src="/static/image/broadcast/top2.png" />
					<image style="width: 64rpx;height: 64rpx;" :src="item.User_Logo" class="avatar-icon" />
				</view>
				<view v-if="index==2" style="width: 100%;height: 100%">
					<image style="width: 100%;height: 100%" src="/static/image/broadcast/top3.png" />
					<image style="width: 64rpx;height: 64rpx;" :src="item.User_Logo" class="avatar-icon" />
				</view>
				<image v-if="index>2" :src="item.User_Logo" style="width: 64rpx;height: 64rpx;" class="avatar-icon" />
			</view>

			<view class="mid">
				<text class="name">{{ item.User_Name }}</text>
				<view class="labels">
					<image :src=" `/static/image/myview/dd${item.User_Lever}.png`"
						style="width: 72rpx;height: 22rpx;margin-left: 12rpx;"></image>

				</view>
			</view>
			<text class="mark">{{ item.User_Contribute_Value }}</text>

		</view>
	</view>
</template>

<script>
	import store from "/pages/TUIKit/TUICore/store";
	import {
		ajaxTemplate
	} from "/api/index.js";
	export default {


		components: {

		},
		props: {
			anchoer: {
				default: () => {
					return {};
				},
				type: Object,
			},
		},
		data() {
			return {
				oldMessageTime: 0,
				tabActive: 0,
				list: [

				],

			}
		},


		created() {
			this.getLiveRoomRank()
		},
		onReady() {

		},

		onPageScroll(e) {

		},
		methods: {
			tabActiveFn() {
				this.tabActive = 0
				this.getLiveRoomRank()
			},
			tabActiveFn2() {
				this.tabActive = 1
				this.getLiveRoomRank()
			},
			///LiveRoom/Get_LiveRoomRank
			getLiveRoomRank() {
				ajaxTemplate("/LiveRoom/Get_LiveRoomRank", {
					Anchoer_Id: this.anchoer.Anchoer_Id,
					Time_Type: this.tabActive
				}).then((res) => {
					this.list = res.Result
				})
			}

		}
	}
</script>


<style lang='scss' scoped>
	.tabs {
		display: flex;
		justify-content: center;
		margin-top: 20px;

		text {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 202rpx;
			height: 48rpx;
			background: #FFFFFF;
			border: 2rpx solid #E7E9EE;
			font-size: 22rpx;
			color: #8E92A4;
			transition: all 0.3s;


			&.active {
				color: #FFFFFF;
				background: #ED5F2D;
			}

			&:first-child {
				border-radius: 24rpx 0rpx 0rpx 24rpx;
			}

			&:last-child {
				border-radius: 0 24rpx 24rpx 0rpx;
			}
		}
	}

	.scroll-view {
		display: flex;
		flex-direction: column;
		margin-top: 38rpx;
		flex: 1;
		overflow: auto;

		.item {
			padding: 6px 12px 12px 20px;
			display: flex;
			align-items: center;

			.sort {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.avatar {
				display: flex;
				align-items: center;
				justify-content: center;

				&>view {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;

					image {

						&:first-child {
							position: absolute;
							left: 0;
							right: 0;
							top: 0;
							bottom: 0;
							z-index: 9;
						}

						&:last-child {
							z-index: 1;
						}
					}
				}

				.avatar-icon {
					position: relative;
					left: -2rpx;
				}

			}

			.mid {
				flex: 1;
				margin-right: 20rpx;
				display: flex;
				flex-direction: column;

				.name {
					font-size: 26rpx;
					font-weight: 500;
					color: #333333;
					margin-bottom: 18rpx;
				}

				.labels {
					display: flex;
					align-items: center;

					image {
						width: 74rpx;
						height: 28rpx;
						margin-right: 6px;
					}
				}

			}

			.mark {
				font-size: 13px;
				font-weight: 500;
				color: #333333;
			}
		}

	}
</style>