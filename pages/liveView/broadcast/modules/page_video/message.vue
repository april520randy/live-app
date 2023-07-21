<template>
  <view
    v-for="(item, index) in messageList"
    :key="index"
    :style="{
      backgroundColor: item.backgroundColor,
      color: item.textColor
    }"
    style="margin-top: 4px; "
	@click="messageClick(item)"
  >
    <!-- 普通弹幕消息 -->
    <view
      v-if="item.vip == '' && item.gift.giftUrl == undefined"
      style="
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: space-between;
        padding: 0 12px;
      "
    >
      <view
        style="display: flex; align-items: flex-start; height: 100%"
        :style="{ width: item.colorful ? '85%' : '100%' }"
      >
        <span
          style="padding: 0px 6px; font-size: 12px; color: white;border-radius:2px"
          :style="{ background: item.lvColor }"
          >Lv{{ item.lv }}</span
        >
        <image
          v-if="item.isUp"
          src="/static/image/liveroom/up.png"
          style="margin-left: 4px; height: 20px"
		  mode="heightFix"
        />
        <image
          v-if="item.isRoomManager"
          src="/static/image/liveroom/roomManager.png"
          style="margin-left: 4px; height: 20px"
		    mode="heightFix"
        />

        <span
          style="
            color: #8393bc;
            padding: 0 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
			width:180rpx;
          "
          >{{ item.name }}：</span
        >

        <image
          v-if="item.emo"
          :src="item.emo"
          style="height: 25px; width: 25px"
		  mode="aspectFit"
        />

        <div
            style="
                white-space: normal;
                word-break: break-all;
                word-wrap: break-word;
				flex:1
              "
            >
                {{ item.text }}
        </div>
      </view>
      <image
        v-if="item.colorful"
        style="float: right; height: 32px; margin-left: 104px;"
        :src="colorfulImage(item.colorful)"
      />
    </view>

    <!-- VIP消息 -->
    <view
      v-if="item.vip !== '' && item.gift.giftUrl == undefined"
      style="
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: space-between;
      "
    >
      <view
        style="display: flex; align-items: flex-start; height: 100%"
        :style="{ width: item.colorful ? '85%' : '100%' }"
      >
        <image
		mode="heightFix"
          :src="vipHeaderImage(item.vip)"
          style="margin-right: 8px; height: 22px"
        />
        <span
          style="padding: 0px 6px; font-size: 12px; color: white;border-radius:2px"
          :style="{ background: vipLvColor(item.vip) }"
          >Lv{{ item.lv }}</span
        >
        <image
		mode="heightFix"
          v-if="item.isUp"
          src="/static/image/liveroom/up.png"
          style="margin-left: 4px; height: 20px"
        />
        <image
		mode="heightFix"
          v-if="item.isRoomManager"
          src="/static/image/liveroom/roomManager.png"
          style="margin-left: 4px; height: 20px"
        />
        <image mode="heightFix" :src="vipImage(item.vip)" style="margin-left: 4px; height: 20px" />
        <view
          style="
            color: #8393bc;
            padding-right: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
			width:180rpx;
          "
          >{{ item.name }}：
        </view>
        <view
          :style="{ color: vipTextColor(item.vip) }"
          style=" white-space: normal;
                word-break: break-all;
                overflow-wrap: break-word;flex:1;"
        >
          {{ item.text }}
        </view>
        <image
		mode="widthFix"
          v-if="item.emo"
          :src="item.emo"
          style="height: 25px; width: 25px"
        />
      </view>
      <image
	  mode="heightFix"
        v-if="item.colorful"
        style="height: 32px"
        :src="colorfulImage(item.colorful)"
      />
    </view>
    <!-- 礼物弹幕消息 -->
    <view
      v-if="item.gift.giftUrl !== undefined"
      style="
        padding-right: 12px;
        display: flex;
        align-items: center;
        height: 100%;
      "
    >
      <image
	  mode="heightFix"
        :src="vipHeaderImage(item.vip)"
        style="margin-right: 8px; height: 32px"
        v-if="item.vip !== ''"
      />
      <view v-else style="width: 12px"></view>
      <span
        style="padding: 0px 6px; font-size: 12px; color: white;border-radius:2px"
        :style="{
          background: item.vip ? vipLvColor(item.vip) : item.lvColor
        }"
        >Lv{{ item.lv }}</span
      >
      <image
        v-if="item.isUp"
		mode="heightFix"
        src="/static/image/liveroom/up.png"
        style="margin-left: 4px; height: 20px"
      />
      <image
        v-if="item.isRoomManager"
        src="/static/image/liveroom/roomManager.png"
        style="margin-left: 4px; height: 20px"
		mode="heightFix"
      />
      <image
        v-if="item.vip"
        :src="vipImage(item.vip)"
        style="margin-left: 4px; height: 20px"
		mode="heightFix"
      />

      <view style="color: #8393bc; padding-left: 4px;white-space: nowrap">{{ item.name }}：</view>
      <view style="display: flex; align-items: center">
        <span>送</span>
		<image v-if="item.gift.giftUrl" :src="item.gift.giftUrl"  style="height: 24px; margin: 0 4px"  mode="heightFix"></image>
        <span>x</span>
        <span>{{ item.giftNumberCount }}</span>
      </view>

      <span style="padding-left: 12px"
        >{{ item.multipleHit === '' ? '1' : item.multipleHit }}连击</span
      >
    </view>
  </view>
</template>

<script>
import mitt from '../../../../../utils/bus.ts'

// onMessageReceived(this).then((res) => {
//   console.log(res, 'onMessageReceived')
// })
export default {
  props: {
    matchGroupId: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      messageList: []
    }
  },
  computed: {},
  created() {
    mitt.on('messageReceived', (event) => {
      console.log(event, ' this.matchGroupId')

      event.data.forEach((message) => {
        if (
          this.matchGroupId === message.to &&
          message.type === uni.$TIM.TYPES.MSG_CUSTOM
        ) {
          if (message.payload.data !== undefined) {
            message.payload.data =
              typeof message.payload.data == 'string'
                ? JSON.parse(message.payload.data)
                : message.payload.data

            if (message.payload.data.isComeIn === true) {
              console.log('updateComeList', message.payload.data)
              mitt.emit('updateComeList', message.payload.data)
              //this.$parent.handleScrollBottom('comeInList')
            } else {
              this.messageList.push(message.payload.data)
              mitt.emit('updateMessage', message.payload.data);
              // this.$parent.playGiftSvg(message.payload.data)
              // this.$parent.addToList(message.payload.data)
              // this.$parent.handleScrollBottom('messageBox')
            }
          }
        }
      })
    })
  },
  methods: {
	messageClick(item){
		this.$emit('item',item)
		
		
		
	},
    vipLvColor(value) {
      switch (value) {
        case 1:
          return 'linear-gradient(180deg, #2C5DE6 0%, #5EB6F6 100%)'
        case 2:
          return 'linear-gradient(180deg, #E429B6 0%, #FA8FE1 100%)'
        case 3:
          return 'linear-gradient(180deg, #F8740F 0%, #FEBE66 100%)'
      }
    },
    vipTextColor(value) {
      switch (value) {
        case 1:
          return '#1138D1'
        case 2:
          return '#E428B0'
        case 3:
          return '#FF7904'
      }
    },
    vipHeaderImage(value) {
      return `/static/image/liveroom/vipHeader${String(value)}.png`
    },
    vipImage(value) {
      return `/static/image/liveroom/vip${String(value)}.png`
    },
    colorfulImage(value) {
      return `/static/image/liveroom/colorful${String(value + 1)}.png`
    }
  }
}
</script>
<style lang="less" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
