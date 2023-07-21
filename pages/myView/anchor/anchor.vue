<template>
	<view>

		<var-app-bar color="#fff" :style="{opacity:show2==true?1:0,zIndex:show2==true?999:0 }"
			style="position:fixed;top:0;border-radius:0;background-color: #fff;" round  :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="backMy" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="/static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">主播认证</view>
				</view>
			</template>
		</var-app-bar>
		<var-app-bar color="#fff" :style="{opacity:show2==false?1:0}" style="border-radius:0;background-color: #fff;" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="backMy" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="/static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">主播认证</view>
				</view>
			</template>
		</var-app-bar>
		<!-- <view class="anchor_top">
			<view class="top_title">
				<image src="../../../static/image/zbback.png" mode="" @click="backMy()"></image>
				<view>
					主播认证
				</view>
			</view>
		</view> -->
		<view class="anchor_center" v-if="centerShow==0">
			<view class="center1">
				<view class="center1_left">
					<text style="color: #FC683E;">*</text>主播赛事
				</view>
				<view class="center1_right">
					<view v-for="(item,index) in eventList" :key="index">
						<image src="../../../static/image/newkong.png" mode="" style="width: 24rpx;height: 24rpx;"
							v-if="item.choose==0" @click="chooseEvent(0,item)"></image>
						<image src="../../../static/image/newxz.png" mode="" style="width: 24rpx;height: 24rpx;"
							v-if="item.choose==1" @click="chooseEvent(1,item)"></image>
						<text>{{item.Live_Type_Name}}</text>
					</view>
				</view>
			</view>
			<view class="center2" @click="chooseClick" style="position: relative;">
				<view style="width: 170rpx;">
					<text style="color: #FC683E ;">*</text>直播经验
				</view>
				<input type="text" v-model="value" placeholder="请选择" style="width: 300rpx;" disabled='true' />
				<image src="../../../static/image/chakan.png" mode="" class="center2_right"
					style="position: absolute;right: 30rpx;">
				</image>
			</view>

			<view class="center2">
				<view style="width: 170rpx;">
					<text style="color: #FC683E ;">*</text>真实姓名
				</view>
				<input type="text" v-model="formData.Self_Name" placeholder="请输入您的真实姓名" />
			</view>

			<view class="center2">
				<view style="width: 170rpx;">
					QQ
				</view>
				<input type="text" v-model="formData.Contact_QQ" placeholder="请输入QQ号码" />
			</view>
			<view class="center2">
				<view style="width: 170rpx;">
					微信号
				</view>
				<input type="text" v-model="formData.Contact_WeChat" placeholder="请输入微信号码" />
			</view>
			<view class="center2">
				<view style="width: 170rpx;">
					<text style="color: #FC683E ;">*</text>身份证号
				</view>
				<input maxlength="18"  type="text" v-model="formData.ID_Number" placeholder="请输入您的身份证号码" />
			</view>
			<view class="center3">
				<view>
					<text style="color: #FC683E ;">*</text>身份证正面照
				</view>
				<view class="center3_img">
					<view
						style="border:1rpx dashed gray ;width: 626rpx;height: 366rpx;background: url(../../../static/image/shenfenzheng.png) no-repeat center center/100% 100%;">
						<uni-file-picker v-model="ID_FrontImg" file-mediatype="image" mode="grid" file-extname="png,jpg"
							:limit="1" :auto-upload='false' @select="select1" :image-styles="imageStyles" />
					</view>

				</view>
			</view>
			<view class="center3">
				<view>
					<text style="color: #FC683E ;">*</text>身份证反面照
				</view>
				<view class="center3_img">
					<view
						style="border:1rpx dashed gray ;width: 626rpx;height: 366rpx;background: url(../../../static/image/shenfenzheng3.png) no-repeat center center/100% 100%;">
						<uni-file-picker v-model="ID_BehindImg" file-mediatype="image" mode="grid"
							file-extname="png,jpg" :limit="1" :auto-upload='false' @select="select2"
							:image-styles="imageStyles" />
					</view>
				</view>
			</view>
			<view class="center3">
				<view>
					<text style="color: #FC683E ;">*</text>手持身份证正面照
				</view>
				<view class="center3_img">
					<view
						style="border:1rpx dashed gray ;width: 626rpx;height: 366rpx;background: url(../../../static/image/shenfenzheng2.png) no-repeat center center/100% 100%;">
						<uni-file-picker v-model="ID_HandImg" file-mediatype="image" mode="grid" file-extname="png,jpg"
							:limit="1" :auto-upload='false' @select="select3" :image-styles="imageStyles" />
					</view>

				</view>
			</view>

			<view class="center4">
				<!-- <view>
					<text style="color: #FC683E ;">*</text>手持身份证正面照
				</view> -->
				<view style="display: flex;justify-content: center;margin-top: 30rpx;">
					<textarea name="" :placeholder="placeholder" id="" cols="30" rows="10"
						v-model="formData.Self_Introduction"
						style="line-height:38rpx;font-size: 22rpx;padding:20rpx ;width:660rpx;height: 228rpx;background-color: #F4F7FE ;border-radius: 8rpx 8rpx 8rpx 8rpx;"></textarea>
				</view>
			</view>

			<view class="center2">
				<view style="padding-left: 10rpx;">
					推荐人
				</view>
				<input type="text" v-model="formData.Referrer" placeholder="请输入推荐人" style="width: 82%;" />
			</view>
			<view class="center2">
				<view>
					<text style="color: #FC683E ;">*</text>电话号码
				</view>
				<input type="text" disabled="disabled" v-model="phonenum" placeholder="请输入您的电话号码" style="width: 75%;" />
			</view>
			<view class="center2">
				<input type="text" v-model="formData.AuthorizeCode" placeholder="请输入验证码" style="width: 75%;" />
				<!-- <view @click="captchaClick" ref="timeBox"
					style="width: 168rpx;height: 48rpx;border: 2rpx solid #FC683E;border-radius: 8rpx 8rpx 8rpx 8rpx;color: #FC683E;line-height: 48rpx;text-align: center;">
					{{getCodeText}}
				</view> -->
				<button @click="captchaClick" ref="timeBox" type="primary" plain="true"
					style="width: 188rpx;height: 48rpx;border: 2rpx solid #FC683E;border-radius: 8rpx 8rpx 8rpx 8rpx;color: #FC683E;line-height: 48rpx;text-align: center;font-size: 24rpx;">{{getCodeText}}</button>
			</view>

			<view class="center5" style="margin-bottom: 50rpx;">
				<image src="../../../static/image/yuan1.png" mode="" v-if="checked==0"
					style="width: 34rpx;height: 34rpx;" @click.native="radioClick(0)"></image>
				<image src="../../../static/image/zfbrechargenew.png" mode="widthFix" v-if="checked==1"
					style="width: 34rpx;height: 34rpx;" @click.native="radioClick(1)"></image>
				<text @click="jumpClick">直播协议</text>
			</view>

			<view class="center6">
				<view @click="submitClick">
					提交
				</view>
			</view>
		</view>

		<view class="anchor_success" v-if="centerShow==2" catchtouchmove="true"
			style="margin-top: 450rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
			<image src="../../../static/image/success.png" mode="" style="width: 400rpx;height: 400rpx;"></image>
			<view style="font-size: 26rpx;color: #9EA2AF;">
				您的主播申请已通过，赶快去直播吧~
			</view>
		</view>
		<view class="anchor_fail" v-if="centerShow==3" catchtouchmove="true"
			style="margin-top: 450rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
			<image src="../../../static/image/fail.png" mode="" style="width: 400rpx;height: 400rpx;"></image>
			<view style="font-size: 26rpx;color: #9EA2AF;">
				您的主播申请没有通过，请重新申请
			</view>
			<view style="font-size: 24rpx;color:  #FC683E;margin: 20rpx 0 40rpx 0;">
				失败原因：身份证模糊
			</view>
			<view
				style="width: 360rpx;height: 80rpx;background: linear-gradient(90deg, #EE2144 0%, #E3121E 100%);border-radius: 46rpx 46rpx 46rpx 46rpx;font-size: 28rpx;color: #FFF;text-align: center;line-height: 80rpx;">
				重新认证
			</view>
		</view>
		<view class="anchor_ing" v-if="centerShow==1" catchtouchmove="true"
			style="margin-top: 450rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
			<image src="../../../static/image/ing.png" mode="" style="width: 400rpx;height: 400rpx;"></image>
			<view style="font-size: 26rpx;color: #9EA2AF;">
				您的主播申请已提交，请等待工作人员审核
			</view>
		</view>
		<view class="choose" v-if="show" @touchmove.stop.prevent="moveStop">
			<view class="choose_box">
				<view class="month" @click="chooseMonth('0-3个月',1)">0-3个月</view>
				<view class="month" @click="chooseMonth('3-6个月',2)">3-6个月</view>
				<view class="month" @click="chooseMonth('6-12个月',3)">6-12个月</view>
				<view class="month" @click="chooseMonth('12个月以上',4)">12个月以上</view>
				<view style="height: 105rpx;line-height: 105rpx;text-align: center;background: #F2F3F3;"
					@click="cancel">取消</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '@/api/index.js'
	import {
		filterPhoneNumber
	} from '@/api/phoneNum.js'
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				show2: false,
				checked: 0,
				value: '',
				// choose:0,
				show: false,
				centerShow: 0,
				eventList: [],
				placeholder: '1.主播经验几年\n2.在哪些平台上担任过主播\n3.曾得过哪些荣誉\n4.擅长直播哪些类球事(足球、篮球、电竞、娱乐、其他)\n5.不少于15字',
				imageStyles: {
					width: '100%',
					height: '382rpx',
				},
				formData: {
					User_Id: '',
					Live_TypeId: '',
					Live_Experience: '',
					Self_Name: '',
					Contact_QQ: '',
					Contact_WeChat: '',
					ID_Number: '',
					ID_FrontImg: '',
					ID_BehindImg: '',
					ID_HandImg: '',
					Self_Introduction: '',
					Self_Phone: '',
					Referrer: '',
					AuthorizeCode: '',
				},
				getCodeText: '获取验证码',
				countDown: 60,
				ID_FrontImg: '',
				ID_BehindImg: '',
				ID_HandImg: '',
				radio: 0,
				phonenum: null,


			}
		},
		methods: {
			chooseClick() {
				this.show = true
				// console.log(1111);
			},
			backMy() {
				uni.switchTab({
					url: '/pages/myView/index'
				})
			},
			cancel() {
				this.show = false
			},
			moveStop() {},
			chooseEvent(type, item) {
				console.log(type, item, 'type, itemtype, item');
				if (type == 0) {
					this.eventList.forEach(item => {
						item.choose = 0
					})
					this.$set(item, 'choose', 1)
				}
				if (type == 1) {
					this.$set(item, 'choose', 0)
				}
			},
			chooseMonth(type, num) {
				this.value = type
				this.formData.Live_Experience = num
				this.show = false
			},
			// 获取直播类型下拉列表
			listLoad() {
				ajaxTemplate('/AnchoerApply/GetLive_TypeList').then(res => {
					// console.log('下拉列表', res)
					this.eventList = res.Result
					this.eventList.forEach(item => {
						item.choose = 0
					})
				})
			},
			// 提交
			submitClick() {
				// console.log(this.eventList);
				this.eventList.forEach(item => {
					if (item.choose == 1) {
						this.formData.Live_TypeId = item.Live_Type_Id

					}
				})

				if (this.formData.Referrer === '') delete this.formData.Referrer
				if (this.formData.Contact_QQ === '') delete this.formData.Contact_QQ
				if (this.formData.Contact_WeChat === '') delete this.formData.Contact_WeChat
				if (this.formData.Self_Introduction === '') delete this.formData.Self_Introduction
				let sfnumber = /^(\w{15}|\w{18})$/;
				
				// if (sfnumber.test(this.formData.ID_Number) == false) {
				// 	uni.showToast({
				// 		title: '请输入正确身份证号',
				// 		icon: 'none', //如果要纯文本，不要icon，将值设为'none'
				// 		duration: 2000 //持续时间为 2秒
				// 	})
				// 	return
				// }
				this.formData.User_Id = this.$store.state.userInfo.User_Id
				this.formData.Self_Phone = this.$store.state.userInfo.User_Phone
				console.log(this.formData, 'this.formDatathis.formData');
				
				for (let key in this.formData) {
					if(key=='ID_Number'||this.formData.ID_Number){
						if (sfnumber.test(this.formData.ID_Number) == false) {
							uni.showToast({
								title: '请输入正确身份证号',
								icon: 'none', //如果要纯文本，不要icon，将值设为'none'
								duration: 2000 //持续时间为 2秒
							})
							return
						}
					}
					
					if (this.formData[key] == '' || this.checked == 0) {
						uni.showToast({
							title: '请填写完整信息',
							icon: 'none', //如果要纯文本，不要icon，将值设为'none'
							duration: 2000 //持续时间为 2秒
						})
						return
					}
				}
				ajaxTemplate('/AnchoerApply/SubmitAnchoerApply', this.formData).then(res => {
					if (res.Code == 200) {
						this.centerShow = 1
						uni.$emit("getUserInfo")
					} else {
						uni.showToast({
							title: res.Message,
							icon: 'none'
						})
					}
					// console.log('提交', res)
				})
			},
			// 获取验证码
			captchaClick() {
				console.log(1111, this.$store.state.userInfo.User_Id);
				if (this.getCodeText != '重新获取' && this.getCodeText != '获取验证码') {
					this.$refs.timeBox.disabled
					return
				}
				ajaxTemplate('/AnchoerApply/GainAnchoerApplyAuthorizeCode', {
					User_Id: this.$store.state.userInfo.User_Id
				}).then(res => {
					console.log('验证码', res)
					uni.showToast({
						title: '发送成功',
						icon: 'none'
					})
					for (let index = 1; index <= this.countDown; index++) {
						setTimeout(() => {
							const second = this.countDown - index
							this.getCodeText = second + 's'
							if (second === 0) {
								this.getCodeText = '重新获取'
							}
						}, 1000 * index)
					}

				})
			},

			// 身份证正面
			select1(e) {
				uni.getImageInfo({
				    src:e.tempFilePaths[0],
				    success    :(path) => {
				        console.log(path.path,'======')
				        
				        pathToBase64(path.path).then(base64 => {
				                console.log(base64)
								this.formData.ID_FrontImg=base64
				            })
				            .catch(error => {
				                console.error(error)
				            })
				    }
				})
				// 图片转base64方法


				// let reader = new FileReader()
				// reader.readAsDataURL(e.tempFiles[0].file)
				// reader.onload = () => {
				// 	// console.log('file 转 base64结果：' + reader.result)
				// 	this.formData.ID_FrontImg = reader.result
				// 	console.log(this.formData.ID_FrontImg,'this.formData.ID_FrontImgthis.formData.ID_FrontImg');
				// }
				// reader.onerror = function(error) {
				// 	console.log('Error: ', error)
				// }

			},
			// 身份证背面
			select2(e) {
				uni.getImageInfo({
				    src:e.tempFilePaths[0],
				    success    :(path) => {
				        console.log(path.path,'======')
				        
				        pathToBase64(path.path).then(base64 => {
				                console.log(base64)
								this.formData.ID_BehindImg=base64
				            })
				            .catch(error => {
				                console.error(error)
				            })
				    }
				})
			
			},
			// 手持身份证
			select3(e) {
				uni.getImageInfo({
				    src:e.tempFilePaths[0],
				    success    :(path) => {
				        console.log(path.path,'======')
				        
				        pathToBase64(path.path).then(base64 => {
				                console.log(base64)
								this.formData.ID_HandImg=base64
				            })
				            .catch(error => {
				                console.error(error)
				            })
				    }
				})
				
			},
			// 协议勾选
			radioClick(type) {
				//console.log(this.checked,'==================');
				if (type == 0) {
					this.checked = 1
				}
				if (type == 1) {
					this.checked = 0
				}
			},
			// 直播协议跳转
			jumpClick() {
				uni.navigateTo({
					url: '/pages/userXy/index'
				})
			}


		},
		onLoad() {
			this.listLoad()
			//手机*
			this.phonenum = filterPhoneNumber(this.$store.state.userInfo.User_Phone)
			// 获取用户信息
			this.centerShow = this.$store.state.userInfo.Anchoer_Attest_Status
			console.log(1111, this.centerShow);
		},
		onPageScroll(e) {
			console.log(e)
			if (e.scrollTop > 0) {
				this.show2 = true
			} else {
				this.show2 = false
			}
		},
	}
</script>

<style lang='scss' scoped>
	* {
		::v-deep * {
			box-sizing: border-box;

		}

	}


	.anchor_top {
		z-index: 2;
		position: fixed;
		top: 0;
		width: 750rpx;
		height: 176rpx;
		background: RGBA(226, 26, 38, 1) url('../../../static/image/zuqiubg.png') no-repeat bottom center/100% 100%;
		overflow: hidden;

		.top_title {
			display: flex;
			align-items: center;
			width: 100%;
			height: 40rpx;
			margin-top: 110rpx;
			padding: 0 20rpx;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-top: 10rpx;
			}

			view {
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
				margin-left: 35%;
			}
		}
	}

	.anchor_center {
		z-index: 1;
		width: 100%;
		/* height: 322rpx; */
		margin-top: 16rpx;
		padding: 0 20rpx;
		padding-bottom: 50rpx;


		.center1 {
			font-size: 28rpx;
			display: flex;
			height: 350rpx;
			justify-content: space-between;
			border-bottom: 1rpx solid #E7E9EE;

			.center1_left {
				width: 160rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

			}

			.center1_right {
				padding: 15rpx;
				width: calc(100% - 140rpx);
				height: 100%;
				display: flex;
				align-items: center;
				/* justify-content: center; */
				flex-wrap: wrap;


				view {
					margin: 5rpx 10rpx;
					display: flex;
					align-items: center;

					image {
						margin-right: 8rpx;
					}


				}

			}

		}

		.center2 {
			width: 100%;
			height: 106rpx;
			display: flex;
			align-items: center;
			/* justify-content: space-between; */
			border-bottom: 1rpx solid #E7E9EE;
			font-size: 28rpx;


			.center2_right {
				width: 40rpx;
				height: 40rpx;
			}

		}

		.center3 {
			font-size: 28rpx;
			padding: 25rpx 0;

			.center3_img {
				margin-top: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;

			}
		}

		.center4 {
			margin-top: 30rpx;
		}

		.center5 {
			margin-top: 20rpx;
			display: flex;
			font-size: 28rpx;
			color: #FC683E;

			text {
				margin-left: 15rpx;
			}





		}

		.center6 {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 50rpx;


			view {
				color: #FFFFFF;
				font-size: 32rpx;
				width: 670rpx;
				height: 88rpx;
				background: #FC683E;
				border-radius: 44rpx 44rpx 44rpx 44rpx;
				text-align: center;
				line-height: 88rpx;
			}
		}
	}

	::v-deep .file-picker__progress {
		display: none !important;
	}

	::v-deep .icon-add {
		display: none !important;
	}

	.choose {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		font-size: 32rpx;

		.choose_box {
			width: 100%;
			height: 584rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			position: fixed;
			bottom: 0;

			.month {
				text-align: center;
				width: 100%;
				height: 120rpx;
				line-height: 128rpx;
				border-bottom: 1rpx solid #E7E9EE;
			}
		}
	}

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
</style>
