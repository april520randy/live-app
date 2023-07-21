<template>
	<view class="box" style="background-color: white;">
		<var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0;background: #fff;" round
			:elevation='false'>
			<template #content>
				<view class='nav1'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle">在线客服</view>
				</view>
			</template>
		</var-app-bar>
	<!-- 	<var-app-bar :style="{opacity:show==true?1:0,zIndex:show==true?999:0 }"
			style="position:fixed;top:0;border-radius:0" round image="/static/image/beij.png" :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle">在线客服</view>
				</view>
			</template>
		</var-app-bar> -->
	<!-- 	<var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0" round image="/static/image/beij.png"
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="../../static/image/back.png" mode="widthFix">
					</image>
					<view class="navtitle">在线客服</view>
				</view>
			</template>
		</var-app-bar> -->
		<view style="height: 100%;background: ;" class="">
			
			<image @longpress="" style="width: 80%; height: 300px; margin-top: 35%;margin-left: 10%;" src="../../static/image/myView/zxkf.png" mode=""></image>
				<span style="display: block;font-size: 14px;color: #9EA2AF;text-align: center;">在线客服</span>
		</view>
	<!-- 	<view class="content">
			<view style="padding: 64rpx 58rpx;">
				<p style="font-size: 28rpx;color: #333333;">标题：</p>
				<view>
					<input type="text" placeholder="请输入标题" class="input1" v-model="title" />
				</view>
				<p style="font-size: 28rpx;color: #EE2144;margin-top: 10rpx;" v-if="titleing">标题不能为空</p>
				<p style="font-size: 28rpx;color: #333333;margin-top: 60rpx;">内容：</p>
				<view class="input2">
					<textarea type="text" minlength="20" placeholder="请输入大于20字内容"
						style="font-size: 26rpx;color: #C0C2CB;" v-model="content" />
				</view>
				<p style="font-size: 28rpx;color: #EE2144;margin-top: 10rpx;" v-if="contenting">内容不能为空</p>
			</view>
			<view class="btn" @click="submit()">
				提交
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '@/api/index.js'
	export default {
		data() {
			return {
				title: '',
				content: '',
				titleing: false,
				contenting: false,
				show: false,
			}
		},
		methods: {
		  // onLongPress(event) {
		  //  uni.saveImageToPhotosAlbum({
		  //      filePath: '../../static/image/myView/zxkf.png',
		  //      success: function () {
		  //          console.log('保存成功');
		  //      },
		  //      fail: function () {
		  //          console.log('保存失败');
		  //      }
		  //  });
		  //     }
		  back() {
		  	uni.navigateBack({
		  		delta: 1
		  	})
		  },
			
		},

	}
</script>

<style scoped lang="less">
	.nav1 {
		height: 88rpx;
		display: flex;
		align-items: center;
	
		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #333;
			margin-left: 252rpx;
		}
	
	}
	*{
		background: ;
	}
	.box {
		background-color: red;
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
		

		.header {
			height: 176rpx;
			background: #E73449 url(/static/image/headerball.png) no-repeat top center/100%;
			position: relative;
		}

		.content {
			// margin-top: 180rpx;
			height: 100vh;

			.input1 {
				font-size: 26rpx;
				color: #C0C2CB;
				background: #FFFFFF;
				border-radius: 4rpx;
				height: 56rpx;
				padding: 16rpx 12rpx;
				margin-top: 16rpx;
			}

			.input2 {
				background: #FFFFFF;
				border-radius: 4rpx;
				height: 356rpx;
				padding: 16rpx 12rpx;
				margin-top: 16rpx;
			}

			.btn {
				height: 88rpx;
				background: linear-gradient(180deg, #EE2144 0%, #E3121E 100%);
				border-radius: 16rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 88rpx;
				margin: 100rpx 72rpx;
			}
		}
	}
</style>
