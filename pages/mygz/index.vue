<template>
  <view style="background-color: #F4F4F5;min-height:100vh">
    <view class="anchor_top">
      <!-- <image src="../../static/image/zuqiubg.png"></image> -->
      <view class="top_title">
        <image
          src="../../static/image/newback.png"
          mode=""
          @click="backMy()"
        ></image>
        <view> 我的关注 </view>
      </view>
    </view>
	<view style="width:100%;height:180rpx">
		
	</view>
    <view
      style="
        margin-left: 10px;
        display: flex;
        align-items: center;
		padding-top:20rpx;
      "
      v-if="living"
    >
      <image
        src="../../static/image/glivenew.png"
        style="width: 38rpx; height: 34rpx"
      ></image>
      <view
        style="
          margin: 0 10px;
          font-size: 14px;
          font-weight: 500;
          color: #333333;
        "
        >正在直播</view
      >
      <view style="font-size: 12px; font-weight: 400; color: #8e92a4"
        >({{ this.livingcount }})</view
      >
    </view>
    <view
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 10px;
      "
    >
      <view
        v-for="(item, index) in livinglist"
        :key="index"
        class="zb_box"
        @click="toBroadcast(item)"
      >
        <view class="bq">
          <image
            :src="'../../static/image/bqq/' + item.Anchoer_Tab + '.png'"
            alt=""
            mode="heightFix"
          />
        </view>

        <image style="width: 100%; height: 196rpx;border-radius: 8rpx" :src="item.Match_Img"> </image>
        <view
          style="
            display: flex;
            align-items: center;
            position: absolute;
            top: 160rpx;
            left: 20rpx;
          "
        >
          <view
            style="
              padding: 6rpx;
              border-radius: 190rpx;
              background-color: white;
            "
          >
            <image
              :src="item.Anchoer_Logo"
              style="width: 68rpx; height: 68rpx;border-radius: 50%;"
            ></image>
          </view>

          <view
            style="
              font-size: 24rpx;
              font-weight: 500;
              color: #333;
              margin-left: 12rpx;
              margin-top: 45rpx;
            "
            >{{ item.Anchoer_Name }}</view
          >
        </view>
        <view
          style="
            display: flex;
            justify-content: space-between;
            padding: 12rpx;
            align-items: center;
            margin-top: 32rpx;
          "
        >
          <view
            style="
              font-size: 24rpx;
              font-weight: 500;
              color: #8e92a4;
              white-space: nowrap;
              overflow: hidden;
              width: 69%;
              text-overflow: ellipsis;
            "
            >{{ item.Matc_Title }}</view
          >
          <view
            style="
              font-size: 11px;
              color: #8e92a4;
              display: flex;
              align-items: center;
            "
          >
            <image
              src="../../static/image/gfire.png"
              style="width: 20rpx; height: 20rpx"
            ></image>
            <view> {{ item.Match_Num }}</view>
          </view>
        </view>
      </view>
    </view>
	
	
    <view class="box" v-if="recommend">
      <view style="display: flex; align-items: center">
        <view class="like">猜你喜欢</view>
        <view style="font-size: 12px; font-weight: 400; color: #8e92a4"
          >({{ this.recommendcount }})</view
        >
      </view>

      <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
        <view
          id="demo1"
          class="scroll-view-item_H"
			
          :style="{ marginRight: index == 9 ? '10px' : 0 }"
        >
          <view
            style="display: inline-block; margin: 0 18rpx 36rpx 0"
			
			:style="{marginLeft:index==0?'18rpx':''}"
            v-for="(item, index) in recommendlist"
            :key="index"
            class="zb_box2"
            @click="toBroadcast(item)"
          >
            <view class="bq">
              <image
                :src="'../../static/image/bqq/' + item.Anchoer_Tab + '.png'"
                alt=""
                mode="heightFix"
              />
            </view>

            <view
              style="
               
                border-radius: 190rpx;
                background-color: white;
              "
            >
              <image
                style="width: 100%; height: 198rpx;"
                :src="item.Match_Img"
              ></image>
            </view>
            <view
              style="
                display: flex;
                align-items: center;
                position: absolute;
                top:172rpx;
                left: 20rpx;
              "
            >
              <image
                :src="item.Anchoer_Logo"
                style="width: 68rpx; height: 68rpx;border-radius: 50%;"
              >
              </image>
              <view
                style="
                  font-size: 24rpx;
                  font-weight: 500;
                  color: #333;
                  margin-left: 12rpx;
                  margin-top: 45rpx;
                "
                >{{ item.Anchoer_Name }}</view
              >
            </view>
            <view
              style="
                display: flex;
                justify-content: space-between;
                padding: 12rpx;
                align-items: center;
                margin-top: 38rpx;
              "
            >
              <view
                style="
                  font-size: 24rpx;
                  font-weight: 500;
                  color: #8e92a4;
                  width: 100%;
                  text-overflow: ellipsis;
                  overflow: hidden;
                "
                >{{ item.Matc_Title }}</view
              >
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view
      style="
        margin-top: 30rpx;
        margin-left: 10px;
        display: flex;
        align-items: center;
      "
      v-if="noliving"
    >
      <image
        src="../../static/image/nlivenew.png"
        style="width: 38rpx; height: 34rpx"
      ></image>
      <view
        style="
          margin: 0 10px;
          
font-size: 28rpx;
font-weight: 500;
          font-weight: 500;
          color: #333333;
        "
        >暂未开播</view
      >
      <view style="font-size: 12px; font-weight: 400; color: #8e92a4"
        >({{ notlivingcount }})</view
      >
    </view>
    <view class="footer">
      <view class="footer_item" v-for="item in notlivinglist">
        <view style="display: flex; align-items: center; width: 100%">
			<view class="userlogo">
				<image
				  :src="item.Anchoer_Logo"
				  style="width: 98rpx; height: 98rpx;border-radius: 50%;"
				></image>
			</view>
          

          <view
            style="
              margin-left: 10px;

              text-overflow: ellipsis;
              overflow: hidden;
            "
          >
            <view style="font-size: 14px; font-weight: 500; color: #333333">{{
              item.Anchoer_Name
            }}</view>
            <view
              style="
                font-size: 11px;
                font-weight: 400;
                color: #9094a5;
                margin-top: 10rpx;
              "
              >粉丝：{{ item.Funs_Num }}</view
            >
          </view>
        </view>
        <view class="look" @click="lookDetail(item.Anchoer_Id)">查看</view>
      </view>
    </view>

    <view
      v-if="
        notlivinglist.length == 0 &&
        recommendlist.length == 0 &&
        livinglist.length == 0
      "
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        flex-direction: column;
      "
    >
      <image
        src="/static/image/sckong.png"
        mode=""
        style="width: 400rpx; height: 400rpx; margin-top: -400rpx"
      ></image>
      <view style="color: #9ea2af; font-size: 26rpx; margin-top: 15rpx">
        暂无数据
      </view>
    </view>
  </view>
</template>

<script>
import { ajaxTemplate } from '../../api/index.js'
import store from '@/store/index.js'
export default {
  data() {
    return {
      livingcount: '',
      recommendcount: '',
      notlivingcount: '',
      livinglist: [],
      recommendlist: [],
      notlivinglist: [],
      living: true,
      recommend: true,
      noliving: true
    }
  },
  onShow() {
    ajaxTemplate('/Interest/GetSelf_InterestListToAPP', {
      User_Id: this.$store.state.userInfo.User_Id
    }).then((res) => {
      console.log(res)
      this.livingcount = res.Result.Living.Living_Count
      this.livinglist = res.Result.Living.Living_List
      if (this.livinglist.length === 0) {
        this.living = false
      }


      this.recommendcount = res.Result.Recommend.Recommend_Count
      this.recommendlist = res.Result.Recommend.Recommend_List
      if (this.recommendlist.length === 0) {
        this.recommend = false
      }

      this.notlivingcount = res.Result.NotLiving.NotLiving_Count
      this.notlivinglist = res.Result.NotLiving.NotLiving_List
      if (this.notlivinglist.length === 0) {
        this.noliving = false
      }
    })
  },
  methods: {
    backMy() {
      uni.navigateBack({
        delta: 1
      })
    },
    lookDetail(id) {
      uni.navigateTo({
        url: '/pages/mygz/gzdetail/index?Anchoer_Id='+id
      })
    },
	toBroadcast(item) {
		console.log(item)
		if (uni.getStorageSync("Animation_State") == 1) {
			//动画直播开了
			this.Animation_State = 2
		} else {
			//动画直播关了
			this.Animation_State = 1
		}
		
		
		const {
			Anchoer_Id,
			Match_Id
		} = item
		uni.navigateTo({
			url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&category2_id=${this.category2_id}&activeIndex=${this.Animation_State}`
			// url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}`
		})
	},
  }
}
</script>

<style scoped lang="scss">
.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}
.userlogo{
	width: 100rpx;
	height: 100rpx;
	background: #FFFFFF;
	opacity: 1;
	border: 2rpx solid #E7E9EE;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}
// .scroll-view-item {
// 	height: 300rpx;
// 	line-height: 300rpx;
// 	text-align: center;
// 	font-size: 36rpx;
// }

// .scroll-view-item_H {
// 	display: inline-block;
// 	width: 150px;
// 	/* height: 96px; */
// 	border-radius: 4px 4px 4px 4px;
// 	opacity: 1;
// 	border: 1px solid #F0222C;
// 	margin-left: 10px;
// 	margin-top: 15px;
// 	padding-bottom: 12px;
// 	/* margin-right: 10px; */
// }

.scorll_head {
  width: 100%;
  line-height: 26px;
  background: linear-gradient(88deg, #ee2144 0%, #e3121e 100%);
  border-radius: 4px 4px 0px 0px;
  opacity: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 10px;
  font-weight: 400;
  color: #ffffff;
}

.anchor_top {
  z-index: 999;
  position: fixed;
  top: 0;
  width: 750rpx;
  height: 176rpx;
  // background: url('../../static/image/topHearback.png') no-repeat bottom
  //   center/100% 100%;
  background: #fff;
  overflow: hidden;

  .top_title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40rpx;
    margin-top: 110rpx;
    padding: 0 20rpx;

    image {
      width: 40rpx;
      height: 40rpx;
      margin-top: 10rpx;
    }

    view {
      font-size: 32rpx;
      font-weight: 500;
      color: #333333;
      margin-left: 35%;
    }
  }
}

.anchor_center {
  z-index: 1;
  width: 100%;
  /* height: 322rpx; */
  margin-top: 176rpx;
  padding: 0 20rpx;

  .center1 {
    font-size: 28rpx;
    display: flex;
    height: 350rpx;
    justify-content: space-between;
    border-bottom: 1rpx solid #e7e9ee;

    .center1_left {
      width: 160rpx;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .center1_right {
      padding: 15rpx;
      width: calc(100% - 140rpx);
      height: 100%;
      display: flex;
      align-items: center;
      /* justify-content: center; */
      flex-wrap: wrap;

      view {
        margin: 5rpx 10rpx;
        display: flex;
        align-items: center;

        image {
          margin-right: 8rpx;
        }
      }
    }
  }

  .center2 {
    width: 100%;
    height: 106rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #e7e9ee;
    font-size: 28rpx;

    .center2_right {
      width: 40rpx;
      height: 40rpx;
    }
  }

  .center3 {
    font-size: 28rpx;
    padding: 25rpx 0;

    .center3_img {
      margin-top: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .center4 {
    margin-top: 30rpx;
  }

  .center5 {
    margin-top: 20rpx;
    display: flex;
    font-size: 28rpx;
    color: #f0222c;

    text {
      margin-left: 15rpx;
    }
  }

  .center6 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50rpx 0;

    view {
      color: #ffffff;
      font-size: 32rpx;
      width: 670rpx;
      height: 88rpx;
      background: linear-gradient(180deg, #ee2144 0%, #e3121e 100%);
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      text-align: center;
      line-height: 88rpx;
    }
  }
}

.choose {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  font-size: 32rpx;

  .choose_box {
    width: 100%;
    height: 584rpx;
    background: #ffffff;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    position: fixed;
    bottom: 0;

    .month {
      text-align: center;
      width: 100%;
      height: 120rpx;
      line-height: 128rpx;
      border-bottom: 1rpx solid #e7e9ee;
    }
  }
}

.zb_box {
  width: 346rpx;
  height: 292rpx;
  // padding-bottom: 12rpx;
  background: #ffffff;
  box-shadow: 0px 0px 6px 1px #e7e8eb;
  border-radius: 4px 4px 4px 4px;
  /* margin-left: 10px; */
  /* margin: 8px; */
  margin-top: 10px;
  position: relative;
}
.zb_box2 {
  width: 330rpx;
  height: 292rpx;
  // padding-bottom: 12rpx;
  background: #ffffff;
  box-shadow: 0px 0px 6px 1px #e7e8eb;
  border-radius: 4px 4px 4px 4px;
  /* margin-left: 10px; */
  /* margin: 8px; */
  margin-top: 10px;
  position: relative;
}

.live {
  padding: 8rpx;
  background: #f14578;
  border-radius: 2px 2px 2px 2px;
  font-size: 10px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 99;
}

.box {
  width: 97%;
  // height: 208px;
  background: #ffffff;
  border-radius: 8px 0px 0px 8px;
  opacity: 1;
  margin-left: 10px;
  margin-top: 10px;
  // padding-bottom: 20rpx;
}

page {
  background: #f4f4f5;
}

.box .like {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  padding: 10px;
}

.footer {
  background: #ffffff;
  margin-top: 20rpx;
}

.footer_item {
  width: 90%;
  height: 166rpx;
  border-bottom: 1px solid #e7e8eb;
  // padding: 0 20rpx;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.look {
  width: 128rpx;
  line-height: 52rpx;
  background:#FC683E;
  border-radius: 13px 13px 13px 13px;
  opacity: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
}

.bq {
  width: 104px;
  top: -9px;
  right: -27px;
  position: absolute;
  transform: scale(0.5);
  z-index: 1;
  height: 36px;
  text-align: right;
  image {
    height: 36px;
  }
}
</style>
