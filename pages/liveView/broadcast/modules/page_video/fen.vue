<template>
	<view class="fensi-example-block">
		<view class="card-1">
			<view class="tp">
				<image style="width: 50px; height: 50px; margin-right: 11px;border-radius: 50%;" :src="AnchoerInfo.User_Logo" />

				<view class="tip">
					<text>{{AnchoerInfo.User_Name}}</text>
					<text>直播ID：{{AnchoerInfo.Anchoer_Id}}</text>
				</view>
			</view>
			<view class="fav">
				<view>
					<text>最高人气</text>
					<text>{{AnchoerInfo.Popularity_Value}}</text>
				</view>
				<view>
					<text>粉丝数量</text>
					<text>{{AnchoerInfo.Funs_Num}}</text>
				</view>
				<view>
					<text>主播分类</text>
					<text>{{AnchoerInfo.Live_TypName}}</text>
				</view>
			</view>
		</view>
		<view class="card-2">
			<text>主播简介</text>
			<text>{{AnchoerInfo.Anchoer_Introduction||"主播暂无简介"}}</text>
		</view>
		<view class="card-3" v-if="GroupList.length>0">
			<view class="title">
				<image src="/static/image/broadcast/ql.png" />
				<text>主播的群聊</text>
			</view>
			<view class="qz-list">
				<view v-for="(item, index) in GroupList" :key="index" class="item">
					<view class="lf">
						<text>{{item.Group_Name}}</text>
						<text>{{item.Group_Members}}/{{item.Group_MaxMembers}}</text>
					</view>
					<view @click="lookDetail(item)" class="btn"  :style="{background:item.Is_Join== 1?'#DADBDB':'#FC683E'}">{{changeIs_Join(item.Is_Join)}}</view>
					<!-- <view class="look"
						:style="{background:item.Is_Join== 1?'#DADBDB':'#FC683E'}"
						@click="lookDetail(item)" style="margin-right: 12px;">{{changeIs_Join(item.Is_Join)}}</view> -->
				</view>
			</view>
		</view>
	</view>





</template>

<script>
	import { joinGroup } from '/utils/iM.js'
	import {
		ajaxTemplate
	} from "/api/index.js";
	import store from "/pages/TUIKit/TUICore/store";

	export default {
		props: {
			anchoer: {
				default: () => {
					return {};
				},
				type: Object,
			},
		},


		components: {},
		data() {
			return {
				AnchoerInfo:{},
				GroupList:[],
				gifModal: false,
				gifModalTabIndex: "0",

				gitZsSelect: -1,
				gitZsList: [],

				pckSelect: -1,

				giftCheck: ["1"],
				checkVis: false,

				isFold: false,

				fsModel: false,
			};
		},

		onLoad() {},
		created() {
			console.log("hahahah",this.anchoer);
			setTimeout(() => {
				this.GetAnchoerInfo();
			}, 200);
		},
		onReady() {},

		onPageScroll(e) {},


		methods: {
			lookDetail(item) {
				console.log(this.GroupList,'this.GroupList')
				if(item.Is_Join==0){
					ajaxTemplate('/Interest/Join_Group', {
					  Group_Id: item.Group_Id,
					  User_Id: this.$store.state.userInfo.User_Id
					}).then((res) => {
					  console.log(res,'joinGroup')
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
					//   // setTimeout(() => {
					//   //   mitt.emit('sendMessage', true)
					//   // }, 500)
					   
					// })
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
			///Interest/GetAnchoerInfo
			GetAnchoerInfo(){
				ajaxTemplate('/Interest/GetAnchoerInfo',
				{
					Anchoer_Id:this.anchoer.Anchoer_Id,
					User_Id:this.$store.state.userInfo.User_Id
				}
				).then((res)=>{
					this.AnchoerInfo=res.Result
					this.GroupList=res.Result.GroupList
					console.log(this.GroupList,'this.GroupList')
				})
						
			}
			
			
		},
	};
</script>

<style lang="scss" scoped>
	.look {
		width: 128rpx;
		line-height: 52rpx;
		background: linear-gradient(93deg, #EE2144 0%, #E3121E 100%);
		border-radius: 13px 13px 13px 13px;
		opacity: 1;
		text-align: center;
		font-size: 12px;
		font-weight: 400;
		color: #FFFFFF;
	}
	.announcement {
		position: relative;
		background-image: url("/static/image/broadcast/announcement-bk.png");
		display: flex;
		flex-direction: column;
		align-items: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 8px 17px;

		.fold {
			width: 100%;
			transition: max-height 0.5s;
			max-height: 0;

			overflow: hidden;

			&.is-show {
				max-height: 200px;
				/*大概的值，需要超过元素高度*/
			}

			.item {
				display: flex;
				align-items: center;
				font-size: 12px;
				color: #ffffff;
				width: 100%;
				height: 24px;
				margin-top: 4px;
				padding: 4px 10px;
				display: flex;
				justify-content: space-between;

				background: rgba(114, 114, 135, 0.5);
				border-radius: 4px 4px 4px 4px;
				opacity: 0.5;

				&:first-child {
					margin-top: 9px;
				}

				&:last-child {
					margin-bottom: 13px;
				}
			}
		}

		.down-btn {
			display: flex;
			justify-content: center;
			position: absolute;
			left: 0;
			bottom: -16px;
			right: 0;
			z-index: 99;
		}
	}

	.chart {
		// height: 0;
		display: flex;
		flex-direction: column;
		flex: 1;

		margin-top: 15px;
		// padding: 0 10px;
		padding-bottom: 115rpx;

	}

	.foot {
		padding: 0 10rpx;
		height: 110rpx;
		background: #ffffff;
		position: absolute;
		bottom: 68rpx;
		background: #ffffff;
		width: 100%;
		display: flex;
		align-items: center;

		image {
			flex-shrink: 0;
		}

		.input {
			flex: 1;
			height: 68rpx;
			background: #f5f5f5;
			border-radius: 38rpx;
			font-size: 26rpx;
			color: #c0c2cb;
			line-height: 68rpx;
			padding-left: 24rpx;

			margin-right: 20rpx;
		}
	}

	.popup-example-block {
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: column;
		height: 800rpx;
		width: 100%;
		background-color: #fff;

		.hd {
			width: 100%;
			height: 112rpx;
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
			background-image: url("/static/image/broadcast/gif_bk.png");
			padding: 26rpx 48rpx;

			.btns {
				display: inline-flex;
				background: #ffffff;
				border-radius: 34rpx;
				border: 1px solid #f0222c;
				padding: 4rpx;

				text {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #f0222c;
					background: #fff;
					width: 112rpx;
					height: 52rpx;
					border-radius: 34rpx;
					transition: all 0.3s;

					&.active {
						color: #ffffff;
						background: #ee2144;
					}
				}
			}
		}

		.type-0 {
			flex: 1;
			display: flex;
			flex-direction: column;

			.gitf-card {
				padding: 9px 13px;
				// flex: 1;
				overflow: auto;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;

				.gitf-item {
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 80px;
					height: 88px;
					background: #f9f9fb;
					border-radius: 6px 6px 6px 6px;
					border: 1px solid transparent;
					margin-bottom: 10px;

					&.active {
						border-color: #f0222c;
					}

					image {
						width: 50px;
						height: 50px;
						margin-bottom: 3px;
					}

					.label {
						font-size: 13px;
						color: #333333;
						margin-bottom: 3px;
					}

					.money {
						font-size: 10px;
						color: #9ea2af;
					}
				}
			}

			.gift-footer {
				height: 50px;
				width: 100%;
				padding: 0 10px;
				display: flex;
				justify-content: flex-end;

				view.btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 90px;
					height: 34px;
					background: linear-gradient(90deg, #ee2144 0%, #e3121e 100%);
					border-radius: 17px 17px 17px 17px;
					color: #ffffff;
				}
			}
		}

		.type-1 {
			flex: 1;
			display: flex;
			flex-direction: column;

			.pck-card {
				padding: 9px 13px;
				// flex: 1;
				overflow: auto;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;

				.pck-item {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					width: 80px;
					height: 88px;
					background: #f9f9fb;
					border-radius: 6px 6px 6px 6px;
					border: 1px solid transparent;
					margin-bottom: 10px;
					// padding:12px 16px 9px 16px;

					&.active {
						border-color: #f0222c;
					}

					image {
						width: 57px;
						height: 18px;
						margin-bottom: 19px;
					}

					.label {
						font-size: 13px;
						color: #333333;
						margin-bottom: 3px;
					}

					.money {
						font-size: 10px;
						color: #9ea2af;
					}
				}
			}

			.pck-footer {
				height: 50px;
				width: 100%;
				padding: 0 10px;
				display: flex;
				justify-content: flex-end;

				view.btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 90px;
					height: 34px;
					background: linear-gradient(90deg, #ee2144 0%, #e3121e 100%);
					border-radius: 17px 17px 17px 17px;
					color: #ffffff;
				}
			}
		}
	}

	.fensi-example-block {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #f5f5f5;
		overflow-y: scroll;

		.card-1 {
			// height: 145px;
			background: linear-gradient(135deg, #fff2ec 0%, #fffff8 50%, #dffbff 100%);
			border-radius: 8px 8px 0px 0px;
			padding: 15px 12px;

			.tp {
				display: flex;
				align-items: center;

				.tip {
					display: flex;
					flex-direction: column;

					text {
						&:first-child {
							color: #333;
							margin-bottom: 8px;
							font-size: 14px;
						}

						&:last-child {
							color: #9094a5;
							font-size: 11px;
						}
					}
				}
			}

			.fav {
				margin-top: 21px;
				display: flex;
				justify-content: space-between;

				view {
					text {
						display: block;

						&:first-child {
							color: #9094a5;
							font-size: 12px;
							margin-bottom: 12px;
						}

						&:last-child {
							color: #333;
							font-size: 16px;
						}
					}
				}
			}
		}

		.card-2 {
			padding: 16px 12px;
			padding-bottom: 21px;
			background: white;

			text {
				display: block;
				color: #333333;

				&:first-child {
					margin-bottom: 10px;
					font-size: 14px;
					font-weight: 500;
				}

				&:last-child {
					font-size: 11px;
				}
			}
		}

		.card-3 {
			margin-top: 18px;

			.title {
				margin-bottom: 40rpx;
				position: relative;
				text-align: center;

				image {
					width: 138px;
					height: 32px;
					position: absolute;
					left: 50%;
					transform: translate(-50%, 0);
				}

				text {
					display: inline-block;
					z-index: 9;
					line-height: 32px;
					position: relative;
					font-size: 14px;
					color: white;
				}
			}

			.qz-list {
				display: flex;
				flex-direction: column;

				.item {
					display: flex;
					justify-content: space-between;
					width: 100%;
					height: 70px;
					padding: 14px 12px;
					background: white;
					margin-bottom: 10px;

					.lf {
						text {
							display: block;

							&:first-child {
								font-size: 14px;
							}

							&:last-child {
								text-align: center;
								margin-top: 6px;
								width: 64px;
								height: 20px;
								background: #f2f3f3;
								border-radius: 2px 2px 2px 2px;
								opacity: 1;
								color: #9094a5;
							}
						}
					}

					.btn {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 64px;
						height: 26px;
						background: #ee2144;
						border-radius: 13px 13px 13px 13px;

						font-size: 12px;
						color: #ffffff;
					}
				}
			}
		}
	}
</style>