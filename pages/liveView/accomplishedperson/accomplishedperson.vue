<template>
	<view class="box">
		<view class="header" style="position: fixed;width: 100vw;top: 0;z-index: 1;">
			<view
				style="display: flex;align-items: center; justify-content:space-between;padding: 116rpx 20rpx 28rpx 20rpx;">
				<image @click="back()" src="/static/image/newback.png" style="width: 40rpx;height: 40rpx;" />
				<p style="font-size: 36rpx;color: #333333;">达人榜单</p>
				<p style="font-size: 28rpx;color: #333333;" @click="open()">规则</p>
			</view>
		</view>
		<view style="height:175rpx"></view>
		<view class="content">
			<image src="/static/image/ground-person.png" style="width: 750rpx;height: 400rpx;" />
			<view class="types">
				<yui-tabs :tabs="types" v-model="activeIndex" @click="tabClick" @change="tabChange" background="none"
					color="#ED5C2A" title-active-color="#333333" title-inactive-color="#8E92A4">
				</yui-tabs>
				<view class="monthbox">
					<p style="font-size: 24rpx;color: #8E92A4;">月榜</p>
					<view style="width: 0px;height: 54rpx;border: 2rpx solid #E7E9EE;"></view>
					<image src="/static/image/toptop.png" style="width: 24rpx;height: 24rpx;" />
				</view>
			</view>
			<view class="">
				<view class="explain">
					<p v-if="activeIndex == 0" style="font-size: 24rpx;color: #FCBB3D;">主播达人榜活动即将开启，更多福利敬请期待！</p>
					<p v-if="activeIndex == 1" style="font-size: 24rpx;color: #FCBB3D;">富豪达人榜活动即将开启，更多福利敬请期待！</p>
				</view>
				<!-- 排名 -->
				<view class="bigcontent">
					<view style="display: flex;align-items: center;justify-content: center;">
						<!-- 主播第二名 -->
						<view v-if="activeIndex == 0&&toplog2!=''"
							style="margin-top:100rpx;display: flex;align-items: center;flex-direction: column;justify-content: center;">
							<view class="no2" style="position: relative;">
								<image :src="toplog2"
									style="width: 112rpx;height: 114rpx;position: absolute;left: -4rpx;top: 0rpx;border-radius: 50%;" />
								<image src="/static/image/peoplekuang2.png"
									style="width: 148rpx;height: 148rpx;position: absolute;left: -15rpx;top: -20rpx;" />
							</view>
							<view class="no2-attention" v-if="interest1==0">
								<image src="/static/image/addpeople.png" style="width: 44rpx;height: 44rpx;" />
								<p style="font-size: 26rpx;color: #FFFFFF;margin-left:6rpx" @click="interest1FnDebounced(Anchoer_Id1)">关注</p>
							</view>
							<view class="no2-attention" v-if="interest1==1">
								<image src="/static/image/yggz.png" style="width: 44rpx;height: 44rpx;" />
								<p style="font-size: 26rpx;color: #FFFFFF;" @click="interest2FnDebounced(Anchoer_Id1)">已关注</p>
							</view>
							<!-- 	<view v-if="changetopnull1"
								style="width: 130rpx;height: 48rpx;margin-top: 24rpx;margin-left: -10rpx;"></view> -->
							<view v-if="activeIndex == 1" style="width: 130rpx;height: 80rpx;"></view>
							<view style="width: 233rpx;height: 29rpx;background: #F3F8FD;"></view>
							<view class="no2-detail">
								<p style="font-size: 24rpx;color: #333333;">{{this.topname2}}</p>
								<view style="display: flex;align-items:center;margin-top: 10rpx;">
									<p style="font-size: 24rpx;color: #333333;">{{this.topfs2}}</p>
									<p style="font-size: 24rpx;color: #8E92A4;margin-left: 18rpx;">粉丝</p>
								</view>
								<view
									style="font-size: 24rpx;color: #8E92A4;display: flex;align-items: center;white-space: nowrap;margin-top: 15rpx;">
									<image :src=" `../../../static/image/myView/dd${this.toplevel2}.png`"
										style="width: 80rpx;" mode="widthFix"></image>
									<image v-if="this.topgz2 == 1 " src="../../../static/image/myView/gzlever1.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgz2 == 2 " src="../../../static/image/myView/gzlever2.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgz2 == 3 " src="../../../static/image/myView/gzlever3.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
								</view>
							</view>
						</view>

						<!-- 富豪第二名 -->
						<view v-if="activeIndex == 1&&toplogs2!=''"
							style="margin-top:100rpx;display: flex;align-items: center;flex-direction: column;justify-content: center;">
							<view class="no2" style="position: relative;">
								<image :src="toplogs2"
									style="width: 114rpx;height: 114rpx;position: absolute;left: -4rpx;top: 0rpx;border-radius: 50%;" />
								<image src="/static/image/peoplekuang2.png"
									style="width: 148rpx;height: 148rpx;position: absolute;left: -15rpx;top: -20rpx;" />
							</view>
							<view style="width: 130rpx;height: 80rpx;"></view>
							<view style="width: 233rpx;height: 29rpx;background: #F3F8FD;"></view>
							<view class="no2-detail">
								<p style="font-size: 24rpx;color: #333333;">{{this.topnames2}}</p>
								<view style="display: flex;align-items:center;margin-top: 10rpx;">
									<p style="font-size: 24rpx;color: #333333;">{{this.tophq2>10000?Number(this.tophq2 / 10000).toFixed(1)+"w":this.tophq2}}</p>
									<p style="font-size: 24rpx;color: #8E92A4;margin-left: 18rpx;">贡献</p>
								</view>
								<view
									style="display: flex;align-items: center;margin-top: 15rpx;justify-content: space-between;">
									<image :src=" `../../../static/image/myView/dd${this.toplevels2}.png`"
										style="width: 80rpx;"  mode="widthFix"></image>
									<image v-if="this.topgzs2 == 1 " src="../../../static/image/myView/gzlever1.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgzs2 == 2 " src="../../../static/image/myView/gzlever2.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgzs2 == 3 " src="../../../static/image/myView/gzlever3.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
								</view>
							</view>
						</view>
						<!-- 主播第一名 -->
						<view v-if="activeIndex == 0&&toplog1!=''"
							style="margin-top: 30rpx;margin-left: 10rpx; display: flex;align-items: center;flex-direction: column;justify-content: center;">
							<view class="no1" style="position: relative;">
								<image :src="toplog1"
									style="width: 130rpx;height: 128rpx;position: absolute;left: -4rpx;top: 0rpx;border-radius: 50%;" />
								<image src="/static/image/peoplekuang1.png"
									style="width: 176rpx;height: 176rpx;position: absolute;left: -19rpx;top: -30rpx;" />
							</view>
							<view class="no1-attention" v-if="interest2==0">
								<image src="/static/image/addyellow.png" style="width: 44rpx;height: 44rpx;" />
								<p style="font-size: 26rpx;color: #FFFFFF;margin-left:6rpx" @click="interest1FnDebounced(Anchoer_Id2)">关注</p>
							</view>
							<view class="no2-attention" v-if="interest2==1">
								<image src="/static/image/yggz.png" style="width: 44rpx;height: 44rpx;" />
								<p style="font-size: 26rpx;color: #FFFFFF;" @click="interest2FnDebounced(Anchoer_Id2)">已关注</p>
							</view>
							<view v-if="changetopnull2" style="width: 130rpx;height: 48rpx;margin-top: 35rpx;"></view>
							<view v-if="activeIndex == 1" style="width: 130rpx;height: 80rpx;"></view>
							<view style="width: 233rpx;height: 29rpx;background: #FFFAF0;"></view>
							<view class="no1-detail">
								<p style="font-size: 24rpx;color: #333333;">{{this.topname1}}</p>
								<view style="display: flex;align-items:center;margin-top: 10rpx;">
									<p style="font-size: 24rpx;color: #333333;">{{this.topfs1}}</p>
									<p style="font-size: 24rpx;color: #8E92A4;margin-left: 18rpx;">粉丝</p>
								</view>
								<view
									style="font-size: 24rpx;color: #8E92A4;display: flex;align-items: center;white-space: nowrap;margin-top: 15rpx;">
									<image :src=" `../../../static/image/myView/dd${this.toplevel1}.png`"
										style="width: 80rpx;"  mode="widthFix"></image>
									<image v-if="this.topgz1 == 1 " src="../../../static/image/myView/gzlever1.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgz1 == 2 " src="../../../static/image/myView/gzlever2.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgz1 == 3 " src="../../../static/image/myView/gzlever3.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
								</view>
							</view>
						</view>
						<!-- 富豪第一名 -->
						<view v-if="activeIndex == 1&&toplogs1!=''"
							style="margin-top: 30rpx;margin-left: 10rpx; display: flex;align-items: center;flex-direction: column;justify-content: center;">
							<view class="no1" style="position: relative;">
								<image :src="toplogs1"
									style="width: 130rpx;height: 128rpx;position: absolute;left: -4rpx;top: 0rpx;border-radius: 50%;" />
								<image src="/static/image/peoplekuang1.png"
									style="width: 176rpx;height: 176rpx;position: absolute;left: -19rpx;top: -30rpx;" />
							</view>
							<view style="width: 130rpx;height: 80rpx;"></view>
							<view style="width: 233rpx;height: 29rpx;background: #FFFAF0;"></view>
							<view class="no1-detail">
								<p style="font-size: 24rpx;color: #333333;">{{this.topnames1}}</p>
								<view style="display: flex;align-items:center;margin-top: 10rpx;">
									<p style="font-size: 24rpx;color: #333333;">{{this.tophq1>10000?Number(this.tophq1 / 10000).toFixed(1)+"w":this.tophq1}}</p>
									<p style="font-size: 24rpx;color: #8E92A4;margin-left: 18rpx;">贡献</p>
								</view>
								<view
									style="font-size: 24rpx;color: #8E92A4;display: flex;align-items: center;white-space: nowrap;margin-top: 15rpx;">
									<image :src=" `../../../static/image/myView/dd${this.toplevels1}.png`"
										style="width: 80rpx;"  mode="widthFix"></image>
									<image v-if="this.topgzs1 == 1 " src="../../../static/image/myView/gzlever1.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgzs1 == 2 " src="../../../static/image/myView/gzlever2.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgzs1 == 3 " src="../../../static/image/myView/gzlever3.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
								</view>
							</view>
						</view>
						<!-- 主播第三名 -->
						<view v-if="activeIndex == 0&&toplog3==''" style="margin-left: 10rpx;width:250rpx">
							
						</view>
						<view v-if="activeIndex == 0&&toplog3!=''" 
							style=" margin-top: 100rpx;margin-left: 10rpx; display: flex;align-items: center;flex-direction: column;justify-content: center;">
							<view class="no3" style="position: relative;">
								<image  :src="toplog3"
									style="width: 114rpx;height: 114rpx;position: absolute;left: -4rpx;top: 0rpx;border-radius: 50%;" />
								<image src="/static/image/peoplekuang3.png"
									style="width: 148rpx;height: 148rpx;position: absolute;left: -15rpx;top: -20rpx;" />
							</view>
							<view class="no3-attention" v-if="interest3==0">
								<image src="/static/image/addbron.png" style="width: 44rpx;height: 44rpx;" />
								<p style="font-size: 26rpx;color: #FFFFFF;margin-left:6rpx" @click="interest1FnDebounced(Anchoer_Id3)">关注</p>
							</view>
							<view class="no2-attention" v-if="interest3==1">
								<image src="/static/image/yggz.png" style="width: 44rpx;height: 44rpx;" />
								<p style="font-size: 26rpx;color: #FFFFFF;" @click="interest2FnDebounced(Anchoer_Id3)">已关注</p>
							</view>
							<view v-if="changetopnull3" style="width: 130rpx;height: 48rpx;margin-top: 24rpx;"></view>
							<view v-if="activeIndex == 1" style="width: 130rpx;height: 80rpx;"></view>
							<view style="width: 233rpx;height: 29rpx;background: #FDF7F3;"></view>
							<view class="no3-detail">
								<p style="font-size: 24rpx;color: #333333;">{{this.topname3}}</p>
								<view style="display: flex;align-items:center;margin-top: 10rpx;">
									<p style="font-size: 24rpx;color: #333333;">{{this.topfs3}}</p>
									<p style="font-size: 24rpx;color: #8E92A4;margin-left: 18rpx;">粉丝</p>
								</view>
								<view
									style="font-size: 24rpx;color: #8E92A4;display: flex;align-items: center;white-space: nowrap;margin-top: 15rpx;">
									<image :src=" `../../../static/image/myView/dd${this.toplevel3}.png`"
										style="width: 80rpx;"  mode="widthFix"></image>
									<image v-if="this.topgz3 == 1 " src="../../../static/image/myView/gzlever1.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgz3 == 2 " src="../../../static/image/myView/gzlever2.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgz3 == 3 " src="../../../static/image/myView/gzlever3.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
								</view>
							</view>
						</view>
						<!-- 富豪第三名 -->
						<view v-if="activeIndex == 1&&toplogs3==''" style="margin-left: 10rpx;">
							
						</view>
						<view v-if="activeIndex == 1&&toplogs3!=''"
							style=" margin-top: 100rpx;margin-left: 10rpx; display: flex;align-items: center;flex-direction: column;justify-content: center;">
							<view class="no3" style="position: relative;">
								<image :src="toplogs3"
									style="width: 114rpx;height: 114rpx;position: absolute;left: -4rpx;top: 0rpx;border-radius: 50%;" />
								<image src="/static/image/peoplekuang3.png"
									style="width: 148rpx;height: 148rpx;position: absolute;left: -15rpx;top: -20rpx;" />
							</view>
							<view style="width: 130rpx;height: 80rpx;"></view>
							<view style="width: 233rpx;height: 29rpx;background: #FDF7F3;"></view>
							<view class="no3-detail">
								<p style="font-size: 24rpx;color: #333333;">{{this.topnames3}}</p>
								<view style="display: flex;align-items:center;margin-top: 10rpx;">
									<p style="font-size: 24rpx;color: #333333;">{{this.tophq3>10000?Number(this.tophq3/ 10000).toFixed(1)+"w":this.tophq3}}</p>
									<p style="font-size: 24rpx;color: #8E92A4;margin-left: 18rpx;">贡献</p>
								</view>
								<view
									style="font-size: 24rpx;color: #8E92A4;display: flex;align-items: center;white-space: nowrap;margin-top: 15rpx;">
									<image :src=" `../../../static/image/myView/dd${this.toplevels3}.png`"
										style="width: 80rpx;"  mode="widthFix"></image>
									<image v-if="this.topgzs3 == 1 " src="../../../static/image/myView/gzlever1.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgzs3 == 2 " src="../../../static/image/myView/gzlever2.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="this.topgzs3 == 3 " src="../../../static/image/myView/gzlever3.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 主播达人列表 -->
				<view v-show="activeIndex == 0" class="nos-table"
					style="padding: 44rpx 36rpx; background-color: #F9F9FB;" v-for="(item,index) in anchoerlist"
					:key="index" :style="{
                    background: index % 2 == 0 ? '#F9F9FB' : '#FFFFFF'
                  }">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;align-items: center;width:300rpx">
							<!-- <p style="font-size: 24rpx;color: #333333;">4</p> -->
							<image :src="item.User_Logo" style="width: 68rpx;height: 68rpx;border-radius: 50%;" />
							<view style="display: flex;flex-direction: column;margin-left: 16rpx;">
								<p style="font-size: 24rpx;color: #333333;">{{item.User_Name}}</p>
								<!-- <image src="/static/image/leveleve.png" style="width: 80rpx;height: 24rpx;margin-top: 16rpx;" /> -->
								<view style="display: flex;align-items: center;margin-top:10rpx">
									<image :src=" `../../../static/image/myView/dd${item.User_Level}.png`"
										style="width: 80rpx;"  mode="widthFix"></image>
									<image v-if="item.Nobility_Level == 1 "
										src="../../../static/image/myView/gzlever1.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="item.Nobility_Level == 2 "
										src="../../../static/image/myView/gzlever2.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="item.Nobility_Level == 3 "
										src="../../../static/image/myView/gzlever3.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;flex-direction: column;">
							<p style="font-size: 24rpx;color: #333333;">{{item.Funs_Num}}</p>
							<p style="font-size: 24rpx;color: #8E92A4;">粉丝数</p>
						</view>
						<view class="attenion-box"
							:style="{border:item.Interest ==0? '1px solid #ED5C2A': '1px solid #DBDBDB',background:item.Interest ==0? '#ED5C2A': '#fff'}">
							<!-- <image v-if="item.Interest == 0" src="/static/image/redadd.png"
								style="width: 28rpx;height: 28rpx;" />
							<image v-if="item.Interest == 1" src="/static/image/duihui.png"
								style="width: 28rpx;height: 28rpx;" /> -->
							<p v-if="item.Interest == 0" style="font-size: 24rpx;color:#fff;"
								@click='interest1FnDebounced(item.Anchoer_Id)'>
								关注
							</p>
							<p v-if="item.Interest == 1" style="font-size: 24rpx;color:#888C94"
								@click='interest2FnDebounced(item.Anchoer_Id)'>
								已关注
							</p>
						</view>
					</view>
				</view>
				<!-- 富豪达人列表 -->
				<view v-if="activeIndex == 1" class="nos-table" style="padding: 44rpx 36rpx; background-color: #F9F9FB;"
					v-for="(item,index) in richlist" :key="index" :style="{
                    background: index % 2 == 0 ? '#F9F9FB' : '#FFFFFF'
                  }">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<!-- <p style="font-size: 24rpx;color: #333333;">4</p> -->
							<image :src="item.User_Logo" style="width: 68rpx;height: 68rpx;border-radius: 50%;" />
							<view style="display: flex;flex-direction: column;margin-left: 16rpx;">
								<p style="font-size: 24rpx;color: #333333;">{{item.User_Name}}</p>
								<!-- <image src="/static/image/leveleve.png" style="width: 80rpx;height: 24rpx;margin-top: 16rpx;" /> -->
								<view style="display: flex;align-items: center;margin-top:10rpx">
									<!-- <p style="font-size: 24rpx;color: #8E92A4;">用户等级:{{item.User_Level}}</p>
									<p style="font-size: 24rpx;color: #8E92A4;margin-left: 15rpx;">
										贵族等级:{{item.Nobility_Level}}</p> -->
									<image :src=" `../../../static/image/myView/dd${item.User_Level}.png`"
										style="width: 80rpx;"  mode="widthFix"></image>
									<image v-if="item.Nobility_Level == 1 "
										src="../../../static/image/myView/gzlever1.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="item.Nobility_Level == 2 "
										src="../../../static/image/myView/gzlever2.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
									<image v-if="item.Nobility_Level == 3 "
										src="../../../static/image/myView/gzlever3.png"
										style="width: 86rpx;height: 34rpx;margin-left: 10rpx;"></image>
								</view>
							</view>
						</view>
						<view class="gx">
							<p style="font-size: 24rpx;color: #333333;">{{item.Rich_Num }}</p>
							<p style="font-size: 24rpx;color: #8E92A4;margin-top: 16rpx;">贡献值</p>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="show" v-if="show">
		<!-- 主播达人榜规则 -->
		<view class="backgroud-box" v-if="activeIndex == 0">
			<view style="position: absolute;left: 90rpx;top: 340rpx; width: 70%;height:60%">
				<!-- <p style="font-size: 32rpx;color: #ED5C2A;text-align: center;">主播达人榜统计规则</p> -->
				<view style="font-size: 28rpx;color: #333333;margin-top: 10rpx;">
					<p style="line-height: 50rpx;">1.日榜:统计当日凌晨至现在，全站主播的新增粉丝总数量,对主播由高到低排名;</p>
					<p style="margin-top: 20rpx;line-height: 50rpx;">2.周榜: 统计每周一凌晨至现在，全站主播的新增粉丝总数量,对主播由高到低排名;</p>
					<p style="margin-top: 20rpx;line-height: 50rpx;">3.月榜: 统计每月1号凌晨至现在，全站主播的新增粉丝总数量,对主播由高到低排名;</p>
				</view>
				<view class="btn" @click="close()">
					知道了
				</view>
			</view>
		</view>
		<!-- 富豪达人榜规则 -->
		<view class="backgroud-box2" v-if="activeIndex == 1">
			<view style="position: absolute;left: 90rpx;top: 340rpx;width: 70%;height:60%">
				<!-- <p style="font-size: 32rpx;color: #ED5C2A;text-align: center;">富豪达人榜统计规则</p> -->
				<!-- <p style="font-size: 24rpx;color: #fff;text-align: center;">(贡献1金币=10贡献值)</p> -->
				<view style="font-size: 28rpx;color: #333333;margin-top: 10rpx;">
					<p>1.日榜:统计当日凌晨至现在，全站用户的消费贡献值,按用户贡献值大小，由高到低排名;</p>
					<p style="margin-top: 20rpx;">2.周榜:统计当前周一凌晨至现在，全站用户的消费贡献值,按用户贡献值大小，由高到低排名;</p>
					<p style="margin-top: 20rpx;">3.月榜:统计当前月1号凌晨至现在，全站用户的消费贡献值,按用户贡献值大小，由高到低排名;</p>
				</view>
				<view class="btn" @click="close()">
					知道了
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ajaxTemplate
	} from '@/api/index.js'
	import store from "@/store/index.js";
	import _ from 'lodash'

	export default {
		data() {
			return {
				types: ['主播达人榜', '富豪达人榜'],
				activeIndex: 0,
				show: false,
				Interest_Id1: '',
				Anchoer_Id1: '',
				interest1: '',
				topid1: '',
				toplog1: '',
				topname1: '',
				topfs1: '',
				toplevel1: '',
				topgz1: '',
				Interest_Id2: '',
				Anchoer_Id2: '',
				interest2: '',
				topid2: '',
				toplog2: '',
				topname2: '',
				topfs2: '',
				toplevel2: '',
				topgz2: '',
				Interest_Id3: '',
				Anchoer_Id3: '',
				interest3: '',
				topid3: '',
				toplog3: '',
				topname3: '',
				topfs3: '',
				toplevel3: '',
				topgz3: '',
				toplogs1: '',
				topnames1: '',
				tophq1: '',
				toplevels1: '',
				topgzs1: '',
				toplogs2: '',
				topnames2: '',
				tophq2: '',
				toplevels2: '',
				topgzs2: '',
				toplogs3: '',
				topnames3: '',
				tophq3: '',
				toplevels3: '',
				topgzs3: '',
				changetopnull1: false,
				changetop2: true,
				changetopnull2: false,
				changetop3: true,
				changetopnull3: false,
				anchoerlist: []
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},

			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			getdata() {
				ajaxTemplate('/Rank/Get_Anchoer_Rank', {
					User_Id: this.$store.state.userInfo.User_Id
				}).then(res => {
					console.log(res.Result);
					// res.Result.forEach((item, index) => {
					// 	item.interest = 1
					// })
					this.anchoerlist = res.Result
					console.log('123', this.anchoerlist);

					if (this.anchoerlist.length > 0) {
						this.topid1 = this.anchoerlist[0].Anchoer_Id
						this.toplog1 = this.anchoerlist[0].User_Logo
						this.topname1 = this.anchoerlist[0].User_Name
						this.topfs1 = this.anchoerlist[0].Funs_Num
						this.toplevel1 = this.anchoerlist[0].User_Level
						this.topgz1 = this.anchoerlist[0].Nobility_Level

						this.interest2 = this.anchoerlist[0].Interest
						this.Anchoer_Id2 = this.anchoerlist[0].Anchoer_Id
						this.Interest_Id2 = this.anchoerlist[0].Interest_Id
						this.anchoerlist.splice(0, 1)
					}
					if (this.anchoerlist.length > 0) {
						this.topid2 = this.anchoerlist[0].Anchoer_Id
						this.toplog2 = this.anchoerlist[0].User_Logo
						this.topname2 = this.anchoerlist[0].User_Name
						this.topfs2 = this.anchoerlist[0].Funs_Num
						this.toplevel2 = this.anchoerlist[0].User_Level
						this.topgz2 = this.anchoerlist[0].Nobility_Level

						this.interest1 = this.anchoerlist[0].Interest
						this.Anchoer_Id1 = this.anchoerlist[0].Anchoer_Id
						this.Interest_Id1 = this.anchoerlist[0].Interest_Id
						this.anchoerlist.splice(0, 1)
					}
					if (this.anchoerlist.length > 0) {
						this.topid3 = this.anchoerlist[0].Anchoer_Id
						this.toplog3 = this.anchoerlist[0].User_Logo
						this.topname3 = this.anchoerlist[0].User_Name
						this.topfs3 = this.anchoerlist[0].Funs_Num
						this.toplevel3 = this.anchoerlist[0].User_Level
						this.topgz3 = this.anchoerlist[0].Nobility_Level

						this.interest3 = this.anchoerlist[0].Interest
						this.Anchoer_Id3 = this.anchoerlist[0].Anchoer_Id
						this.Interest_Id3 = this.anchoerlist[0].Interest_Id
						this.anchoerlist.splice(0, 1)
					}
					// this.topid1 = this.anchoerlist[0].Anchoer_Id
					// this.toplog1 = this.anchoerlist[0].User_Logo
					// this.topname1 = this.anchoerlist[0].User_Name
					// this.topfs1 = this.anchoerlist[0].Funs_Num
					// this.toplevel1 = this.anchoerlist[0].User_Level
					// this.topgz1 = this.anchoerlist[0].Nobility_Level

					// this.interest1=this.anchoerlist[1].Interest
					// this.Anchoer_Id1=this.anchoerlist[1].Anchoer_Id
					// this.Interest_Id1=this.anchoerlist[1].Interest_Id

					// this.topid2 = this.anchoerlist[1].Anchoer_Id
					// this.toplog2 = this.anchoerlist[1].User_Logo
					// this.topname2 = this.anchoerlist[1].User_Name
					// this.topfs2 = this.anchoerlist[1].Funs_Num
					// this.toplevel2 = this.anchoerlist[1].User_Level
					// this.topgz2 = this.anchoerlist[1].Nobility_Level

					// this.interest2=this.anchoerlist[0].Interest
					// this.Anchoer_Id2=this.anchoerlist[0].Anchoer_Id
					// this.Interest_Id2=this.anchoerlist[0].Interest_Id

					// this.topid3 = this.anchoerlist[2].Anchoer_Id
					// this.toplog3 = this.anchoerlist[2].User_Logo
					// this.topname3 = this.anchoerlist[2].User_Name
					// this.topfs3 = this.anchoerlist[2].Funs_Num
					// this.toplevel3 = this.anchoerlist[2].User_Level
					// this.topgz3 = this.anchoerlist[2].Nobility_Level

					// this.interest3=this.anchoerlist[2].Interest
					// this.Anchoer_Id3=this.anchoerlist[2].Anchoer_Id
					// this.Interest_Id3=this.anchoerlist[2].Interest_Id


					console.log('11111', this.Anchoer_Id3, this.Interest_Id3);
				})

			},

			//关注/
			interest1Fn(Anchoer_Id) {
				console.log(Anchoer_Id)
				ajaxTemplate('/Interest/Add_InterestList', {
					User_Id: this.$store.state.userInfo.User_Id,
					Anchoer_Id: Anchoer_Id,
				}).then(res => {
					if (res.Code == 200) {
						uni.showToast({
							title: res.Message,
							icon: 'none',
							duration: 2000
						})
					} else {
						uni.showToast({
							title: res.Message,
							icon: 'none',
							duration: 2000
						})
					}
					this.getdata()
				})
			},
			interest1FnDebounced: _.debounce(function (Anchoer_Id) {
			      this.interest1Fn(Anchoer_Id)
			    }, 500),
			//取消关注/Interest/Cancel_InterestList
			interest2Fn(Anchoer_Id) {
				console.log(Anchoer_Id)
				ajaxTemplate('/Interest/Cancel_InterestList', {
					User_Id: this.$store.state.userInfo.User_Id,
					Anchoer_Id: Anchoer_Id,
				}).then(res => {
					if (res.Code == 200) {
						uni.showToast({
							title: res.Message,
							icon: 'none',
							duration: 2000
						})
					} else {
						uni.showToast({
							title: res.Message,
							icon: 'none',
							duration: 2000
						})
					}
					this.getdata()

				})
			},
			interest2FnDebounced: _.debounce(function (Anchoer_Id) {
			      this.interest2Fn(Anchoer_Id)
			    }, 500),

		},
		onShow() {
			console.log(this.activeIndex)
			ajaxTemplate('/Rank/Get_Rich_Rank', {
					User_Id: this.$store.state.userInfo.User_Id
				}).then(res => {
					console.log(res.Result, '富豪');
					this.richlist = res.Result

					if (this.richlist.length > 0) {
						this.toplogs1 = this.richlist[0].User_Logo
						this.topnames1 = this.richlist[0].User_Name
						this.tophq1 = this.richlist[0].Rich_Num
						this.toplevels1 = this.richlist[0].User_Level
						this.topgzs1 = this.richlist[0].Nobility_Level
						this.richlist.splice(0, 1)
					}
					if (this.richlist.length > 0) {
						this.toplogs2 = this.richlist[0].User_Logo
						this.topnames2 = this.richlist[0].User_Name
						this.tophq2 = this.richlist[0].Rich_Num
						this.toplevels2 = this.richlist[0].User_Level
						this.topgzs2 = this.richlist[0].Nobility_Level
						this.richlist.splice(0, 1)
					}
					if (this.richlist.length > 0) {
						this.toplogs3 = this.richlist[0].User_Logo
						this.topnames3 = this.richlist[0].User_Name
						this.tophq3 = this.richlist[0].Rich_Num
						this.toplevels3 = this.richlist[0].User_Level
						this.topgzs3 = this.richlist[0].Nobility_Level
						this.richlist.splice(0, 1)
					}
					console.log("富豪列表", this.richlist)
				}),
				this.getdata()
		},
	}
</script>

<style scoped lang="less">
	.box {
		background-color: #F4F4F5;


		.header {
			height: 176rpx;
			// background: #E73449 url(/static/image/back-y.png) no-repeat top center/100%;
			position: relative;
			background-color: #fff;
		}

		.content {
			// margin-top: 175rpx;
			background-color: #FFFFFF;

			.types {
				padding: 10rpx 10rpx;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
			}

			.monthbox {
				width: 258rpx;
				height: 56rpx;
				border-radius: 12rpx;
				border: 2rpx solid #E7E9EE;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-left: 232rpx;
				padding: 0 16rpx;
			}

			.explain {
				height: 44rpx;
				background: #FFF7EB;
				border-radius: 4rpx;
				line-height: 44rpx;
				padding-left: 12rpx;
			}

			.bigcontent {
				margin-bottom: 28rpx;

				.no2 {
					position: relative;
					width: 112rpx;
					height: 114rpx;
					background: url('/static/image/peopleheader.png') no-repeat center/100%;
				}

				.no2-attention {
					width: 130rpx;
					height: 48rpx;
					background: #C8D0D6;
					border-radius: 32rpx;
					display: flex;
					align-items: center;
					// justify-content: center;
					margin-top: 24rpx;
					margin-left: -10rpx;
				}

				.no2-detail {
					width: 230rpx;
					height: 146rpx;
					background: linear-gradient(180deg, #D9EDFF 0%, rgba(237, 246, 255, 0.4392) 51%, rgba(255, 255, 255, 0) 100%);
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
				}

				.no1 {
					position: relative;
					width: 130rpx;
					height: 128rpx;
					background: url('/static/image/peopleheader.png') no-repeat center/100%;
				}

				.no1-attention {
					width: 130rpx;
					height: 48rpx;
					background: #FFB866;
					border-radius: 32rpx;
					display: flex;
					align-items: center;
					// justify-content: center;
					margin-top: 35rpx;
				}

				.no1-detail {
					width: 230rpx;
					height: 146rpx;
					background: linear-gradient(180deg, #FFEDCA 0%, rgba(255, 246, 228, 0.3608) 49%, rgba(255, 255, 255, 0) 100%);
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
				}

				.no3 {
					position: relative;
					width: 112rpx;
					height: 114rpx;
					// margin-left: 108rpx;
					background: url('/static/image/peopleheader.png') no-repeat center/100%;
				}

				.no3-attention {
					width: 130rpx;
					height: 48rpx;
					background: #DAAE8E;
					border-radius: 32rpx;
					display: flex;
					align-items: center;
					// justify-content: center;
					margin-top: 24rpx;
				}

				.no3-detail {
					width: 230rpx;
					height: 146rpx;
					background: linear-gradient(180deg, #FFE0CA 0%, rgba(255, 239, 228, 0.3216) 49%, rgba(255, 255, 255, 0) 100%);
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
				}
			}

			.attenion-box {
				width: 128rpx;
				height: 54rpx;
				border-radius: 28rpx;
				border: 2rpx solid #ED5C2A;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.show {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		z-index: 9999;

		.backgroud-box {
			width: 664rpx;
			height: 968rpx;
			background: url('/static/image/newrule.png') no-repeat center/100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

		}
		.backgroud-box2 {
			width: 664rpx;
			height: 968rpx;
			background: url('/static/image/rule2.png') no-repeat center/100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
		
		}

		.btn {
			width: 316rpx;
			height: 88rpx;
			background: #FC683E;
			border-radius: 16rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
			// margin-top: 50rpx;
			// margin-left: 100rpx;
			position: absolute;
			bottom:0;
			left:100rpx;
		}
	}
</style>