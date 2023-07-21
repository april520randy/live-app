<template>
  <view class="content">
    <view style="height: 88rpx; width: 100%; background-color: #000"></view>

    <!-- 动画直播间 -->
    <view v-if="activeIndex == 2" class="Animate" @click="AnimatetitleshowFn">
      <view class="AnimateTitle" v-if="Animatetitleshow">
        <image
          @click="back"
          style="width: 40rpx; height: 40rpx"
          src="/static/back2.png"
          mode="widthFix"
        >
        </image>
      </view>

      <image
        style="width: 100%; height: 100%"
        src="/static/zuq.png"
        v-if="!Animation.animation_Url"
        mode="aspectFill"
      >
      </image>

      <iframe
        v-if="Animation.animation_Url && Animation.category2_id == 2"
        frameborder="no"
        :src="Animation.animation_Url"
        style="height: 600rpx; width: 100%; pointer-events: none"
      >
      </iframe>
      <iframe
        v-if="Animation.animation_Url && Animation.category2_id == 1"
        frameborder="no"
        :src="'https://www.dltkh.top/m.html?id=' + this.Id"
        style="height: 600rpx; width: 100%; pointer-events: none"
      >
      </iframe>
    </view>

    <!-- 视频直播间 -->

    <video
      v-if="activeIndex == 1"
      id="myVideo"
      style="width: 100%; height: 420rpx; position: relative"
      :controls="isFullScreen"
      :autoplay="true"
      :enable-progress-gesture="false"
      :enable-danmu="enabledanmu"
      :danmu-btn="false"
      :danmu-list="danmuList"
      @fullscreenchange="fullscreenchange"
      :is-live="true"
      :show-progress="false"
      :show-play-btn="false"
      :play-strategy="2"
      :show-center-play-btn="false"
      :src="anchoer.Match_Pushurl1"
      :title="anchoer.Match_Title"
    >
      <!-- <cover-view style="position: absolute; top: 0px; width: 100%;height:100%;">
				<vue-danmaku ref="danmaku" v-model:danmus="danmus" useSlot loop :channels="5"
					style="height:100px; width:300px;">
					<template v-slot:dm="{ index, danmu }">
						<cover-view style="display: flex; align-items: center">
							99 
						</cover-view>
					</template>
				</vue-danmaku> 
				
			</cover-view> -->
      <!-- <lff-barrage ref="lffBarrage"></lff-barrage> -->
      <cover-view
        @click="titleshow = !titleshow"
        style="width: 100%; height: 100%"
      >
        <cover-view class="nav" v-if="titleshow">
          <cover-image
            @click="back"
            style="
              width: 40rpx;
              height: 40rpx;
              margin-left: 20rpx;
              margin-right: 8rpx;
            "
            src="../../../static/back2.png"
            mode="widthFix"
          >
          </cover-image>
          <cover-view
            style="
              width: 170px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            {{ anchoer.Match_Title || '' }}
          </cover-view>
          <!--  <cover-view class="gaoqing" @click.stop="showgaoqFn"
            >{{ gaovalue }}
          </cover-view>
          <cover-image
            style="width: 22px; height: 22px"
            src="/static/image/broadcast/share.png"
            @click.stop="fenxshow = true"
          >
          </cover-image> -->
        </cover-view>
        <cover-view class="nav2" v-if="titleshow">
          <cover-image
            style="width: 20rpx; height: 20rpx; margin-right: 6rpx"
            src="/static/huomiao.png"
          >
          </cover-image>
          <cover-view>
            {{ anchoer.Match_Hot }}
          </cover-view>
          <cover-image
            style="
              width: 20rpx;
              height: 20rpx;
              margin-left: 28rpx;
              margin-right: 6rpx;
            "
            src="/static//fangzi.png"
          >
          </cover-image>
          <cover-view>
            {{ anchoer.Anchoer_Id }}
          </cover-view>
        </cover-view>
        <cover-view class="nav3" v-if="titleshow">
          <!-- <cover-image
		  @click.stop="refreshClick"
            style="width: 44rpx; height: 44rpx; margin-left: 30rpx"
            src="/static/shuax.png"
          >
          </cover-image>
          <cover-image
            v-if="enabledanmu"
			@click.stop="danmuClick"
            style="
              width: 44rpx;
              height: 44rpx;
              margin-right: 30rpx;
              margin-left: 518rpx;
            "
            src="/static/danm.png"
          >
          </cover-image> -->
          <!-- <cover-image
            v-if="!enabledanmu"
			@click.stop="danmuClick"
            style="
              width: 44rpx;
              height: 44rpx;
              margin-right: 30rpx;
              margin-left: 518rpx;
            "
            src="/static/danm2.png"
          >
          </cover-image> -->
          <cover-image
            @click="playVedio"
            style="width: 44rpx; height: 44rpx; margin-right: 30rpx"
            src="/static/quanp.png"
          >
          </cover-image>
        </cover-view>

        <cover-view class="showgaoq" v-if="showgaoq">
          <cover-view> 清晰度选择&nbsp; </cover-view>
          <cover-view
            class="gaoq"
            :style="{
              border:
                gaovalue == '高清'
                  ? '2rpx solid #F0222C'
                  : 'border: 4rpx solid #FFFFFF',
              color: gaovalue == '高清' ? '#F0222C' : '#FFFFFF'
            }"
            @click.stop="changeshow"
          >
            <cover-view>高清</cover-view>
          </cover-view>
          <cover-view
            class="biaoq"
            :style="{
              border:
                gaovalue == '标清'
                  ? '2rpx solid #F0222C'
                  : 'border: 4rpx solid #FFFFFF',
              color: gaovalue == '标清' ? '#F0222C' : '#FFFFFF'
            }"
            @click.stop="changeshow2"
          >
            <cover-view>标清</cover-view>
          </cover-view>
        </cover-view>
      </cover-view>

      <!-- 全屏样式 -->
      <cover-view v-if="isFullScreen" class="isFullScreen">
        <cover-view class="nav">
          <cover-image
            @click="back"
            style="
              width: 40rpx;
              height: 40rpx;
              margin-left: 20rpx;
              margin-right: 8rpx;
            "
            src="../../../static/image/back.png"
            mode="widthFix"
          >
          </cover-image>
          <cover-view
            style="
              width: 170px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            {{ anchoer.Match_Title || '' }}
          </cover-view>
          <cover-view class="gaoqing" @click="showgaoqFn"
            >{{ gaovalue }}
          </cover-view>
          <cover-image
            style="width: 22px; height: 22px"
            src="/static/image/broadcast/share.png"
          >
          </cover-image>
        </cover-view>
        <cover-view class="nav3">
          <cover-image
            style="width: 44rpx; height: 44rpx; margin-left: 30rpx"
            src="/static/shuax.png"
          >
          </cover-image>
          <cover-image
            style="
              width: 44rpx;
              height: 44rpx;
              margin-right: 30rpx;
              margin-left: 518rpx;
            "
            src="/static/danm.png"
          >
          </cover-image>
          <cover-image
            @click="playVedio2"
            style="width: 44rpx; height: 44rpx; margin-right: 30rpx"
            src="/static/quanp.png"
          >
          </cover-image>
        </cover-view>
      </cover-view>
    </video>

    <view class="main">
      <!-- <view class="menu">
				<text @click="activeIndex = 1" :class="{ active: activeIndex == 1 }">视频</text>
				<text @click="activeIndex = 2" :class="{ active: activeIndex == 2 }">动画</text>
			</view> -->
      <pageVideo
        v-if="activeIndex == 1"
        :anchoer="anchoer"
        @changeLiveRoomDetail="changeLiveRoomDetail"
        @sendDanmu="sendDanmu"
        @item="itemChange"
        :Match_Id="Match_Id"
      >
      </pageVideo>

      <pageAnimate
        :category_id="Animation.category2_id"
        :away_Logo="Animation.away_TeamLogo"
        :home_Logo="Animation.home_TeamLogo"
        :home="Animation.home_TeamName"
        :away="Animation.away_TeamName"
        v-if="activeIndex == 2"
        ref="pageanimate"
        :Match_Id="Match_Id"
      ></pageAnimate>
    </view>

    <view class="fenx" v-if="fenxshow">
      <view class="fenxcontent">
        <view class="contentitem" @click="appShare('WXSenceTimeline')">
          <image style="width: 80rpx; height: 80rpx" src="/static/wxpyq.png">
          </image>
          <view> 微信朋友圈 </view>
        </view>
        <view class="contentitem" @click="appShare('WXSceneSession')">
          <image style="width: 80rpx; height: 80rpx" src="/static/weix.png">
          </image>
          <view> 微信 </view>
        </view>
        <view class="contentitem">
          <image style="width: 80rpx; height: 80rpx" src="/static/qq.png">
          </image>
          <view> QQ </view>
        </view>
        <view class="contentitem">
          <image style="width: 80rpx; height: 80rpx" src="/static/xlwb.png">
          </image>
          <view> 新浪微博 </view>
        </view>
        <view class="contentitem">
          <image style="width: 80rpx; height: 80rpx" src="/static/lianj.png">
          </image>
          <view> 链接 </view>
        </view>
        <view class="contentitem">
          <image style="width: 80rpx; height: 80rpx" src="/static/jb.png">
          </image>
          <view> 举报 </view>
        </view>
      </view>
      <view class="fenxbottom" @click="fenxshow = false"> 取消分享 </view>
    </view>
    <page-proh ref="isBan"></page-proh>
  </view>
</template>

<script>
import lffBarrage from '@/components/lff-barrage/lff-barrage.vue'
import pageVideo from './modules/page_video/index.vue'
import pageAnimate from './modules/page_animate/index.vue'
import pageProh from './modules/page_video/prohibition.vue'
import { ajaxTemplate } from '../../../api/index.js'
import { login, joinAVChatRoom, logout } from '/utils/iM.js'
import mitt from '../../../utils/bus.ts'
export default {
  components: {
    pageVideo,
    pageAnimate,
    lffBarrage,
    pageProh
  },
  data() {
    return {
      userInfor: {},
      Animation: {},
      Animatetime: '',
      Animatetitleshow: false,
      fenxshow: false,
      enabledanmu: true,
      fenxshow: false,
      enabledanmu: true,
      danmus: [
        {
          name: '今天有湖人的比赛吗？',
          color: '#fff'
        },
        {
          name: '礼物走一波',
          color: '#fff'
        },
        {
          name: '无敌啦',
          color: '#fff'
        }
      ],
      isFullScreen: false,
      gaovalue: '高清',
      showgaoq: false,
      titleshow: true,
      anchoer: {},
      activeIndex: 1,
      // Anchoer_Id: '',
      Match_Id: '',
      Id: '',
      message: {},
      danmuList: [],
      time: '',
      chatItemInfo: {},
      prohState: false
    }
  },
  onShow() {},
  watch: {
    titleshow: {
      handler(newvalue, oldvalue) {
        if (this.time) {
          clearTimeout(this.time)
        }
        console.log('titleshow', newvalue, oldvalue)
        if (newvalue == true) {
          this.time = setTimeout(() => {
            this.titleshow = false
          }, 5000)
        }
      },
      immediate: true
    },
    Animatetitleshow: {
      handler(newvalue, oldvalue) {
        if (this.Animatetime) {
          clearTimeout(this.Animatetime)
        }
        console.log('Animatetitleshow', newvalue, oldvalue)
        if (newvalue == true) {
          this.Animatetime = setTimeout(() => {
            this.Animatetitleshow = false
          }, 5000)
        }
      },
      immediate: true
    }
  },
  onLoad(options) {
  //   mitt.on('updateMessage', (data) => {
		// console.log(data)
  //     //弹幕
  //     if (data.text !== '') {
  //       this.sendDanmu(data.text, data.textColor);

  //     }

  //     //svga
  //   })

    this.Match_Id = options.Match_Id
    this.activeIndex = options.activeIndex
    this.Id = options.Id
    if (options.Anchoer_Id != undefined) {
      this.Anchoer_Id = options.Anchoer_Id
    }
    console.log(options, 'aaaaaaaaaa')
    // this.$refs.pageanimate.Match_Id=options.Match_Id
    setTimeout(() => {
      this.initDate()
      this.getAnimationDetail()
      this.gethistory()

      // this.$refs.lffBarrage.add({item:'你好呀小伙子'});
      // this.$refs.lffBarrage.add({item:'你好呀小伙子'});
      // this.$refs.lffBarrage.add({item:'小伙子'});
    }, 200)
  },
  onReady() {
    this.videoContext = uni.createVideoContext('myVideo')
  },

  onPageScroll(e) {},
  methods: {
    itemChange(item) {
      console.log(item)
      console.log(this.anchoer)
      // if(this.anchoer.Anchoer_Id==this.$store.state.userInfo.User_Id){
      // this.chatItemInfo=item
      // this.prohState=true
      // }
      ajaxTemplate('/LiveRoom/GetLiveRoom_UserDetail', {
        Group_Id: this.anchoer.Match_Group_Id,
        User_Id: item.User_Id
      }).then((res) => {
        console.log(res)
        this.userInfor = res.Result
        if (this.anchoer.Member_Type
 == 1) {
          console.log(this.userInfor)
          if (this.userInfor.Member_Type == 1) return
          this.$refs.isBan.modal2 = true
		  this.$refs.isBan.admin = true
          this.$refs.isBan.matchGroupId = this.anchoer.Match_Group_Id
          this.$refs.isBan.User_Id = item.User_Id
          this.$refs.isBan.MemberProfile = this.userInfor
        }
        if (this.anchoer.Member_Type
 == 2) {
          console.log(item)
          if (this.userInfor.Member_Type == 1) return
          if (this.userInfor.Member_Type == 2) return
          this.$refs.isBan.modal2 = true
		  this.$refs.isBan.admin = true
          this.$refs.isBan.matchGroupId = this.anchoer.Match_Group_Id
          this.$refs.isBan.User_Id = item.User_Id
          this.$refs.isBan.MemberProfile = this.userInfor
        }
		
		
      })
    },
    //加入弹幕
    addToList(obj) {
      console.log(obj, 'addToList')
      if (obj.text === '') return
      if (obj.colorful !== '') {
        this.danmus.push({
          avatar1: this.colorfulList[obj.colorful].left,
          avatar: this.colorfulList[obj.colorful].class,
          avatar2: this.colorfulList[obj.colorful].right,
          name: obj.text,
          color: obj.textColor
        })
      } else {
        this.danmus.push({
          avatar1: '',
          avatar2: '',
          avatar: '',
          name: obj.text,
          color: obj.textColor
        })
      }
    },

    getAnimationDetail() {
      ajaxTemplate('/LiveIndex/Get_Animation_Detail', {
        Match_Id: Number(this.Match_Id)
      }).then((res) => {
        console.log(res)
        this.Animation = res.Result
        console.log('http://www.dltkh.top/ifream?Match_Id=' + this.Match_Id)
      })
    },
    AnimatetitleshowFn() {
      console.log(777)
      this.Animatetitleshow = !this.Animatetitleshow
    },
    //分享
    appShare(scene) {
      let that = this
      let routes = getCurrentPages() // 获取当前打开过的页面路由数组
      let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
      uni.share({
        provider: 'weixin', //分享服务提供商（即weixin|qq|sinaweibo）
        scene: scene, //场景，可取值参考下面说明。
        type: 0, //分享形式
        // href: `${HTTP_IP_URL}${curRoute}&spread=${that.uid}`, //跳转链接
        // title: that.storeInfo.storeName, //分享内容的标题
        // summary: that.storeInfo.storeInfo, //分享内容的摘要
        // imageUrl: that.storeInfo.image, //图片地址

        href: 'http://uniapp.dcloud.io/',
        title: 'uni-app分享',
        summary: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
        imageUrl: 'https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png',
        success: function (res) {
          that.fenxshow = false //成功后关闭底部弹框
        },
        fail: function (err) {
          uni.showToast({
            title: '分享失败',
            icon: 'none',
            duration: 2000
          })
          that.fenxshow = false
        }
      })
    },
    //高清标清切换
    changeshow() {
      this.showgaoq = false
      this.gaovalue = '高清'
    },
    changeshow2() {
      this.showgaoq = false
      this.gaovalue = '标清'
    },
    //全屏
    playVedio() {
      // 获取 video 上下文 videoContext 对象
      this.videoContext = uni.createVideoContext('myVideo')
      // 进入全屏状态
      this.videoContext.requestFullScreen()
      this.isFullScreen = true
    },
    playVedio2() {
      // 获取 video 上下文 videoContext 对象
      // this.videoContext = uni.createVideoContext('myVideo')
      // 退出全屏状态
      this.videoContext.exitFullScreen()
      this.isFullScreen = false
    },

    danmuClick() {
      this.enabledanmu = !this.enabledanmu
    },
    refreshClick() {},
    fullscreenchange(e) {
      if (e.detail.fullScreen) {
        //全屏
        this.isFullScreen = true
        // let subNvue = uni.getSubNVueById('subNvue');
        // console.log(subNvue)
        // subNvue.show('none', 0, () => {
        // 	subNvue.setStyle({
        // 		top: '90px',
        // 		right: '20px',
        // 		width: '90px',
        // 		height: '114px'
        // 	});
        // });
      } else {
        //非全屏
        this.isFullScreen = false
        // let subNvue = uni.getSubNVueById('subNvue');
        // subNvue.hide('none', 0, () => {
        // });
      }
    },
    sendDanmu(text, color) {
      this.videoContext.sendDanmu({
        text,
        color
      })
    },
    getRandomColor: function () {
      const rgb = []
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
      }
      return '#' + rgb.join('')
    },
    showgaoqFn() {
      this.showgaoq = !this.showgaoq
      // if(this.titleshow){
      // 	this.titleshow=false
      // }

      console.log('高清')
    },
    gethistory() {
      const User_Id = this.$store.state.userInfo.User_Id
      if (!User_Id) {
        console.log('用户未登录')
        return
      }
      ajaxTemplate('/History/Add_Watch_History', {
        User_Id,
        Match_Id: this.Match_Id
      }).then((res) => {
        console.log(res, 'history')
      })
    },
    initDate() {
      const User_Id = this.$store.state.userInfo.User_Id
      if (!User_Id) {
        console.log('用户未登录')
        ajaxTemplate('/LiveRoom/Get_LiveRoomDetail', {
          User_Id: '',
          // Anchoer_Id: this.Anchoer_Id,
          Match_Id: Number(this.Match_Id)
        }).then((res) => {
          this.anchoer = res.Result
          // console.log(this.anchoer.Match_Pushurl1, 9999999999)

          login('', (_) => {
            joinAVChatRoom(this.anchoer.Match_Group_Id, (res) => {
              console.log(res, 'joinAVChatRoom')
              setTimeout(() => {
                mitt.emit('sendMessage', true)
              }, 500)
            })

            ajaxTemplate('/LiveRoom/Join_Group', {
              Group_Id: this.anchoer.Match_Group_Id,
              User_Id: 0
            }).then((res) => {
              console.log(res)
            })
          })
        })
        return
      }

      ajaxTemplate('/LiveRoom/Get_LiveRoomDetail', {
        User_Id,
        // Anchoer_Id: this.Anchoer_Id,
        Match_Id: Number(this.Match_Id)
      }).then((res) => {
        this.anchoer = res.Result
        login(User_Id, (_) => {
          joinAVChatRoom(this.anchoer.Match_Group_Id, (res) => {
            setTimeout(() => {
              mitt.emit('sendMessage', true)
            }, 500)
          })
        })

        ajaxTemplate('/LiveRoom/Join_Group', {
          Group_Id: this.anchoer.Match_Group_Id,
          User_Id: User_Id
        }).then((res) => {
          console.log(res)
        })
      })
    },

    back() {
      uni.navigateBack({
        delta: 1
      })
    },

    changeLiveRoomDetail() {
      this.initDate()
    }
  }
}
</script>

<style lang="scss" scoped>
.Animate {
  width: 100%;
  height: 600rpx;
  background: #000000;
  font-size: 0;
  position: relative;

  .AnimateTitle {
    position: absolute;
    top: 0;
    font-size: 28rpx;
    height: 80rpx;
    width: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    margin: 20rpx;
  }
}

* {
  ::v-deep * {
    box-sizing: border-box;
  }
}

.fenx {
  width: 750rpx;
  // height: 500rpx;
  background: #ffffff;
  border-radius: 16px 16px 0px 0px;
  opacity: 1;
  position: fixed;
  z-index: 100;
  bottom: 0;
  font-size: 20rpx;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #666666;

  .fenxcontent {
    display: flex;
    padding: 64rpx 20rpx 20rpx;
    flex-wrap: wrap;

    .contentitem {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120rpx;
      height: 120rpx;
      margin-right: 10rpx;
      margin-left: 35rpx;
      margin-bottom: 50rpx;
    }
  }

  .fenxbottom {
    font-size: 28rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    border-top: 2rpx solid #e7e9ee;
    width: 100%;
    height: 108rpx;
    line-height: 108rpx;
    text-align: center;
    margin-top: 10rpx;
  }
}

.showgaoq {
  width: 750rpx;
  height: 120rpx;
  // background: #000000;
  position: absolute;
  // opacity: 0.6;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  padding-left: 132rpx;
  font-size: 26rpx;
  color: #e1e3e5;
  display: flex;
  align-items: center;

  .gaoq {
    width: 108rpx;
    height: 54rpx;
    border-radius: 28rpx;
    border: 2rpx solid #ffffff;
    text-align: center;
    font-size: 24rpx;
    margin-left: 48rpx;
    margin-right: 40rpx;
    line-height: 54rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .biaoq {
    width: 108rpx;
    height: 54rpx;
    text-align: center;
    border-radius: 28rpx;
    border: 2rpx solid #ffffff;
    line-height: 54rpx;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.isFullScreen {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  // background-color: red;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

.nav {
  height: 88rpx;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  // background-color: #E3121E;
  position: absolute;
  left: 0;
}

.nav2 {
  height: 60rpx;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  // background-color: #E3121E;
  position: absolute;
  left: 0;
  top: 60rpx;
  margin-left: 68rpx;

  font-size: 20rpx;
}

.nav3 {
  height: 80rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  // background-color: #E3121E;
  position: absolute;
  bottom: 0;

  font-size: 20rpx;
}

.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

page {
  background-color: #fff;
}

.var-app-bar {
  box-shadow: unset;
}

.box {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.uni-video-container {
  //background-color: transparent;
}

::v-deep .uni-video-current-time {
  display: none;
}

::v-deep .uni-video-duration {
  display: none;
}

::v-deep .uni-video-danmu-button-active {
  border-color: #e3121e;
  color: #e3121e;
}

.video-container {
  // display: flex;
  position: relative !important;
}

::v-deep #myVideo {
}

.tip {
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 99999999;
  top: 15px;

  text {
    font-size: 10px;
    color: #ffffff;
  }
}

.gaoqing {
  margin: 0 30rpx 0 142rpx;

  width: 80rpx;
  height: 44rpx;
  border-radius: 22rpx;
  opacity: 1;
  border: 2rpx solid #ffffff;
  text-align: center;
  line-height: 44rpx;
}

.video-bottom {
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  bottom: 15px;
  z-index: 9;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;

  .menu {
    display: flex;
    align-items: center;
    /* background-color: rgb(242, 243, 243); */
    width: 100%;
    height: 38px;
    /* 	background-image: url('/static/image/broadcast/bar-video.png');
			background-position: 0px -13px;
			background-repeat: no-repeat;
			background-size: 104% auto; */

    font-size: 15px;
    font-weight: 500;

    text {
      flex: 1;
      text-align: center;

      align-self: stretch;
      line-height: 38px;
      transition: all 1;
      color: #645a5c;
      background-color: rgb(242, 243, 243);

      &.active {
        color: #f83141;
        background-color: unset;
      }
    }

    &.rt-active {
      text {
        &:first-child {
          color: #645a5c;
          background-color: rgb(242, 243, 243);
        }

        &:last-child {
          color: #f83141;
          background-color: unset;
        }
      }
    }
  }
}

.zqleft {
  position: absolute;
  top: 160rpx;
  left: 90rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.zqright {
  position: absolute;
  top: 160rpx;
  right: 90rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.lqtop {
  width: 100%;
  padding: 0 125rpx;
  height: 108rpx;
  display: flex;
  position: absolute;
  top: 100rpx;
  justify-content: space-between;
  align-items: center;
}

.lqbottom {
  width: 100%;
  padding: 0 125rpx;
  position: absolute;
  bottom: 90rpx;

  view {
    margin-top: 30rpx;
    font-size: 12px;
  }
}

::v-deep .yui-tabs__line {
  background-color: #f0222c !important;
}
</style>
