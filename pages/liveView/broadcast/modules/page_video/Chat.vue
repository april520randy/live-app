<template>
  <view
    style="
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      position: relative;
    "
  >
    <view v-if="promptData && promptData.length" class="announcement">
      <image
        style="width: 171px; height: 14px"
        src="/static/image/broadcast/announcement.png"
      />
      <view class="fold" :class="{ 'is-show': !isFold }">
        <view class="item" v-for="(item, index) in promptData" :key="index">
          <text>{{ item.title }}：{{ item.conent }}</text>
          <text @click="copyFn(item.conent)">点击复制</text>
        </view>
      </view>

      <view class="down-btn" @click="flodClick">
        <image
          v-if="!isFold"
          style="width: 62px; height: 16px"
          src="/static/image/broadcast/down-btn.png"
        />
        <image
          v-if="isFold"
          style="width: 62px; height: 16px"
          src="/static/image/broadcast/down-btn1.png"
        />
      </view>
    </view>

    <scroll-view
      scroll-y="true"
      scroll-with-animation
      :scroll-top="scrollTop"
      class="chat-gpt"
      :style="{ height: scrollHeight }"
      id="messageBox"
    >
      <view class="scroll-all">
        <view
          :style="{ height: showwz ? '168rpx' : '138rpx' }"
          style="
            background-color: #f8f8f8;
            position: relative;
            padding: 28rpx 20rpx 0;
            margin: 0 0 5rpx 0;
            width: 100%;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            line-clamp: 4;
            font-size: 26rpx;
          "
        >
          <view v-if="isShow == 1" class="">
            <text class="title" style="color: #f0222c">系统提示：</text>
            <text>{{ prompt }}</text>
          </view>
          <view v-if="isShow == 0" class="">
            <view v-if="!showwz">
              <text class="title" style="color: #f0222c">系统提示：</text>
              欢迎来到（{{ anchoer.Anchoer_Name }}）的直播间，喜欢就点关注吧。
              欢呼吧直播依法对直播内容进行24小时巡查，禁止传播违法违规、
              封建迷信、暴力血腥、低俗色情...
            </view>
            <view v-if="showwz">
              <text class="title" style="color: #f0222c">系统提示：</text>
              欢迎来到（{{ anchoer.Anchoer_Name }}）的直播间，喜欢就点关注吧。
              欢呼吧直播依法对直播内容进行24小时巡查，禁止传播违法违规、
              封建迷信、暴力血腥、低俗色情、
              招嫖诈骗违禁品等不良信息，坚决维护青少年群体精神文明健康。
            </view>

            <view
              v-if="!showwz"
              @click="showwz = !showwz"
              style="
                position: absolute;
                bottom: 6rpx;
                color: #666666;
                right: 40rpx;
                width: 160rpx;
                display: flex;
                align-items: center;
              "
            >
              展开
              <image
                style="width: 24rpx; height: 24rpx"
                src="/static/image/zk.png"
              />
            </view>
            <view
              v-if="showwz"
              @click="showwz = !showwz"
              style="
                position: absolute;
                bottom: 2rpx;
                color: #666666;
                right: 20rpx;
                width: 100rpx;
                display: flex;
                align-items: center;
              "
            >
              收起
              <image
                style="width: 24rpx; height: 24rpx"
                src="/static/image/sq.png"
              />
            </view>
          </view>
        </view>

        <Message
          :matchGroupId="anchoer.Match_Group_Id"
          ref="messages"
          style="width: 100%"
          @item="itemChange"
        />
      </view>
    </scroll-view>

    <GiftSvga
      class="svgAnimation"
      v-show="showGiftSvg"
      ref="giftSvga"
      @svgCallBack="svgCallBack"
    />

    <MultipleHitBack
      ref="multipleHitBack"
      v-show="showMultipleHit"
      @multipleHitCallBack="multipleHitCallBack"
      style="position: absolute; z-index: 1; top: 60px; width: 100%"
    />

    <ComeinSvga v-show="showSvgComein" ref="comeinSvg" class="svgAnimation" />

    <view
      v-show="comeInList.length > 0"
      style="
        width: 100%;
        height: 38px;
        background-color: #fff5f6;
        position: fixed;
        bottom: 55px;
        left: 0;
      "
      id="comeInList"
    >
      <view
        v-for="(item, index) in comeInList"
        :key="index"
        style="
          height: 36px;
          align-items: center;
          display: flex;
          padding: 13px 0;
        "
        :style="{
          backgroundColor: item.backgroundColor,
          color: item.textColor
        }"
      >
        <view
          style="
            padding: 0 12px;
            display: flex;
            align-items: center;
            height: 100%;
          "
        >
          <span
            style="padding: 0px 4px; font-size: 12px; border-radius: 2px"
            :style="{ background: item.lvColor }"
            >LV{{ item.lv }}</span
          >

          <span style="color: #8393bc; padding-left: 4px"
            >{{ item.name }}：</span
          >
          <span>欢迎来到直播间</span>
        </view>
      </view>
    </view>

    <view class="foot" style="position: fixed; bottom: 0">
      <view
        v-if="checkVis"
        style="
          display: flex;
          flex-direction: column;
          height: 180rpx;
          position: fixed;
          bottom: 120rpx;
          background-color: #fff;
          box-shadow: 0px 0px 20px 2px rgba(186, 186, 186, 0.502);
          border-radius: 12rpx;
        "
      >
        <view
          class="item"
          style="
            display: flex;
            align-items: center;
            flex: 1;
            padding: 15px 12px;
          "
          @click="toggleCheck(item.value)"
          v-for="(item, index) in giftList"
          :key="index"
        >
          <image
            :src="getCheckImg(item.value)"
            style="width: 14px; height: 14px; margin-right: 16px"
          />
          <text
            style="font-size: 13px; color: #343434"
            :style="getColor(item.value)"
            >{{ item.title }}</text
          >
        </view>
      </view>

      <!-- -->
      <image
        @click="svgCheckClick"
        src="/static/image/broadcast/icon3.png"
        style="width: 72rpx; height: 72rpx; margin-right: 26rpx"
      />
      <view class="input" @click.stop="tollFn">说点什么吧~</view>
      <!-- <view class="input" v-else> {{ fn() }}</view> -->

      <view style="display: flex; align-items: center">
        <image
          src="/static/image//broadcast/icon2.png"
          style="width: 72rpx; height: 72rpx; margin-right: 20rpx"
          @click="togz"
        />
        <image
          src="/static/image//broadcast/icon4.png"
          style="width: 72rpx; height: 72rpx"
          @click="gifModalFn"
        />
      </view>

      <!-- -->
    </view>

    <!-- 发送-->
    <view
      v-if="tollModal"
      @touchend.prevent="toll"
      style="position: fixed; bottom: 0; width: 100%; z-index: 9999"
      class="toll"
    >
      <view class="tolltop" style="display: flex;align-items: center;justify-content: space-between;">
        <image
          src="/static/mslist.png"
          style="width: 60rpx; height: 60rpx; margin: 0 20rpx"
          @touchend.prevent="mslist = !mslist"
        />
      <!--  <image
          src="/static/lbimg.png"
          style="width: 60rpx; height: 60rpx; margin: 0 20rpx"
        /> -->
        <view style="display: flex;align-items: center;">
			<view
			  style="
			    width: 0px;
			    height: 44rpx;
			    opacity: 1;
			    border-right: 1rpx solid #e7e9ee;
			  "
			>
			</view>
			<image
			  @touchend.prevent="colorfulClick"
			  src="/static/xcdm.png"
			  style="width: 140rpx; height: 38rpx; margin: 0 20rpx"
			/>
		</view>

        <view class="mslist" v-if="mslist">
		  <view class="" v-for="(lv,index) in lvStatusList" :key="index" @touchend.prevent="msListsClick(lv,index)">
			  <image
		     v-if="index === 0"
		     :src="lv.status ? lv.select : lv.default"
		     style="width: 84rpx; height: 40rpx; margin-left: 12rpx"
		   >
		   </image>
		   <image
		     v-else
		     :src="lv.status ? lv.select : lvStatusBackUrl(index, lv)"
		     style="width: 84rpx; height: 40rpx; margin-left: 12rpx"
		   />
		  </view>
        <!--  <image
            v-if="User_Level >= 2"
            :src="`/static/ms/${2}-${0}.png`"
            style="width: 84rpx; height: 40rpx; margin-left: 12rpx"
          >
          </image>
          <image
            :src="`/static/ms/${8}-${0}.png`"
            style="width: 84rpx; height: 40rpx; margin-left: 12rpx"
          >
          </image>
          <image
            :src="`/static/ms/${16}-${0}.png`"
            style="width: 84rpx; height: 40rpx; margin-left: 12rpx"
          >
          </image>
          <image
            :src="`/static/ms/${21}-${0}.png`"
            style="width: 84rpx; height: 40rpx; margin-left: 12rpx"
          >
          </image> -->
        </view>

        <!-- 炫彩弹幕 -->
        <view class="xcdm" v-if="xcdm&&colorfulList.length>0">
          <image
            src="/static/dmjt.png"
            style="
              width: 48rpx;
              height: 48rpx;
              position: absolute;
              left: 150rpx;
              bottom: -60rpx;
            " />
					<view class="xcdmitem" @touchend.prevent="danmusClick(i,index)" v-for="(i,index) in colorfulList" :key="index">
						<view style="
                font-size: 24rpx;
                color: #ffffff;
                position: absolute;
                z-index: 99;
                right: 0;
                top: 0;
                bottom: 0;
                left: 0;
                text-align: center;
                line-height: 80rpx;
              ">
							{{i.text}}
						</view>
						<image :src="i.left"
							style="width: 48rpx; height: 80rpx; position: absolute; left: 0" />
						<image :src="i.center" style="
                width: 152rpx;
                height: 80rpx;
                position: absolute;
                left: 48rpx;
              "
            />
            <image
              :src="i.right"
              style="
                width: 48rpx;
                height: 80rpx;
                position: absolute;
                left: 200rpx;
              " />
					</view>
        </view>
      </view>
      <view class="tollbottom">
        <image
          src="/static/image//broadcast/icon2.png"
          style="width: 72rpx; height: 72rpx; margin: 0 20rpx"
          @touchend.prevent="togz"
        />
        <input
		maxlength="50"
          type="text"
          placeholder="说点什么吧"
          class="tollinput"
          focus
          @keyboardheightchange="keyboardheightchange"
          v-model="danmuValue"
          :hold-keyboard="true"
        />
        <image
          src="/static/bqlist.png"
          style="width: 72rpx; height: 72rpx; margin: 30rpx"
          @touchend.prevent="sendFace()"
        />
        <view style="color: #333333" @touchend.prevent="sendDanmu"> 发送 </view>
      </view>

      <Face v-show="showFace" @send="sendMessage" style="height: 100px" />
    </view>

    <view
      v-if="gifModal"
      style="
        height: 100vh;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 999;
      "
      @click.stop="gifModal = false"
    >
      <view class="popup-example-block" @click.stop="">
        <view class="hd">
          <view class="btns">
            <text
              :class="{ active: gifModalTabIndex === '0' }"
              @click.stop="gifModalTabIndex = '0'"
              >礼物</text
            >
            <text
              :class="{ active: gifModalTabIndex === '1' }"
              @click.stop="gifModalTabIndex = '1'"
              >背包</text
            >
          </view>
        </view>
        <view class="type-0" v-if="gifModalTabIndex === '0'">
          <view class="gitf-card">
            <view
              v-for="(item, index) in gitZsList"
              @click="gitZsSelectfn(item, index)"
              :key="index"
              class="gitf-item"
              :class="{ active: gitZsSelect === index }"
            >
              <image :src="item.Gift_Img" />
              <text class="label">{{ item.Gift_Name }}</text>
              <text class="money"
                >{{
                  item.Spend_Silver_Coin == 0
                    ? item.Spend_Gold_Coin
                    : item.Spend_Silver_Coin
                }}{{ item.Spend_Silver_Coin == 0 ? '金币' : '银币' }}</text
              >
            </view>
          </view>

          <view class="gift-footer" style="position: fixed; bottom: 10rpx">
            <image
              src="/static/image/myView/jinbi.png"
              style="width: 32rpx; height: 32rpx; margin-right: 8rpx"
            >
            </image>
            <view>
              {{ userInfo.Gold_Coin }}
            </view>
            <image
              src="/static/image/myView/yinbi.png"
              style="
                width: 32rpx;
                height: 32rpx;
                margin-right: 8rpx;
                margin-left: 30rpx;
              "
            >
            </image>
            <view>
              {{ userInfo.Silver_Coin }}
            </view>
            <view style="color: #FC683E; margin-left: 50rpx"> 充值 </view>

            <image
              src="/static/image/rightczz.png"
              style="width: 24rpx; height: 24rpx; margin-left: 10rpx"
            >
            </image>

            <!-- <view class="btn2"
							:style="{width:btnstate? '302rpx':'98%',border:btnstate? '2rpx solid #F0222C':''}">
							<image v-if="btnstate" src="/static/image/zuo.png" style="width:34rpx;height:68rpx;"
								@click="btnstate=false">
							</image>
							<view v-if="btnstate" style="color: #333333;font-size: 28rpx;margin-left:50rpx">
								1
							</view>
							<image v-if="!btnstate" src="/static/you.png" style="width:60rpx;height:68rpx;"
								@click="btnstate=true">
							</image>
							<scroll-view v-if="!btnstate" :scroll-x="true" class="scroll-view_H">
								<view v-for="(item,i) in 5" :key="i"
									style="display: inline-block;width: 116rpx;height: 68rpx;background: #F9F9FB;border-radius: 34rpx;text-align: center;line-height: 68rpx;margin-right:20rpx">
									{{i}}
								</view>
							</scroll-view>
							<view class="btn">赠送</view>
						</view> -->

            <view class="btn3" @click="sendGift">赠送</view>
          </view>
        </view>
        <view class="type-1" v-if="gifModalTabIndex === '1'">
          <view class="pck-card">
            <view
              v-for="(item, index) in packageList"
              @click="pckSelectfn(item, index)"
              :key="index"
              class="pck-item"
              :class="{ active: pckSelect === index }"
            >
              <image :src="item.Gift_Img" />
              <text class="label">{{ item.Gift_Name }}</text>
              <text class="money">剩余{{ item.Surplus_Num }}个</text>
            </view>
          </view>

          <view class="pck-footer" style="position: fixed; bottom: 10rpx">
            <image
              src="/static/image/myView/jinbi.png"
              style="width: 32rpx; height: 32rpx; margin-right: 8rpx"
            >
            </image>
            <view>
              {{ userInfo.Gold_Coin }}
            </view>
            <image
              src="/static/image/myView/yinbi.png"
              style="
                width: 32rpx;
                height: 32rpx;
                margin-right: 8rpx;
                margin-left: 30rpx;
              "
            >
            </image>
            <view>
              {{ userInfo.Silver_Coin }}
            </view>
            <view style="color: #f0222c; margin-left: 50rpx"> 充值 </view>

            <image
              src="/static/image/rightczz.png"
              style="width: 24rpx; height: 24rpx; margin-left: 10rpx"
            >
            </image>

            <!-- <view class="btn2"
							:style="{width:btn2state? '302rpx':'98%',border:btn2state? '2rpx solid #F0222C':''}">
							<image v-if="btn2state" src="/static/image/zuo.png" style="width:34rpx;height:68rpx;"
								@click="btn2state=false">
							</image>
							<view v-if="btn2state" style="color: #333333;font-size: 28rpx;margin-left:50rpx">
								1
							</view>
							<image v-if="!btn2state" src="/static/you.png" style="width:60rpx;height:68rpx;"
								@click="btn2state=true">
							</image>
							<scroll-view v-if="!btn2state" :scroll-x="true" class="scroll-view_H">
								<view v-for="(item,i) in 5" :key="i"
									style="display: inline-block;width: 116rpx;height: 68rpx;background: #F9F9FB;border-radius: 34rpx;text-align: center;line-height: 68rpx;margin-right:20rpx">
									{{i}}
								</view>
							</scroll-view>
							<view class="btn">使用</view>
						</view> -->

            <view class="btn4" @click="sendpack">使用</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ajaxTemplate } from '/api/index.js'
import { ajaxTemplates } from '/api/indexs.js'
import Message from './message.vue'
import Face from './face.vue'
import GiftSvga from './giftSvga.vue'
import { sendDIY } from '/utils/iM.js'
import ComeinSvga from './comeinSvga.vue'
import MultipleHitBack from './multipleHitBack.vue'
import mitt from '../../../../../utils/bus.ts'
const dmStyle = [
  {
      lvColor: 'linear-gradient(180deg, #B6B7C1 0%, #DEE0E4 100%)',
      textColor: '#747581',
      backgroundColor: '#F8F8F9'
    },
    {
      lvColor: 'linear-gradient(180deg, #1CA4FF 0%, #A2D9FF 100%)',
      textColor: '#0085FF',
      backgroundColor: '#F2FAFF'
    },
    {
      lvColor: 'linear-gradient(180deg, #6171FF 0%, #B9C0FF 100%)',
      textColor: '#6E61FF',
      backgroundColor: '#F7F6FF'
    },
    {
      lvColor: 'linear-gradient(180deg, #FF6E8B 0%, #FFB4C3 100%)',
      textColor: '#FF345D',
      backgroundColor: '#FFF6FB'
    },
    {
      lvColor: 'linear-gradient(180deg, #FFA100 0%, #FFE500 100%)',
      textColor: '#FFA100',
      backgroundColor: '#FEFCEC'
    }
]
const dmStyle1 = [
  {
    lvColor: 'linear-gradient(180deg, #B6B7C1 0%, #DEE0E4 100%)',
    textColor: '#747581',
    backgroundColor: '#F8F8F9'
  },
  {
    lvColor: 'linear-gradient(180deg, #2C5DE6 0%, #5EB6F6 100%)',
    textColor: '#1138D1',
    backgroundColor: '#F2FAFF'
  },
  {
    lvColor: 'linear-gradient(180deg, #E429B6 0%, #FA8FE1 100%)',
    textColor: '#E428B0',
    backgroundColor: '#FFF6FB'
  },
  {
    lvColor: 'linear-gradient(180deg, #F8740F 0%, #FEBE66 100%)',
    textColor: '#FF7904',
    backgroundColor: '#FEFCEC'
  }
]
export default {
  props: {
    anchoer: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  components: {
    Message,
    Face,
    GiftSvga,
    MultipleHitBack,
    ComeinSvga
  },

  data() {
    return {
      prompt: '',
      promptData: [],
      isShow: 1,
      source: 'app',
      comboCount1: 0, // 连击次数
      comboCount2: 0, // 连击次数
      delay: 6000, // 连击时间阈值，3秒
      timer: null, // 定时器,
      showSvgComein: false,
      xcdm: false,
      danmuValue: '',
      User_Level: '',
      mslist: false,
      tollModal: false,
      showwz: false,
      oldMessageTime: 0,
      gifModal: false,
      gifModalTabIndex: '0',
      User_Id: '',
      userInfo: {},
      btnstate: true,
      btn2state: true,
      giftList: [
        {
          title: '屏蔽礼物特效',
          value: '1'
        },
        {
          title: '屏蔽入场特效',
          value: '2'
        }
      ],
      gitZsSelect: 0,
      gitZsList: [],
      packageList: [
        {
          img: '/static/image/broadcast/pck1.png',
          money: '5个',
          label: '深蓝弹幕'
        },
        {
          img: '/static/image/broadcast/pck2.png',
          money: '5个',
          label: '樱粉弹幕'
        },
        {
          img: '/static/image/broadcast/pck3.png',
          money: '5个',
          label: '琥珀弹幕'
        }
      ],
      pckSelect: 0,

      giftCheck: [],
      checkVis: false,

      isFold: false,

      fsModel: false,

      selectGift_Id: '',
      selectpack_Id: '',
      showFace: false,
      userData: {},
      messageStyle: {},
      gift: {}, //礼物图标，无则空，
      giftNumberCount: '',
      isComeIn: false, //是否为进入直播间消息
      multipleHit: '', //为空则不是连击
      comeInList: [],
      showGiftSvg: false,
      showMultipleHit: false,
      scrollHeight: 0,
      scrollTop: 0,
      comeInLists: [],
	  colorfulList:[],
	  lvStatusList: [
	          {
				  num:0,
	            status: true,
	            default:'/static/ms/0-0.png',
	            select: '/static/ms/0-1.png',
				backgroundColor:"#F8F8F9"
	          },
	          {
				num:2,
	            status: false,
	            default: '/static/ms/2-0.png',
	            select: '/static/ms/2-1.png',
	            lock: '/static/ms/2-2.png',
				backgroundColor:'#EBEFFF'
	          },
	          {
				  num:8,
	            status: false,
	            default:'/static/ms/8-0.png',
	            select: '/static/ms/8-1.png',
	            lock: '/static/ms/8-2.png',
				backgroundColor:'#FEEEF8'
	          },
	          {
				  num:16,
	            status: false,
	            default: '/static/ms/16-0.png',
	            select: '/static/ms/16-1.png',
	            lock:'/static/ms/16-2.png',
				backgroundColor:'#FEEEF8'
	          },
	          {
				num:21,
	            status: false,
	            default: '/static/ms/21-0.png',
	            select: '/static/ms/21-1.png',
	            lock: '/static/ms/21-2.png',
				backgroundColor:'#FEEEF8'
	          }
	        ],
    }
  },

  onLoad() {},
  onShow() {},
  created() {
    this.getAnnouncement()
    this.User_Level = this.$store.state.userInfo.User_Level
    this.userData = this.$store.state.userInfo
    // this.messageStyle = dmStyle[0]
	this.messageStyle = dmStyle1[this.$store.state.userInfo.Nobility_Level||0]
	this.initDate()

    mitt.on('updateComeList', (data) => {
      this.comeInList = [data]
      this.playComein(data.vip, data)
      // this.handleScrollBottom('#comeInList')
    })

    mitt.on('updateMessage', (data) => {
      this.playGiftSvg(data)
      // this.handleScrollBottom('chat-gpt')
    })

    mitt.on('sendMessage', (isComeIn) => {
      this.isComeIn = isComeIn

      this.sendMessage()

      if (this.$store.state.userInfo.User_Id != undefined) {
        this.playComein(this.$store.state.userInfo.Nobility_Level)
      }
    });
	
  },
  mounted() {
    this.scroll_rect_height();
	if(this.$store.state.userInfo.User_Id!=null){
		this.huoqudanmushuliang()
	}
  },
  destroyed() {
  	this.showGiftSvg=false
	this.showMultipleHit=false
  },
  onReady() {},

  onPageScroll(e) {},

  methods: {
	  copyFn(name){
		  console.log(999)
		  uni.setClipboardData({
		   data: name,
		   success: () => {
			   uni.showToast({
			   	title: '复制成功',
			   	icon: 'none'
			   })
		   }
		  });
	  },
	   lvStatusBackUrl(index, item) {
	       if (this.userData.User_Level < item.num) {
	         return item.lock
	       }else{
				return item.default
		   }
	      },
	  msListsClick(item,index){
		  this.mslist=false;
		
		   this.lvStatusList.forEach((child) => {
		          child.status = false
		        })
		  
		        if (index !== 0) {
		          this.lvStatusBackUrl(index, item)
		  
		          switch (index) {
		            case 1:
		              if (this.userData.User_Level < 2) {
		                item.status = false
		                break
		              }
		              item.status = true
		              break
		            case 2:
		              if (this.userData.User_Level < 8) {
		                item.status = false
		                break
		              }
		              item.status = true
		              break
		            case 3:
		              if (this.userData.User_Level < 16) {
		                item.status = false
		                break
		              }
		              item.status = true
		              break
		  
		            case 4:
		              if (this.userData.User_Level < 21) {
		                item.status = false
		                break
		              }
		              item.status = true
		              break
		          }
		        } else {
		          item.status = true
		        }
		  
		        if (this.lvStatusList.every((item) => item.status === false)) {
		          this.lvStatusList[0].status = true
		        }
				
				 if (this.userData.Nobility_Level != undefined) {
					 if(this.userData.Nobility_Level==0){
					 						  if(this.userData.User_Level >= item.num){
					 						  		this.messageStyle = dmStyle[index]
					 						  }else{
					 						  		this.messageStyle = dmStyle[0]
					 						  }
					 }
				        if (this.userData.Nobility_Level == 1)
				          this.messageStyle.backgroundColor = '#EBEFFF'
				        if (this.userData.Nobility_Level == 2)
				          this.messageStyle.backgroundColor = '#FEEEF8'
				        if (this.userData.Nobility_Level == 3)
				          this.messageStyle.backgroundColor = '#FFF5EB'
				      }
					  
	  },
	  huoqudanmushuliang(){
		  ajaxTemplate('/LiveRoom/Get_Barrage_List', {
		    User_Id: this.$store.state.userInfo.User_Id
		  }).then((res) => {
			        // if (res.Result.length==0) {
			        //   this.showDM=false
			        // }
			        this.zhuangtai = res.Result?res.Result.length:0
			        let arr = []
			        let arr2 = [
			          {
			            Gift_Id: 1,
			            left: '/static/lzuo.png',
						center:"/static/lcenter.png",
			            right: '/static/lyou.png',
			            text: '深蓝弹幕',
			            class: 'slclass'
			          },
			          {
			            Gift_Id: 2,
			            left: '/static/fzuo.png',
			            center:"/static/fcenter.png",
			            right: '/static/fyou.png',
			            text: '樱粉弹幕',
			            class: 'yfclass'
			          },
			          {
			            Gift_Id: 3,
			            left: '/static/hzuo.png',
			            center:"/static/hcenter.png",
			            right: '/static/hyou.png',
			            text: '琥珀弹幕',
			            class: 'hpclass'
			          }
			        ]
			
			        if(res.Result&&res.Result.length>0){
						res.Result.forEach((item) => {
						  let obj = arr2.find((value) => value.Gift_Id === item.Gift_Id)
						  obj.text = obj.text + 'x' + item.Surplus_Num
						  obj.Surplus_Num = item.Surplus_Num
						  obj.Gift_Img = item.Gift_Img
						  arr.push(obj)
						})
					}
			
			        this.colorfulList = arr
		  })
	  },
	  colorfulClick(){
		this.xcdm = !this.xcdm  
		this.huoqudanmushuliang()
	  },
    danmusClick(item,index) {
    
	 this.xcdm=false
	   if (this.anchoer.Member_Type === 3) {
	         if (this.anchoer.IsBan === 1) {
	           return
	         }
	 
	         if (this.anchoer.IsEstoppel_All === 0) {
	           return
	         }
	       }
	 
	 
	       if (item.Surplus_Num <= 0) {
	         return
	       }
		   this.colorful=index
	
	       this.messageStyle.textColor=dmStyle[item.Gift_Id+1].textColor
    },
    itemChange(item) {
      this.$emit('item', item)
    },
    getAnnouncement() {
      ajaxTemplates(
        '/api/switch.aspx',
        {
          usersId: this.$store.state.user_Id || 0,
          source:uni.$Code
        },
        'POST',
        false
      ).then((res) => {
        // console.log(res.switch, 998888888);
        this.isShow = res.switch
        console.log(this.isShow, 998888777888)
        if (res.switch == '1') {
          this.prompt = res.prompt
          this.promptData = res.data
        }
      })
    },
    scroll_rect_height() {
      uni.getSystemInfo({
        success: (res) => {
          setTimeout(() => {
            const query = uni.createSelectorQuery().in(this)
            query
              .select('#messageBox')
              .boundingClientRect((data) => {
                let height = res.windowHeight - data.top - 55 - 38 //减去顶部距离和底部距离

                this.scrollHeight = height + 'px'
              })
              .exec()
          }, 80)
        }
      })
    },
    flodClick() {
      this.isFold = !this.isFold
      setTimeout(() => {
        this.scroll_rect_height()
      }, 300)
    },
    svgCallBack() {
      this.gift = {}
      this.showGiftSvg = false
    },
    multipleHitCallBack() {
      this.showMultipleHit = false
      this.multipleHit = ''
    },
    //打开表情框
    sendFace() {
      this.showFace = !this.showFace
    },
    async sendMessage(emo = null, text = null) {
      if (text === '') {
        if (this.danmuValue === '') {
          return
        }
      }
      this.userData = this.$store.state.userInfo
      console.log(
        this.userData,
        '=====================================================data'
      )
	 
      let obj = {
        lv: this.userData.User_Level || 0, //等级
        lvColor: this.messageStyle.lvColor, //等级颜色
        backgroundColor: this.messageStyle.backgroundColor, //背景色
        // name: this.userData.User_Name || localStorage.getItem('noLoginUserName'), //昵称
        name: this.userData.User_Name || uni.getStorageSync('匿名'), //昵称
        User_Id: this.userData.User_Id ? this.userData.User_Id : 0, //昵称
        text: this.danmuValue, //消息文字
        textColor: this.messageStyle.textColor, //文字颜色,
        emo: emo === null ? '' : emo.url, //表情消息，无则不是,
        isUp: this.anchoer.Member_Type === 1 ? true : false, //是否主播
        vip:
          this.anchoer.Nobility_Level == 0 ? '' : this.anchoer.Nobility_Level, //贵族等级，无则不是贵族
        isRoomManager: this.anchoer.Member_Type === 2 ? true : false, //是否房管
        colorful: this.colorful, //炫彩样式，无则空
        gift: this.gift, //礼物图标，无则空对象，
        giftNumberCount: this.giftNumberCount,
        isComeIn: this.isComeIn, //是否为进入直播间消息
        multipleHit: this.multipleHit ,//为空则不是连击
		User_Logo:this.userData.User_Logo
      }

		
		if (obj.isComeIn) {
		  this.comeInList = [obj]
		  // this.comeInList.push(obj)
		  // this.handleScrollBottom('#comeInList')
		} else {
		  this.$refs.messages.messageList.push(obj)
		  // this.handleScrollBottom('#messageBox')
		}
		ajaxTemplate("/LiveRoom/Is_EstoppelOrBan",{
			 Group_Id: this.anchoer.Match_Group_Id,
			        User_Id: obj.User_Id
		}).then((res)=>{
			console.log(res)
			  if (res.Result.IsEstoppelOrBan) {
			          // this.$Message.error('您已被禁言或封禁')
					  uni.showToast({
					  	title: '您已被禁言或封禁',
					  	icon: 'none'
					  })
			          return
			        }
			
			// this.playGiftSvg(obj)
			sendDIY(this.anchoer.Match_Group_Id, 'group', obj, (res) => {
			  this.showFace = false
			})
			mitt.emit('updateMessage', obj)
			// if (obj.isComeIn) {
			//   this.comeInList = [obj]
			//   // this.comeInList.push(obj)
			//   this.handleScrollBottom('#comeInList')
			// } else {
			//   this.$refs.messages.messageList.push(obj)
			//   this.handleScrollBottom('#messageBox')
			// }
			setTimeout(() => {
			  const query = uni.createSelectorQuery().in(this)
			  query
			    .select('.scroll-all')
			    .boundingClientRect((data) => {
			      this.scrollTop = data.height
			    })
			    .exec()
			}, 80)
			this.gift = {}
			this.isComeIn = false
			this.tollModal = false
			this.danmuValue = ''
			this.colorful = '' //清空炫彩弹幕
		})


      
	  
	  
    },
    //播放礼物svga
    playGiftSvg(obj) {
      if (obj.gift.giftUrl !== undefined) {
        if (this.showGiftSvg == true) {
          setTimeout(()=>{
			  this.$refs.giftSvga.svgList=[obj.gift.giftSvg]
		  },100)
        } else {
          if (this.giftCheck.indexOf('1') >= 0) return
          this.showGiftSvg = true
          this.$refs.giftSvga.svgList = [obj.gift.giftSvg]
          this.$refs.giftSvga.playSvg(this.$refs.giftSvga.svgList[0])
        }

        if (obj.multipleHit !== '') {
          let giftDetail = {
            userName: obj.name,
            giftUrl: obj.gift.giftUrl,
            giftNumber: obj.giftNumberCount,
            giftMultipleHitNumber: obj.multipleHit
          }

          if (this.showMultipleHit === true) {
            if (
              this.$refs.multipleHitBack.giftDetail.userName ===
                giftDetail.userName &&
              this.$refs.multipleHitBack.giftDetail.giftUrl ===
                giftDetail.giftUrl
            ) {
              this.$refs.multipleHitBack.giftNumber = String(
                giftDetail.giftNumber
              ).split('')
              this.$refs.multipleHitBack.giftMultipleHitNumber = String(
                giftDetail.giftMultipleHitNumber
              ).split('')

              this.$refs.multipleHitBack.cancelTimer()

              //this.$refs.multipleHitBack.giftDetails.unshift(giftDetail)
              //this.$refs.multipleHitBack.show()
            } else {
              this.$refs.multipleHitBack.giftDetails.push(giftDetail)
            }
          } else {
            this.showMultipleHit = true

            this.$refs.multipleHitBack.giftDetails = [giftDetail]
            this.$refs.multipleHitBack.show()
          }
        }
      }
    },
    playComein(value, data = {}) {
      console.log(
        data,
        'this.$store.state.userInfo.User_Logo'
      )
      if (this.giftCheck.indexOf('2') >= 0) return
      // this.$refs.comeinSvg.header = this.$store.state.userInfo.User_Logo||''
      // this.$refs.comeinSvg.name = this.$store.state.userInfo.User_Name||data.name

      if (value === 1) {
        this.$refs.comeinSvg.svgLeft =
          'https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/qishi.svga'
        this.$refs.comeinSvg.svgRight =
          'https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/fox_in.svga'
        this.$refs.comeinSvg.playLeft()
        this.$refs.comeinSvg.playRight()
        this.showSvgComein = true

        this.$refs.comeinSvg.header = data.User_Logo||this.$store.state.userInfo.User_Logo || ''
        this.$refs.comeinSvg.name =data.name||this.$store.state.userInfo.User_Name
      }
      if (value === 2) {
        this.$refs.comeinSvg.svgLeft =
          'https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/gongjue.svga'
        this.$refs.comeinSvg.svgRight =
          'https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/lion_in.svga'
        this.$refs.comeinSvg.playLeft()
        this.$refs.comeinSvg.playRight()
        this.showSvgComein = true
        this.$refs.comeinSvg.header = data.User_Logo||this.$store.state.userInfo.User_Logo || ''
        this.$refs.comeinSvg.name =data.name||this.$store.state.userInfo.User_Name
      }
      if (value === 3) {
        this.$refs.comeinSvg.svgLeft =
          'https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/dihuang.svga'
        this.$refs.comeinSvg.svgRight =
          'https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/long_in.svga'
        this.$refs.comeinSvg.playLeft()
        this.$refs.comeinSvg.playRight()
        this.showSvgComein = true
        this.$refs.comeinSvg.header = data.User_Logo||this.$store.state.userInfo.User_Logo || ''
        this.$refs.comeinSvg.name =data.name||this.$store.state.userInfo.User_Name
      }
    },
    sendpack() {
      this.comboCount1++
      if (this.comboCount1 > 1) {
        this.multipleHit = this.comboCount1

        if (this.timer !== null) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.comboCount1 = 0
          this.multipleHit = ''
        }, this.delay)
      }
	  

      let giftThing = this.packageList[this.pckSelect]

      this.gift = {
        giftUrl: giftThing.Gift_Img,
        giftSvg: giftThing.Gift_Svag
      }
      if (giftThing.Surplus_Num > 0) {
        this.$emit('sendMessage')
        giftThing.Surplus_Num -= 1

        if (giftThing.Surplus_Num === 0) {
          this.$nextTick(() => {
            this.packageList = this.packageList.splice(index, 0)

            console.log(this.packageList)
          })
        }
        ajaxTemplate('/LiveRoom/Send_Self_Gift', {
          User_Id: this.$store.state.userInfo.User_Id,
          Anchoer_Id: this.anchoer.Anchoer_Id,
          Gift_Id: this.selectpack_Id
        }).then((res) => {
          console.log(res)
        })
      } else {
        this.comboCount1 = 0
      }

      //背包使用/LiveRoom/Send_Self_Gift
    },
    //点击背包
    pckSelectfn(item, index) {
      this.pckSelect = index
      this.selectpack_Id = item.Gift_Id
    },
    sendGift() {
      const userInfo = this.$store.state.userInfo
      

      let giftThing = this.gitZsList[this.gitZsSelect]

      this.gift = {
        giftUrl: giftThing.Gift_Img,
        giftSvg: giftThing.Gift_Svag
      }
	  let combo=uni.getStorageSync('giftsss-'+giftThing.Gift_Img)
	  if(combo){
		  combo.key++
		  uni.setStorageSync('giftsss-'+giftThing.Gift_Img,combo)
			this.multipleHit = uni.getStorageSync('giftsss-'+giftThing.Gift_Img).key
			  if (this.timer !== null) {
			    clearTimeout(this.timer)
			  }
			 
	  }else{
		  this.comboCount2++
		  uni.setStorageSync('giftsss-'+giftThing.Gift_Img,{
			  key:this.comboCount2,
			  value:giftThing.Gift_Img
		  })
		  this.comboCount2 = 0
	  }
	  this.timer = setTimeout(() => {
	  	this.comboCount2 = 0
	  	this.multipleHit = ''
	  	uni.removeStorageSync('giftsss-'+giftThing.Gift_Img)
	  }, this.delay)
	  

      if (giftThing.Spend_Gold_Coin != 0) {
        if (
          userInfo.Gold_Coin >
          giftThing.Spend_Gold_Coin * this.giftNumberCount
        ) {
          ajaxTemplate('/LiveRoom/Send_LiveRoom_Gift', {
            User_Id: this.$store.state.userInfo.User_Id,
            Anchoer_Id: this.anchoer.Anchoer_Id,
            Gift_Id: this.selectGift_Id,
            Gift_Num: 1
          }).then((res) => {
            this.sendMessage()
            const messages = res.Code == 200 ? '赠送成功' : res.Message
            uni.showToast({
              title: messages,
              mask: true,
              icon: 'none'
            })
            this.gifModal = false

            uni.$emit('getUserInfo')
          })
        } else {
          uni.showToast({
            title: '金币不足',
            mask: true,
            icon: 'none'
          })
          this.comboCount2 = 0
        }
      }

      if (giftThing.Spend_Silver_Coin != 0) {
        if (
          userInfo.Silver_Coin >
          giftThing.Spend_Silver_Coin * this.giftNumberCount
        ) {
          // this.sendMessage()
          ajaxTemplate('/LiveRoom/Send_LiveRoom_Gift', {
            User_Id: this.$store.state.userInfo.User_Id,
            Anchoer_Id: this.anchoer.Anchoer_Id,
            Gift_Id: this.selectGift_Id,
            Gift_Num: 1
          }).then((res) => {
            this.sendMessage()
            const messages = res.Code == 200 ? '赠送成功' : res.Message
            uni.showToast({
              title: messages,
              mask: true,
              icon: 'none'
            })
            this.gifModal = false
            uni.$emit('getUserInfo')
          })
        } else {
          uni.showToast({
            title: '银币不足',
            mask: true,
            icon: 'none'
          })
          this.comboCount2 = 0
        }
        return
      }

      // console.log( this.anchoer.Anchoer_Id,this.selectGift_Id,)
      //购买礼物赠送LiveRoom/Send_LiveRoom_Gift
    },
    //点击礼物
    gitZsSelectfn(item, index) {
      this.gitZsSelect = index
      this.selectGift_Id = item.Gift_Id
    },
    togz() {
      uni.navigateTo({
        url: '/pages/myView/privilege/privilege'
      })
    },
    toll() {},
    sendDanmu() {
      this.sendMessage(null, '')
      //uni.$emit('sendDanmu', this.danmuValue)

      console.log('发送消息啦')
    },
    keyboardheightchange(event) {
      console.log(event.detail.height)
      if (event.detail.height == 0) {
        this.tollModal = false
		this.xcdm=false
      }
    },
    tollFn() {
      this.notLogin()
      this.tollModal = true
    },
    fn() {
      if (this.anchoer.Member_Type == '3') {
        //成员
        if (this.anchoer.IsEstoppel_All == '0') {
          //全员禁言
          //显示全员禁言中
          return '全员禁言中'
        } else {
          if (this.anchoer.IsBan == '1') {
            //封禁
            if (this.anchoer.Ban_Type == '1') {
              //显示剩余封禁时长，倒计时
              //Ban_Second
              return '您已被封禁，10 秒'
            } else {
              //显示永久封禁
              return '您已被永久封禁'
            }
          } else {
            if (this.anchoer.IsEstoppel == '1') {
              //禁言
              if (this.anchoer.Estoppel_Type == '1') {
                //显示剩余禁言时长，倒计时
                //Estoppel_Time
                return '您已被禁言，10 秒'
              } else {
                //显示永久禁言
                return '您已被永久禁言'
              }
            }
          }
        }
      }
    },
    handleShowTime() {
      if (this.messages) {
        Array.from(this.messages).forEach((item) => {
          if (item.time - this.oldMessageTime > 5 * 60) {
            this.oldMessageTime = item.time
            item.showTime = true
          } else {
            item.showTime = false
          }
        })
      }
    },
    gifModalFn() {
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
      this.userInfo = this.$store.state.userInfo
      this.gifModal = true
      //礼物
      ajaxTemplate('/LiveRoom/Get_Gift_List', {}).then((res) => {
        this.gitZsList = res.Result
        console.log(123, res)
        // this.anchoer = res.Result;
        this.selectGift_Id = res.Result[0].Gift_Id
      })
      //背包
      ajaxTemplate('/LiveRoom/Get_Self_Gift_List', {
        User_Id: this.User_Id
      }).then((res) => {
        this.packageList = res.Result
        console.log('背包', res)
        // this.anchoer = res.Result;
        this.selectpack_Id = res.Result.length > 0 ? res.Result[0].Gift_Id : ''
      })
    },
    initDate() {},
    notLogin() {
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
    },
    svgCheckClick() {
      this.notLogin()
      this.checkVis = !this.checkVis
    },
    toggleCheck(val) {
      const dex = this.giftCheck.indexOf(val)
      if (dex !== -1) {
        this.giftCheck.splice(dex, 1)
      } else {
        this.giftCheck.push(val)
      }
    },
    getColor(val) {
      if (this.giftCheck.includes(val)) {
        return {
          color: '#F0222C !important'
        }
      }
      return {}
    },
    getCheckImg(val) {
      if (this.giftCheck.includes(val)) {
        return '/static/image/broadcast/check.png'
      }
      return '/static/image/broadcast//un-check.png'
    },
    handleScrollBottom(name) {
      // setTimeout(() => {
      // 	const query = uni.createSelectorQuery().in(this);
      // 	query.select(name).boundingClientRect(res => {
      // 		console.log(res)
      // 		if (res === null) return
      // 		let newbottom = res.bottom + res.height
      // 		uni.pageScrollTo({
      // 			duration: 100, // 过渡时间
      // 			scrollTop: newbottom + 1000 // 滚动的实际距离
      // 		})
      // 	}).exec();
      // }, 80)
      // uni
      // 	.createSelectorQuery()
      // 	.select(name)
      // 	.boundingClientRect((res) => {
      // 		console.log(res)
      // 		if (res === null) return
      // 		let newbottom = res.bottom + res.height
      // 		uni.pageScrollTo({
      // 			duration: 100, // 过渡时间
      // 			scrollTop: newbottom + 1000 // 滚动的实际距离
      // 		})
      // 	})
      // 	.exec()
    }
  }
}
</script>

<style lang="scss" scoped>
.xcdm {
  width: 248rpx;
  padding: 24rpx 6rpx;
  height: 312rpx;
  background: #ffffff;
  box-shadow: 0px 0px 12rpx 2rpx #e2e3e5;
  border-radius: 8rpx;
  opacity: 1;
  position: absolute;
  top: -340rpx;
  right: 20rpx;
  z-index: 99999;

  .xcdmitem {
    height: 80rpx;
    width: 100%;
    margin-bottom: 12rpx;
    position: relative;
  }
}

.scroll-view_H {
  white-space: nowrap;
  width: 68%;
  margin-right: 150rpx;
}

.toll {
  width: 750rpx;
  // height: 212rpx;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;

  .tollbottom {
    width: 100%;
    height: 104rpx;
    border-top: 2rpx solid #e7e9ee;
    display: flex;
    align-items: center;
  }

  .tolltop {
    width: 100%;
    height: 104rpx;

    display: flex;
    align-items: center;
  }

  .mslist {
    height: 82rpx;
    width: 100%;
    position: absolute;
    top: -82rpx;
    background: #ffffff;
    display: flex;
    align-items: center;
  }
}

.tollinput {
  width: 426rpx;
  height: 72rpx;
  background: #f2f3f3;
  border-radius: 36rpx;
  opacity: 1;
  color: #c0c2cb;
  line-height: 72rpx;
  font-size: 26rpx;
  padding-left: 50rpx;
}

.announcement {
  position: relative;
  background-image: url('/static/image/broadcast/announcement-bk.png');
  display: flex;
  flex-direction: column;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 8px 17px;

  .fold {
    width: 100%;
    transition: max-height 0.5s;
    max-height: 0;

    overflow: hidden;

    &.is-show {
      max-height: 200px;
      /*大概的值，需要超过元素高度*/
    }

    .item {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #ffffff;
      width: 100%;
      height: 24px;
      margin-top: 4px;
      padding: 4px 10px;
      display: flex;
      justify-content: space-between;

      background: rgba(114, 114, 135, 0.5);
      border-radius: 4px 4px 4px 4px;
      opacity: 0.5;

      &:first-child {
        margin-top: 9px;
      }

      &:last-child {
        margin-bottom: 13px;
      }
    }
  }

  .down-btn {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: -28rpx;
    right: 0;
    z-index: 99;
  }
}

.chart {
  // height: 0;
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-top: 15px;
  // padding: 0 10px;
  padding-bottom: 115rpx;
}

.foot {
  padding: 0 10rpx;
  height: 110rpx;
  background: #ffffff;
  position: absolute;
  bottom: 68rpx;
  background: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;

  image {
    flex-shrink: 0;
  }

  .input {
    flex: 1;
    height: 68rpx;
    background: #f5f5f5;
    border-radius: 38rpx;
    font-size: 26rpx;
    color: #c0c2cb;
    line-height: 68rpx;
    padding-left: 50rpx;

    margin-right: 20rpx;
  }
}

.popup-example-block {
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 800rpx;
  width: 100%;
  background-color: #fff;

  .hd {
    width: 100%;
    height: 112rpx;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    background-image: url('/static/image/broadcast/gif_bk.png');
    padding: 26rpx 48rpx;

    .btns {
      display: inline-flex;
      background: #ffffff;
      border-radius: 34rpx;
      border: 1px solid #FC683E;
      padding: 4rpx;

      text {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FC683E;
        background: #fff;
        width: 112rpx;
        height: 52rpx;
        border-radius: 34rpx;
        transition: all 0.3s;

        &.active {
          color: #ffffff;
          background: #FC683E;
        }
      }
    }
  }

  .type-0 {
    flex: 1;
    display: flex;
    flex-direction: column;

    .gitf-card {
      padding: 9px 13px;
      // flex: 1;
      overflow: auto;
      display: flex;
      // justify-content: space-around;
      flex-wrap: wrap;
      justify-content: space-around;
      overflow-y: scroll;
      height: 300px;

      .gitf-item {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 80px;
        height: 88px;
        background: #f9f9fb;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid transparent;
        margin-bottom: 10px;

        &.active {
          border-color: #FC683E;
        }

        image {
          width: 100rpx;
          height: 100rpx;
          margin-bottom: 6rpx;
        }

        .label {
          font-size: 13px;
          color: #333333;
          margin-bottom: 3px;
        }

        .money {
          font-size: 10px;
          color: #9ea2af;
        }
      }
    }

    .btn3 {
      position: absolute;

      right: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 68rpx;
      background: linear-gradient(90deg, #FC683E 0%, #FC683E 100%);
      border-radius: 17px 17px 17px 17px;
      color: #ffffff;
    }

    .gift-footer {
      height: 120rpx;
      width: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;

      .btn2 {
        height: 68rpx;
        border-radius: 34rpx;
        opacity: 1;

        position: absolute;
        bottom: 21rpx;
        right: 20rpx;
        display: flex;
        align-items: center;
        z-index: 999;
        background-color: #fff;
      }

      .btn {
        position: absolute;
        bottom: -2rpx;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 68rpx;
        background: linear-gradient(90deg, #FC683E 0%, #FC683E 100%);
        border-radius: 17px 17px 17px 17px;
        color: #ffffff;
      }
    }
  }

  .type-1 {
    flex: 1;
    display: flex;
    flex-direction: column;

    .pck-card {
      padding: 9px 13px;
      // flex: 1;
      overflow: auto;
      display: flex;
      // justify-content: space-around;
      flex-wrap: wrap;

      .pck-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 80px;
        height: 88px;
        background: #f9f9fb;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid transparent;
        margin-bottom: 10px;
        // padding:12px 16px 9px 16px;

        &.active {
          border-color: #FC683E;
        }

        image {
          width: 100rpx;
          height: 100rpx;
          margin-bottom: 6rpx;
        }

        .label {
          font-size: 13px;
          color: #333333;
          margin-bottom: 3px;
        }

        .money {
          font-size: 10px;
          color: #9ea2af;
        }
      }
    }

    .btn4 {
      position: absolute;

      right: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 68rpx;
      background: linear-gradient(90deg, #FC683E 0%, #FC683E 100%);
      border-radius: 17px 17px 17px 17px;
      color: #ffffff;
    }

    .pck-footer {
      height: 120rpx;
      width: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;

      .btn2 {
        height: 68rpx;
        border-radius: 34rpx;
        opacity: 1;

        position: absolute;
        bottom: 21rpx;
        right: 20rpx;
        display: flex;
        align-items: center;
        z-index: 999;
        background-color: #fff;
      }

      .btn {
        position: absolute;
        bottom: -2rpx;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 68rpx;
        background: linear-gradient(90deg, #ee2144 0%, #e3121e 100%);
        border-radius: 17px 17px 17px 17px;
        color: #ffffff;
      }
    }
  }
}

::v-deep .fensi-example-block {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 800rpx;
  overflow: auto;
  background-color: #f5f5f5;

  .card-1 {
    // height: 145px;
    background: linear-gradient(135deg, #fff2ec 0%, #fffff8 50%, #dffbff 100%);
    border-radius: 8px 8px 0px 0px;
    padding: 15px 12px;

    .tp {
      display: flex;
      align-items: center;

      .tip {
        display: flex;
        flex-direction: column;

        text {
          &:first-child {
            color: #333;
            margin-bottom: 8px;
            font-size: 14px;
          }

          &:last-child {
            color: #9094a5;
            font-size: 11px;
          }
        }
      }
    }

    .fav {
      margin-top: 21px;
      display: flex;
      justify-content: space-between;

      view {
        text {
          display: block;

          &:first-child {
            color: #9094a5;
            font-size: 12px;
            margin-bottom: 12px;
          }

          &:last-child {
            color: #333;
            font-size: 16px;
          }
        }
      }
    }
  }

  .card-2 {
    padding: 16px 12px;
    padding-bottom: 21px;
    background: white;

    text {
      display: block;
      color: #333333;

      &:first-child {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
      }

      &:last-child {
        font-size: 11px;
      }
    }
  }

  .card-3 {
    margin-top: 18px;

    .title {
      margin-bottom: 40rpx;
      position: relative;
      text-align: center;

      image {
        width: 138px;
        height: 32px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
      }

      text {
        display: inline-block;
        z-index: 9;
        line-height: 32px;
        position: relative;
        font-size: 14px;
        color: white;
      }
    }

    .qz-list {
      display: flex;
      flex-direction: column;

      .item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 70px;
        padding: 14px 12px;
        background: white;
        margin-bottom: 10px;

        .lf {
          text {
            display: block;

            &:first-child {
              font-size: 14px;
            }

            &:last-child {
              text-align: center;
              margin-top: 6px;
              width: 64px;
              height: 20px;
              background: #f2f3f3;
              border-radius: 2px 2px 2px 2px;
              opacity: 1;
              color: #9094a5;
            }
          }
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 26px;
          background: #ee2144;
          border-radius: 13px 13px 13px 13px;

          font-size: 12px;
          color: #ffffff;
        }
      }
    }
  }
}

.svgAnimation {
  height: calc(100% - 55px);
  position: absolute;
  z-index: 1;
}
</style>
