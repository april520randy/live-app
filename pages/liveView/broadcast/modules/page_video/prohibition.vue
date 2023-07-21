<template>
	<view class="chat-prohibition" v-show="modal2">
		
		<image class="chat-close" @click.stop="closeClick" src="/static/image/liveroom/close.png" mode="aspectFill">
		</image>

		<view class="chat-prohibition-content" @click.stop="chatContentClick">
			<view v-if="admin">
				<view slot="header" style="text-align: center; margin-bottom: 20px;font-size: 32rpx;">
					管理员操作
				</view>
				<view @click="FGfn(true)" v-if="MemberProfile.Member_Type != 2" style="
		            width: 200px;
		            line-height: 48px;
		            background: #eceaea;
		            border-radius: 8px 8px 8px 8px;
		            margin: 0 auto;
		            display: flex;
		            align-items: center;
		            justify-content: center;
		            margin-bottom: 30px;
		            cursor: pointer;
		          ">
					<image style="width: 20px; height: 20px" src="/static/image/liveroom/gou.png"></image>
					<view>设为房管</view>
				</view>
				<view @click="FGfn(false)" v-if="MemberProfile.Member_Type == 2" style="
		            width: 360rpx;
		            line-height: 48px;
		           
background: linear-gradient(90deg, #ED5F2D 0%, #ED5F2D 100%);
		            border-radius:40rpx;
		            margin: 0 auto;
		            display: flex;
		            align-items: center;
		            justify-content: center;
		            color: #fff;
		            cursor: pointer;
		            margin-bottom: 30px;
		          ">
					<image style="width: 20px; height: 20px" src="/static/image/liveroom/err.png"></image>
					<view>取消房管</view>
				</view>

				<view @click="JYshowFn" v-if="MemberProfile.IsEstoppel == 0" style="
		            width: 200px;
		            line-height: 48px;
		            background: #eceaea;
		            border-radius: 8px 8px 8px 8px;
		            margin: 0 auto;
		            display: flex;
		            align-items: center;
		            justify-content: center;
		            cursor: pointer;
		            margin-bottom: 30px;
		          ">
					<image style="width: 20px; height: 20px" src="/static/image/liveroom/setup.png"></image>
					<view>禁言设置</view>
				</view>
				<view @click="yjyFn" v-if="MemberProfile.IsEstoppel == 1" style="
		            width: 200px;
		            line-height: 48px;
		            color: #fff;
		            background: linear-gradient(90deg, #ff582b 0%, #ff0f4b 100%);
		            border-radius: 8px 8px 8px 8px;
		            margin: 0 auto;
		            display: flex;
		            align-items: center;
		            justify-content: center;
		            cursor: pointer;
		            margin-bottom: 30px;
		          ">
					<image style="width: 20px; height: 20px" src="/static/image/liveroom/yjy2.png"></image>
					<view>已禁言</view>
				</view>

				<view @click="FJshowFn" v-if="MemberProfile.IsBan == 0" style="
		            width: 200px;
		            line-height: 48px;
		            background: #eceaea;
		            border-radius: 8px 8px 8px 8px;
		            margin: 0 auto;
		            display: flex;
		            align-items: center;
		            justify-content: center;
		            cursor: pointer;
		            margin-bottom: 30px;
		          ">
					<image style="width: 20px; height: 20px" src="/static/image/liveroom/setup.png"></image>
					<view>封禁设置</view>
				</view>
				<view @click="yfjFn" v-if="MemberProfile.IsBan == 1" style="
		            width: 200px;
		            line-height: 48px;
		            background: linear-gradient(90deg, #ff582b 0%, #ff0f4b 100%);
		            border-radius: 8px 8px 8px 8px;
		            margin: 0 auto;
		            display: flex;
		            align-items: center;
		            justify-content: center;
		            cursor: pointer;
		            margin-bottom: 30px;
		            color: #fff;
		          ">
					<image style="width: 20px; height: 20px" src="/static/image/liveroom/yjy2.png"></image>
					<view>已封禁</view>
				</view>
			</view>
			<!-- 禁言设置 -->
			<view v-if="JYshow">
				<view slot="header" style="display: flex; margin-bottom: 30px">
					<!-- <view style="display: flex; align-items: center">
			            <image
			              style="width: 13px; height: 12px"
			              src="../../../assets/image/hr.png"
			              alt=""
			            />
			            <view>上一页</view>
			          </view> -->
					<view style="margin-left: 240rpx;font-size: 32rpx;">禁言设置</view>
				</view>
				<view @click="JYtimeFn" style="
			            width: 200px;
			            line-height: 48px;
			            background: #eceaea;
			            border-radius: 8px 8px 8px 8px;
			            margin: 0 auto;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			            cursor: pointer;
			            margin-bottom: 30px;
			          ">
					<!-- <image
			            style="width: 20px; height: 20px"
			            src="../../../assets/image/yjy.png"
			          /> -->
					<view>禁言时长</view>
				</view>
				<view @click="JYfn('永久')" style="
			            width: 200px;
			            line-height: 48px;
			            background: #eceaea;
			            border-radius: 8px 8px 8px 8px;
			            margin: 0 auto;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			            cursor: pointer;
			            margin-bottom: 30px;
			          ">
					<!-- <image
			            style="width: 20px; height: 20px"
			            src="../../../assets/image/yjy.png"
			          /> -->
					<view>永久禁言</view>
				</view>
			</view>

			<!-- 封禁设置 -->
			<view v-if="FJshow">
				<view slot="header" style="display: flex; margin-bottom: 30px">
					<!-- <view style="display: flex; align-items: center">
			            <image
			              style="width: 13px; height: 12px"
			              src="../../../assets/image/hr.png"
			              alt=""
			            />
			            <view>上一页</view>
			          </view> -->
					<view style="margin-left: 240rpx;font-size: 32rpx;">封禁设置</view>
				</view>
				<view @click="FJtimeFn" style="
			            width: 200px;
			            line-height: 48px;
			            background: #eceaea;
			            border-radius: 8px 8px 8px 8px;
			            margin: 0 auto;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			            cursor: pointer;
			            margin-bottom: 30px;
			          ">
					<!-- <image
			            style="width: 20px; height: 20px"
			            src="../../../assets/image/yjy.png"
			          /> -->
					<view>封禁时长</view>
				</view>
				<view @click="FJfn('永久')" style="
			            width: 200px;
			            line-height: 48px;
			            background: #eceaea;
			            border-radius: 8px 8px 8px 8px;
			            margin: 0 auto;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			            cursor: pointer;
			            margin-bottom: 30px;
			          ">
					<!-- <image
			            style="width: 20px; height: 20px"
			            src="../../../assets/image/yjy.png"
			          /> -->
					<view>永久封禁</view>
				</view>
			</view>

			<!-- 禁言时长 -->
			<view v-if="jytime">
				<view slot="header" style="display: flex;align-items: center;">
					<!-- <view style="display: flex; align-items: center">
			            <img
			              style="width: 13px; height: 12px"
			              src="../../../assets/image/hr.png"
			              alt=""
			            />
			            <view>上一页</view>
			          </view> -->
					<view style="margin-left: 240rpx;margin-right:50rpx;font-size: 32rpx;color:#8E92A4">禁言时长</view>
					<view @click="resetTime" style="
					        display: flex;
					        justify-content: center;
					        align-items: center;
					        font-size: 24rpx;
					        color: #8E92A4;
					      ">
						<image src="/static/image/zhong.png" alt=""
							style="width: 16px; height: 16px; margin-right: 4px" ></image>
						<view>重置</view>
					</view>
				</view>
				<!-- <view style="">请选择时长:</view> -->
				<view style="text-align: center; margin-top: 16px;display: flex;margin:40rpx auto;justify-content: center;">
					<text>时</text>
					<!-- <lxc-count :value="shi" :delayed="100" @handleCount="handleChange1">
					</lxc-count> -->
					<uni-number-box :min="0" v-model="shi" @change="handleChange1"></uni-number-box>
				</view>
				<view style="text-align: center; margin-top: 16px;display: flex;margin:40rpx auto;justify-content: center;">
					<text>分</text>
					<!-- <lxc-count :value="fen" :delayed="100" @handleCount="handleChange2">
					</lxc-count> -->
					<uni-number-box :min="0" v-model="fen" @change="handleChange2"></uni-number-box>
				</view>
				<view style="text-align: center; margin-top: 16px;display: flex;margin:40rpx auto;justify-content: center;">
					<text>秒</text>
					<!-- <lxc-count :value="miao" :delayed="100" @handleCount="handleChange3">
					</lxc-count> -->
					<uni-number-box :min="0" v-model="miao" @change="handleChange3"></uni-number-box>
				</view>
				<view @click="JYfn()" style="
			            width: 378rpx;
			            line-height: 48px;
			            color: #fff;
			           
background: linear-gradient(90deg, #ED5F2D 0%, #ED5F2D 100%);
			            border-radius: 46rpx;
			            margin: 0 auto;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			            cursor: pointer;
			            margin-bottom: 30px;
			          ">
					确定
				</view>

			</view>

			<!-- 封禁时长 -->
			<view v-if="fjtime">
				<view slot="header" style="display: flex;align-items: center;">
					<!-- <view style="display: flex; align-items: center">
			            <img
			              style="width: 13px; height: 12px"
			              src="../../../assets/image/hr.png"
			              alt=""
			            />
			            <view>上一页</view>
			          </view> -->
					<view style="margin-left: 240rpx;margin-right:50rpx;font-size: 32rpx;color:#8E92A4">封禁时长</view>
					<view @click="resetTime2" style="
					        display: flex;
							
					        justify-content: center;
					        align-items: center;
					       
					        font-size: 24rpx;
					        color: #8E92A4;
					      ">
						<image src="/static/image/zhong.png" alt=""
							style="width: 16px; height: 16px; margin-right: 4px" ></image>
						<view>重置</view>
					</view>
				</view>
				<!-- <view>请选择时长:</view> -->
				<view style="text-align: center; margin-top: 16px;display: flex;margin:40rpx auto;justify-content: center;">
					<text>时</text>
					<!-- <lxc-count :value="shi1" :delayed="100" @handleCount="handleChange11">
					</lxc-count> -->
					<uni-number-box :min="0" v-model="shi1" @change="handleChange11"></uni-number-box>
				</view>
				<view style="text-align: center; margin-top: 16px;display: flex;margin:40rpx auto;justify-content: center;">
					<text>分</text>
				<!-- 	<lxc-count :value="fen1" :delayed="100" @handleCount="handleChange22">
					</lxc-count> -->
					<uni-number-box :min="0" v-model="fen1" @change="handleChange22"></uni-number-box>
				</view>
				<view style="text-align: center; margin-top: 16px;display: flex;margin:40rpx auto;justify-content: center;">
					<text>秒</text>
					<!-- <lxc-count :value="miao1" :delayed="100" @handleCount="handleChange33">
					</lxc-count> -->
					<uni-number-box :min="0" v-model="miao1" @change="handleChange33"></uni-number-box>
				</view>
				<view @click="FJfn()" style="
			            width: 378rpx;
			            line-height: 48px;
			            color: #fff;
			            
background: linear-gradient(90deg, #ED5F2D 0%, #ED5F2D 100%);
			            border-radius:46rpx;
			            margin: 0 auto;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			            cursor: pointer;
			          ">
					确定
				</view>

			</view>

			<!-- 取消禁言 -->
			<view v-if="yjyshow">
				<view slot="header" style="display: flex;">
					<!-- <view style="display: flex; align-items: center">
			            <img
			              style="width: 13px; height: 12px"
			              src="../../../assets/image/hr.png"
			              alt=""
			            />
			            <view>上一页</view>
			          </view> -->
					<view style="margin-left: 240rpx;font-size: 32rpx;">禁言时长</view>
				</view>
				<view v-if="MemberProfile.Estoppel_Type == 0" style="margin: 20px 0; text-align: center">
					该用户处于永久禁言中
				</view>
				<view v-if="MemberProfile.Estoppel_Type != 0" style="margin: 20px 0; text-align: center">
					该用户禁言剩余时间{{ getDiffTime(MemberProfile.Estoppel_Second) }}
				</view>
				<view @click="noJYFn" style="
			            width: 360rpx;
			            line-height: 48px;
			            cursor: pointer;
			           
background: linear-gradient(90deg, #ED5F2D 0%, #ED5F2D 100%);
			            border-radius: 40rpx;
			            margin: 0 auto;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			          ">
					<image style="width: 20px; height: 20px" src="/static/image/liveroom/err.png"></image>

					<view style="color: #fff">取消禁言</view>
				</view>
			</view>

			<!-- 取消封禁 -->
			<view v-if="yfjshow">
				<view slot="header" style="display: flex">
					<!-- <view style="display: flex; align-items: center">
			            <img
			              style="width: 13px; height: 12px"
			              src="../../../assets/image/hr.png"
			              alt=""
			            />
			            <view>上一页</view>
			          </view> -->
					<view style="margin-left: 240rpx;font-size: 32rpx;">封禁时长</view>
					<!-- <view style="margin-left: 70px">禁言时长</view> -->
				</view>
				<view v-if="MemberProfile.Ban_Type == 0" style="margin: 20px 0; text-align: center">
					该用户处于永久封禁中
				</view>
				<view v-if="MemberProfile.Ban_Type != 0" style="margin: 20px 0; text-align: center">
					该用户封禁剩余时间{{ getDiffTime(MemberProfile.Ban_Second) }}
				</view>
				<view @click="noFJFn" style="
			            width: 360rpx;
			            line-height: 48px;
			
			            
background: linear-gradient(90deg, #ED5F2D 0%, #ED5F2D 100%);
			            border-radius: 40rpx;
			            margin: 0 auto;
			            display: flex;
			            align-items: center;
			            justify-content: center;
			          ">
					<image style="width: 20px; height: 20px" src="/static/image/liveroom/err.png"></image>

					<view style="color: #fff">取消封禁</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import lxcCount from '@/components/lxc-count/lxc-count.vue'
	import {
		ajaxTemplate
	} from '/api/index.js'
	export default {
		components: {
			lxcCount
		},
		// props: {
		// 	modelValue: {
		// 		type: Boolean,
		// 		default: false
		// 	},
		// 	info: {
		// 		type: Object,
		// 		default: {}
		// 	}
		// },
		data() {
			return {
				admin: true,
				modal2: false,
				matchGroupId: '',
				User_Id: '',
				MemberProfile: {},
				JYshow: false,
				FJshow: false,
				jytime: false,
				shi: 0,
				fen: 0,
				miao: 0,
				shivalue: 0,
				fenvalue: 0,
				miaovalue: 0,
				fjtime: false,
				shi1: 0,
				fen1: 0,
				miao1: 0,
				shivalue1: 0,
				fenvalue1: 0,
				miaovalue1: 0,
				yjyshow: false,
				yfjshow: false
			}
		},
		methods: {
			closeClick() {
				this.JYshow = false
				this.FJshow = false
				this.jytime = false
				this.fjtime = false
				this.yjyshow = false
				this.yfjshow = false
				this.admin = true
				this.modal2 = false
				this.shi = 0
				this.fen = 0
				this.miao = 0
				this.shi1 = 0
				this.fen1 = 0
				this.miao1 = 0
			},
			yjyFn() {
				this.admin = false
				this.yjyshow = true
			},
			yfjFn() {
				this.admin = false
				this.yfjshow = true
			},
			//重置时间
			resetTime() {
				this.shi = 0
				this.fen = 0
				this.miao = 0
				this.shivalue = 0
				this.fenvalue = 0
				this.miaovalue = 0
			},
			resetTime2() {
				this.shi1 = 0
				this.fen1 = 0
				this.miao1 = 0
				this.shivalue1 = 0
				this.fenvalue1 = 0
				this.miaovalue1 = 0
			},
			//禁言时间
			handleChange1(value) {
				console.log(value, 'shivalue')
				this.shivalue = value * 3600
			},
			handleChange11(value) {
				console.log(value, 'shivalue1')
				this.shivalue1 = value * 3600
			},

			handleChange2(value) {
				console.log(value, 'fenvalue')
				this.fenvalue = value * 60
			},
			handleChange22(value) {
				console.log(value, 'fenvalue1')
				this.fenvalue1 = value * 60
			},

			handleChange3(value) {
				console.log(value)
				this.miaovalue = value
			},
			handleChange33(value) {
				console.log(value)
				this.miaovalue1 = value
			},

			JYtimeFn() {
				this.JYshow = false
				this.jytime = true
			},
			FJtimeFn() {
				this.FJshow = false
				this.fjtime = true
			},
			//禁言
			JYfn(type) {
				if (type == '永久') {

					ajaxTemplate("/LiveRoom/Set_Estoppel", {
						Group_Id: this.matchGroupId,
						Assignee_Id: this.User_Id,
						State: 1,
						Estoppel_State: 0,
						Estoppel_Time: 0
					}).then((res) => {
						console.log(res)
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
						this.jytime = false
						this.JYshow = false
						this.modal2 = false
					})


				} else {
					let time =
						Number(this.shivalue) + Number(this.fenvalue) + Number(this.miaovalue)

					ajaxTemplate("/LiveRoom/Set_Estoppel", {
						Group_Id: this.matchGroupId,
						Assignee_Id: this.User_Id,
						State: 1,
						Estoppel_State: 1,
						Estoppel_Time: time
					}).then((res) => {
						console.log(res)
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
						this.jytime = false
						this.JYshow = false
						this.modal2 = false
					})

					// Set_Estoppel({
					// 	Group_Id: this.matchGroupId,
					// 	Assignee_Id: this.User_Id,
					// 	State: 1,
					// 	Estoppel_State: 1,
					// 	Estoppel_Time: time
					// }).then((res) => {
					// 	console.log(res)
					// 	this.jytime = false
					// 	this.JYshow = false
					// 	this.modal2 = false
					// })
				}
			},
			//取消禁言
			noJYFn() {

				ajaxTemplate("/LiveRoom/Set_Estoppel", {
					Group_Id: this.matchGroupId,
					Assignee_Id: this.User_Id,
					State: 0
				}).then((res) => {
					console.log(res)
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
					this.jytime = false
					this.JYshow = false
					this.modal2 = false
					
					this.shivalue = 0
					this.fenvalue = 0
					this.miaovalue = 0
					
					this.yjyshow = false
					this.admin=true
				})
				// Set_Estoppel({
				// 	Group_Id: this.matchGroupId,
				// 	Assignee_Id: this.User_Id,
				// 	State: 0
				// }).then((res) => {
				// 	console.log(res)
				// 	this.jytime = false
				// 	this.JYshow = false
				// 	this.modal2 = false

				// 	this.shivalue = 0
				// 	this.fenvalue = 0
				// 	this.miaovalue = 0
				// })

			},
			//取消封禁
			noFJFn() {
				ajaxTemplate("/LiveRoom/Set_Ban", {
					Group_Id: this.matchGroupId,
					Assignee_Id: this.User_Id,
					State: 0
				}).then((res) => {
					console.log(res)
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
					this.fjtime = false
					this.FJshow = false
					this.modal2 = false
					this.yfjshow = false
					this.shivalue1 = 0
					this.fenvalue1 = 0
					this.miaovalue1 = 0
				})

				// Set_Ban({
				// 	Group_Id: this.matchGroupId,
				// 	Assignee_Id: this.User_Id,
				// 	State: 0
				// }).then((res) => {
				// 	console.log(res)
				// 	this.fjtime = false
				// 	this.FJshow = false
				// 	this.modal2 = false
				// 	this.yfjshow = false
				// 	this.shivalue1 = 0
				// 	this.fenvalue1 = 0
				// 	this.miaovalue1 = 0
				// })
			},
			//封禁
			FJfn(type) {
				if (type == '永久') {


					ajaxTemplate("/LiveRoom/Set_Ban", {
						Group_Id: this.matchGroupId,
						Assignee_Id: this.User_Id,
						State: 1,
						Estoppel_State: 0,
						Estoppel_Time: 0
					}).then((res) => {
						console.log(res)
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
						this.fjtime = false
						this.FJshow = false
						this.modal2 = false
					})

					// Set_Ban({
					// 	Group_Id: this.matchGroupId,
					// 	Assignee_Id: this.User_Id,
					// 	State: 1,
					// 	Estoppel_State: 0,
					// 	Estoppel_Time: 0
					// }).then((res) => {
					// 	console.log(res)
					// 	this.fjtime = false
					// 	this.FJshow = false
					// 	this.modal2 = false
					// })
				} else {
					let time =
						Number(this.shivalue1) +
						Number(this.fenvalue1) +
						Number(this.miaovalue1)


					ajaxTemplate("/LiveRoom/Set_Ban", {
						Group_Id: this.matchGroupId,
						Assignee_Id: this.User_Id,
						State: 1,
						Estoppel_State: 1,
						Estoppel_Time: time
					}).then((res) => {
						console.log(res)
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
						this.fjtime = false
						this.FJshow = false
						this.modal2 = false
					})
					// Set_Ban({
					// 	Group_Id: this.matchGroupId,
					// 	Assignee_Id: this.User_Id,
					// 	State: 1,
					// 	Estoppel_State: 1,
					// 	Estoppel_Time: time
					// }).then((res) => {
					// 	console.log(res)
					// 	this.fjtime = false
					// 	this.FJshow = false
					// 	this.modal2 = false
					// })
				}
			},
			//房管
			FGfn(type) {
				if (type) {
					console.log(this.matchGroupId)
					
					ajaxTemplate("/LiveRoom/Set_RoomAdmin", {
						Group_Id: this.matchGroupId,
						Assignee_Id: this.User_Id,
						State: 1
					}).then((res) => {
						console.log(res)
						if (res.Code == 200) {
							uni.showToast({
								title: '操作成功',
								icon: 'none'
							})
							this.modal2 = false
						}
					})
					// Set_RoomAdmin({
					// 	Group_Id: this.matchGroupId,
					// 	Assignee_Id: this.User_Id,
					// 	State: 1
					// }).then((res) => {
					// 	console.log(res)
					// 	if (res.Code == 200) {
					// 		this.$Message.success('操作成功')
					// 		this.modal2 = false
					// 	}
					// })
				} else {
					// setGroupMemberRole(
					//   this.matchGroupId,
					//   this.infor.userID,
					//   TIM.TYPES.GRP_MBR_ROLE_MEMBER,
					//   (res) => {
					//     console.log(res)
					//   }
					// )
					ajaxTemplate("/LiveRoom/Set_RoomAdmin", {
						Group_Id: this.matchGroupId,
						Assignee_Id: this.User_Id,
						State: 0
					}).then((res) => {
						console.log(res)
						if (res.Code == 200) {
							uni.showToast({
								title: '操作成功',
								icon: 'none'
							})
							this.modal2 = false
						}
					})
					// Set_RoomAdmin({
					// 	Group_Id: this.matchGroupId,
					// 	Assignee_Id: this.User_Id,
					// 	State: 0
					// }).then((res) => {
					// 	console.log(res)
					// 	if (res.Code == 200) {
					// 		this.$Message.success('操作成功')
					// 		this.modal2 = false
					// 	}
					// })
				}
			},
			JYshowFn() {
				this.JYshow = true
				this.admin = false
			},
			FJshowFn() {
				this.FJshow = true
				this.admin = false
			},
			getDiffTime(time) {
				var subtime = time //计算时间差,并将毫秒转化为秒
				var days = parseInt(subtime / 86400) //天  24*60*60*1000
				var hours = parseInt(subtime / 3600) - 24 * days //小时  60*60  总小时数-过去小时数=现在小时数
				var mins = parseInt((subtime % 3600) / 60) //分钟 - (day*24)  以60秒为一整份  取余 剩下秒数 秒数/60就是分钟数
				var secs = parseInt(subtime % 60) //以60秒为一整份  取余  剩下秒数
				return (
					// '时间差是：' +
					// days +
					// '天 ' +
					hours +
					'小时 ' +
					mins +
					'分钟 ' +
					secs +
					'秒 '
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chat-prohibition {
		width: 100%;
		height: 100%;
		background-color: rgba(#000000, 0.2);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;

		.chat-prohibition-content {
			width: 588rpx;
			height: 594rpx;
			border-radius: 40rpx;
			position: fixed;
			background: linear-gradient(137deg, #FFF6F5 0%, #FFFFFF 100%);
			/* #ifdef APP-PLUS */
			top: 600rpx;
			left: 50%;
			transform: translateX(-50%);
			/* #endif */
			/* #ifndef APP-PLUS */
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			/* #endif */
			padding: 50rpx 0 75rpx;
			z-index: 1000;
		}

		.chat-prohibition-title {
			width: 100%;
			text-align: center;
			font-size: 28rpx;
			color: #8E92A4;
			margin-bottom: 50rpx;
		}

		.chat-prohibition-button {
			width: 360rpx;
			height: 78rpx;
			background-color: #ECEAEA;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			color: #333;
			font-size: 28rpx;

			&.button-mg1 {
				margin-bottom: 40rpx;
			}


			.chat-image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}

			&.active {
				color: #fff;
				background: linear-gradient(90deg, #ED5F2D 0%, #ED5F2D 100%);
			}
		}

		.chat-prohibition-line {
			height: 2rpx;
			margin: 54rpx 0;
			border-bottom: 2rpx dashed #E7E9EE;
		}

		.chat-prohibition-head {
			padding: 0 20rpx;
			color: #8E92A4;
			font-size: 24rpx;
			display: flex;
			position: relative;
			margin-bottom: 60rpx;

			.head-back {
				display: flex;
				align-items: center;
			}

			.head-back-image {
				width: 28rpx;
				height: 28rpx;
			}

			.head-title {
				font-size: 32rpx;
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.chat-close {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			bottom: 300rpx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 999;
		}
	}
</style>