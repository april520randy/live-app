<template>
    <view style="background-color: #F8F8F8;;height:100vh">
      <!--  <var-app-bar style="border-radius:0" round image="/static/image/beij4.png" :elevation='false'>
            <template #content>
                <view class='nav'>
                    <image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx" src="/static/image/back.png"
                        mode="widthFix">
                    </image>
                    <view class="navtitle">昵称修改</view>
                </view>
            </template>
        </var-app-bar> -->
		<var-app-bar style="border-radius:0;background: #ffffff;" round  :elevation='false'>
			<template #content>
				<view class='nav1'>	
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="/static/image/bq/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle1">昵称修改</view>
				</view>
			</template>
		</var-app-bar>
	
        <view class="profile-cells">


            <view class="code" style="padding-top:52rpx">
                <input class="uni-input" v-model="formData.name" placeholder="请输入新昵称(2-8个字符)" />
            </view>

            <view class="btns">
                <button type="warn" @click="modifyName">确认修改</button>
            </view>






        </view>


    </view>
</template>

<script>
import store from "@/store/index.js";
import { Snackbar } from '@varlet/ui'
import {
    ajaxTemplate
} from '@/api/index.js'
export default {
    data() {
        return {
            formData: {
                VerificationCode: '',
                name: ''
            },

        }
    },
    onLoad() {

    },

    computed: {

        userInfo() {
            return store.state.userInfo;
        },
    },
    methods: {

        back() {
            uni.navigateBack(-1)
        },
        modifyName() {
            if (!this.formData.name) {
                uni.showToast({
                    title: '请输入要修改的名字',
                    icon: 'none'
                });
                return;
            }
            ajaxTemplate('/User/UpdateUserName', {
                "User_Id": this.userInfo.User_Id,
                "User_Name": this.formData.name
            }).then(s => {
                if (s.Code !== 200) {
                    uni.showToast({
                        title: s.Message,
                        icon: 'error',
                    })
                } else {
                   uni.showToast({
                   	icon: 'none',
                   	title: "修改成功",
                   	mask: true
                   })
                    // 重新获取userinfo
                    uni.$emit("getUserInfo")
                    uni.navigateTo({
                        url: '/pages/myView/profile/index'
                    })
                }

            })
        }

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
    padding: 0 29px;
    margin-top: 37px;

    .tips {
        font-size: 11px;
        margin-bottom: 31px;
    }

    .code {
        display: flex;
        align-items: center;
        padding-bottom: 11px;
        border-bottom: 1px solid #C0C2CB;

        .uni-input {
            flex: 1;
        }

        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 16rpx;
            height: 31px;
            border-radius: 10px 10px 10px 10px;
            opacity: 1;
            border: 2px solid #F0222C;

            color: #F0222C;
        }
    }

    .btns {
        margin-top: 48px;

        button {
          width: 335px;
          height: 44px;
          background: #FC683E;
          border-radius: 22px 22px 22px 22px;
          opacity: 1;
            /* 	background: #E1E2E3;
					color: white; */

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
