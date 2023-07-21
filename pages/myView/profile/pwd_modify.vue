<template>
	<view style="background-color: #F8F8F8;height:100vh">
	<!-- 	<var-app-bar style="border-radius:0" round image="/static/image/beij4.png" :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="/static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle">密码修改</view>
				</view>
			</template>
		</var-app-bar> -->
		
		<var-app-bar style="border-radius:0;background: #ffffff;" round  :elevation='false'>
			<template #content>
				<view class='nav1'>	
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="/static/image/bq/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle1">密码修改</view>
				</view>
			</template>
		</var-app-bar>

		<view class="profile-cells">

			<view class="tips">短信验证码将发送到手机号码{{phoneNumber }}，请注意查收</view>
			<view class="code">
				<input class="uni-input" maxlength="6" type="number" v-model="formData.AuthorizeCode"
					placeholder="请输入验证码" />
				<view class="btn" @click="getCode" :class="{ disable: waiting > 0 }"> {{ waiting > 0 ? (waiting +
                    '秒后重新获取')
                    :
                    '获取验证码' }}</view>
			</view>
			<view class="code" style="padding-top:52rpx">
				<input class="uni-input" @input="handleInput"  v-model="formData.pwd" placeholder="请输入新密码(6-12个字母和数字)" />
				
			</view>

			<view class="btns">
				<button type="warn" @click="submit">确认修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	import store from "@/store/index.js";
	import {
		Snackbar
	} from '@varlet/ui'
	import {
		ajaxTemplate
	} from '@/api/index.js'
	import {
		pwdVerify
	} from '@/api/phoneNum.js'
	export default {
		data() {
			return {
				formData: {
					AuthorizeCode: '',
					pwd: ''
				},
				waiting: 0,
				timer: null,
				phoneNumber: '',

			}
		},
		onLoad() {
			this.phoneNumber = store.state.userInfo.User_Phone
			console.log(this.phoneNumber);
			this.hiddenPhoneNumber()
		},

		computed: {
			userInfo() {
				return store.state.userInfo;
			},

		},
		methods: {
			handleInput() {
				const reg = /[\u4E00-\u9FA5|\\！|\\，|\\。|\\（|\\）|\\《|\\》|\\“|\\”|\\？|\\：|\\；|\\【|\\】]/
				if (reg.test(this.formData.pwd)) {
					console.log('对啦');
					this.$nextTick(() => {
						this.formData.pwd = '';
			
					})

				}
			},
			hiddenPhoneNumber() {
				if (this.phoneNumber.length !== 11) {
					return this.phoneNumber;
				}
				const prefix = this.phoneNumber.substring(0, 3);
				const suffix = this.phoneNumber.substring(8);
				const middle = '*****';
				this.phoneNumber = prefix + middle + suffix;

			},
			submit() {
				if (!this.formData.AuthorizeCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return
				}
				if (!this.formData.pwd) {
					uni.showToast({
						title: '请输入新密码',
						icon: 'none'
					});
					return
				}
				if (!pwdVerify(this.formData.pwd)) {
					uni.showToast({
						title: '密码需要6-12个字母和数字',
						icon: 'none'
					});
					return
				}

				ajaxTemplate('/User/UpdatePassword', {
					"User_Id": this.userInfo.User_Id,
					"User_NewPassword": this.formData.pwd,
					"AuthorizeCode": this.formData.AuthorizeCode,
				}).then(s => {
					if (s.Code !== 200) {
						uni.showToast({
							title: s.Message,
							icon: 'none'
						})
					} else {
						console.log(123132);
						// Snackbar.success("密码修改成功")
						store.commit('CHANGE_USER_ID', '')
						uni.removeStorage({
							key: 'user_Id'
						});
						store.commit('CHANGE_USER_INFO', {})
						console.log(12312313);
						uni.switchTab({
							url: '/pages/myView/index',
							animationType: 'pop-in',
							animationDuration: 200
						});
					}


				})
			},
			back() {
				uni.navigateBack(-1)
			},
			getCode() {
				if (this.waiting > 0) {
					return
				}

				ajaxTemplate('/User/GainUpdatePasswordAuthorizeCode', {
					"User_Id": this.userInfo.User_Id
				}).then(s => {
					console.log(s.Code, 'aaaaaaaa');
					if (s.Code != 200) {
						uni.showToast({
							title: s.Message,
							icon: 'none',
						})
					}
					if (s.Code == 200) {
						uni.showToast({
							title: '验证码发送成功，请查收短信',
							icon: 'none',
						})

						this.waiting = 59
						this.timer = setInterval(() => {
							if (this.waiting <= 0) {
								clearInterval(this.timer)
							} else {
								this.waiting = this.waiting - 1
							}
						}, 1000)
					}

				})
			}

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
		padding: 0 29px;
		margin-top: 37px;

		.tips {
			font-size: 13px;
			margin-bottom: 31px;
		}

		.code {
			display: flex;
			align-items: center;
			padding-bottom: 11px;
			border-bottom: 1px solid #F0F0F0;

			.uni-input {
				flex: 1;
			}

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 8rpx;
				height: 31px;
				line-height: 31px;
				border-radius: 10px 10px 10px 10px;
				opacity: 1;
				border: 2px solid #FC683E  ;
				font-size: 24rpx;
				color: #FC683E  ;

				&.disable {
					color: #fff;
					background-color: #fab6b6;
					border-color: #fab6b6;
					cursor: not-allowed;
				}
			}
		}

		.btns {
			margin-top: 48px;
			
			button {
				border: 0;
				background: #FC683E;
				border-radius: 22px 22px 22px 22px;
				/* 	background: #E1E2E3;
					color: white; */

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
