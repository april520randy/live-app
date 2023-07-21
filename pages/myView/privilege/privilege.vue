<template>
	<view style="background-color: #222222;min-height:100vh">
		<!-- 去充值弹框 -->
		<view v-if="clean" class="clean">
			<view class="cleancontent">
				<view style="color:#333333;font-size: 30rpx;margin:54rpx auto;font-weight: 500;">立即充值</view>
				<view style="color:#6D6E73;font-size: 26rpx;">金币余额不足，请前往充值</view>
				<view class="clearnfoot">
					<view class="left" @click="clean=false">取消</view>
					<view class="right" @click="submit">确定</view>
				</view>
			</view>
		</view>


		<var-app-bar :style="{opacity:show==true?1:0,zIndex:show==true?999:0 }"
			style="position:fixed;top:0;border-radius:0" round :elevation='false' color="#222222">
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../../static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle">我的贵族</view>

				</view>

			</template>
		</var-app-bar>
		<var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0" round color="#222222"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../../static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle">我的贵族</view>

				</view>

			</template>
		</var-app-bar>

		<view style="height:98vh;margin-top:20rpx;overflow: hidden;">
			<swiper class="swiper" :current="current" @change="currentChange">
				<swiper-item>
					<view class="head">
						<!-- 骑士 -->
						<image style="width: 702rpx;height: 294rpx;margin-left:24rpx" src="../../../static/image/bq/qishi.png"
							mode="widthFix">
						</image>
						<image style="width: 48rpx;height: 48rpx;position: absolute;left:24rpx;top:24rpx"
							src="../../../static/image/leftchange.png" mode="widthFix" @click="leftFn">
						</image>
						<image style="width: 48rpx;height: 48rpx;position: absolute;right:24rpx;top:24rpx"
							src="../../../static/image/rightchange.png" mode="widthFix" @click="rightFn">
						</image>
					</view>
					<view class="img">
						<!-- 骑士 -->
						<image style="width: 702rpx;height: 294rpx;" src="../../../static/image/qs.png" mode="widthFix">
						</image>
						<view style="width: 350rpx;height: 350rpx;position:absolute;right:0rpx;top:-40rpx">
							<l-svga ref="svga1" >
							</l-svga>
						</view>
						

						<view class="time" v-if="Nobility_Level==1&&Nobility_DeadLine">{{Nobility_DeadLine}}天后到期</view>
						<view class="time2" v-if="Nobility_Level==1&&Nobility_DeadLine">使用中</view>
					</view>
					<view style="text-align: center;margin:26rpx 0">
						<image style="width: 140rpx;height: 33rpx;" src="../../../static/image/zstq.png"
							mode="widthFix">
						</image>
					</view>
					<view class="content">
						<view v-for="(item,i) in list" class="card">
							<image style="width: 86rpx;height: 86rpx;" :src="item.img" mode="widthFix">
							</image>
							<view style="color:#FFFFFF;margin-bottom:20rpx">{{item.title}}</view>
							<view>{{item.content}}</view>
							<view>{{item.content2}}</view>
						</view>
					</view>
					
					
				</swiper-item>
				<swiper-item>
					<view class="head">
						<!-- 公爵 -->
						<image style="width: 702rpx;height: 294rpx;margin-left:24rpx"
							src="../../../static/image/bq/gongjue.png" mode="widthFix">
						</image>
						<image style="width: 48rpx;height: 48rpx;position: absolute;left:24rpx;top:24rpx"
							src="../../../static/image/leftchange.png" mode="widthFix" @click="leftFn">
						</image>
						<image style="width: 48rpx;height: 48rpx;position: absolute;right:24rpx;top:24rpx"
							src="../../../static/image/rightchange.png" mode="widthFix" @click="rightFn">
						</image>
					</view>
					<view class="img">
						<!-- 公爵 -->
						<image style="width: 702rpx;height: 294rpx;" src="../../../static/image/gj.png" mode="widthFix">
						</image>
						<view style="width: 350rpx;height: 350rpx;position:absolute;right:0rpx;top:-40rpx">
							<l-svga ref="svga2" >
							</l-svga>
						</view>
						
						<view class="time" v-if="Nobility_Level==2&&Nobility_DeadLine">{{Nobility_DeadLine}}天后到期</view>
						<view class="time2" v-if="Nobility_Level==2&&Nobility_DeadLine">使用中</view>
					</view>
					<view style="text-align: center;margin:26rpx 0">
						<image style="width: 140rpx;height: 33rpx;" src="../../../static/image/zstq.png"
							mode="widthFix">
						</image>
					</view>
					<view class="content">
						<view v-for="(item,i) in list1" class="card">
							<image style="width: 86rpx;height: 86rpx;" :src="item.img" mode="widthFix">
							</image>
							<view style="color:#FFFFFF;margin-bottom:20rpx">{{item.title}}</view>
							<view>{{item.content}}</view>
							<view>{{item.content2}}</view>
						</view>
					</view>
					
					
				</swiper-item>
				<swiper-item>
					<view class="head">
						<!-- 帝皇 -->
						<image style="width: 702rpx;height: 294rpx;margin-left:24rpx" src="../../../static/image/bq/dihuang.png"
							mode="widthFix">
						</image>
						<image style="width: 48rpx;height: 48rpx;position: absolute;left:24rpx;top:24rpx"
							src="../../../static/image/leftchange.png" mode="widthFix" @click="leftFn">
						</image>
						<image style="width: 48rpx;height: 48rpx;position: absolute;right:24rpx;top:24rpx"
							src="../../../static/image/rightchange.png" mode="widthFix" @click="rightFn">
						</image>
					</view>
					<view class="img">
						<!-- 帝皇 -->
						<image style="width: 702rpx;height: 294rpx;" src="../../../static/image/dh.png" mode="widthFix">
						</image>
						<view   style="width: 350rpx;height: 350rpx;position:absolute;right:0rpx;top:-40rpx">
							<l-svga ref="svga3">
							</l-svga>
						</view>
						
						<view class="time" v-if="Nobility_Level==3&&Nobility_DeadLine">{{Nobility_DeadLine}}天后到期</view>
						<view class="time2" v-if="Nobility_Level==3&&Nobility_DeadLine">使用中</view>
					</view>
					<view style="text-align: center;margin:26rpx 0">
						<image style="width: 140rpx;height: 33rpx;" src="../../../static/image/zstq.png"
							mode="widthFix">
						</image>
					</view>
					<view class="content">
						<view v-for="(item,i) in list2" class="card">
							<image style="width: 86rpx;height: 86rpx;" :src="item.img" mode="widthFix">
							</image>
							<view style="color:#FFFFFF;margin-bottom:20rpx">{{item.title}}</view>
							<view>{{item.content}}</view>
							<view>{{item.content2}}</view>
						</view>
					</view>
					
					
				</swiper-item>
			</swiper>
			<view style="position: fixed;bottom: 0;background-color: #222222;text-align: center;width:100%" >
				<view
					style="width: 702rpx;height: 2rpx;background: linear-gradient(117deg, rgba(110,103,91,0) 0%, #726B5C 52%, rgba(114,107,92,0) 100%);">
				</view>
				<view class="foot" v-show="current==0">
					<view class="leftfoot">
						<view>开通价格：<text style="color:#F3BB54">{{Gain_Price}}</text>金币/月</view>
						<view>续费价格：<text style="color:#F3BB54">{{Renew_Price}}</text>金币/月</view>
						<view v-if="Nobility_Level!=undefined">金币余额：<text style="color:#F3BB54">{{Gold_Coin}}</text>金币</view>
					</view>
					<view class="rightfoot" v-if="Nobility_Level==undefined||Nobility_Level==0||Nobility_Level==3||Nobility_Level==2" @click="openFnDebounced(Nobility_Id,0,Gain_Price)">立即开通
					</view>
					<view class="rightfoot1" v-if="Nobility_Level==1" @click="openFnDebounced(Nobility_Id,1,Renew_Price)">
						立即续费</view>
				</view>
				<view class="foot" v-if="current==1">
					<view class="leftfoot">
						<view>开通价格：<text style="color:#F3BB54">{{Gain_Price1}}</text>金币/月</view>
						<view>续费价格：<text style="color:#F3BB54">{{Renew_Price1}}</text>金币/月</view>
						<view v-if="Nobility_Level!=undefined">金币余额：<text style="color:#F3BB54">{{Gold_Coin}}</text>金币</view>
					</view>
					<view class="rightfoot" v-if="Nobility_Level==undefined||Nobility_Level==0||Nobility_Level==3" @click="openFnDebounced(Nobility_Id1,0,Gain_Price1)">
						立即开通</view>
					<view class="rightfoot1" v-if="Nobility_Level==2" @click="openFnDebounced(Nobility_Id1,1,Renew_Price1)">
						立即续费</view>
					<view class="rightfoot2" v-if="Nobility_Level==1" @click="openFnDebounced(Nobility_Id1,0,Gain_Price1)">
						立即升级</view>
				</view>
				<view class="foot" v-if="current==2">
					<view class="leftfoot">
						<view>开通价格：<text style="color:#F3BB54">{{Gain_Price2}}</text>金币/月</view>
						<view>续费价格：<text style="color:#F3BB54">{{Renew_Price2}}</text>金币/月</view>
						<view v-if="Nobility_Level!=undefined">金币余额：<text style="color:#F3BB54">{{Gold_Coin}}</text>金币</view>
					</view>
					<view class="rightfoot" v-if="Nobility_Level==undefined||Nobility_Level==0 " @click="openFnDebounced(Nobility_Id2,0,Gain_Price2)">
						立即开通</view>
					<view class="rightfoot1" v-if="Nobility_Level==3" @click="openFnDebounced(Nobility_Id2,1,Renew_Price2)">
						立即续费</view>
					<view class="rightfoot2" v-if="Nobility_Level==2||Nobility_Level==1"
						@click="openFnDebounced(Nobility_Id2,0,Gain_Price2)">立即升级</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	import {
		ajaxTemplate
	} from "../../../api/index.js";
	export default {
		data() {
			return {
				clean: false,
				show: false,
				current: 0,
				User_Id: '',
				Nobility_Level: 1, //贵族等级

				list: [{
						title: '万众瞩目',
						content: "贵族专属身份",
						content2: "骑士徽章耀眼夺目",
						img: '../../../static/image/wzzm.png'
					},
					{
						title: '专属坐骑',
						content: "炙热火狐",
						content2: "高级入场特效",
						img: '../../../static/image/zszq.png'
					},
					{
						title: '发言特权',
						content: "尊享1种炫彩",
						content2: "弹幕100个",
						img: '../../../static/image/fytq.png'
					},
					// {
					// 	title: '喇叭',
					// 	content: "100个免费广告弹幕",
					// 	content2: "发言神器",
					// 	img: '../../../static/image/laba.png'
					// },
					{
						title: '礼物折扣',
						content: "直播间刷礼物",
						content2: "尊享9.5折",
						img: '../../../static/image/lwzk.png'
					},
					{
						title: 'VIP客服',
						content: "24小时",
						content2: "专人在线服务",
						img: '../../../static/image/vipkf.png'
					},
				],
				list1: [{
						title: '万众瞩目',
						content: "贵族专属身份",
						content2: "骑士徽章耀眼夺目",
						img: '../../../static/image/wzzm.png'
					},
					{
						title: '专属坐骑',
						content: "冰霜雄狮",
						content2: "高级入场特效",
						img: '../../../static/image/zszq.png'
					},
					{
						title: '发言特权',
						content: "尊享2种炫彩",
						content2: "弹幕200个",
						img: '../../../static/image/fytq.png'
					},
					// {
					// 	title: '喇叭',
					// 	content: "100个免费广告弹幕",
					// 	content2: "发言神器",
					// 	img: '../../../static/image/laba.png'
					// },
					{
						title: '礼物折扣',
						content: "直播间刷礼物",
						content2: "尊享9.0折",
						img: '../../../static/image/lwzk.png'
					},
					{
						title: 'VIP客服',
						content: "24小时",
						content2: "专人在线服务",
						img: '../../../static/image/vipkf.png'
					},
				],
				list2: [{
						title: '万众瞩目',
						content: "贵族专属身份",
						content2: "骑士徽章耀眼夺目",
						img: '../../../static/image/wzzm.png'
					},
					{
						title: '专属坐骑',
						content: "豪气元龙",
						content2: "高级入场特效",
						img: '../../../static/image/zszq.png'
					},
					{
						title: '发言特权',
						content: "尊享3种炫彩",
						content2: "弹幕200个",
						img: '../../../static/image/fytq.png'
					},
					// {
					// 	title: '喇叭',
					// 	content: "100个免费广告弹幕",
					// 	content2: "发言神器",
					// 	img: '../../../static/image/laba.png'
					// },
					{
						title: '礼物折扣',
						content: "直播间刷礼物",
						content2: "尊享8.0折",
						img: '../../../static/image/lwzk.png'
					},
					{
						title: 'VIP客服',
						content: "24小时",
						content2: "专人在线服务",
						img: '../../../static/image/vipkf.png'
					},
				],
				Gain_Price: '',
				Renew_Price: '',
				Gain_Price1: '',
				Renew_Price1: '',
				Gain_Price2: '',
				Renew_Price2: '',
				Gold_Coin: '', //余额
				Nobility_Id: '', //贵族id
				Nobility_Id1: '',
				Nobility_Id2: '',
				Nobility_DeadLine:'' ,//到期时间
				
				Nobility_Discount:'',
				Nobility_Discount1:'',
				Nobility_Discount2:'',
				Barrage_TotalNum:'',
				Barrage_TotalNum1:'',
				Barrage_TotalNum2:'',
				
				Loudspeaker:'',
				Loudspeaker1:'',
				Loudspeaker2:'',
			}
		},
		onShow() {
			setTimeout(() => {
				
				this.time()
				this.initDate()
			})
			
		// 	if(this.$store.state.userInfo.Nobility_DeadLine!=null){
		// 		this.Nobility_DeadLine=Math.floor((new Date(this.$store.state.userInfo.Nobility_DeadLine)-new Date())/86400000)
		// 	}
		
		// 	this.Nobility_Level=this.$store.state.userInfo.Nobility_Level
		// 	if(this.Nobility_Level!=0){
		// 		this.current=this.Nobility_Level-1
		// 	}
		// 	this.time()
			
		
		},
		onReady() {
			this.$refs.svga1.render(async (parser, player) => {
				//https://udimg.12861.ltd/lpz.svga
				//../../../static/image/qss.svga
				const videoItem = await parser.load("/static/image/qss.svga");
				await player.setVideoItem(videoItem);
				// 设置当前动画的循环次数，0代表无限循环 默认 0
				player.loops = 0
				// 设置动画缩放模式，可选值为 Fill / AspectFill / AspectFit
				player.setContentMode(() => {
					contentMode: 'Fill'
				})
				// 开始播放动画，reverse = true 时则反向播放。
				player.startAnimation()
				// 监听动画进度
				player.onPercentage((percentage) => {
					// 由于有动画未完成时需要显示其他效果的需求，所以监听动画播放进度
					// svga动画播放进度大于 70% 时，显示卡牌
					if (percentage * 100 > 70) {
						this.svgaShow = false
					}
				})
				// 监听动画完成
				player.onFinished(() => {
					console.log('动画结束')
				})
			})
			this.$refs.svga2.render(async (parser, player) => {
				
				const videoItem = await parser.load("/static/image/gjj.svga");
				await player.setVideoItem(videoItem);
				// 设置当前动画的循环次数，0代表无限循环 默认 0
				player.loops = 0
				// 设置动画缩放模式，可选值为 Fill / AspectFill / AspectFit
				player.setContentMode(() => {
					contentMode: 'Fill'
				})
				// 开始播放动画，reverse = true 时则反向播放。
				player.startAnimation()
				// 监听动画进度
				player.onPercentage((percentage) => {
					// 由于有动画未完成时需要显示其他效果的需求，所以监听动画播放进度
					// svga动画播放进度大于 70% 时，显示卡牌
					if (percentage * 100 > 70) {
						this.svgaShow = false
					}
				})
				// 监听动画完成
				player.onFinished(() => {
					console.log('动画结束')
				})
			})
			this.$refs.svga3.render(async (parser, player) => {
				const videoItem = await parser.load("/static/image/dhh.svga");
				await player.setVideoItem(videoItem);
				// 设置当前动画的循环次数，0代表无限循环 默认 0
				player.loops = 0
				// 设置动画缩放模式，可选值为 Fill / AspectFill / AspectFit
				player.setContentMode(() => {
					contentMode: 'Fill'
				})
				// 开始播放动画，reverse = true 时则反向播放。
				player.startAnimation()
				// 监听动画进度
				player.onPercentage((percentage) => {
					// 由于有动画未完成时需要显示其他效果的需求，所以监听动画播放进度
					// svga动画播放进度大于 70% 时，显示卡牌
					if (percentage * 100 > 70) {
						this.svgaShow = false
					}
				})
				// 监听动画完成
				player.onFinished(() => {
					console.log('动画结束')
				})
			})
		},
		methods: {
			
			//时间
			time(){
				
				if(this.$store.state.userInfo.Nobility_DeadLine!=null){
					this.Nobility_DeadLine=Math.floor((new Date(this.$store.state.userInfo.Nobility_DeadLine)-new Date())/86400000)
				}
						
				this.Nobility_Level=this.$store.state.userInfo.Nobility_Level
				if(this.Nobility_Level!=0&&this.Nobility_Level!=undefined){
					this.current=this.Nobility_Level-1
				}else{
					this.current=this.current
				}
				console.log(this.Nobility_Level,this.current,this.Nobility_DeadLine,1111)
				
			},
			//去充值
			submit(){
				uni.navigateTo({
					url: "/pages/myView/recharge/recharge",
				});
			},
			//贵族价格表Nobility/GetNobility_PriceList
			initDate() {
				if (this.$store.state.userInfo.User_Id == undefined) {
					ajaxTemplate('/Nobility/GetNobility_PriceList', {
						
					}).then((res) => {
						console.log(res)
						this.Gain_Price = res.Result.List[0].Gain_Price
						this.Renew_Price = res.Result.List[0].Renew_Price
						
						this.Nobility_Discount=res.Result.List[0].Nobility_Discount
						this.list[3].content2="尊享"+this.Nobility_Discount+"折"
						
						this.Barrage_TotalNum=res.Result.List[0].Barrage_TotalNum

						
						this.list[2].content2="弹幕"+this.Barrage_TotalNum+"个"
						this.list[2].content="尊享"+res.Result.List[0].Barrage_TypeNum+"种炫彩"
						
						
						this.Loudspeaker=res.Result.List[0].Loudspeaker
						// this.list[3].content=this.Loudspeaker+"个免费广告弹框"
						
						this.Gain_Price1 = res.Result.List[1].Gain_Price
						this.Renew_Price1 = res.Result.List[1].Renew_Price
						
						this.Nobility_Discount1=res.Result.List[1].Nobility_Discount
						this.list1[3].content2="尊享"+this.Nobility_Discount1+"折"
						this.Barrage_TotalNum1=res.Result.List[1].Barrage_TotalNum
						this.list1[2].content2="弹幕"+this.Barrage_TotalNum1+"个"
						this.list1[2].content="尊享"+res.Result.List[1].Barrage_TypeNum+"种炫彩"
						
						this.Loudspeaker1=res.Result.List[1].Loudspeaker
						// this.list1[3].content=this.Loudspeaker1+"个免费广告弹框"
						
						this.Gain_Price2 = res.Result.List[2].Gain_Price
						this.Renew_Price2 = res.Result.List[2].Renew_Price
						
						this.Nobility_Discount2=res.Result.List[2].Nobility_Discount
						this.list2[3].content2="尊享"+this.Nobility_Discount2+"折"
						this.Barrage_TotalNum2=res.Result.List[2].Barrage_TotalNum
						this.list2[2].content2="弹幕"+this.Barrage_TotalNum2+"个"
						this.list2[2].content="尊享"+res.Result.List[2].Barrage_TypeNum+"种炫彩"
						
						this.Loudspeaker2=res.Result.List[2].Loudspeaker
						// this.list2[3].content=this.Loudspeaker2+"个免费广告弹框"
						
						
					})
					return;
				}
			
				
				ajaxTemplate('/Nobility/GetNobility_PriceList', {
					User_Id: this.$store.state.userInfo.User_Id
				}).then((res) => {
					console.log(res)
					this.Gold_Coin = res.Result.Gold_Coin
					
					
					this.Gain_Price = res.Result.List[0].Gain_Price
					this.Renew_Price = res.Result.List[0].Renew_Price
					
					this.Nobility_Id = res.Result.List[0].Nobility_Id
					
					this.Nobility_Discount=res.Result.List[0].Nobility_Discount
					this.list[3].content2="尊享"+this.Nobility_Discount+"折"
					this.Barrage_TotalNum=res.Result.List[0].Barrage_TotalNum
					this.list[2].content2="弹幕"+this.Barrage_TotalNum+"个"
					this.list[2].content="尊享"+res.Result.List[0].Barrage_TypeNum+"种炫彩"
					this.Loudspeaker=res.Result.List[0].Loudspeaker
					// this.list[3].content=this.Loudspeaker+"个免费广告弹框"
					this.Gain_Price1 = res.Result.List[1].Gain_Price
					this.Renew_Price1 = res.Result.List[1].Renew_Price
					
					this.Nobility_Id1 = res.Result.List[1].Nobility_Id
					
					this.Nobility_Discount1=res.Result.List[1].Nobility_Discount
					this.list1[3].content2="尊享"+this.Nobility_Discount1+"折"
					this.Barrage_TotalNum1=res.Result.List[1].Barrage_TotalNum
					this.list1[2].content2="弹幕"+this.Barrage_TotalNum1+"个"
					this.list1[2].content="尊享"+res.Result.List[1].Barrage_TypeNum+"种炫彩"
					this.Loudspeaker1=res.Result.List[1].Loudspeaker
					// this.list1[3].content=this.Loudspeaker1+"个免费广告弹框"
					
					this.Gain_Price2 = res.Result.List[2].Gain_Price
					this.Renew_Price2 = res.Result.List[2].Renew_Price
					
					
					this.Nobility_Id2 = res.Result.List[2].Nobility_Id
					
					this.Nobility_Discount2=res.Result.List[2].Nobility_Discount
					this.list2[3].content2="尊享"+this.Nobility_Discount2+"折"
					this.Barrage_TotalNum2=res.Result.List[2].Barrage_TotalNum
					this.list2[2].content2="弹幕"+this.Barrage_TotalNum2+"个"
					this.list2[2].content="尊享"+res.Result.List[2].Barrage_TypeNum+"种炫彩"
					this.Loudspeaker2=res.Result.List[2].Loudspeaker
					// this.list2[3].content=this.Loudspeaker2+"个免费广告弹框"
				})
			},
			//开通续费/Nobility/Open_Nobility   //0 开通/1 续费
			openFnDebounced: _.debounce(function (id, num, money) {
			      this.openFn(id, num, money)
			    }, 500),
			openFn(id, num, money) {
				
				if(this.Nobility_Level==undefined ){
						uni.navigateTo({
							url: "/pages/login/index",
						});
						return
				}
				console.log(id, num, money)
				if (this.Gold_Coin < money) {
					this.clean = true
					return
				}
				this.User_Id = this.$store.state.userInfo.User_Id
				ajaxTemplate("/Nobility/Open_Nobility", {
					User_Id: this.User_Id,
					Nobility_Id: id,
					Is_Renew: num
				}).then((res) => {
					console.log(res)
					uni.showToast({
						title:res.Message,
						mask:true,
						icon:"none"
					})
					uni.$emit("getUserInfo")
					setTimeout(() => {
						this.time()
						this.initDate()
					},500)
					

				})
			},
			currentChange(e) {
				console.log(e)
				this.current = e.detail.current
			},
			rightFn() {
				console.log(this.current)
				if (this.current == 2) {
					return
				} else {
					this.current++
				}

			},
			leftFn() {
				console.log(this.current)
				if (this.current == 0) {
					return
				} else {
					this.current--
				}

			},
			back() {
				uni.navigateBack(-1)
			}

		},
		onPageScroll(e) {
			console.log(e)
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

	.head {
		position: relative;
		font-size: 24rpx;
		font-weight: 400;
		color: #64625E;
		margin-bottom: -10rpx;
	}

	.img {

		position: relative;
		width: 702rpx;
		margin: auto;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 22rpx 0 24rpx;

	}

	.card {
		width: 224rpx;
		height: 250rpx;
		background: linear-gradient(91deg, #282829 0%, #232324 100%);
		border-radius: 12rpx;
		opacity: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 18rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #7C7C7C;
		margin: 0 10rpx 20rpx 0;
	}

	.foot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		padding: 34rpx 22rpx;
	}

	.leftfoot {
		text-align: left;
		view {
			margin-bottom: 14rpx;
		}
	}

	.rightfoot {
		width: 204rpx;
		height: 68rpx;
		background: linear-gradient(90deg, #ED5E2C 0%,#ED5E2C 100%);
		border-radius: 34rpx;
		opacity: 1;
		text-align: center;
		line-height: 68rpx;
	}

	.rightfoot1 {
		width: 204rpx;
		height: 68rpx;
		background: linear-gradient(90deg, #FCD205 0%, #FAA203 100%);
		border-radius: 34rpx;
		opacity: 1;
		text-align: center;
		line-height: 68rpx;
	}

	.rightfoot2 {
		width: 204rpx;
		height: 68rpx;
		background: linear-gradient(90deg, #ECC397 0%, #E39C50 100%);
		border-radius: 34rpx;
		opacity: 1;
		text-align: center;
		line-height: 68rpx;
	}

	.time {
		position: absolute;
		bottom: 30rpx;
		width: 156rpx;
		height: 46rpx;
		line-height: 46rpx;
		text-align: center;
		background: linear-gradient(90deg, #0B0A07 0%, #171612 100%);
		border-radius: 0rpx 24rpx 24rpx 0rpx;
		opacity: 1;
		font-size: 22rpx;
		font-weight: 400;
		color: #FFFFFF;
	}

	.time2 {
		position: absolute;
		width: 88rpx;
		height: 44rpx;
		line-height: 44rpx;
		text-align: center;
		bottom: 26rpx;
		right: 0;
		background: #000000;
		border-radius: 16rpx 0px 0px 0px;
		opacity: 0.3;
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.swiper-item {
		display: block;

		height: 100%;
	}

	.swiper {
		height: 100vh;
		overflow-y: scroll;
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
			height: 320rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin: auto;
			text-align: center;
		}

		.clearnfoot {
			margin:40rpx auto 0;
			display: flex;
			justify-content: space-around;
			font-size: 28rpx;
			
			.left {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				border-radius: 38rpx;
				opacity: 1;
				border: 2rpx solid #ed5c2a;
				color: #ed5c2a;
			}

			.right {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				background: #ed5c2a;
				border-radius: 38rpx;
				opacity: 1;
			}
		}
	}
</style>
