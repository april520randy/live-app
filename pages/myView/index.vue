<template>
	<view class="content" style="overflow: hidden;" :class="{ 'un-login': !isLogin }">
		<var-app-bar style="border: none" round :image="defaultBk" :elevation="false">
			<template #content>
				<view class="var-app-bar-content">
					<view class="rt-icons">
						<image src="../../static/image/myView/icon1.png" @click="open()">
						</image>
						<image @click="goguizu()" src="../../static/image/myView/icon2.png"> </image>

						<image @click="gosetting()" src="../../static/image/myView/icon3.png"> </image>
					</view>
					<view class="logos">
						<view class="lf">
							<view
								style="position: relative;width:108rpx;height:108rpx;border-radius: 50%;margin:0 38rpx 0 14rpx;display: flex;align-items: center;justify-content: center;">
								<image :src="userInfo.User_Logo" class="logo" @click="loLogin"> </image>


								<view style="position: absolute;bottom: 100rpx;
    left: 4rpx;" v-if="userInfo.Anchoer_Attest_Status == 2">
									<image src="../../static/fly-y.png" style="
										                    width: 160rpx;
										                    height: 36rpx;
										                    position: absolute;
										                    left: -28rpx;
										                    top: 70rpx;
										                  ">
									</image>
									<view class="zhubo" style="display: flex;align-items: center;justify-content: center;">

										<image src="../../static/search--y.png" style="width: 28rpx; height: 28rpx">
										</image>
										<view style="font-size: 12px; color: #ffffff">主播</view>


									</view>
									<!-- <view class="zhubo">
										<view style="
									                      display: flex;
									                      align-items: center;
									                      justify-content: center;
									                      padding: 2px 11px;
									                      justify-content: space-between;
									                    ">
											<image src="../../assets/search--y.png" style="width: 14px; height: 14px" ></image>
											<view style="font-size: 12px; color: #ffffff">主播</view>
										</view>
									</view> -->
								</view>
							</view>

							<view class="rtt" :style="{margin:isLogin?'-5px 0':'0'}">
								<view>
									<text @click="loLogin"
										:style="{ color: isLogin && userInfo.Nobility_Level != 0 ? '#333333' : '#0F0F0F' }"
										style="
font-size: 30rpx;
font-weight: 500;">{{ userInfo.User_Name }}</text>
									<image @click="golevel()" src="../../static/image/myview/dd0.png"
										v-if="isLogin && level < 1" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd1.png"
										v-if="isLogin && level == 1" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd2.png"
										v-if="isLogin && level == 2" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd3.png"
										v-if="isLogin && level == 3" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd4.png"
										v-if="isLogin && level == 4" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd5.png"
										v-if="isLogin && level == 5" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd6.png"
										v-if="isLogin && level == 6" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd7.png"
										v-if="isLogin && level == 7" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd8.png"
										v-if="isLogin && level == 8" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd9.png"
										v-if="isLogin && level == 9" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd10.png"
										v-if="isLogin && level == 10" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd11.png"
										v-if="isLogin && level == 11" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd12.png"
										v-if="isLogin && level == 12" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd13.png"
										v-if="isLogin && level == 13" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd14.png"
										v-if="isLogin && level == 14" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd15.png"
										v-if="isLogin && level == 15" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd16.png"
										v-if="isLogin && level == 16" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd17.png"
										v-if="isLogin && level == 17" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd18.png"
										v-if="isLogin && level == 18" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd19.png"
										v-if="isLogin && level == 19" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd20.png"
										v-if="isLogin && level == 20" class="level">
									</image>
									<image @click="golevel()" src="../../static/image/myview/dd21.png"
										v-if="isLogin && level == 21" class="level">
									</image>


									<text class="unlogin-level" v-if="!isLogin">登录后获取更多精彩内容</text>
								</view>

								<view class="fensi" :style="{ display: isLogin ? 'flex' : 'none' }">
									<view @click="toFuns">
										<text
											:style="{ color: isLogin && userInfo.Nobility_Level != 0 ? '#333333' : '#0F0F0F' }">粉丝</text>
										<text style="
font-weight: bold;" :style="{ color: isLogin && userInfo.Nobility_Level != 0 ? '#333333' : '#0F0F0F' }">{{
	userInfo.Funs_Num
}}</text>
									</view>
									<view @click="toGz">
										<text
											:style="{ color: isLogin && userInfo.Nobility_Level != 0 ? '#333333' : '#0F0F0F' }">关注</text>
										<text style="
font-weight: bold;" :style="{ color: isLogin && userInfo.Nobility_Level != 0 ? '#333333' : '#0F0F0F' }">{{
	userInfo.Interest_Num
}}</text>
									</view>
								</view>

							</view>




						</view>
						<!-- <view class="rt">
							<image :src="userInfo.img"> </image>
							<text>贵族盲盒礼包</text>
						</view> -->
					</view>



					<view style="width: 400rpx;height: 400rpx;position:absolute;right:-12rpx;top:76rpx;z-index:-5">
						<l-svga ref="svga3">
						</l-svga>
					</view>

					<view v-if="timeactive == 1 && false" style="width: 86px;					
																						height: 24px;
																						background: #FFFFFF;
																						border-radius: 12px 0px 0px 12px;
																						opacity: 0.6;
																						position: absolute;
																						right: 0;
																						bottom:60rpx;
																						display: flex;
																						align-items: center;
																						">
						<image style="width: 13px;height: 13px;margin: 6px;" src="../../static/image/myView/time.png"
							mode=""></image>
						<span style="color: #333333;font-size: 12px;opacity: 1;" >
							剩余{{ Nobility_DeadLine }}天
							<!-- 剩余11天 -->
						</span>
					</view>

				</view>
			</template>
		</var-app-bar>
		<view v-if="Nobility_Level2 == 1" class="part part-0" >
			<div><image  style="width: 63px;height: 30px;margin: 6px;" src="../../static/image/myView/qishi_txt.png"
							mode=""></image>
							<image  style="width: 30rpx;height: 60rpx;margin-left: 6rpx;margin-bottom:6rpx" src="../../static/image/tqq.png"
											mode=""></image></div>
			
							<text class="btn" @click="goprivilege">我的贵族特权</text>
							<view class="end-time">
			您的贵族特权剩余{{ Nobility_DeadLine }}天
		</view>
		</view>
		<view v-if="Nobility_Level2 == 2" class="part1"  >
			<div><image style="width: 63px;height: 30px;margin: 6px;" src="../../static/image/myView/gongjue1.png"
							mode=""></image>
							<image  style="width: 30rpx;height: 60rpx;margin-left: 6rpx;margin-bottom:6rpx" src="../../static/image/tqq.png"
											mode=""></image></div>
			
							<text  @click="goprivilege"  class="btn">我的贵族特权</text>
							<view class="end-time">
			您的贵族特权剩余{{ Nobility_DeadLine }}天
		</view>
		</view>
		<view  v-if="Nobility_Level2 == 3" class="part2" >
			<div><image style="width: 63px;height: 30px;margin: 6px;" src="../../static/image/myView/dihuang1.png"
							mode=""></image>
							<image  style="width: 30rpx;height: 60rpx;margin-left: 6rpx;margin-bottom:6rpx" src="../../static/image/tqq.png"
											mode=""></image></div>
			
							<text  @click="goprivilege" class="btn">我的贵族特权</text>
							<view class="end-time">
			您的贵族特权剩余{{ Nobility_DeadLine }}天
		</view>
		</view>
	
		<view class="part part-1" :style="{'margin-top':isLogin && Nobility_Level2?'37px':'-180px'}">
			<view class="qb">我的钱包</view>
			<view class="part-1-c">
				<view class="money">
					<view>
						<view class="bi">
							<image src="../../static/image/myView/jinbi.png" class="logo">
							</image>
							<text>金币</text>
						</view>
						<text class="num">{{ userInfo.Gold_Coin }}</text>
					</view>
					<view>
						<view class="bi">
							<image src="../../static/image/myView/yinbi.png" class="logo">
							</image>
							<text>银币</text>
						</view>
						<text class="num">{{ userInfo.Silver_Coin }}</text>
					</view>
				</view>
				<view class="btn" @click="recharge">充值</view>
			</view>

		</view>

		<view class="part part-2">
			<view class="card card-1">
				<!-- <image src="../../static/image/myView/vip.png" style="width:88rpx;height:88rpx"
					v-if="!isLogin || Nobility_Level2 == 0"> </image>
				<image src="../../static/image/qqs.png" style="width:88rpx;height:88rpx" v-if="Nobility_Level2 == 1">
				</image>
				<image src="../../static/image/ggj.png" style="width:88rpx;height:88rpx" v-if="Nobility_Level2 == 2">
				</image>
				<image src="../../static/image/ddh.png" style="width:88rpx;height:88rpx" v-if="Nobility_Level2 == 3">
				</image> -->
				<view class="gf">
					<text class="title" v-if="!isLogin || Nobility_Level2 == 0">我的贵族</text>
					<text class="title" v-if="Nobility_Level2 == 1">骑士</text>
					<text class="title" v-if="Nobility_Level2 == 2">公爵</text>
					<text class="title" v-if="Nobility_Level2 == 3">帝皇</text>
					<view class="inline">
						<text @click="goprivilege">查看特权</text>
						<image src="../../static/image/hright.png"> </image>
					</view>
				</view>
			</view>
			<!-- <image src="../../static/image/myView/slit.png" class="split"> </image> -->
			<view class="split">

			</view>
			<view class="card card-2">
				<!-- <image src="../../static/image/myView/shop.png" style="width:88rpx;height:88rpx"> </image> -->
				<view class="gf">
					<text class="title">我的商城</text>
					<view class="inline">
						<text @click="goshop">进入商城</text>
						<image src="../../static/image/hright.png"> </image>
					</view>
				</view>
			</view>
		</view>
		<view class="part part-3">
			<!-- <view class="title">常用功能</view> -->
			<view class="list">
				<view class="item" @click="go(1)">
					<image style="width: 50px;height: 50px;" src="../../static/image/myView/g1.png"> </image>
					<text>我的关注</text>
				</view>
				<view @click="goshoucang()" class="item">
					<image style="width: 50px;height: 50px;" src="../../static/image/myView/g2.png"> </image>
					<text>我的收藏</text>
				</view>
				<view class="item" @click="go(3)">
					<image style="width: 50px;height: 50px;" src="../../static/image/myView/g3.png"> </image>
					<text>领取记录</text>
				</view>
			</view>
		</view>
		<view style="position: relative" class="part part-4">
			<view class="title">更多功能</view>
			<span style="position: absolute; left: 13%; top: 17%">
				<image style="width: 30px; height: 14px" src="../../static/image/wrz.png" mode=""
					v-if="userInfo.Anchoer_Attest_Status == '0'"></image>
				<image style="width: 30px; height: 14px" src="../../static/image/shz.png" mode=""
					v-if="userInfo.Anchoer_Attest_Status == '1'"></image>
				<image style="width: 30px; height: 14px" src="../../static/image/yrz.png" mode=""
					v-if="userInfo.Anchoer_Attest_Status == '2'"></image>
				<image style="width: 30px; height: 14px" src="../../static/image/shsb.png" mode=""
					v-if="userInfo.Anchoer_Attest_Status == '3'"></image>
			</span>
			<view class="list">
				<view class="item" v-for="(item, index) in abilityList" :key="index" @click="change(index)">
					<image :src="item.img"> </image>
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
		<view class="popups" v-if="show">
			<!-- 签到 -->
			<view v-if="tab == 0" style="display: flex; flex-direction: column; align-items: center">
				<view class="imgbox">
					<image src="../../static/image/mrqd.png" alt="" style="width: 299px; height: 50px; margin-top: 115px" />
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
						<text style="color: #ED5F2D">我的页面</text>-
						<text style="color: #ED5F2D">每日签到</text>- 内查看
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
					<image src="../../static/image/mrqd.png" alt="" style="width: 294px; height: 50px; margin-top: 115px" />
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

	<m-tabbar fixed fill :current="current" :tabbar="tabbar"></m-tabbar>
</template>
<script>
import TabbarConfig from '/utils/tabbar.js'
import store from "@/store/index.js";

import {
	ajaxTemplate
} from "../../api/index.js";

export default {
	data() {
		return {
			current: 4,
			tabbar: TabbarConfig,
			goods_id: 4,
			timeactive: 1,
			player: null,
			defaultBk: '../../static/image/indexBg.png',
			Nobility_DeadLine: '',
			characteristic: '../../static/image/indexBg.png',
			day: "",
			Rule_Id: "",
			User_Id: "",
			Reward_SilverCoin: "", //奖励银币
			Reward_EXP: "", //奖励经验值
			Nobility_Level2: "",

			title: "我的",
			type: "center",
			show: false,
			tab: 0,
			registerlabel: [],
			title: "我的",
			default_userInfo: {
				User_Logo: '../../static/image/myView/un-login.jpg',
				User_Name: '登录/注册',
				Funs_Num: '***',
				Interest_Num: '***',
				Gold_Coin: '***',
				Silver_Coin: '***'
			},
			abilityList: [{
				title: "主播中心",
				img: "../../static/image/myView/v1.png",
			},
			{
				title: "消息中心",
				img: "../../static/image/myView/v2.png",
			},
			{
				title: "帮助中心",
				img: "../../static/image/myView/v3.png",
			},
			{
				title: "观看历史",
				img: "../../static/image/myView/v4.png",
			},
			// {
			// 	title: '活动中心',
			// 	img: '../../static/image/myView/v5.png'
			// },
			{
				title: "任务中心",
				img: "../../static/image/myView/v6.png",
			},
			{
				title: "意见反馈",
				img: "../../static/image/myView/v7.png",
			},
			{
				title: "在线客服",
				img: "../../static/image/myView/v8.png",
			},
			// {
			// 	title: '好友邀请',
			// 	img: '../../static/image/myView/v9.png'
			// },
			{
				title: "用户协议",
				img: "../../static/image/myView/v10.png",
			},
			{
				title: "隐私协议",
				img: "../../static/image/myView/v11.png",
			},
			{
				title: "充值记录",
				img: "../../static/image/myView/v13.png",
			},
			],
		};
	},

	computed: {
		Nobility_Level() {
			if (this.isLogin) {
				return this.userInfo.Nobility_Level
			}
			return 0
		},
		level() {
			if (this.isLogin) {
				return this.userInfo.User_Level
			}
			return 0
		},
		isLogin() {
			return store.getters.is_login;
		},
		userInfo() {
			if (this.isLogin) {
				return store.state.userInfo;

			}
			return this.default_userInfo;
		},
	},

	onShow() {
		uni.hideTabBar()
		if (uni.getStorageSync("Chat_State") == 0 && uni.getStorageSync("New_State") == 0) {
			this.current = 2
		}
		if (uni.getStorageSync("Chat_State") == 0 && uni.getStorageSync("New_State") == 1) {
			this.current = 3
		}
		if (uni.getStorageSync("Chat_State") == 1 && uni.getStorageSync("New_State") == 0) {
			this.current = 3
		}
		if (uni.getStorageSync("Chat_State") == 1 && uni.getStorageSync("New_State") == 1) {
			this.current = 4
		}
		// uni.hideTabBar()
		// if(uni.getStorageSync("Chat_State")==0&&uni.getStorageSync("New_State")==0){
		// 	this.current=2
		// }
		// if(uni.getStorageSync("Chat_State")==0&&uni.getStorageSync("New_State")==1){
		// 	this.current=3
		// }
		// if(uni.getStorageSync("Chat_State")==1&&uni.getStorageSync("New_State")==0){
		// 	this.current=3
		// }
		// if(uni.getStorageSync("Chat_State")==1&&uni.getStorageSync("New_State")==1){
		// 	this.current=4
		// }


		setTimeout(() => {
			this.Nobility_Level2 = this.$store.state.userInfo.Nobility_Level
			console.log(this.$store.state.userInfo,'kkkkk')
			this.Nobility_DeadLine = Math.floor((new Date(this.userInfo.Nobility_DeadLine) - new Date()) /
				86400000)

			console.log(this.Nobility_DeadLine, 123131231, this.userInfo.Nobility_DeadLine);
			// 	// this.tab=0
			// 	console.log(11111, this.$store.state.userInfo)
			// 	console.log(this.default_userInfo)
			// 	console.log(this.tab)
			// 	this.getsign();
			// 	// this.getuserlist();
			// 	console.log(this.User_Id)

			// 	console.log(this.tab)

		}, 500);

		//这里直接进行这个判断是不行的，获取用户信息是异步的，要么加settimeou包裹
		// 要么在启动页面loading时间加长，获取完成用户信息之后在进入页面
		// if(this.$store.state.userInfo.User_Id==undefined){
		// 	this.User_Id = 0;
		// }else{
		// 	this.User_Id = this.$store.state.userInfo.User_Id;
		// 	this.getsign();
		// }


	},
	watch: {
		Nobility_Level: {
			handler(val) {
				// this.changeSvga(val)
			},
			immediate: true,




		}
	},
	onLoad() {


		this.init()
	},
	onReady() {

	},

	methods: {
		init() {
			this.Nobility_Level2 = this.$store.state.userInfo.Nobility_Level
			console.log(this.$store.state.userInfo,"yyyyyyyyyyyy");
			
			this.Nobility_DeadLine = Math.floor((new Date(this.userInfo.Nobility_DeadLine) - new Date()) / 86400000)

			console.log(this.Nobility_DeadLine, 123131231, this.userInfo.Nobility_DeadLine);
		},
		goshoucang() {

			if (this.$store.state.userInfo.User_Id == undefined) {
				uni.navigateTo({
					url: "/pages/login/index",
				});
				return;
			}


			// uni.setStorageSync('currentIndex', 4);

			uni.switchTab({
				url: `/pages/rateView/index`,
				success: function (e) {
					uni.setStorageSync('currentIndex', 5);
				}
			});


		},
		changeSvga(type) {
			if (type) {
				type = Number(type)
			}
			if (this.player) {
				this.player.stopAnimation(true)
				this.player.clear()
			}

			const svgaObj = {
				'1': 'qss.svga',
				'2': 'gjj.svga',
				'3': 'dhh.svga'
			}
			const bgObj = {
				'1': 'qs.png',
				'2': 'gj.png',
				'3': 'dh.png'
			}

			this.$nextTick(() => {
				if (type < 1) {
					this.characteristic = this.defaultBk
					this.timeactive = 0
				} else {
					this.timeactive = 1
					this.characteristic = `../../static/image/myView/${bgObj[type]}`

					this.$refs.svga3.render(async (parser, player) => {
						this.$refs.svga3.rLoadSrc = ''
						//  使用这种方式 /static/image/dhh.svga不要 ../../
						const videoItem = await parser.load(`/static/image/${svgaObj[type]}`);
						this.player = player

						await player.setVideoItem(videoItem);
						// 设置当前动画的循环次数，0代表无限循环 默认 0
						player.loops = 0
						// 设置动画缩放模式，可选值为 Fill / AspectFill / AspectFit
						player.setContentMode(() => {
							contentMode: 'AspectFill'
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
				}



			})

		},
		//暂时隐藏
		toFuns() {
			if (this.$store.state.userInfo.User_Id == undefined) {
				uni.navigateTo({
					url: "/pages/login/index",
				});
				return
			}
			uni.navigateTo({
				url: '/pages/fans/index?Anchoer_Id=' + this.$store.state.userInfo.User_Id
			})
		},
		toGz() {
			if (this.$store.state.userInfo.User_Id == undefined) {
				uni.navigateTo({
					url: "/pages/login/index",
				});
				return
			}
			uni.navigateTo({
				url: '/pages/mygz/index'
			})
		},
		goguizu() {
			console.log(12121212);
			uni.navigateTo({
				url: '/pages/myView/privilege/privilege'
			})
		},
		golevel() {


			uni.navigateTo({
				url: '/pages/myView/profile/level'
			})
		},
		gosetting() {
			uni.navigateTo({
				url: '/pages/myView/setting/setting'
			})
		},
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
		//获取签到规则列表/Sign/GetActivity_RulesList
		getuserlist() {
			console.log(this.User_Id);
			ajaxTemplate("/Sign/GetActivity_RulesList", {
				User_Id: this.$store.state.userInfo.User_Id == undefined ? 0 : this.$store.state.userInfo
					.User_Id,
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
		//获取签到记录列表/Sign/GetSign
		getsign() {
			// ajaxTemplate("/Sign/GetSign", {
			// 	User_Id: this.$store.state.userInfo.User_Id == undefined ? 0 : this.User_Id,
			// }).then((res) => {
			// 	console.log(res);
			// 	this.Reward_SilverCoin = res.Result.at(-1).Reward_SilverCoin;
			// 	this.Reward_EXP = res.Result.at(-1).Reward_EXP;
			// });
		},
		go(e) {
			if (e == 1) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/mygz/index",
				});
			}
			if (e == 3) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/lingrecord/index",
				});
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
					this.show = false
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
				this.show = false;
			}
		},


		close() {
			this.show = false;
		},
		open() {

			this.show = true;
			this.getuserlist()
			// this.tab = 0;
		},

		goshop() {
			if (this.$store.state.userInfo.User_Id == undefined) {
				// uni.showToast({
				// 	title: "请先登录",
				// 	duration: 2000,
				// });
				uni.navigateTo({
					url: "/pages/login/index",
				});
				return;
			}
			uni.navigateTo({
				url: "/pages/myView/shop/shop",
			});
		},
		goprivilege() {
			// if (this.$store.state.userInfo.User_Id == undefined) {
			// 	// uni.showToast({
			// 	// 	title: "请先登录",
			// 	// 	duration: 2000,
			// 	// });

			// 	uni.navigateTo({
			// 		url: "/pages/login/index",
			// 	});

			// 	return;
			// }
			uni.navigateTo({
				url: "/pages/myView/privilege/privilege",
			});
		},
		loLogin() {
			if (this.isLogin) {
				//跳往个人资料
				uni.navigateTo({
					url: "/pages/myView/profile/index",
				})
				return;
			}
			uni.navigateTo({
				url: "/pages/login/index",
			});
		},
		recharge(index) {
			if (this.$store.state.userInfo.User_Id == undefined) {
				// uni.showToast({
				// 	title: "请先登录",
				// 	duration: 2000,
				// });
				uni.navigateTo({
					url: "/pages/login/index",
				});
				return;
			}
			uni.navigateTo({
				url: "/pages/myView/recharge/recharge",
			});
		},
		change(index) {

			if (index == 0) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					// uni.showToast({
					// 	title: "请先登录",
					// 	duration: 2000,
					// });
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					// 主播中心
					url: "/pages/myView/anchor/anchor",
				});
			}
			if (index == 1) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					// uni.showToast({
					// 	title: "请先登录",
					// 	duration: 2000,
					// });
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					// 消息中心
					url: "/pages/msgCenter/index",
				});
			}
			if (index == 2) {
				uni.navigateTo({
					// 帮助中心
					url: "/pages/helpCenter/index",
				});
			}
			if (index == 3) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					// uni.showToast({
					// 	title: "请先登录",
					// 	duration: 2000,
					// });
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					// 观看历史
					url: "/pages/lookHistory/index",
				});
			}
			if (index == 4) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					// uni.showToast({
					// 	title: "请先登录",
					// 	duration: 2000,
					// });
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					//任务中心
					url: "/pages/reCenter/index",
				});
			}
			if (index == 5) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					// uni.showToast({
					// 	title: "请先登录",
					// 	duration: 2000,
					// });
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					// 意见反馈
					url: "/pages/yjFk/index",
				});
			}
			if (index == 6) {

				uni.navigateTo({
					//在线客服
					url: "/pages/zxkf/index",
				});
			}
			if (index == 7) {
				uni.navigateTo({
					// 用户协议
					url: "/pages/userXy/index",
				});
			}
			if (index == 8) {
				uni.navigateTo({
					// 隐私协议
					url: "/pages/ysXy/index",
				});
			}
			if (index == 9) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					// uni.showToast({
					// 	title: "请先登录",
					// 	duration: 2000,
					// });
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					// 充值记录
					url: "/pages/record/index",
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
* {
	::v-deep * {
		box-sizing: border-box;
	}
}

page {
	background-color: white;
}

.zhubo {
	width: 104rpx;
	height: 21px;
	background: linear-gradient(130deg, #ffc258 0%, #ff9901 100%);
	border-radius: 11px;
	position: absolute;
	left: -1px;
	top: 39px;
}

.box {
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.un-login {
	.var-app-bar{
		background-color: unset;
	}
	&.content {
		.var-app-bar {
			.var-app-bar-content {
				.logos {
					.lf {
						&>view {
							display: flex;

							.unlogin-level {
								display: block;
								color: #0F0F0F;
								margin-top: 9px;
								width: unset;
								font-size: 12px;
							}
						}
					}
				}
			}
		}
	}
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;

	.var-app-bar {
		// background: white;
		height: 348px;
		background-image: url("../../static/image/indexBg.png") !important;

		.var-app-bar-content {
			padding: 0 16px;
			z-index: 999;

			.rt-icons {
				display: flex;
				justify-content: flex-end;

				image {
					width: 20px;
					height: 20px;
					margin-right: 16px;

					&:last-child {
						margin-right: 0;
					}
				}
			}

			.logos {
				margin-top: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.lf {
					display: flex;

					.logo {
						width: 104rpx;
						height: 104rpx;
						border-radius: 50%;
					}

					&>view {
						// margin-left: 28rpx;
						display: flex;

						// align-items: center;
						text {
							font-size: 15px;
							color: white;
							margin-top: 10rpx;
							// line-height: 1.4;
						}

						.level {
						
							margin-left: 10px;
							width: 60px;
							height: 28px;
						}
					}
				}
				.rtt{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
    margin: -5px 0;
					.fensi {

display: flex;

&>view {
	display: flex;
	align-items: center;
	margin-right: 15px;

	text {
		font-size: 13px;
		color: #fff;

		&:last-child {
			margin-left: 3px;
			font-weight: bold;
			font-size: 16px;
		}
	}
}
}
				}

				.rt {
					display: flex;
					align-items: center;
					height: 34px;
					background: rgba(255, 255, 255, 0.3);
					border-radius: 17px 0px 0px 17px;
					margin-right: -16px;
					padding-right: 3px;

					image {
						width: 28px;
						height: 28px;
						border-radius: 50%;
						margin-right: 8px;
					}
				}
			}

			
		}
	}

	.part {
		z-index: 12;
		align-self: stretch;
		margin: 0 10px;
		background: #ffffff;
		border-radius: 6px 6px 6px 6px;
		margin-bottom: 10px;
	}
	.part-0{
		width: 100%;
		position: relative;
		display: flex;
    flex-direction: column;
		margin-top: -152px;
		margin-left: 10px;
		margin-right: 10px;
	
		// height: 100px;
		background: url("../../static/image/myView/qishi.png");
		background-size: 100% 100%;
		background-position: center;
		padding:14px 18px;
		.btn{
			margin-top: 5px;
			padding:6px 13px;
			width: 98px;
background: linear-gradient(180deg, #FEF0D7 0%, #FBD7A6 100%);
border-radius: 16px 16px 16px 16px;
opacity: 1;
font-size: 12px;
color: #6B451A;
		}
		.end-time{
			padding-left: 17px;
			display: flex;
			align-items: center;
			left: 0;
    right: 0;
    bottom: -27px;
			position: absolute;
height: 27px;
background: #FFE6C7;

font-size: 12px;
font-family: Source Han Sans CN-Regular, Source Han Sans CN;
font-weight: 400;
color: #6B451A;

	}
	}
	
	.part1{
		width: 100%;
			position: relative;
			display: flex;
	    flex-direction: column;
			margin-top: -152px;
			margin-left: 10px;
			margin-right: 10px;
		
			// height: 100px;
			background: url("../../static/image/myView/dihuang_txt.png");
			background-size: 100% 100%;
			background-position: center;
			padding:14px 18px;
			.btn{
				margin-top: 5px;
				padding:6px 13px;
				width: 98px;
	background: linear-gradient(180deg, #FEF0D7 0%, #FBD7A6 100%);
	border-radius: 16px 16px 16px 16px;
	opacity: 1;
	font-size: 12px;
	color: #6B451A;
			}
			.end-time{
				padding-left: 17px;
				display: flex;
				align-items: center;
				left: 0;
	    right: 0;
	    bottom: -27px;
				position: absolute;
	height: 27px;
	background: #FFE6C7;
	
	font-size: 12px;
	font-family: Source Han Sans CN-Regular, Source Han Sans CN;
	font-weight: 400;
	color: #6B451A;
	
		}
		}
		.part2{
			width: 100%;
				position: relative;
				display: flex;
		    flex-direction: column;
				margin-top: -152px;
				margin-left: 10px;
				margin-right: 10px;
			
				// height: 100px;
				background: url("../../static/image/myView/gongjue.png");
				background-size: 100% 100%;
				background-position: center;
				padding:14px 18px;
				.btn{
					margin-top: 5px;
					padding:6px 13px;
					width: 98px;
		background: linear-gradient(180deg, #FEF0D7 0%, #FBD7A6 100%);
		border-radius: 16px 16px 16px 16px;
		opacity: 1;
		font-size: 12px;
		color: #6B451A;
				}
				.end-time{
					padding-left: 17px;
					display: flex;
					align-items: center;
					left: 0;
		    right: 0;
		    bottom: -27px;
					position: absolute;
		height: 27px;
		background: #FFE6C7;
		
		font-size: 12px;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #6B451A;
		
			}
			}


	.part-1 {
		z-index: 12;
		padding: 14px 15px;
		background: url("../../static/image/myView/part-1.png");
		background-size: 100% 100%;
		background-position: center;

		.qb {
			font-size: 14px;
			font-weight: 400;
			color: #FFFFFF;
			margin-bottom: 7px;

		}

		.part-1-c {

			display: flex;
			justify-content: space-between;
			z-index: 1;
			align-items: center;

			.money {
				display: flex;

				&>view {
					display: inline-block;
					display: flex;
					flex-direction: column;
					padding-right: 34.5px;

					&:first-child {
						// border-right: 1px solid #e7e9ee;
					}

					&:last-child {
						padding-left: 25px;
					}

					.bi {
						display: flex;
						align-items: center;

						image {
							width: 16px;
							height: 16px;
							margin-right: 4px;
						}

						text {
							font-size: 11px;
							color: white;
						}
					}

					.num {
						margin-top: 7px;
						font-size: 14px;
						font-weight: bold;
						color: white;
					}
				}
			}

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 56px;
				height: 26px;

				background: linear-gradient(180deg, #FEF0D7 0%, #FBD7A6 100%);
				border-radius: 16px 16px 16px 16px;
				opacity: 1;
				margin-top: -20px;
				font-size: 12px;
				font-weight: 500;
				color: #6B451A;
			}
		}

	}

	.part-2 {
		display: flex;
		align-items: center;
		padding-top: 20px;
		margin: 0;
		padding: 20px 10px 0 10px;



		z-index: 12;

		.split {
			width: 20px;
			height: 60rpx;
			opacity: 1;
			// border-right: 2rpx solid #E7E9EE;
		}

		.card {
			position: relative;
			height: 80px;
			padding: 10px;
			padding-left: 15px;
			flex: 1;

			display: flex;
			align-items: center;
			background-size: 100% 100%;
			background-position: center;

			&::after {
				z-index: -1;
				position: absolute;
				content: '';
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background: linear-gradient(133deg, #FFF1E5 0%, #FFD6B4 100%);
				border-radius: 8px 8px 8px 8px;
			}

			&>image {
				width: 44px;
				height: 41px;
				margin-right: 23px;
			}

			&.card-1 {
				background-image: url("../../static/image/myView/bk2.png");

				&>image {
					height: 38px;
					padding: 0 1px;
				}
			}

			&.card-2 {
				background-image: url("../../static/image/myView/bk1.png");

			}

			.gf {
				display: flex;
				flex-direction: column;

				&>.title {
					font-size: 14px;
					color: #333333;
					margin-bottom: 10px;
				}

				.inline {
					display: flex;
					align-items: center;

					text {
						font-size: 13px;
						color: #f0222c;
						margin-right: 5px;
					}

					image {
						width: 14px;
						height: 14px;
					}
				}
			}
		}
	}

	.part-3 {}

	.part-3,
	.part-4 {
		padding: 14px 11px;
		padding-bottom: 0;

		.title {
			font-size: 13px;
			font-weight: bold;
			color: #333333;
			padding-bottom: 13px;
			// border-bottom: 1px solid #e7e9ee;
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			padding: 15px 0;
			padding-bottom: 18px;
			margin-left: -11px;
			margin-bottom: -30px;

			.item {
				margin-bottom: 30px;
				width: 25%;
				/* padding-right: 45px; */
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 28px;
					height: 28px;
					margin-bottom: 4px;
				}

				text {
					font-size: 11px;
					color: #333333;
				}
			}
		}
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
		
background: linear-gradient(180deg, #ED602E 0%, #ED5D2B 100%);
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

::v-deep(.gif canvas) {
	// transform: matrix(0.4, 0, 0, 0.4, -240, -223) !important;
}</style>