<template>
	<template v-if="topList.length>0">
		<view class="recommend"
				style="display: flex;flex-wrap: wrap;justify-content: space-between;margin: 10px 10px;overflow-y: scroll;">
				<view v-for="(item,index) in topList" :key="index" class="zb_box" @click="topItemClick(item)">
		
					<!-- <view class="bq">
						<image :src="'/static/image/bq/' + item.Anchoer_Tab + '.png'" alt=""
							mode="heightFix" />
					</view> -->
					<image style="width: 100%;height: 98px;" :src="item.Match_Img" > </image>
					<view style="font-size: 14px;font-weight: 500;color: #333333;margin-left: 6px; overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;">{{item.Match_Title}}</view>
					<view style="display: flex;justify-content: space-between;padding: 6px;align-items: center;
		    ">
						<view>{{item.Anchoer_Name}}</view>
						<view style="font-size: 11px;">
							<image src="/static/image/gfire.png" style="width: 10px;height: 10px;"></image>
							{{item.Popularity_Value}}
						</view>
					</view>
				</view>
			</view>
	</template>
	<template v-else>
		<view style="text-align: center;">
			<image style="width:400rpx;margin:100rpx auto 0;" src="/static/image/sckong.png" mode="widthFix"></image>
			<view class="">暂无推荐</view>
		</view>
	</template>
</template>

<script>
	import {
		ajaxTemplate
	} from "/api/index.js";
	export default {
		name: 'c',
		props: {
			Match_Id: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				topList: [],
				Animation_State: ""
			}
		},
		components: {

		},
		created() {

		},
		mounted() {
			this.top()
		},
		methods: {
			top() {
				console.log(this.Match_Id)
				///LiveIndex/GetRecommend_LiveList
				ajaxTemplate("/LiveRoom/Get_LiveRoom_Recommended", {Match_Id:this.Match_Id}).then((res) => {
					console.log(res)
					this.topList = res.Result
				})
			},
			topItemClick(item) {
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
					Match_id,
					Id
				} = item
				uni.redirectTo({
					url: `/pages/liveView/broadcast/index?Match_Id=${Match_id}&Id=${Id}&category2_id=${this.category2_id}&activeIndex=${this.Animation_State}`
					// url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}`
				})
			}
		}
	}
</script>
<style scoped lang='scss'>
	/* .recommend {
		flex: 1;
		overflow: auto;
	} */

	.zb_box {
		width: 346rpx;
		height: 316rpx;
		padding-bottom: 12rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 6px 1px #E7E8EB;
		border-radius: 4px 4px 4px 4px;
		/* margin-left: 10px; */
		/* margin: 8px; */
		margin-top: 10px;
		margin-bottom: 10px;
		position: relative;
	}

	.bq {
		width: 104px;
		text-align: right;
		top: -2px;
		right: -20px;
		position: absolute;
		transform: scale(0.5);
		z-index: 1;
		height: 32px;

		image {
			height: 32px;
		}
	}
</style>
