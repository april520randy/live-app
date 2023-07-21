<template>
    <view style="background-color: #F4F4F5;height:100vh">
    <!--    <var-app-bar style="border-radius:0" round image="/static/image/beij4.png" :elevation='false'>
            <template #content>
                <view class='nav'>
                    <image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx" src="/static/image/back.png"
                        mode="widthFix">
                    </image>
                    <view class="navtitle">个人资料</view>
                </view>
            </template>
        </var-app-bar> -->
		<var-app-bar style="border-radius:0;background: #fff;" round  :elevation='false'>
			<template #content>
				<view class='nav1'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="/static/image/bq/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle1">个人资料</view>
				</view>
			</template>
		</var-app-bar>
        <view class="profile-cells">
            <view class="cell">
                <var-cell title="头像" @click="togglePop">
                    <template #extra>
                        <image style="width: 68rpx;height: 68rpx;margin-right:18rpx;border-radius: 50%;" :src="userInfo.User_Logo" />
                        <var-icon name="chevron-right" />

                    </template>
                </var-cell>
                <var-cell title="昵称" @click="jump('/pages/myView/profile/user_modify')">
                    <template #extra>
                        <text>{{ userInfo.User_Name }}</text>
                        <var-icon name="chevron-right" />
                    </template>
                </var-cell>
            </view>
            <view class="cell">
                <var-cell title="欢呼吧ID">
                    <template #extra>
                        <text>{{ userInfo.User_Id }}</text>
						<span @click = "getuserid(userInfo.Silver_Coin)" ><var-icon name="content-copy" /></span>
                        
                    </template>
                </var-cell>

            </view>
            <view class="cell">
                <var-cell title="手机号码">
                    <template #extra>
                        <text>{{ userInfo.User_Phone }}</text>
                        <var-icon name="chevron-right" />
                    </template>
                </var-cell>
                <var-cell title="登录密码" @click="jump('/pages/myView/profile/pwd_modify')">
                    <template #extra>
                        <text>设置密码</text>
                        <var-icon name="chevron-right" />
                    </template>
                </var-cell>
            </view>
        </view>

        <var-popup position="bottom" v-model:show="user_Logo_pop" :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0)' }">
            <view class="popup-example-block">
                <view class="title">修改头像</view>

                <view class="list">
                    <view v-for="(item, index) in userLogoList" :key="index" class="item" @click="changeLogo(item.Value)">
                        <var-image fit="cover" radius="50%" width="46px" height="46px" :src="item.Url" />
                    </view>

                </view>



            </view>

        </var-popup>
    </view>
</template>

<script>
import store from "@/store/index.js";
import {
    ajaxTemplate
} from '@/api/index.js'
export default {
    data() {
        return {
            userLogoList: [],
            user_Logo_pop: false,
			userid:''
        }
    },
    onLoad() {

    },
    created() {
        this.getLogos()
    },
    computed: {

        userInfo() {
            return store.state.userInfo;
        },
    },
    methods: {
		//复制欢呼吧id
		getuserid(text){
			uni.setClipboardData({
			  data: text,
			  success: function () {
			    console.log('复制成功')
			  }
			})
		},
        getLogos() {
            ajaxTemplate('/User/GetUserLogoList', {}).then(res => {
                console.log(22222, res);
                this.userLogoList = res.Result
            })
        },
        changeLogo(url) {
			
            ajaxTemplate('/User/UpdateUserLogo', {
                "User_Id": this.userInfo.User_Id,
                "User_Logo": url
            }).then(res => {
				
                this.user_Logo_pop = false
                if (res.Code !== 200) {
                    uni.showToast({
                        title: s.Message,
                        icon: 'error',
                    })
                } else {
                    // 重新获取userinfo
				
                    uni.$emit("getUserInfo")
					
					
                }
				


            })
			
        },
        togglePop() {
            this.user_Logo_pop = !this.user_Logo_pop
        },
        back() {
            uni.switchTab({
            	url: "/pages/myView/index",
            });
        },
        jump(url) {
            uni.navigateTo({
                url
            });
        },

    },
    onPageScroll(e) {

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
        color: #FFFFFF;
        margin-left: 252rpx;
    }

}

.profile-cells {

    margin-top: 9px;

    .cell {
        padding: 0 17px;
        background-color: white;
        margin-bottom: 9px;

        ::v-deep .var-cell {


            padding-top: 24rpx;
            padding-bottom: 24rpx;

            .var-cell__extra {

                // flex-shrink: 0;
                display: flex;

                .var-icon {
                    opacity: .5;
                }

                &>text {
                    margin-right: 18rpx;
                    width: 200rpx;
                    flex-shrink: 0;
                    text-align: right;
                }
            }
        }
    }
}

.popup-example-block {
    height: 600rpx;
    display: flex;
    flex-direction: column;

    .title {
        flex-shrink: 0;
        height: 104rpx;
        width: 100%;
        line-height: 104rpx;
        text-align: center;
        border-bottom: 1rpx solid #ddd;
    }

    .list {
        padding-top: 26rpx;
        height: 0;
        flex: 1;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;

        // margin-right: -48px;
        .item {
            width: 25%;
            text-align: center;
            margin-bottom: 26px;
            // margin-right: 48px;
        }

        .var-image {

            margin: auto;

        }
    }
}
	.nav1 {
		height: 88rpx;
		display: flex;
		align-items: center;
	
		.navtitle1 {
			font-size: 32rpx;
			font-weight: 500;
			color: #333;
			margin-left: 252rpx;
		}
	
	}
</style>
