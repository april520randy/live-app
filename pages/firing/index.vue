<template>
	<view style="width:100%;height:100vh">
		<image style=" height:100%;width: 100%;" src="/static/qdy.png" mode=""></image>
	</view>

	
</template>

<script>
	import TabbarConfig from '/utils/tabbar.js'
	import {
		ajaxTemplate
	} from '../../api/index.js'
	export default {
		data() {
			return {
				tabbar: TabbarConfig,
				isCheck: false,
				clean: false,
				// Privacy_State: 0, //首次隐私页面开关

			}
		},
		computed: {

			checkIcon() {
				if (this.isCheck) {
					return "/static/image/login/check.png";
				}
				return "/static/image/login/un-check.png";
			},
		},
		onLoad() {
			this.getcodeInfo()
			console.log(uni.getStorageSync("successXY"))

		},
		methods: {
			getcodeInfo() {
				
				ajaxTemplate("/User/Get_CodeInfo", {
					Code: uni.$Code
				}).then((res) => {
					console.log(res)

					if (uni.getStorageSync("successXY")) {
						this.Privacy_State = 0
						uni.switchTab({
							url: '/pages/liveView/index'
						})
					} else {
						//首次隐私页面开关
						if(res.Result.Privacy_State==1){
							uni.navigateTo({
								url:"/pages/firing2/index"
							})
						}else{
							uni.switchTab({
								url: '/pages/liveView/index'
							})
						}
					}


					//资讯
					uni.setStorageSync("New_State", res.Result.New_State)
					//聊天
					uni.setStorageSync("Chat_State", res.Result.Chat_State)

					if (res.Result.New_State == 0 && res.Result.Chat_State == 0) {
						this.tabbar.list.splice(1, 1)
						this.tabbar.list.splice(2, 1)
					}
					if (res.Result.New_State == 1 && res.Result.Chat_State == 0) {
						this.tabbar.list.splice(3, 1)
					}
					if (res.Result.New_State == 0 && res.Result.Chat_State == 1) {
						this.tabbar.list.splice(1, 1)
					}

					console.log(this.tabbar.list)
				})
			},
			TyFn1() {
				if (!this.isCheck) {
					uni.showToast({
						title: "请先同意《用户协议》和《隐私协议》",
						mask: true,
						icon: "none"
					})
					return
				}
				uni.switchTab({
					url: '/pages/liveView/index'
				})

				uni.setStorageSync("successXY", true)
			},
			TyFn() {
				uni.switchTab({
					url: '/pages/liveView/index'
				})
				uni.setStorageSync("successXY", true)
			},
			BtyFn() {
				this.clean = true
			},
			RBtyFn() {
				//退出
				plus.runtime.quit()
				uni.setStorageSync("successXY", false)
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
			gofn() {
				setTimeout(() => {
					// uni.switchTab({
					// 	url: '/pages/liveView/index'
					// })
				}, 3000);

			}
		}
	}
</script>

<style scoped lang="less">
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
			width: 604rpx;
			height: 754rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin: auto;
			text-align: center;
		}


	}

	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-top: 50rpx;
		font-size: 36rpx;
	}

	.zu {
		position: relative;
		margin-bottom: 42rpx
	}

	.user-tip {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 200rpx;

		image {
			width: 16px;
			height: 16px;
		}

		.text {
			margin-left: 8px;
			color: #c0c2cb;

			text {
				color: #f0222c;
			}
		}
	}
</style>