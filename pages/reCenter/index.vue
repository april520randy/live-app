<template>
	<view class="box" style="background-color: #F4F4F5;overflow: hidden;">

<var-app-bar style="border-radius:0;background: #fff;position: fixed; top:0;z-index:2" round  :elevation='false'>
			<template #content>
				<view class='nav1'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="/static/image/bq/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle1">任务中心</view>
				</view>
			</template>
		</var-app-bar>
	<!-- 	<var-app-bar style="border: none; c" round 
			:elevation='false'>		
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle1">任务中心</view>
				</view>
			</template>
		</var-app-bar>
		<view class="header" style="position: fixed;top: 0;width: 100vw;z-index: 1;">
			<view style="display: flex;align-items: center; justify-content: center;padding-top: 116rpx;">
				<image @click="back" src="/static/image/left-arrowhead.png"
					style="width: 40rpx;height: 40rpx;position: absolute;left: 20rpx;" />
				<p style="font-size: 36rpx;color: #333333;">任务中心</p>
			</view>
		</view> -->
		<view style="height:186rpx"></view>
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
					<view :style="{left:(progress-20)+'rpx'}"
						style="width: 20rpx;height: 20rpx;background: #FFFFFF;border-radius: 10rpx;position: absolute;top: -7rpx;">
					</view>
				</view>
				<view class="point">
					<p>Lv{{User_Level}}</p>
					<p>{{User_EXP}}/{{Next_User_EXP+User_EXP}}(还需要{{Next_User_EXP}}经验值升级到Lv{{Next_User_Level}})</p>
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
						<view v-if="User_Level<item.lv"
							style="font-size: 24rpx;color: #9094A5;margin-top: 10rpx;display: flex;align-items: center;">
							<image src="/static/image/suo.png" style="width:20rpx;height:20rpx;margin-right:6rpx" />
							<view>lv{{item.lv}}解锁</view>
						</view>
						<view v-else style="font-size: 24rpx;color: #9094A5;margin-top: 10rpx;">
							已获得
						</view>
					</view>
				</view>
			</view>


		</view>
		<view class="foot" v-for="(item,index) in list" :key="index">
			<view class="first">
				<view>
					<view style="display: flex;align-items: center;">
						<p style="font-size: 28rpx;color: #333333;">{{item.Activity_Name}}</p>
						<p style="font-size: 24rpx;color: #9094A5;margin-left: 8rpx;">({{item.Completiontimes}})</p>
						<view class="new" v-if="item.Activity_Type==1">签到</view>
						<view class="new2" v-if="item.Activity_Type==2">新手</view>
						<view class="new3" v-if="item.Activity_Type==3">每日</view>
					</view>
					<view style="display: flex;align-items: center;margin-top: 22rpx;">
						<view style="display: flex;align-items: center;">
							<image src="/static/image/experience.png" style="width: 40rpx;height: 40rpx;" />
							<p>×{{item.Reward_EXP}}</p>
						</view>
						<view style="display: flex;align-items: center;margin-left: 28rpx;">
							<image src="/static/image/silver.png" style="width: 32rpx;height: 32rpx;" />
							<p>×{{item.Reward_SilverCoin}}</p>
						</view>
						<!-- <view style="display: flex;align-items: center;margin-left: 28rpx;">
							<image src="/static/image/metals.png" style="width: 32rpx;height: 32rpx;" />
							<p>×20</p>
						</view> -->
					</view>
				</view>
				<view class="accomplish" @click="open(item)" v-if="item.Complete_State==0">去完成</view>
				<view class="accomplish2" v-if="item.Complete_State==1">已完成</view>
			</view>
		</view>







		<view class="popups" v-if="qdshow">
			<!-- 签到 -->
			<view v-if="tab == 0" style="display: flex; flex-direction: column; align-items: center">
				<view class="imgbox">
					<image src="../../static/image/mrqd.png" alt=""
						style="width: 299px; height: 50px; margin-top: 115px" />
				</view>
				<view style="
															            background: white;
															            width: 299px;
															            height: 324px;
															            margin-top: -90px;
															            border-radius: 0px 0px 20px 20px;
															          ">
					<view style="
															              display: flex;
															              justify-content: space-between;
															              align-items: center;
															            ">
						<view style="display: flex; flex-direction: column; margin-left: 20px">
							<text style="color: #fe7e0e; font-size: 12px; font-weight: 400">连续签到领好礼</text>
							<text style="color: #333333; font-size: 18px; font-weight: bold">已连续签到</text>
						</view>
						<view class="day" style="">
							<text class="day_number">{{ day }}</text>天
						</view>
					</view>
					<view class="qiandao_box">
						<!-- eslint-disable  -->
						<template v-for="(item, index) in registerlabel" :key="index">
							<view class="qiandao" v-if="index !== 6" :style="{
								background:
									item.Sign_Status == 1
										? 'linear-gradient(180deg, #FF8767 0%, #FC2442 100%)'
										: '#F4F4F4',
							}" style="position: relative">
								<view :style="{ color: item.Sign_Status == 1 ? '#fff' : '' }" class="qd">
									{{ item.Reward_EXP }}
								</view>
								<image src="../../static/image/yq.png" style="width: 44rpx; height: 44rpx"
									v-if="item.Sign_Status == 0"></image>
								<image src="../../static/image/wq.png" style="width: 44rpx; height: 44rpx"
									v-if="item.Sign_Status == 1"></image>
								<image src="../../static/image/dun.png" style="width: 44rpx; height: 44rpx"
									v-if="item.Sign_Status == 2"></image>

								<text :style="{ color: item.Sign_Status == 1 ? '#fff' : '#999999' }">第{{
									numToChinese(item.Rule_Id) }}天</text>
								<image v-if="item.Gift_Id != 0" src="../../static/image/gift2.png" mode="" style="
															                    position: absolute;
															                    top: -10px;
															                    right: -10px;
															                    width: 26px;
															                    height: 26px;
															                  "></image>
								<view v-if="item.Gift_Id == 0" style="font-size: 20rpx;color: #FFFFFF;
																			    position: absolute;
																			    top: -10px;
																			    right: -5px;
																				width: 96rpx;
																				height: 28rpx;
																				line-height: 28rpx;
																				text-align: center;
																				background: linear-gradient(125deg, #FFD606 0%, #FF9900 100%);
																				border-radius: 16rpx 0px 16rpx 0px;
																				opacity: 1;
				   
																			  ">{{ item.Reward_SilverCoin }}银币</view>
							</view>

							<view class="qiandao_seven" v-else :style="{
								background:
									item.Sign_Status == 1
										? 'linear-gradient(180deg, #FF8767 0%, #FC2442 100%)'
										: '#F4F4F4',
							}" style="position: relative">
								<view class="qd">
									<view style="margin-bottom: 10px">
										<text>经验值</text>
										{{ item.Reward_EXP }}
									</view>
									<text :style="{
										color: item.Sign_Status == 1 ? '#fff' : '#999999',
									}">第{{ numToChinese(item.Rule_Id) }}天</text>
								</view>
								<image src="../../static/image/yq.png" style="width: 62rpx; height: 62rpx"
									v-if="item.Sign_Status == 0"></image>
								<image src="../../static/image/wq.png" style="width: 62rpx; height: 62rpx"
									v-if="item.Sign_Status == 1"></image>
								<image src="../../static/image/dun.png" style="width: 62rpx; height: 62rpx"
									v-if="item.Sign_Status == 2"></image>
								<image v-if="item.Gift_Id != 0" src="../../static/image/gift2.png" mode="" style="
															                    position: absolute;
															                    top: -35px;
															                    right: 0;
															                    width: 26px;
															                    height: 26px;
															                  "></image>
								<view v-if="item.Gift_Id == 0" style="
																				font-size: 20rpx;color: #FFFFFF;
																			    position: absolute;
																			     top: -35px;
																			    right: -5px;
																			  					width: 96rpx;
																			  					height: 28rpx;
																			  					line-height: 28rpx;
																			  					text-align: center;
																			  					background: linear-gradient(125deg, #FFD606 0%, #FF9900 100%);
																			  					border-radius: 16rpx 0px 16rpx 0px;
																			  					opacity: 1;
				   
																			  ">{{ item.Reward_SilverCoin }}银币</view>
							</view>
						</template>
					</view>
					<view class="qiandao_btn" @click="registerClick('立即签到')">立即签到</view>
					<view class="qiandao_bottom">
						每日签到奖励可在-
						<text style="color: #ff2e3e">我的页面</text>-
						<text style="color: #ff2e3e">每日签到</text>- 内查看
					</view>
				</view>
				<view style="
															            width: 370px;
															            display: flex;
															            justify-content: center;
															            margin-top: 25px;
															          ">
					<image src="../../static/image/cha.png" alt="" style="width: 30px; height: 30px" @click="close()" />
				</view>
			</view>
			<!-- 签到成功 -->
			<view v-if="tab == 1" style="display: flex; flex-direction: column; align-items: center">
				<view class="imgbox2">
					<image src="../../static/image/mrqd.png" alt=""
						style="width: 294px; height: 50px; margin-top: 115px" />
				</view>
				<view style="
															            background: white;
															            width: 294px;
															            height: 250px;
															            border-radius: 0px 0px 20px 20px;
															            padding: 0 10px;
															            margin-top: -90px;
															          ">
					<view style="
															              display: flex;
															              justify-content: space-between;
															              align-items: center;
															            ">
						<view style="display: flex; flex-direction: column; margin-left: 20px">
							<text style="color: #fe7e0e; font-size: 12px; font-weight: 400">连续签到领好礼</text>
							<text style="color: #333333; font-size: 19px; font-weight: bold">已连续签到</text>
						</view>
						<view class="day" style="">
							<text class="day_number">{{ day }}</text>天
						</view>
					</view>
					<view style="
															              display: flex;
															              justify-content: space-around;
															              margin-top: 10px;
															            ">
						<view style="
															                width: 103px;
															                height: 100px;
															                background: #f4f4f4;
															                display: flex;
															                justify-content: center;
															                align-items: center;
															                flex-direction: column;
															                border-radius: 6px;
															              ">
							<image src="../../static/image/dun.png" alt=""
								style="width: 40px; height: 40px; margin-bottom: 10px" />
							<view style="font-size: 12px; color: #999999">经验×{{ Reward_EXP }}</view>
						</view>
						<view style="
															                width: 103px;
															                height: 100px;
															                background: #f4f4f4;
															                display: flex;
															                justify-content: center;
															                align-items: center;
															                flex-direction: column;
															                border-radius: 6px;
															              ">
							<image src="../../static/image/bigyin.png" alt=""
								style="width: 40px; height: 40px; margin-bottom: 10px" />
							<view style="font-size: 12px; color: #999999">银币×{{ Reward_SilverCoin }}</view>
						</view>
					</view>
					<view class="qiandao_btn" @click="registerClick('我知道了')" style="margin: auto; margin-top: 20px">我知道了
					</view>
				</view>
				<view style="
															            width: 370px;
															            display: flex;
															            justify-content: center;
															            margin-top: 25px;
															          ">
					<image src="../../static/image/cha.png" alt="" style="width: 32px; height: 32px" @click="close()" />
				</view>
			</view>
		</view>


	</view>

</template>

<script>
	import {
		ajaxTemplate
	} from "../../api/index.js";
	export default {
		data() {
			return {
				list: [],
				Reward_SilverCoin: "", //奖励银币
				Reward_EXP: "", //奖励经验值
				registerlabel: [],
				tab: 0,
				qdshow: false,
				EXP_Rate:'',
				progress: '',
				User_Logo: '',
				User_Level: '',
				User_Name:'',
				Next_User_Level: '',
				User_EXP: '',
				Next_User_EXP: '',
				show: false,
				User_Id: '',
				Rule_Id: "",
				
				djList: [{
						name: "等级标签",
						img: "/static/image/djbq.png",
						lv: 1
					},
					{
						name: "进场特效",
						img: "/static/image/jctx.png",
						lv: 3
					},
					{
						name: "道具礼包",
						img: "/static/image/djlb.png",
						lv: 8
					},
					{
						name: "主题弹幕",
						img: "/static/image/ztdm.png",
						lv: 12
					},
					{
						name: "VIP客服",
						img: "/static/image/vipk.png",
						lv: 16
					},
					{
						name: "神秘宝箱",
						img: "/static/image/smbx.png",
						lv: 20
					},
				]

			}
		},
		methods: {
			//天转换中文
			numToChinese(num) {
				switch (num) {
					case 1:
						return "一";
					case 2:
						return "二";
					case 3:
						return "三";
					case 4:
						return "四";
					case 5:
						return "五";
					case 6:
						return "六";
					case 7:
						return "七";
				}
			},
			registerClick(type) {
				console.log(8888)
				if (type == "立即签到") {
					if (this.$store.state.userInfo.User_Id == undefined) {
						// uni.showToast({
						// 	title: "请先登录",
						// 	duration: 2000,
						// });

						uni.navigateTo({
							url: "/pages/login/index",
						});
						this.qdshow = false
						return;
					}
					this.User_Id = this.$store.state.userInfo.User_Id
					console.log(this.User_Id)
					ajaxTemplate("/Sign/SignToInstantly", {
						User_Id: this.User_Id,
						Rule_Id: this.Rule_Id,
					}).then((res) => {
						console.log(res);
						if (res.Code == 200) {
							this.getsign()
							uni.$emit("getUserInfo")

							ajaxTemplate("/Sign/GetActivity_RulesList", {
								User_Id: this.User_Id,
							}).then((res) => {
								this.registerlabel = res.Result;
								let arr = this.registerlabel.filter((item) => {
									return item.Sign_Status == 0;
								});
								this.day = arr.length;

								if (arr.length > 0) {
									this.Reward_SilverCoin = arr[arr.length - 1].Reward_SilverCoin
									this.Reward_EXP = arr[arr.length - 1].Reward_EXP
								}
							})

							this.tab = 1;
						}
					});
				} else {
					this.qdshow = false;
				}
			},
			//获取签到规则列表/Sign/GetActivity_RulesList
			getuserlist() {
				console.log(this.User_Id);
				ajaxTemplate("/Sign/GetActivity_RulesList", {
					User_Id: this.$store.state.userInfo.User_Id,
				}).then((res) => {
					console.log(res)
					this.registerlabel = res.Result;
					if (this.registerlabel.some((item) => item.Sign_Status == 1)) {
						this.tab = 0;
					} else {
						this.tab = 1;
					}
					this.registerlabel.forEach((item) => {
						if (item.Sign_Status == 1) {
							this.Rule_Id = item.Rule_Id;
						}
					});
					console.log(this.Rule_Id)


					let arr = this.registerlabel.filter((item) => {
						return item.Sign_Status == 0;
					});
					this.day = arr.length;
					if (arr.length > 0) {
						this.Reward_SilverCoin = arr[arr.length - 1].Reward_SilverCoin
						this.Reward_EXP = arr[arr.length - 1].Reward_EXP
					}



				});
			},
			close() {
				this.qdshow = false;
			},
			getList() {
				ajaxTemplate("/Center/Task_List", {
					User_Id: this.User_Id,
				}).then((res) => {
					console.log(res)
					this.list = res.Result.Activity
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			open(item) {
				
				if(item.Activity_Type==1){
					this.qdshow = true
					console.log("弹框打开了")
					this.getuserlist()
					return
				}
				if(item.JumpLink=="/"){
					uni.switchTab({
						url:"/pages/liveView/index"
					})
					return
				}
				uni.navigateTo({
					url:item.JumpLink
				})
				
				
			},

		},
		onShow() {
			setTimeout(() => {
				console.log(this.$store.state.userInfo)
				this.User_Id = this.$store.state.userInfo.User_Id
				this.User_Logo = this.$store.state.userInfo.User_Logo
				this.User_Name = this.$store.state.userInfo.User_Name
				this.User_Level = this.$store.state.userInfo.User_Level
				this.Next_User_Level = this.$store.state.userInfo.Next_User_Level
				this.User_EXP = this.$store.state.userInfo.User_EXP
				this.Next_User_EXP = this.$store.state.userInfo.Next_User_EXP
				this.EXP_Rate = this.$store.state.userInfo.EXP_Rate
				this.progress = this.EXP_Rate* 6.26
				console.log(this.progress)

				this.getList()
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
			color: #FFFFFF;
			margin-left: 252rpx;
		}

		.qk {
			font-size: 28rpx;
			font-weight: 400;
			color: #FFFFFF;
			margin-left: 234rpx;
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
				background: #FFE9C2;
				border-radius: 0px 12px 0px 12px;
				font-size: 24rpx;
				color: #FFE9C2;
				text-align: center;
				line-height: 34rpx;
				margin-left: 12rpx;
			}
			.new2 {
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
			.new3 {
				width: 64rpx;
				height: 34rpx;
				background:#FCEAE0;
				border-radius: 0px 12px 0px 12px;
				font-size: 24rpx;
				color: #DB6B3B;
				text-align: center;
				line-height: 34rpx;
				margin-left: 12rpx;
			}

			.accomplish {
				width: 136rpx;
				height: 64rpx;
				border-radius: 32rpx;
				border: 2rpx solid #ED5E2C;
				font-size: 24rpx;
				color: #ED5E2C;
				text-align: center;
				line-height: 64rpx;
			}

			.accomplish2 {
				width: 136rpx;
				height: 64rpx;
				border-radius: 32rpx;
				background: #CFCDCD;
				// border: 2rpx solid #ED5E2C;
				font-size: 24rpx;
				color: #fff;
				text-align: center;
				line-height: 64rpx;
			}
		}

	}

	.box {
		background-color: #F4F4F5;

		.header {
			height: 176rpx;
			background: #E73449 url(/static/image/headerball.png) no-repeat top center/100%;
			position: relative;
		}

		.content {
			// margin-top: 220rpx;
			
			.top {
				margin: 24rpx 22rpx;
				height: 260rpx;
				background: url(/static/image/hybackground.png);
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

	.popups {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		z-index: 9999;

		.imgbox {
			width: 299px;
			height: 253px;
			background: url("../../static/image/qdbc.png");
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
				color: #ff9018;
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
				background: #f4f4f4;

				.qd {
					font-size: 15px;
					color: #333333;
					font-weight: bold;
				}

				text {
					font-size: 10px;
					color: #999999;
				}

				image {
					width: 22px;
					height: 22px;
				}
			}

			.qiandao_seven {
				margin-top: 15px;
				display: flex;
				justify-content: space-around;
				width: 128px;
				height: 65px;
				background: #f4f4f4;
				border-radius: 6px 6px 6px 6px;

				.qd {
					margin-top: 10px;
					font-size: 15px;
					color: #333333;
					font-weight: bold;
					margin-bottom: 15px;

					text {
						color: #333333;
						font-size: 12px;
					}
				}

				text {
					font-size: 12px;
					font-weight: 400;
					color: #999999;
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
			color: #ffffff;
			width: 267px;
			height: 39px;
			background: linear-gradient(90deg, #ee2144 0%, #e3121e 100%);
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

		.imgbox2 {
			width: 294px;
			height: 253px;
			background: url("../../static/image/good.png");
			background-size: 100% 100%;
			background-position: center;
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