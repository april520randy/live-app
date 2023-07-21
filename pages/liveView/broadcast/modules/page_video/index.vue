<template>
  <view class="msg">
    <!-- <var-tabs sticky color="white" active-color="#333333" v-model:active="activeTab">
			<var-tab>聊天</var-tab>
			<var-tab>私聊</var-tab>
			<var-tab>排行</var-tab>
			<var-tab>推荐</var-tab>
		</var-tabs> -->

    <!-- <yui-tabs :tabs="tabs" v-model="activeTab"  duration="0" @change="tabChange"
			background="none" color="#fff" title-active-color="#333333" title-inactive-color="#8E92A4">
		</yui-tabs> -->
    <view style="display: flex; align-items: center; width: 700rpx">
      <view
        :class="{ content1: activeTab == i, content: activeTab != i }"
        @click="change(i)"
        v-for="(item, i) in tabs"
        :key="i"
        style="margin: 0 20rpx"
        >{{ item }}</view
      >
    </view>

    <view
      class="person"
      :style="{ width: anchoer.Is_Interest == 0 ? '310rpx' : '240rpx' }"
    >
      <image
        style="
          width: 64rpx;
          height: 64rpx;
          margin-right: 5px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 1px solid #ee2144;
        "
        :src="anchoer.Anchoer_Logo"
      />
      <view class="c" v-if="anchoer.Is_Interest == 0">
        <!-- <text>Letme...</text> -->
        <!-- <var-ellipsis style="max-width: 100%">
					{{anchoer.Anchoer_Name}}
				</var-ellipsis> -->
        <view
          style="
            width: 102rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ anchoer.Anchoer_Name }}
        </view>
        <view class="b">
          <image
            style="width: 12px; height: 12px"
            src="/static/image/broadcast/heart.png"
          />
          <text>{{ anchoer.Anchoer_InterestNum }}</text>
        </view>
      </view>
      <view class="gz active" @click="gzHandle" v-if="anchoer.Is_Interest == 0">
        关注
      </view>

      <view
        class="fsqun"
        v-if="anchoer.Is_Interest == 1"
        @click="activeTab = 4"
      >
        <image
          style="width: 44rpx; height: 30rpx"
          src="/static/image/fsq.png"
        />
        <view>加入粉丝群</view>
      </view>
    </view>
  </view>
  <pageChat
    v-if="activeTab == 0"
    :anchoer="anchoer"
    @sendDanmu="sendDanmu"
	@item="itemChange"
  ></pageChat>
  <PrivateChat v-if="activeTab == 1" :Id="anchoer.Anchoer_Id"></PrivateChat>
  <SortChat v-if="activeTab == 2" :anchoer="anchoer"></SortChat>
  <Recommend v-if="activeTab == 3"  :Match_Id="Match_Id"/>

  <fenS v-if="activeTab == 4" :anchoer="anchoer" />
</template>

<script>
import pageChat from './Chat.vue'
import PrivateChat from './PrivateChat.vue'
import Recommend from './Recommend.vue'
//import store from "/pages/TUIKit/TUICore/store";
import SortChat from './Sort.vue'
import fenS from './fen.vue'
import { ajaxTemplate } from '/api/index.js'
export default {
  components: {
    pageChat,
    PrivateChat,
    Recommend,
    SortChat,
    fenS
  },
  props: {
	  Match_Id: {
	  	type: String,
	  	default: ''
	  },
    anchoer: {
      default: () => {
        return {}
      },
      type: Object
    },
    message: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // fens:false,
      tabs: ['聊天', '私聊', '排行', '推荐'],
      activeTab: 0,
      isFold: false,
      User_Id: ''
    }
  },

  onLoad() {
    // if (this.message.conversationID !== undefined) {
    // 	store.commit("timStore/setConversationID", message.conversationID);
    // }
  },
  onReady() {},

  onPageScroll(e) {},
  methods: {
	  itemChange(item){
		this.$emit('item',item)
	  },  
    sendDanmu(danmuValue) {
      console.log(danmuValue)
      uni.$emit('sendDanmu', danmuValue)
    },
    handleItemName(item) {
      let name = ''
      switch (item.type) {
        case uni.$TIM.TYPES.CONV_C2C:
          name = item?.userProfile.nick || item?.userProfile?.userID || ''
          break
        case uni.$TIM.TYPES.CONV_GROUP:
          name = item.groupProfile.name || item?.groupProfile?.groupID || ''
          break
        case uni.$TIM.TYPES.CONV_SYSTEM:
          name = '系统通知'
          break
      }
      return name
    },

    gzHandle() {
      if (this.$store.state.userInfo.User_Id == undefined) {
        // uni.showToast({
        // 	title: "请先登录",
        // 	duration: 1000,
        // });
        uni.redirectTo({
          url: '/pages/login/index'
        })
        this.show = false
        return
      }
      this.User_Id = this.$store.state.userInfo.User_Id

      ajaxTemplate('/Interest/Add_InterestList', {
        User_Id: this.User_Id,
        Anchoer_Id: this.anchoer.Anchoer_Id
      }).then((res) => {
        console.log(res)
        if (res.Code == 200) {
          uni.showToast({
            title: res.Message,
            mask: true,
            icon: 'none'
          })
          this.$emit('changeLiveRoomDetail')
        } else {
          uni.showToast({
            title: res.Message,
            mask: true,
            icon: 'none'
          })
        }
      })
    },
    change(i) {
	  if(i == 1){
		  if (this.$store.state.userInfo.User_Id == undefined) {
		    uni.redirectTo({
		      url: '/pages/login/index'
		    })
		    return
		  }
	  }
	  this.activeTab = i
    },
    handleScrollBottom(name) {
      this.$nextTick(() => {
        let scrollElem = this.$refs[name]
        scrollElem.scrollTo({
          top: scrollElem.scrollHeight,
          behavior: 'smooth'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fsqun {
  width: 144rpx;
  height: 66rpx;
  background: linear-gradient(93deg, #FC683E 0%, #FC683E 100%);
  border-radius: 8rpx;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20rpx;

  color: #ffffff;
}	

.content {
  font-size: 30rpx;
  font-weight: 400;
  color: #8e92a4;
}

.content1 {
  font-size: 30rpx;
  font-weight: 500;
  color: #000;
  position: relative;
}

.content1:after {
  display: block;
  position: absolute;
  content: '';
  width: 30rpx;
  border-radius: 8px;
  background-color: #f0222c;
  bottom: -10rpx;
  z-index: 9;
  height: 8rpx;
  left: 20%;
}

.msg {
  display: flex;
  margin-top: 0px;
  align-items: center;
  padding: 4rpx 0;
  border-bottom: 2rpx solid #e7e9ee;

  ::v-deep .var-sticky {
    flex: 1;

    .var-tabs__indicator {
      background: red !important;
    }

    .var-tab {
      * {
        background-color: white !important;
      }
    }
  }

  .person {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    background: #ffeff0;
    border-radius: 19px 0px 0px 19px;
    padding: 0 10px 0 3px;

    .c {
      width: 0;
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #333333;

      .b {
        display: flex;
        align-items: center;
        font-size: 9px;
        color: #8e92a4;
        margin-left: 2px;

        * {
          flex-shrink: 0;
        }
      }
    }

    .gz {
      flex-shrink: 0;
      margin-left: 3px;
      // width: 48px;
      line-height: 26px;
      height: 26px;
      background: #cfcdcd;
      border-radius: 13px 13px 13px 13px;
      padding: 0 12px;
      color: #ffffff;

      font-size: 12px;

      &.active {
        background: linear-gradient(93deg, #FC683E 0%, #FC683E 100%);
      }
    }
  }
}
</style>
