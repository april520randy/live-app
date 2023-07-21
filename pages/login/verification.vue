<template>
	<view class="box" style="background-color: #f4f4f5">
		<var-app-bar style="background-color: #ffffff" round :elevation="false">
			<template #content>
				<view class="nav">
					<!--      <image
            @click="back"
            style="width: 40rpx; height: 40rpx; margin-left: 20rpx"
            src="@/static/image/back2.png"
            mode="widthFix"
          >
          </image> -->
				</view>
			</template>
		</var-app-bar>
		<view class="verification-content">
			<text class="h1">请输入验证码</text>
			<text class="tips">验证码已发送至：{{ phone }}</text>
			<codeInput ref="VcodeInput" @vcodeInput="vcodeInput" class="code-input" :isAutoComplete="true" />
			<view class="ft">
				<text class="lf">
					<text>{{ second }}s</text>
					后重新发送
				</text>
				<text class="rt">收不到验证码？</text>
			</view>
		</view>
	</view>
</template>

<script>
	import codeInput from "./vcode-input.vue";
	import mitt from '/utils/bus.ts'
	import {
		ref
	} from "vue";
	import store from "@/store/index.js"; //需要引入store
	import {
		login
	} from '/utils/iM.js'
	import {
		genTestUserSig
	} from '/pages/TUIKit/debug/index.js'
	export default {
		components: {
			codeInput,
		},
		setup() {
			const VcodeInput = ref(null);
			return {
				VcodeInput,
			};
		},
		name: "verification",
		data() {
			return {
				phone: "",
				second: 60,
				value: "",
				config: {
					userID: "", //User ID
					SDKAppID: 1400813717, // Your SDKAppID
					secretKey: "c74d2910cc6c7180b015d75d44e73ba0af399d5f3e3d159c6d09bd5903ff01a0"
				}
			};
		},
		onLoad() {
			this.setTimeout();
			const phone = uni.getStorageSync("login_phone");
			if (phone) {
				this.phone = phone;
			} else {
				uni.showToast({
					title: "异常",
					icon: "none",
				});
				uni.navigateTo({
					url: "/pages/login/index",
				});
			}
		},
		mounted() {
			this.VcodeInput.setFocus();
		},
		methods: {
			setTimeout() {
				if (this.second > 0) {
					setTimeout(() => {
						this.second = this.second - 1;
						this.setTimeout();
					}, 1000);
				}
			},
			vcodeInput(val) {
				
				let newdata = {
					User_Phone: this.phone,
					Register_Source: "App",
					AuthorizeCode: val,
					"Imei": uni.getStorageSync("deviceInfo").imei,
					"Oaid":uni.getStorageSync("deviceInfo").OAID,
					"GUID":uni.getStorageSync("deviceInfo").guid,
					"Android_id":uni.getStorageSync("deviceInfo").androidID,
					'UUID':uni.getStorageSync('UUID')
				}
				// newdata={...newdata,...uni.getStorageSync("deviceInfo")}
				console.log(newdata,'===============newdata')
				uni
					.$api("/User/LoginByAuthorizeCode", newdata)
					.then((s) => {
						if (s.Code !== 200) {
							uni.showToast({
								title: s.Message,
								icon: "none",
							});
						} else {
							uni.showToast({
								title: "登录成功",
								icon: "none",
							});
							console.log(s,'===========================s')
							mitt.emit('loginOut', false)
							store.commit("CHANGE_USER_ID", s.Result.User_Id);
							// uni.$emit("getUserInfo");
							store.dispatch("getUserInfo")

							//im
							// login(s.Result.User_Id,()=>{})
							this.config.userID = String(s.Result.User_Id)
							const userSig = genTestUserSig(this.config).userSig;
							// login(s.Result.User_Id,()=>{})
							uni.$TUIKit.login({
								userID: this.config.userID,
								userSig
							}).then((res) => {
								// sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
								// uni.showLoading({
								// 	title: "初始化...",
								// });
							});
							uni.reLaunch({
								url: "/pages/myView/index",
								animationType: "pop-in",
								animationDuration: 200,
							});
						}
					});
			},
			back() {
				uni.navigateBack({
					delta: 1,
				});
			},
		},
	};
</script>
<style scoped lang="scss">
	page {
		background: #ffffff;
	}

	.nav {
		// height: 88rpx;
		display: flex;
		align-items: center;

		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #000;
			margin-left: 252rpx;
		}
	}

	.verification-content {
		display: flex;
		flex-direction: column;
		padding: 0 34rpx;
		background-color: white;

		.h1 {
			font-size: 20px;
			font-weight: 500;
			color: #333333;
			margin-bottom: 16px;
		}

		.tips {
			font-size: 11px;
			font-weight: 400;
			color: #8e92a4;
		}

		.code-input {
			margin-top: 48rpx;
		}

		.ft {
			width: 100%;
			margin-top: 40rpx;
			background-color: white;
			display: flex;
			justify-content: space-between;
			color: #8e92a4;
			font-size: 22rpx;

			.lf {
				text {
					font-weight: 500;
					color: #f0222c;
				}
			}

			.rt {}
		}
	}
</style>