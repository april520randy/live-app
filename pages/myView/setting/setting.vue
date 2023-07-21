<template>
	<view style="background-color: #F4F4F5;height:100vh">
		<var-app-bar style="border-radius:0;background: #fff;" round  :elevation='false'>
			<template #content>
				<view class='nav1'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="/static/image/bq/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle1">设置</view>
				</view>
			</template>
		</var-app-bar>

		<view class="profile-cells">
			<view class="cell">
				<var-cell title="悬浮窗播放">
					<template #extra>
						<var-switch v-model="value" color="#FC683E" close-color="#FFFFFF" />
					</template>
				</var-cell>
				<var-cell title="消息通知" @click="jump('/pages/myView/setting/notice')">
					<template #extra>
						<var-icon name="chevron-right" />
					</template>
				</var-cell>
			</view>
			<view class="cell">
				<var-cell title="关于我们" @click="jump2('/pages/myView/setting/edition')">
					<template #extra>
						<var-icon name="chevron-right" />
					</template>
				</var-cell>

			</view>
			<view class="cell">
				<!-- <var-cell title="检测更新" @click="gxFn">
					
					<template #extra>
						{{ version }}
					
						<var-icon name="chevron-right" />
					</template>
				</var-cell> -->
				
				<div  @click="gxFn" class="var-cell var-cell--cursor"><!--v-if-->
					<div class="var-cell__content">
						<div class="var-cell__title">检测更新</div><!--v-if-->
					</div>
					<div class="var-cell__extra"> {{ version }}<i
							 class="var-icon var-icon--set var-icon-chevron-right"
							style="transition-duration: 0ms;"></i></div>
				</div>
				
				
				<var-cell title="清理缓存" @click="clearnFn">
					<template #extra>
						{{cache}}MB
						<var-icon name="chevron-right" />
					</template>
				</var-cell>
			</view>
		</view>
		<view style="width: 90%;margin-left: 5%;">
			<var-button v-if="isLogin" style=" border-radius: 22px 22px 22px 22px;margin-bottom: 5%;margin-top: 4%;" color='#FC683E' block type="primary"
				@click="loginoutVis = true ">退出登录</var-button>
			<var-button v-if="isLogin" block color='#fff' text-color='#FC683E' outline type="primary"
				style=" border-radius: 22px 22px 22px 22px;margin-bottom: 5%;margin-top: 4%;" @click="logOffVis = true">注销账号</var-button>

			<var-button v-if="!isLogin" style="margin-bottom: 5%;margin-top: 4%;" color='#FC683E' block type="primary"
				@click="loginin">登录</var-button>
		</view>


		<var-dialog v-model:show="loginoutVis" dialog-class="loginout" :confirm-button="false" :cancel-button="false">
			<template #title>
				确定退出登录？
			</template>

			<view class="btns">
				<var-button color='white' text-color='#FC683E' type="primary"
					@click="loginoutVis = false">取消</var-button>
				<var-button color='#FC683E' text-color='white' type="primary" @click="loginoutHandle">确定</var-button>


			</view>

		</var-dialog>
		<var-dialog v-model:show="loginoutVi" dialog-class="loginout" :confirm-button="false" :cancel-button="false">
			<template #title>
				您已退出无需重复退出。
			</template>

			<view class="btns">
				<var-button color='white' text-color='#FC683E' type="primary"
					@click="loginoutVi = false">取消</var-button>
				<var-button color='#FC683E' text-color='white' type="primary"
					@click="loginoutVi = false">确定</var-button>


			</view>

		</var-dialog>
		<var-dialog v-model:show="logOffVis" dialog-class="loginout" :confirm-button="false" :cancel-button="false">
			<template #title>
				温馨提示
			</template>

			<var-cell>注销后，此账户将无法登录使用</var-cell>
			<view class="btns">
				<var-button color='white' text-color='#FC683E' type="primary" @click="logOffVis = false">取消</var-button>
				<var-button color='#FC683E' text-color='white' type="primary" @click="logOffVis = false">确定</var-button>


			</view>

		</var-dialog>

		<var-dialog v-model:show="updateVersionVis" dialog-class="upate-version" :confirm-button="false"
			:cancel-button="false">

			<view class="update">
				<text>发现新版本V1.01</text>
				<view>
					<text>
						直播新版本来袭，新增多种福利活动！
						快来下载体验吧！
					</text>
					<text>请认准官网地址：xxxxxx.com</text>
				</view>
				<view class="btns">
					<var-button color='white' text-color='#FC683E' type="primary"
						@click="updateVersionVis = false">去官网升级</var-button>
					<var-button color='#FC683E' text-color='white' type="primary"
						@click="updateVersionVis = false">立即更新</var-button>


				</view>

			</view>


		</var-dialog>


		<!-- 是否去更新 -->
		<view v-if="GXshow" class="clean">
			<view class="cleancontent">
				<view style="color:#333333;font-size: 30rpx;margin:60rpx 20rpx 0;">当前版本号：{{version}}</view>
				<view style="color:#333333;font-size: 30rpx;margin:20rpx;">最新版本号：{{versionInfo.NewVersion}}</view>
				<view class="foot">
					<view class="left" @click="GXshow=false">取消</view>
					<view class="right" @click="toGX">去更新</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import store from "@/store/index.js";
	import mitt  from '/utils/bus.ts'
	import {
		logout
	} from '/utils/iM.js'
	import {
		ajaxTemplate
	} from '/api/index.js'
	export default {
		data() {
			return {
				versionInfo: {},
				GXshow: false,
				loginoutVi: false,
				loginoutVis: false,
				logOffVis: false,
				updateVersionVis: false,
				value: true,
				cache: '',
				version: ''
			}
		},
		onLoad() {
			this.gethuancun()

			plus.runtime.getProperty(plus.runtime.appid, (inf) => {
				console.log(JSON.stringify(inf.version));
				this.version = inf.version
			});
			// this.getversion()
		},

		computed: {

			userInfo() {
				return store.state.userInfo;
			},
			isLogin() {
				return store.getters.is_login;
			},
		},
		methods: {
			toGX() {
				//
				plus.runtime.openURL(this.versionInfo.Jump_Url)
				this.GXshow = false
				// plus.runtime.openWeb("https://jilin.12388.gov.cn/songyuanshi/fuyushi/m/")
			},
			getversion() {
				ajaxTemplate("/User/GetVersion_Replace", {
					Code: uni.$Code,
					Version: this.version
				}).then((res) => {
					console.log(res, 999999)
					this.versionInfo = res.Result
					if (res.Result.IsReplace == 1) {
						this.GXshow = true
					}
				})
			},
			clearnFn() {
				uni.showToast({
					title: "缓存清理成功",
					mask: true,
					icon: "none"
				})
			},
			gxFn() {

				this.getversion()
			},
			//获取缓存
			gethuancun() {
				let res = uni.getStorageInfoSync()
				let sizeInKB = res.currentSize / 1024 // 将字节转换为KB
				let sizeInMB = sizeInKB / 1024 // 将KB转换为MB
				console.log(sizeInMB + 'MB') // 缓存大小的单位为MB
				this.cache = parseFloat(sizeInMB).toFixed(1) //保留小数点一位 不足1M则为0M
				if (this.cache < 1) {
					this.cache = 0
				}
			},
			loginin() {
				uni.navigateTo({
					url: "/pages/login/index",
				});
			},
			jump(url) {
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
					url
				});
			},
			jump2(url) {

				uni.navigateTo({
					url
				});
			},
			back() {
				uni.navigateBack(-1)
			},
			loginoutHandle() {
				if (!this.isLogin) {
					this.loginoutVi = true
					this.loginoutVis = false
				} else {
					
					logout(()=>{
						mitt.emit('loginOut',true)
					})
					
					this.loginoutVis = false
					store.commit('CHANGE_USER_ID', '')
					uni.removeStorage({
						key: 'user_Id'
					});
					store.commit('CHANGE_USER_INFO', {})
					// uni.clearStorageSync()
					uni.setStorageSync("currentIndex", 0)
					uni.switchTab({
						url: '/pages/myView/index',
						animationType: 'pop-in',
						animationDuration: 200,

					});


				}

			},
		},
		onPageScroll(e) {

		},
	}
</script>

<style lang='scss' scoped>
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
			height: 274rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin: auto;
			// text-align: center;
		}

		.foot {
			margin: auto;
			display: flex;


			font-size: 28rpx;

			.left {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				border-radius: 38rpx;
				opacity: 1;
				border: 2rpx solid #FC683E;
				color: #FC683E;
				margin: 0 20rpx 0 38rpx;
			}

			.right {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				background: linear-gradient(90deg, #FC683E 0%, #FC683E 100%);
				border-radius: 38rpx;
				opacity: 1;
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
			color: #FFFFFF;
			margin-left: 252rpx;
		}

	}

	.profile-cells {

		margin-top: 9px;

		.cell {
			padding: 0 17px;
			background-color: white;
			margin-bottom: 9px;

			::v-deep .var-cell {


				padding-top: 24rpx;
				padding-bottom: 24rpx;

				.var-cell__extra {

					// flex-shrink: 0;
					display: flex;

					.var-icon {
						opacity: .5;
					}

					&>text {
						margin-right: 18rpx;
						width: 200rpx;
						flex-shrink: 0;
						text-align: right;
					}
				}
			}
		}
	}

	.popup-example-block {
		height: 600rpx;
		display: flex;
		flex-direction: column;

		.title {
			flex-shrink: 0;
			height: 104rpx;
			width: 100%;
			line-height: 104rpx;
			text-align: center;
			border-bottom: 1rpx solid #ddd;
		}

		.list {
			padding-top: 26rpx;
			height: 0;
			flex: 1;
			overflow: auto;
			display: flex;
			flex-wrap: wrap;

			// margin-right: -48px;
			.item {
				width: 25%;
				text-align: center;
				margin-bottom: 26px;
				// margin-right: 48px;
			}

			.var-image {

				margin: auto;

			}
		}
	}


	::v-deep .loginout {
		background-color: white;
		border-radius: 12px 12px 12px 12px;

		.var-dialog__title {
			text-align: center;

			font-size: 15px;
			font-weight: 600;

		}

		.var-dialog__message {
			.var-cell__content {
				color: #8E92A4;
				font-size: 14px;
			}

			.btns {
				margin-top: 30px;
				display: flex;
				justify-content: space-between;

				.var-button {
					width: 212rpx;
					border-radius: 19px 19px 19px 19px;
					border: 1px solid #FC683E;

				}
			}
		}
	}

	::v-deep .var-popup__content {
		box-shadow: unset;
	}

	::v-deep .upate-version {
		background: url(/static/image/myView/update.png);
		background-size: 100% 100%;
		background-position: center;


		.var-dialog__title {
			display: none;
		}

		.update {
			margin-top: 171px;

			.btns {
				margin-top: 30px;
				display: flex;
				justify-content: space-between;

				.var-button {
					height: 44px;
					width: 232rpx;
					border-radius: 22px 22px 22px 22px;
					border: 2px solid #FC683E;

				}
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