<template>


	<view style="padding:88rpx 60rpx">
		<view>
			<image style=" height:108rpx;width: 108rpx;margin-right:32rpx" src="/static/logo7.png" mode=""></image>
			<image style=" width:144rpx;height: 78rpx;" src="/static/title.png" mode=""></image>

		</view>

		<view style="margin-bottom:120rpx;margin-top:34rpx;font-size: 13px;line-height: 22px;">
			为了给您提供更 优质的服务，欢呼吧将会申请
			使用您的个人信息，<text>请在使用前查看并同意</text><text style="color: #f0222c" @click="agree">《服务协议》</text>与 <text
				style="color:#f0222c" @click="conceal">《隐私政策》</text>。
			在您使用本软件前，请您认真阅读并了解服务隐私政
			策，以了解我们的服务内容和我们的手机和使用您相
			关个人信息时的处理规则。我们将严格按照协议内容
			为您提供服务，保护您的个人信息。
		</view>

		<!-- <image style=" width:598rpx;height: 278rpx;margin-bottom:120rpx;margin-top:34rpx" src="/static/center.png" mode=""></image> -->



		<view class="zu">
			<image style=" width:48rpx;height: 49rpx;position: absolute;left:40rpx;z-index:999;top:40rpx"
				src="/static/zu11.png" mode=""></image>
			<image style=" width:604rpx;height: 124rpx;" src="/static/zu1.png" mode=""></image>

		</view>
		<view class="zu">
			<image style=" width:48rpx;height: 49rpx;position: absolute;left:40rpx;z-index:999;top:40rpx"
				src="/static/zu22.png" mode=""></image>
			<image style=" width:604rpx;height: 146rpx;" src="/static/zu2.png" mode=""></image>

		</view>
		<view class="zu">
			<image style=" width:48rpx;height: 49rpx;position: absolute;left:40rpx;z-index:999;top:40rpx"
				src="/static/zu33.png" mode=""></image>
			<image style=" width:604rpx;height: 124rpx;" src="/static/zu3.png" mode=""></image>

		</view>


		<view class="user-tip">
			<image @click="isCheck = !isCheck" :src="checkIcon"> </image>
			<view class="text" style="display: flex; align-items: center; font-size: 13px">
				阅读并同意
				<text @click="agree">《用户服务协议》</text>和
				<text @click="conceal">《隐私政策》</text>
			</view>
		</view>

		<view class="bottom">
			<view style="position: relative;" @click="BtyFn">
				<image src="/static/bty1.png" mode=""
					style="width:144rpx;height:36rpx;position: absolute;color:#FF94A3;left:48rpx;z-index:999;top:20rpx" />

				<image style=" width:238rpx;height:76rpx;" src="/static/bty.png" mode=""></image>
			</view>
			<view style="position: relative;" @click="TyFn1">
				<image src="/static/ty1.png"
					style="width:72rpx;height:36rpx;position: absolute;color:#fff;left:84rpx;z-index:999;top:20rpx" />
				<image style=" width:238rpx;height: 76rpx;" src="/static/ty.png" mode=""></image>
			</view>
		</view>



	</view>
	<!-- 清空弹框 -->
	<view v-if="clean" class="clean">
		<view class="cleancontent">
			<image style=" width:604rpx;height: 326rpx;" src="/static/zuimg.png" mode=""></image>
			<image style=" width:152rpx;height: 38rpx;" src="/static/wxts.png" mode=""></image>
			<image style=" width:456rpx;height: 74rpx;margin:28rpx 0 44rpx" src="/static/tscontent.png" mode=""></image>

			<view style="position: relative;" @click="TyFn">
				<image style=" width:456rpx;height: 90rpx;" src="/static/tyjr.png" mode=""></image>
				<image style=" width:180rpx;height: 36rpx;position: absolute;top:28rpx;left:210rpx" src="/static/jr.png"
					mode=""></image>
			</view>

			<image @click="RBtyFn" style=" width:144rpx;height: 36rpx;margin-top:38rpx" src="/static/rrjj.png" mode="">
			</image>
		</view>
	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '../../api/index.js'
	export default {
		data() {
			return {
				isCheck: false,
				clean: false,


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
		onLoad() {},
		onBackPress(options) {
			// 触发返回就会调用此方法，这里实现的是禁用物理返回，顶部导航栏的自定义返回 uni.navigateBack 仍可使用
			if (options.from == 'backbutton') {
				return true;
			} else if (options.from == 'navigateBack') {
				return false;
			}
		},
		methods: {

			TyFn1() {
				if (!this.isCheck) {
					uni.showToast({
						title: "请先同意《用户协议》和《隐私协议》",
						mask: true,
						icon: "none"
					})
					return
				}
				uni.removeStorageSync("推荐")
				uni.removeStorageSync("焦点即时")
				uni.removeStorageSync("焦点即时total")
				uni.setStorageSync("successXY", true)
				uni.switchTab({
					url: '/pages/liveView/index',

				})
				// uni.removeStorageSync("推荐")
				// uni.setStorageSync("successXY", true)
			},
			TyFn() {
				uni.removeStorageSync("推荐")
				uni.removeStorageSync("焦点即时")
				uni.removeStorageSync("焦点即时total")
				uni.setStorageSync("successXY", true)
				uni.switchTab({
					url: '/pages/liveView/index',

				})

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