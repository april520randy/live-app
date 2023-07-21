<template>
	<view class="content">
		<var-app-bar style="border: none" round image="/static/image/bq/indexbg.png" :elevation="false">
			<template #content>
				<view class="var-app-bar-content">
					<view class="logo-content">
						<image src="../../static/image/login/icon1.png" class="logo">
						</image>
						<text>来欢呼吧，看精彩赛事</text>
					</view>
				</view>
			</template>
		</var-app-bar>
		<view class="part part-1">
			<text class="title">验证码登录</text>
			<view class="form">
				<view class="phone-txt">
					<text>中国 +86</text>
					<input class="uni-input" v-model="formData.User_Phone" placeholder="请输入手机号" />
				</view>
				<view class="tip">
					<image src="../../static/image/login/time.png"> </image>
					<text>未注册的手机号将自动创建账号</text>
				</view>
				<view class="user-tip">
					<image @click="isCheck = !isCheck" :src="checkIcon"> </image>
					<view class="text" style="display: flex; align-items: center; font-size: 13px">
						阅读并同意
						<text @click="agree">《用户服务协议》</text>和
						<text @click="conceal">《隐私政策》</text>
					</view>
				</view>
			</view>
			<view class="btns">
				<button type="warn" :disabled="disabled" @click="login">
					获取短信验证码
				</button>
			</view>
			<view class="pwd-login" @click="$emit('changeType', 2)"> 密码登录 </view>
		</view>
		<view class="bt">
			<text @click="casual">随便逛逛</text>
			<text @click="casual2">联系客服</text>
		</view>
	</view>
</template>

<script>
	import {
		phoneRegular
	} from "/utils/index";

	export default {
		data() {
			return {
				formData: {
					User_Phone: "",
					Register_Source:"App"
				},
				isCheck: false,
			};
		},
		created() {},

		computed: {
			disabled() {
				if (this.formData.User_Phone) {
					return false;
				}
				return true;
			},
			checkIcon() {
				if (this.isCheck) {
					return "../../static/image/login/check.png";
				}
				return "../../static/image/login/un-check.png";
			},
		},
		methods: {
			// login2() {
			// 	// login TUIKit
			// 	uni.$TUIKit.login({
			// 		userID: uni.$chat_userID,
			// 		userSig: uni.$chat_userSig
			// 	}).then((res) => {
			// 		// sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
			// 		// uni.showLoading({
			// 		// 	title: "初始化...",
			// 		// });
			// 	});
			// },
			casual2() {
				console.log(555)
				uni.navigateTo({
					//在线客服
					url: "../../pages/zxkf/index",
				});
			},
			casual() {
				uni.switchTab({
					url: "/pages/liveView/index",
				});
			},
			agree() {
				uni.navigateTo({
					url: "/pages/userXy/index",
				});
			},
			conceal() {
				uni.navigateTo({
					url: "/pages/ysXy/index",
				});
			},
			login() {
				if (!this.isCheck) {
					uni.showToast({
						title: "请先同意《用户协议》和《隐私协议》",
						icon: "none",
					});
					return;
				}
				if (!phoneRegular.test(this.formData.User_Phone)) {
					uni.showToast({
						title: "手机格式不正确",
						icon: "none",
					});
					return;
				}

				

				
					uni.$api("/User/GainLoginAuthorizeCode", {
						User_Phone: this.formData.User_Phone,
					})
					.then((s) => {
						if (s.Code !== 200) {
							uni.showToast({
								title: s.Message,
								icon: "none",
							});
						} else {
							uni.showToast({
								title: "短信验证码发送成功",
								icon: "none",
							});
							console.log(this.formData.User_Phone)
							uni.setStorageSync("login_phone",this.formData.User_Phone);
							uni.navigateTo({
								url: "/pages/login/verification",
							});
							
							// this.login2()
							
						}
					});
			},
		},
	};
</script>
<style lang="scss" scoped>
	* {
		box-sizing: border-box;

		::v-deep * {
			box-sizing: border-box;

			.var-input__wrap {
				/* padding-top: 0; */
			}
		}
	}

	page {
		background-color: white;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.var-app-bar {
			background: rgba(255, 255, 255, 0);
			height: 240px;

			.var-app-bar-content {
				padding: 0 18px;
				z-index: 999;

				.logo-content {
					text-align: center;

					.logo {
						display: block;
						width: 70px;
						height: 70px;
						margin: auto;
					}

					text {
						margin-top: 20px;
						display: block;
						font-size: 18px;
						color: #ffffff;
					}
				}
			}
		}

		.part {
			z-index: 1;
			align-self: stretch;
			margin: 0 16px;
			box-shadow: 0px 0px 16px 1px rgb(213, 214, 216);
			background-color: white;
			border-radius: 6px 6px 6px 6px;
			margin-bottom: 10px;
		}

		.part-1 {
			padding: 30px 28px;
			display: flex;
			flex-direction: column;
			margin-top: -32px;

			.title {
				font-size: 20px;
				font-weight: 500;
				color: #333333;
				margin-bottom: 40px;
			}

			.form {
				width: 100%;
				margin-bottom: 33px;

				display: block;

				.phone-txt {
					padding-bottom: 11px;
					border-bottom: 1px solid #f0f0f0;
					display: flex;
					align-items: center;

					text {
						flex-shrink: 0;
						font-size: 14px;
						color: #666666;
						padding-right: 16px;
						border-right: 1px solid #d5d5d5;
					}

					input {
						padding-left: 12px;
					}
				}

				.tip {
					margin-top: 24px;
					display: flex;
					align-items: center;
					margin-bottom: 35px;

					image {
						width: 16px;
						height: 16px;
						margin-right: 8px;
					}
				}

				.user-tip {
					margin-right: -12px;
					display: flex;
					align-items: center;

					image {
						width: 16px;
						height: 16px;
					}

					.text {
						margin-left: 8px;
						color: #c0c2cb;

						text {
							color: #ED5F2D;
						}
					}
				}
			}

			.btns {
				margin-bottom: 29px;

				button {
					border: 0;
					border-radius: 24px 24px 24px 24px;
					/* 	background: #E1E2E3;
					color: white; */
					width: 95%;
					height: 48px;
					background: #ED5F2D;
					border-radius: 8px 8px 8px 8px;
					opacity: 1;
				}
			}

			.pwd-login {
				text-align: center;
				font-size: 14px;
				color: #8e92a4;
				margin-bottom: 5px;
			}
		}

		.bt {
			position: absolute;
			bottom: 50px;
			font-size: 11px;
			color: #c0c2cb;

			text {
				&:last-child {
					margin-left: 32px;
				}
			}
		}
	}
</style>
