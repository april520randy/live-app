<template>
	<view style="position: relative">
		<image src="/static/image/liveroom/multipleHitBack.png" style="width: 100%; height: 44px" />
		<view style="
        position: absolute;
        z-index: 1;
        width: 100%;
        display: flex;
        align-items: center;
        top: 0;
        height: 43px;
        padding: 0 12px;
      ">
			<view style="color: white">{{ giftDetail.userName }} 送</view>

			<view style="margin-left: 20rpx; margin-right: 14rpx"></view>

			<image :src="giftDetail.giftUrl" style="margin: 0 17px 0 10px; height: 30px" mode="heightFix" />

			<image v-for="(item, index) in giftNumber" :src="gift_num(item)" :key="index" style="height: 30px"
				class="anima" mode="heightFix" />
			<image style="height: 30px" class="anima" src="/static/image/liveroom/multiple_gift.png" mode="heightFix" />
			<image v-for="(item, index) in giftMultipleHitNumber" :src="multiple(item)" :key="index"
				style="height: 40px" mode="heightFix" class="anima" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				giftDetails: [],
				giftDetail: {},
				giftNumber: [],
				giftMultipleHitNumber: [],
				timer: null
			}
		},
		mounted() {},
		methods: {
			show() {
				if (this.timer !== null) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					if (this.giftDetail.length > 0) {
						this.show()
					} else {
						this.$emit('multipleHitCallBack')
					}
				}, 3000)

				if (this.giftDetails.length > 0) {
					this.giftDetail = {
						...this.giftDetails[0]
					}

					console.log(
						this.giftDetail,
						'show-svga================================'
					)
					this.giftNumber = String(this.giftDetail.giftNumber).split('')
					this.giftMultipleHitNumber = String(
						this.giftDetail.giftMultipleHitNumber
					).split('')

					this.giftDetails.splice(0, 1)
				}
			},
			gift_num(value) {
				return `/static/image/liveroom/gift_num_${value}.png`
			},

			multiple(value) {
				return `/static/image/liveroom/multiple_${value}.png`
			},
			cancelTimer() {
				if (this.timer !== null) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.$emit('multipleHitCallBack')
					// this.$parent.showMultipleHit = false
					// this.$parent.multipleHit = ''
				}, 3000)
			}
		}
	}
</script>

<style lang="less" scoped>
	@keyframes scale {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(0.8);
		}

		100% {
			transform: scale(1);
		}
	}

	/* 添加动画 */
	.anima {
		animation: scale 1.5s infinite;
	}
</style>
