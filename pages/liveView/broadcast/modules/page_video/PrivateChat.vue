<template>
	<view class="box">
		<scroll-view class="content" :style="{height:scrollHeight}" scroll-y="true" :scroll-top="scrollTop"
			scroll-with-animation>
			<view id="scroll-chat" class="content-chat">
				<view v-for="(item, index) in messageList" :key="index"
					style="display: flex; align-items: end; margin-top: 10px"
					:style="{ justifyContent: item.flow === 'out' ? 'flex-end' : 'flex-start' }">
					<image class="chat-avatar" v-if="item.flow === 'in'" :src="item.avatar" style="margin-right: 4px" />
					<image v-if="item.flow === 'in'" src="/static/image/liveroom/out.png" style="height: 10px"
						mode="heightFix" />
					<view class="chat-content-text" :style="{
			    background: item.flow === 'out' ? '#FFE9E9' : '#ededed',
			    borderRadius: `10px 10px ${item.flow === 'out' ? '0px' : '10px'} ${
			      item.flow === 'in' ? '0px' : '10px'
			    }`
			  }">
						<!-- 	<p v-if="item.flow === 'out'" style="color: #8393bc; font-size: 14px">
							{{ item.nick }}
						</p> -->
						<view v-if="item.type === TIM.TYPES.MSG_TEXT" style="
			      color: #333333;
			      font-size: 14px;
			      padding: 6px 0;
			      max-width: 260px;
			    ">
							{{ item.payload.text }}
						</view>

						<image v-if="item.type === TIM.TYPES.MSG_FACE"
							:src="emojiUrl + emojiMap[emojiName[item.payload.index]]"
							style="width: 24px; margin: 4px 8px" mode="widthFix" />
					</view>
					<!-- <image v-if="item.flow === 'out'" src="/static/image/liveroom/in.png" style="height: 10px"
						mode="heightFix" /> -->
					<image class="chat-avatar" v-if="item.flow === 'out'" :src="item.avatar" mode="aspectFit"
						style="margin-left: 4px" />
				</view>
			</view>
		</scroll-view>
		<view class="foot" style="position: fixed; bottom: 0">
			<view style="display: flex; align-items: center; padding: 12rpx 0">
				<input type="text" placeholder="你好呀,主播!" class="input" v-model="text" />
				<view style="display: flex; align-items: center">
					<image src="/static/image/smile.png" style="width: 64rpx; height: 64rpx; margin-right: 22rpx"
						@touchend.prevent="showFace = !showFace" />
					<image src="/static/image/send.png" style="width: 64rpx; height: 64rpx; margin-right: 30rpx"
						@touchend.prevent="sendMessage(null)" />
				</view>
			</view>

			<Face v-show="showFace" @send="sendMessage" style="height: 100px" />
		</view>
	</view>
</template>

<script>
	import mitt from '../../../../../utils/bus.ts'
	import {
		getMessageList,
		sendText,
		sendFace
	} from '/utils/iM.js'
	import TIM from 'tim-js-sdk'
	import {
		emojiUrl,
		emojiMap,
		emojiName
	} from '/pages/TUIKit/utils/emojiMap'
	import Face from './face.vue'
	export default {
		props: {
			Id: {
				type: String,
				default: () => ''
			}
		},
		components: {
			Face
		},
		data() {
			return {
				TIM,
				emojiUrl,
				emojiMap,
				emojiName,
				showDetail: false,
				message: '',
				showFace: false,
				footerHeight: 112,
				name: '',
				messageList: [],
				text: '',
				scrollTop: 0,
				scrollHeight: 0
			}
		},
		created() {
			getMessageList('C2C', this.Id, (res) => {
				console.log(res)
				this.messageList = this.messageList.concat(res)
			})

			mitt.on('messageReceived', (event) => {
				console.log(event,'=====================================recied')
				event.data.forEach((message) => {
					if (
						message.type === this.TIM.TYPES.MSG_TEXT ||
						message.type === this.TIM.TYPES.MSG_FACE
					) {
						this.messageList.push(message)
						// this.handleScrollBottom('messageBox')
					}
				})
			});

		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#scroll-chat').boundingClientRect(data => {
							let height = res.windowHeight - data.top - 46; //减去顶部距离和底部距离
							this.scrollHeight = height + 'px'
							this.scrollTop = data.height
						}).exec();
					}, 80)
				}
			})

		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			sendMessage(emo = null) {
				console.log(123221);

				if (this.text === '' && emo === null) {
					return
				}

				if (emo !== null) {
					sendFace(String(this.Id), 'c2c', emo.index, '', (res) => {
						this.messageList.push(res.data.message)
					})
					this.showFace = false

					return
				}
				sendText(String(this.Id), 'c2c', this.text, (res) => {
					this.messageList.push(res.data.message)
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#scroll-chat').boundingClientRect(data => {
							this.scrollTop = data.height
						}).exec();
					}, 10)
				})
				this.text = ''
				// this.showFace = !this.showFace
			},
			showFaceFun() {
				this.showFace = !this.showFace
				this.footerHeight = this.showFace ? 200 : 112
			}
		}
	}
</script>

<style scoped lang="less">
	.box {
		background-color: #f4f4f5;

		.content {
			position: relative;
			padding: 0 20rpx;

			.content-chat {
				padding-bottom: 24rpx;
			}

			.chat-box1 {
				margin-left: 20rpx;
				margin-top: 30rpx;

				.chatting1 {
					width: 244rpx;
					height: 68rpx;
					background: #fefefe;
					border-radius: 20rpx 20rpx 20rpx 0rpx;
					font-size: 30rpx;
					color: #333333;
					text-align: center;
					line-height: 68rpx;
					position: absolute;
					left: 110rpx;
					top: 100rpx;
				}
			}

			.chat-box2 {
				.chatting2-img2 {
					position: absolute;
					right: 30rpx;
				}

				.chatting2-img1 {
					position: absolute;
					right: 95rpx;
					top: 230rpx;
				}

				.chatting2 {
					width: 244rpx;
					height: 68rpx;
					background: #f9e5e7;
					border-radius: 20rpx 20rpx 0rpx 20rpx;
					font-size: 30rpx;
					color: #333333;
					text-align: center;
					line-height: 68rpx;
					position: absolute;
					right: 115rpx;
					top: 184rpx;
				}
			}
		}

		.foot {
			background: #ffffff;
			position: absolute;
			bottom: 68rpx;
			background: #ffffff;
			width: 100%;

			.input {
				width: 100%;
				height: 68rpx;
				background: #f5f5f5;
				border-radius: 38rpx;
				font-size: 26rpx;
				color: #c0c2cb;
				line-height: 68rpx;
				padding-left: 24rpx;
				margin-left: 20rpx;
				margin-right: 24rpx;
			}
		}
	}

	.chat-avatar {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
	}

	.chat-content-text {
		padding: 16rpx 20rpx;
	}
</style>