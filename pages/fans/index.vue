<template>
	<view>
		<var-app-bar color="#fff" :style="{opacity:show==true?1:0,zIndex:show==true?999:0 }"
			style="position:fixed;top:0;border-radius:0;background-color: #fff;" round  :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">粉丝</view>
				</view>
			</template>
		</var-app-bar>
		<var-app-bar color="#fff" :style="{opacity:show==false?1:0}" style="border-radius:0;background-color: #fff;" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">
					</image>
					<view class="navtitle">粉丝</view>
				</view>
			</template>
		</var-app-bar>

		<view>
			<view class="fans" v-for="(item,i) in fanslist">
				<view class="fansleft">
					<image style="width: 92rpx;height: 92rpx;margin-right:22rpx;border-radius: 50%;" :src="item.User_Logo" >
					</image>
					<view>
						<view style="font-size: 28rpx;color: #333333;margin-bottom:14rpx">{{item.User_Name}}</view>
						<view>{{item.Interest_Time}}</view>
					</view>
				</view>
				<view class="fansright">
					<view class="fansrightleft" @click="cleanfans(item)">
						<image style="width: 32rpx;height: 32rpx;margin-right:6rpx" src="../../static/image/shanchu.png"
							mode="widthFix">
						</image>
						<view>删除</view>
					</view>
					<view class="fansrightright">
						<image style="width: 32rpx;height: 32rpx;margin-right:6rpx" src="../../static/image/siliao.png"
							mode="widthFix">
						</image>
						<view>私聊</view>
					</view>
				</view>
			</view>

			<view class="kong" v-if="fanslist.length==0">
				<image style="width: 400rpx;height: 400rpx;" src="../../static/image/nofens.png" mode="widthFix">
				</image>
				<view>暂无粉丝</view>
			</view>
		</view>

		<!-- 清空弹框 -->
		<view v-if="clean" class="clean">
			<view class="cleancontent">
				<view style="color:#333333;font-size: 30rpx;margin:60rpx auto;">确定删除该用户？</view>
				<view class="foot">
					<view class="left" @click="clean=false">取消</view>
					<view class="right" @click="submit">确定</view>
				</view>
			</view>
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
				show: false,
				clean: false,
				Anchoer_Id: '',
				User_Id: '',
				fanslist: []
			}
		},
		onLoad(option) {
			this.Anchoer_Id = option.Anchoer_Id
			this.getfanslist()
		},
		methods: {
			getfanslist() {
				// ajaxTemplate("/Interest/GetSelf_FunsList",{Anchoer_Id:this.Anchoer_Id}).then((res)=>{
				ajaxTemplate("/Interest/GetSelf_FunsList", {
					Anchoer_Id: this.Anchoer_Id
				}).then((res) => {
					console.log(res)
					this.fanslist = res.Result
					this.fanslist.forEach((item)=>{
						item.Interest_Time=item.Interest_Time.substring(0, 19).replace("T", " ")

					})
				})
			},
			cleanfans(item) {

				this.User_Id = item.User_Id
				this.clean = true

			},
			submit() {
				//删除粉丝/Interest/Delete_Self_Funs
				ajaxTemplate("/Interest/Delete_Self_Funs", {
					User_Id: this.User_Id,
					Anchoer_Id: this.Anchoer_Id
				}).then((res) => {
					console.log(res)
					uni.showToast({
						icon: 'none',
						title: res.Message,
						mask: true
					})
					this.clean=false
					this.getfanslist()
					uni.$emit("getUserInfo")
				})
			},
			back() {
				uni.navigateBack(-1)
			}

		},
		onPageScroll(e) {
			console.log(e)
			if (e.scrollTop > 0) {
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
			color: #333333;
			margin-left: 284rpx;
		}

	}

	.fans {
		height: 94rpx;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 32rpx 0 20rpx;
		margin: 0 20rpx;
		border-bottom: 1px solid #E7E9EE;

		.fansleft {
			display: flex;
			align-items: center;
			font-size: 22rpx;
			font-weight: 400;
			color: #9094A5;
		}

		.fansright {
			display: flex;

			.fansrightleft {
				width: 128rpx;
				height: 52rpx;
				background: #FCECEC;
				border-radius: 30rpx;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				font-weight: 400;
				color: #ED5E2C;
				margin-right: 16rpx;
			}

			.fansrightright {
				width: 128rpx;
				height: 52rpx;
				background: #BFF8EA;
				border-radius: 30rpx;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				font-weight: 400;
				color: #00B778;
			}
		}

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
			height: 274rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin: auto;
			text-align: center;
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
				border: 2rpx solid #ED5E2C;
				color: #ED5E2C;
				margin: 0 20rpx 0 38rpx;
			}

			.right {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				background: #ED5E2C;
				border-radius: 38rpx;
				opacity: 1;
			}
		}
	}

	.kong {
		font-size: 26rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #9EA2AF;
		margin: 356rpx auto;
		text-align: center;
	}
</style>
