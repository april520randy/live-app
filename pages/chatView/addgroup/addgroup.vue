<template>
	<view class="box">
		<view class="header">
			<view style="display: flex;align-items: center; justify-content: center;padding-top: 116rpx;">
				<image @click="back()" src="/static/image//newback.png"
					style="width: 40rpx;height: 40rpx;position: absolute;left: 20rpx;" />
				<p style="font-size: 32rpx;color: #333333;">创建群聊</p>
			</view>
		</view>
		<view class="content">
			<view
				style="padding: 40rpx 302rpx;background-color: #FFFFFF;display: flex;flex-direction: column;align-items: center;">
				<image v-if="!imgurl" src="/static/image/addgroupimg.png"
					style="width: 134rpx;height: 126rpx;margin-left: 10rpx;" @click="openChooseImg" />
				<!-- <image v-else :src="imgurl.replace(/[\r\n]/g,'')"
					style="width: 134rpx;height: 126rpx;margin-left: 10rpx;"></image> -->
				<image v-else :src="imgurl"
					style="width: 134rpx;height: 126rpx;margin-left: 10rpx;"></image>
				<p style="font-size: 28rpx;color: #9EA2AF;" v-if="upload">上传群头像</p>

				<!-- <uni-file-picker v-model="imgurl" file-mediatype="image" mode="grid" file-extname="png,jpg" :limit="1"
					:auto-upload='false' @select="openChooseImg" :image-styles="imageStyles" /> -->
				<p style="font-size: 28rpx;color: #FC683E;margin-top: 10rpx; white-space: nowrap;" v-if="imging">
					群头像不能为空</p>
			</view>
			<view
				style="display: flex;flex-direction: column; padding: 30rpx 30rpx 10px 30rpx;background-color: #FFFFFF;margin-top: 20rpx;">
				<view style="display: flex;align-items:center;">
					<p style="font-size: 28rpx;color: #333333;">群名称</p>
					<input v-model="groupname" type="text" placeholder="给你的群取个名字吧"
						style="font-size: 28rpx;color: #C0C2CB;margin-left: 40rpx;">
				</view>
				<p style="font-size: 28rpx;color: #FC683E;margin-top: 10rpx;margin-left: 125rpx;" v-if="titleing">
					群名称不能为空</p>
			</view>
			<view style="background-color: #FFFFFF;">
				<view
					style="border-bottom:1rpx solid #E7E9EE;padding: 30rpx 30rpx 0 30rpx;background-color: #FFFFFF;margin-top: 20rpx;display: flex;justify-content: space-between;">
					<view>
						<p style="font-size: 28rpx;color: #333333;">群简介</p>
						<textarea v-model="introduction" type="text" maxlength="200" @input="getlenth"
							placeholder="请简单介绍一下你的群吧~~" style="font-size: 28rpx;color: #C0C2CB;margin-top: 36rpx"
							bindinput="inputs" />
					</view>
					<p style="font-size: 24rpx;color: #C0C2CB;margin-top: 258rpx;">{{length}}/200</p>
				</view>
				<p style="font-size: 28rpx;color: #FC683E;margin-top: 10rpx;margin-left: 30rpx;" v-if="contenting">
					群简介不能为空</p>
			</view>
		</view>
		<view class="foot" style="position:fixed;bottom:20rpx;">
			<view style="height: 88rpx;width: 100vw;
			background: #FC683E;
			border-radius: 44rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;">
				<p @click="preserve()">保存</p>
			</view>
		</view>

	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from 'image-tools'
	import{sendText} from "@/utils/iM.js"
	import {
		ajaxTemplate
	} from '@/api/index.js'
	export default {
		data() {
			return {
				groupname: '',
				introduction: '',
				imgurl: '',
				imgurl2: '',
				titleing: false,
				contenting: false,
				imging: false,
				upload: true,
				length: 0,
				imageStyles: {
					width: " 136rpx",
					height: '126rpx',


				},
			}
		},
		methods: {
			getlenth(e) {
				this.length = e.detail.cursor
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			preserve() {
				if (this.imgurl !== '') {
					this.upload = false
					this.imging = false
				}
				if (this.groupname !== '') {
					this.titleing = false
				}
				if (this.introduction !== '') {
					this.contenting = false
				}
				if (this.imgurl == '') {
					this.imging = true
					return
				}
				if (this.groupname == '') {
					this.titleing = true
					return
				}
				if (this.introduction == '') {
					this.contenting = true
					return
				} else {
					ajaxTemplate('/Group/CreateFunsGroup', {
						User_Id: this.$store.state.userInfo.User_Id,
						Group_Img: this.imgurl2,
						Group_Name: this.groupname,
						Group_Introduction: this.introduction,
					}).then(res => {
						if(res.Code==200){
							uni.showToast({
								title: '已保存',
								icon: 'success',
								duration: 2000
							})
							console.log('preserve', res);
							this.groupname = ''
							this.introduction = ''
							this.imgurl = ''
							 sendText(
							            String(res.Result.GroupId),
							            'group',
							            '欢迎来到粉丝群',
							            (res) => {
							              //
							            }
							          )
							uni.switchTab({
								url: "/pages/TUIKit/TUIPages/TUIConversation/index"
							})
						}else{
							this.groupname = ''
							this.introduction = ''
							this.imgurl = ''
							uni.showToast({
								title: res.Message,
								icon: 'none'
							})
						}
						
					})
				}
			},
			
			openChooseImg(e) {
				uni.chooseImage({
					count: 1, //最多可选择的张数
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择，和摄像头功能，默认二者都有
					success: res => {
						console.log(res)
						this.imgurl = res.tempFilePaths[0]
						
						
						// let reader = new FileReader()
						// reader.readAsDataURL(res.tempFiles[0])
						// reader.onload = () => {
						// 	// console.log('file 转 base64结果：' + reader.result)
						// 	this.imgurl2 = reader.result
						// }
						// reader.onerror = function(error) {
						// 	console.log('Error: ', error)
						// }
						pathToBase64(res.tempFilePaths[0]).then(base64 => {
						        console.log(base64)
								this.imgurl2 = base64
								// this.formData.ID_BehindImg=base64
						    })
						    .catch(error => {
						        console.error(error)
						    })
					}
				});
				// let reader = new FileReader()
				// reader.readAsDataURL(e.tempFiles[0].file)
				// reader.onload = () => {
				// 	// console.log('file 转 base64结果：' + reader.result)
				// 	this.imgurl2 = reader.result
				// }
				// reader.onerror = function(error) {
				// 	console.log('Error: ', error)
				// }
			},
		}
	}
</script>

<style scoped lang="less">
	.box {
		background-color: #F4F4F5;

		.header {
			height: 176rpx;
			// background: #E73449 url(/static/image/back-y.png) no-repeat top center/100%;
			background-color: #fff;
			// position: relative;
		}

		.btn {
			height: 88rpx;
			background: linear-gradient(180deg, #FC683E 0%, #E3121E 100%);
			border-radius: 44rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
		}
	}

	::v-deep .uni-file-picker {
		opacity: 0;
		position: relative;
		top: -91px;
		z-index: 999;
	}
</style>