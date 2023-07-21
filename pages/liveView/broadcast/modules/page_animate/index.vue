<template>
	<view class="msg">
		<var-tabs v-model:active="active" active-color="#ED5F2D " inactive-color="#8E92A4">
			<var-tab v-if="footObj!=null||baskObj!=null" name='比分'>比分</var-tab>
			<var-tab v-if="footObj!=null||baskObj!=null" name='赛况'>赛况</var-tab>
			<var-tab v-if="category2_id==1"  name='阵容'>阵容</var-tab>
		</var-tabs>
		<view class="btns-line">
			<view style="display: block;" v-if="active == '赛况'">

				<view class="btns">
					<text v-if="baskObj!=null&&baskObj.tlive!=null" style="display: block;" :class="{ active: type === '0' }" @click="type = '0'">文字直播</text>
					<text style="display: block;" :class="{ active: type === '1' }" @click="type = '1'">技术统计</text>
				</view>
				<!-- 篮球  文字直播-->
				<view v-if="category2_id==2">
					<view v-if="type==0" style="width: 670rpx;margin: 0rpx auto;overflow: scroll;height: 600rpx;">
						<view v-if="baskObj!=null&&baskObj.tlive!=null">
							<view class="baskC" v-for="item in sessions"  :style="{background:item[6] + item[7] == '主队' ? '#4174f2' : '#ff6d78'}">
								<!-- <view style="margin: 30px 0 0 30px;">{{item[0] + item[1] + item[2] + item[3] + item[4]}} </view> -->
								<view class="baskCBox"  >{{item}}</view>
							</view>
						</view>
						
					</view>
					<!--篮球 技术统计 -->
					<view v-if="type==1&&baskObj!=null" style="width: 670rpx;margin: 0rpx auto">
						<view
							style="display: flex;justify-content: space-around; font-size: 11px;color: #000;margin-top: 30rpx;">
							<view>
								<view>{{home}}</view>
							</view>
							<!-- <view>
							<span style="font-size: 16px;color: #000;">90</span> - <span style="font-size: 16px;color: #000;">90</span>
						</view> -->
							<view>
								<view>{{away}}</view>
							</view>
						</view>
						<view style="display: flex;">
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view> {{ baskObj.stats[0][1] }}</view>
									<view>3分球</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;transform: rotate(180deg);"
									track-color='#DBDDEC' color='#ee2144' :value="baskObj.stats[0][1]" />
							</view>
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view>进球数</view>
									<view> {{ baskObj.stats[0][2] }}</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;" track-color='#DBDDEC'
									:value="baskObj.stats[0][2]" />
							</view>
						</view>

						<view style="display: flex;">
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view> {{ baskObj.stats[1][1] }}</view>
									<view>2分球</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;transform: rotate(180deg);"
									track-color='#DBDDEC' color='#ee2144' :value="baskObj.stats[1][1]" />
							</view>
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view>进球数</view>
									<view> {{ baskObj.stats[1][2] }}</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;" track-color='#DBDDEC'
									:value="baskObj.stats[1][2]" />
							</view>
						</view>
						<view style="display: flex;">
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view> {{ baskObj.stats[2][1] }}</view>
									<view>罚球</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;transform: rotate(180deg);"
									track-color='#DBDDEC' color='#ee2144' :value="baskObj.stats[2][1]" />
							</view>
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view>进球数</view>
									<view> {{ baskObj.stats[2][2] }}</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;" track-color='#DBDDEC'
									:value="baskObj.stats[2][2]" />
							</view>
						</view>
						<view style="display: flex;">
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view> {{ baskObj.stats[3][1] }}</view>
									<view>剩余</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;transform: rotate(180deg);"
									track-color='#DBDDEC' color='#ee2144' :value="baskObj.stats[3][1]" />
							</view>
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view>暂停数</view>
									<view> {{ baskObj.stats[3][2] }}</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;" track-color='#DBDDEC'
									:value="baskObj.stats[3][2]" />
							</view>
						</view>
						<view style="display: flex;">
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view> {{ baskObj.stats[4][1] }}</view>
									<view>犯规</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;transform: rotate(180deg);"
									track-color='#DBDDEC' color='#ee2144' :value="baskObj.stats[4][1]" />
							</view>
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view>数</view>
									<view> {{ baskObj.stats[4][2] }}</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;" track-color='#DBDDEC'
									:value="baskObj.stats[4][2]" />
							</view>
						</view>
						<view style="display: flex;">
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view> {{ baskObj.stats[5][1] }}</view>
									<view>罚球</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;transform: rotate(180deg);"
									track-color='#DBDDEC' color='#ee2144' :value="baskObj.stats[5][1]" />
							</view>
							<view style="width: 50%;">
								<view style="display: flex;justify-content: space-between;">
									<view>命中率</view>
									<view> {{ baskObj.stats[5][2] }}</view>

								</view>
								<var-progress style="width: 100%;margin: 16rpx 0;" track-color='#DBDDEC'
									:value="baskObj.stats[5][2]" />
							</view>
						</view>
					</view>
				</view>
				<!-- 足球 -->
				<view v-if="category2_id==1">
					<view v-if="type==1">
						<view style="">
							<view class="statistics_top" style="padding: 0 10px;display: flex;align-items: center;">
								<view style="display: flex; align-items: center; font-size: 16px">
									<p style="
						                  border: 1px solid #dcdcdc;
						                  width: 64px;
						                  height: 64px;
						                  border-radius: 50%;
						                  align-items: center;
						                  display: flex;
						                  justify-content: center;
						                  margin-right: 15px;
						                ">
										<img v-if="home_Logo" :src="home_Logo" alt="" style="width: 41rpx; height: 49rpx" />
										<image v-else src="/static/image/noqd.png" style="width: 41rpx; height: 49rpx"
											/>
									</p>
									{{ home}}
								</view>
								<view style="font-size: 16px;color: #000;align-items: center;">vs</view>
								<view style="display: flex; align-items: center">
									{{ away }}
									<p style="
						                  border: 1px solid #dcdcdc;
						                  width: 64px;
						                  height: 64px;
						                  border-radius: 50%;
						                  align-items: center;
						                  display: flex;
						                  justify-content: center;
						                  margin-left: 15px;
						                ">
										<img v-if="away_Logo" :src="away_Logo" alt="" style="width: 41rpx; height: 49rpx" />
										<image v-else src="/static/image/noqd.png" style="width: 41rpx; height: 49rpx"
											/>
									</p>
								</view>
							</view>

							<!-- 轴 -->

							<view v-if="footObj!=null&&footObj.incidents!=undefined">
								<view v-for="item in footObj.incidents">
									<view style="display: flex;justify-content: center;align-items: end;">

										<view v-show="item.position == 1" class="footLeft">
											<span>{{ item.player_name }}</span>
											<span>{{ reasonType[item.reason_type] }}</span>
											<view v-for="(items,index) in imgList" style="display: inline-block;">
												<image v-if="items.num==item.type" :src="items.value" alt=""
													style="width: 25px; height: 25px; vertical-align: middle"></image>
											</view>

										</view>
										<view v-show="item.position == 2" class="footLeft">
										</view>
										<span v-if="item.check == true" class="time" :style="{
						                    background: item.position == 1 ? '#3C9CFE' : '#F45B63',
										
						                  }">{{ item.time }}</span>
										<view class="footRight" v-show="item.position == 1">
										</view>
										<view>

											<view class="footRight" v-show="item.position == 2">
												<view v-for="(items,index) in imgList" style="display: inline-block;">
													<image v-if="items.num==item.type" :src="items.value" alt=""
														style="width: 25px; height: 25px; vertical-align: middle" />
												</view>
												<span>{{ item.player_name }}</span>
												<span>{{ reasonType[item.reason_type] }}</span>
											</view>
										</view>
									</view>

								</view>
							</view>
						</view>
					</view>
					<view v-if="footObj!=null&&footObj.tlive!=undefined&&type==0">
						<view v-for="(item, index) in footObj.tlive" style="display: flex;width: 90%;margin-left: 30rpx;
						text-align: left;margin-top: 16rpx;">
							<view v-for="(items,index) in imgList">
								<image v-if="items.num==item.type" :src="items.value" alt=""
									style="width: 25rpx; height: 25rpx; vertical-align: middle"></image>

							</view>
							<view :style="{color: item.main == 0 ? '#4174f2' : '#F45B63'}"> {{ item.time }}</view>
							<view style="font-size: 16rpx;color: #000;"> {{ item.data }}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="active == '比分'">
				<!-- 篮球 -->
				<view v-if="baskObj!=null">
					<view
						style="display: flex;justify-content: space-between;width: 100vw;border-bottom:1px solid #999;padding-bottom: 16rpx;">
						<view style="width: 25%;text-align: center;">球队</view>
						<view>一</view>
						<view>二</view>
						<view>三</view>
						<view>四</view>
						<view style="margin-right: 16rpx;">总分</view>
					</view>
					<view>
						<view style="display: flex;justify-content: space-between;width: 100vw;padding: 16rpx 0;">
							<view style="width: 128rpx;text-align: center; overflow: hidden;white-space: nowrap;margin-left: 18px;  padding-left: 15px;text-overflow: ellipsis;" class="team1">{{home}}</view>
							<view style="color: #000;">{{baskObj.score[3][0]}}</view>
							<view style="color: #000;">{{baskObj.score[3][1]}}</view>
							<view style="color: #000;">{{baskObj.score[3][2]}}</view>
							<view style="color: #000;">{{baskObj.score[3][3]}}</view>
							<view style="margin-right: 16rpx;color: #F0222C;">{{baskObj.score[3][4]}}</view>
						</view>
						<view
							style="display: flex;justify-content: space-between;width: 100vw;border-bottom:1px solid #999;padding-bottom: 16rpx;margin-top:48rpx">
							<view style="width: 130rpx;text-align: center;overflow: hidden;white-space: nowrap;margin-left: 18px;    padding-left: 15px;text-overflow: ellipsis" class="team2">{{away}}</view>
							<view style="color: #000;">{{baskObj.score[4][0]}}</view>
							<view style="color: #000;">{{baskObj.score[4][1]}}</view>
							<view style="color: #000;">{{baskObj.score[4][2]}}</view>
							<view style="color: #000;">{{baskObj.score[4][3]}}</view>
							<view style="margin-right: 16rpx;color: #F0222C;">{{baskObj.score[4][4]}}</view>
						</view>
					</view>
					<view style="margin-left: 30px;margin-top: 30px;">
						<view style="display: flex;align-items: end;">
							<view style="margin-right: 20rpx;">
								<view>本节犯规</view>
								<view style="color: #F7BD5C;"> {{ baskObj.stats[4][1] }}</view>
							</view>

							<view>
								<view style="display: flex;justify-content: space-around;">
									<view style="color: #000;">{{ baskObj.stats[0][1] * 3 }}</view>
									<view style="color: #000;">3分球得分</view>
									<view style="color: #000;">{{ baskObj.stats[0][2] * 3 }}</view>
								</view>
								<var-progress style="width: 400rpx;margin: 16rpx 0;" track-color='#DBDDEC'
									:value="baskObj.stats[0][1] * 3" />
								<view style="display: flex;justify-content: space-around;color: #000;margin-top: 24px;">
									<view>{{ baskObj.stats[1][1] * 2 }}</view>
									<view>2分球得分</view>
									<view>{{ baskObj.stats[1][2] * 2 }}</view>
								</view>
								<var-progress style="width: 400rpx;" track-color='#DBDDEC'
									:value="baskObj.stats[1][1] * 2" />
							</view>

							<view style="margin-left: 20rpx;">
								<view>本节犯规</view>
								<view> {{ baskObj.stats[4][1] }}</view>
							</view>

						</view>
						<view style="display: flex;align-items: end;margin-top: 30px;">
							<view style="margin-right: 20rpx;">
								<view>剩余暂停</view>
								<view style="color: #F7BD5C;">{{baskObj.stats[3][1]}}</view>
							</view>

							<view>
								<view style="display: flex;justify-content: space-around;color: #000;">
									<view>{{ baskObj.stats[2][1] }}</view>
									<view>罚球得分</view>
									<view>{{ baskObj.stats[2][2] }}</view>
								</view>
								<var-progress style="width: 400rpx;margin: 16rpx 0;" track-color='#DBDDEC'
									:value="baskObj.stats[2][1]" />
								<view style="display: flex;justify-content: space-around;color: #000;  margin-top: 24px;">
									<view>{{ baskObj.stats[5][1] }}</view>
									<view>罚球命中率</view>
									<view>{{ baskObj.stats[5][2] }}</view>
								</view>
								<var-progress style="width: 400rpx;" track-color='#DBDDEC'
									:value=" baskObj.stats[5][1] " />
							</view>

							<view style="margin-left: 20rpx;">
								<view>剩余暂停</view>
								<view>{{baskObj.stats[3][2]}}</view>
							</view>

						</view>
					</view>
				</view>
				<!--足球 -->
				<!-- <view v-if="footObj==null">
					<image :src="emptyObj.img"></image>
				</view> -->
				<view v-if="footObj!=null">
					<view style="display: flex;justify-content: space-around;">
						<view style="display: flex;justify-content: center;width: 40%;">
							<view>{{home}}</view>
							<image v-if="home_Logo" style="width: 48rpx;height: 48rpx;" :src="home_Logo"></image>
							<image v-else src="/static/image/noqd.png" style="width: 48rpx; height: 48rpx"
								/>
							
						</view>
						<view style="font-size: 16px;color: #000;font-weight: bold;">vs</view>
						<view style="display: flex;justify-content: center;width: 40%;">
							<image v-if="away_Logo" style="width: 48rpx;height: 48rpx;" :src="away_Logo"></image>
							<image v-else src="/static/image/noqd.png" style="width: 48rpx; height: 48rpx"
								/>
							<view>{{away}}</view>

						</view>
					</view>

					<view class="statistics_top_btm">
						<view style="display: flex">
							<view style="margin-right: 50rpx">
								<image src="../../../../../static/image/flag.png" alt=""
									style="width: 28px; height: 28px">
								</image>


								<p style="
					                    width: 28px;
					                    text-align: center;
					                    font-size: 18px;
					                    font-weight: bold;
					                  ">
									{{ footObj.score[2][4] }}
								</p>
							</view>
							<view style="margin-right: 50rpx">
								<image src="../../../../../static/image/yellowpai.png" alt=""
									style="width: 28px; height: 28px"></image>


								<p style="
					                    width: 28px;
					                    text-align: center;
					                    font-size: 18px;
					                    font-weight: bold;
					                  ">
									{{ footObj.score[2][3] }}
								</p>
							</view>
							<view style="margin-right: 50rpx">
								<image src="../../../../../static/image/redpai.png" alt=""
									style="width: 28px; height: 28px">
								</image>


								<p style="
					                    width: 28px;
					                    text-align: center;
					                    font-size: 18px;
					                    font-weight: bold;
					                  ">
									{{ footObj.score[2][2] }}
								</p>
							</view>
						</view>
						<view style="display: flex">
							<view style="margin-left: 50rpx">
								<image src="../../../../../static/image/redpai.png" alt=""
									style="width: 28px; height: 28px">
								</image>


								<p style="
					                    width: 28px;
					                    text-align: center;
					                    font-size: 18px;
					                    font-weight: bold;
					                  ">
									{{ footObj.score[3][2] }}
								</p>
							</view>
							<view style="margin-left: 50rpx">
								<image src="../../../../../static/image/yellowpai.png" alt=""
									style="width: 28px; height: 28px"></image>


								<p style="
					                    width: 28px;
					                    text-align: center;
					                    font-size: 18px;
					                    font-weight: bold;
					                  ">
									{{ footObj.score[3][3] }}
								</p>
							</view>
							<view style="margin-left: 50rpx">
								<image src="../../../../../static/image/flag.png" alt=""
									style="width: 28px; height: 28px">
								</image>


								<p style="
					                    width: 28px;
					                    text-align: center;
					                    font-size: 18px;
					                    font-weight: bold;
					                  ">
									{{ footObj.score[3][4] }}
								</p>
							</view>
						</view>
					</view>
					<view class="statistics_center" style="border-bottom: 1px solid #dbdbdb">
						<view style="
					             display: flex;
					             justify-content: space-between;
					             align-items: center;
					             margin-bottom: 10rpx;
					           ">
							<var-progress :value="(footObj.score[2][4] / 10) * 100"
								style="transform: rotateY(180deg);  width: 350rpx" track-color='#DBDDEC'
								color='#ee2144' />
							<p style="
					               width: 8%;
					               text-align: center;
					               font-size: 20rpx;
					               font-weight: bold;
					             ">
								{{ footObj.score[2][4] }}
							</p>
							<p style="width: 8%; text-align: center; font-size: 20rpx">角球</p>
							<p style="
					               width: 8%;
					               text-align: center;
					               font-size: 20rpx;
					               font-weight: bold;
					             ">
								{{ footObj.score[3][4] }}
							</p>
							<var-progress :value="(footObj.score[3][4] / 10) * 100" style="width: 350rpx"
								track-color='#DBDDEC' color='#4174F3' />
						</view>
						<view style="
					             display: flex;
					             justify-content: space-between;
					             align-items: center;
					             margin-bottom: 10rpx;
					           ">
							<var-progress :value="(footObj.score[2][3] / 10) * 100"
								style="transform: rotateY(180deg);  width: 350rpx" track-color='#DBDDEC'
								color='#F55B63' />
							<p style="
					               width: 8%;
					               text-align: center;
					               font-size: 20rpx;
					               font-weight: bold;
					             ">
								{{ footObj.score[2][3] }}
							</p>
							<p style="width: 8%; text-align: center; font-size: 20rpx">黄牌</p>
							<p style="
					               width: 8%;
					               text-align: center;
					               font-size: 20rpx;
					               font-weight: bold;
					             ">
								{{ footObj.score[3][3] }}
							</p>
							<var-progress :value="(footObj.score[3][3] / 10) * 100" style="width: 350rpx"
								track-color='#DBDDEC' color='#4174F3' />
						</view>
						<view style="
					             display: flex;
					             justify-content: space-between;
					             align-items: center;
					             margin-bottom: 10rpx;
					           ">
							<var-progress :value="(footObj.score[2][2] / 10) * 100"
								style="transform: rotateY(180deg);  width: 350rpx" track-color='#DBDDEC'
								color='#F55B63' />
							<p style="
					               width: 8%;
					               text-align: center;
					               font-size: 20rpx;
					               font-weight: bold;
					             ">
								{{ footObj.score[2][2] }}
							</p>
							<p style="width: 8%; text-align: center; font-size: 20rpx">红牌</p>
							<p style="
					               width: 8%;
					               text-align: center;
					               font-size: 20rpx;
					               font-weight: bold;
					             ">
								{{ footObj.score[3][2] }}
							</p>
							<var-progress :value="(footObj.score[3][2] / 10) * 100" style="width: 350rpx"
								track-color='#DBDDEC' color='#4174F3' />
						</view>
						<view style="
					             display: flex;
					             justify-content: space-between;
					             align-items: center;
					             margin-bottom: 10rpx;
					           ">
							<var-progress :value="(footObj.score[2][6] / 10) * 100"
								style="transform: rotateY(180deg); width: 350rpx" track-color='#DBDDEC'
								color='#F55B63' />
							<p style="
					               width: 8%;
					               text-align: center;
					               font-size: 20rpx;
					               font-weight: bold;
					             ">
								{{ footObj.score[2][6] }}
							</p>
							<p style="width: 5%; text-align: center; font-size: 20rpx">点球</p>
							<p style="
					               width: 8%;
					               text-align: center;
					               font-size: 20rpx;
					               font-weight: bold;
					             ">
								{{ footObj.score[3][6] }}
							</p>
							<var-progress :value="(footObj.score[3][6] / 10) * 100" style="width: 350rpx"
								track-color='#DBDDEC' color='#4174F3' />
						</view>
					</view>
					<view style=" display: flex; flex-wrap: wrap">
						<p style="
					                display: flex;
					                align-items: center;
					                font-size: 14px;
					                color: #666666;
									padding: 20rpx;
					               
					              " v-for="(item, index) in titleList" :key="index">
							<image style="width: 22px; height: 22px; margin-right: 6px"
								:src="'../../../static/image/logo'+(Number(index)+1)+'.png'" alt=""></image>


							<span style="white-space: nowrap;font-size: 10rpx;">{{ item }}</span>
						</p>
					</view>
				</view>

			</view>
			<view v-if="active == '阵容'">
				<view v-if="category2_id==1">
					<view class="shoufa">
						首发阵容
					</view>
					<view style="display: flex;align-items: center;justify-content: space-around;line-height: 80rpx;
border-bottom: 1px solid #E7E9EE;">
						<view style="display: flex;align-items: center;">
							<image v-if="home_Logo" style="width: 48rpx;height: 48rpx;" :src="home_Logo"></image>
							<image v-else src="/static/image/noqd.png" style="width: 48rpx; height: 48rpx"
								/>
							<view>{{home}}</view>
						</view>
						<view style="display: flex;align-items: center;">
							<image v-if="away_Logo" style="width: 48rpx;height: 48rpx;" :src="away_Logo"></image>
							<image v-else src="/static/image/noqd.png" style="width: 48rpx; height: 48rpx"
								/>
							<view>{{away}}</view>
						</view>
					</view>
					<view style="display: flex;">
							<view style="width: 50%;">
								<view v-for="item in footTeam.home"  >
									<view style="width: 100%;"> 
										<view  v-if="item.first == 1" style="display: flex;align-items: center;border-top: 1px solid #E7E9EE;border-left: 1px solid #E7E9EE;border-right: 1px solid #E7E9EE;">
											<view style="width: 60rpx;text-align: left;">{{item.shirt_number}}</view>
										<image style="width: 56rpx;height: 56rpx;" :src="item.logo"></image>
										<view>
											<view style="text-align: left;width: 280rpx;">{{item.name}}</view>
											<view style="color: #999999; text-align: left" v-if="item.position == 'M'">
												中场
											</view>
										
										
											<view style="color: #999999; text-align: left" v-if="item.position == 'F'">
												前锋
											</view>
											
											<view style="color: #999999; text-align: left" v-if="item.position == 'D'">
												后卫
											</view>
											
											<view style="color: #999999; text-align: left" v-if="item.position == 'G'">
												守门员
											</view>
											
										</view>
										</view>
									</view>
								</view>
							</view>
						<view style="width: 50%">
						
							<view v-for="item in footTeam.away"  style="width: 100%;">
								<view  v-if="item.first == 1" style="display: flex;align-items: center;border-top: 1px solid #E7E9EE;border-left: 1px solid #E7E9EE;border-right: 1px solid #E7E9EE;">
									<view style="width: 60rpx;text-align: left;">{{item.shirt_number}}</view>
								<image style="width: 56rpx;height: 56rpx;" :src="item.logo"></image>
								<view>
									<view style="text-align: left;width: 280rpx;">{{item.name}}</view>
									<view style="color: #999999; text-align: left" v-if="item.position == 'M'">
										中场
									</view>
									<view style="color: #999999; text-align: left" v-if="item.position == 'F'">
										前锋
									</view>
									<view style="color: #999999; text-align: left" v-if="item.position == 'D'">
										后卫
									</view>
									<view style="color: #999999; text-align: left" v-if="item.position == 'G'">
										守门员
									</view>
								</view>
								</view>
							</view>		
						</view>
					</view>
					<view class="tb">
						替补阵容
					</view>
					<view style="display: flex;">
							<view style="width: 50%;">
								<view v-for="item in footTeam.home"  style="width: 100%;">
									<view  v-if="item.first == 0" style="display: flex;align-items: center;border-top: 1px solid #E7E9EE;border-left: 1px solid #E7E9EE;border-right: 1px solid #E7E9EE;">
										<view style="width: 60rpx;text-align: left;">{{item.shirt_number}}</view>
									<image style="width: 56rpx;height: 56rpx;" :src="item.logo"></image>
									<view>
										<view style="text-align: left;width: 280rpx;">{{item.name}}</view>
										<view style="color: #999999; text-align: left" v-if="item.position == 'M'">
											中场
										</view>
									
									
										<view style="color: #999999; text-align: left" v-if="item.position == 'F'">
											前锋
										</view>
										
										<view style="color: #999999; text-align: left" v-if="item.position == 'D'">
											后卫
										</view>
										
										<view style="color: #999999; text-align: left" v-if="item.position == 'G'">
											守门员
										</view>
										
									</view>
									</view>
								</view>
							</view>
						<view style="width: 50%">
						
							<view v-for="item in footTeam.away"  style="width: 100%;">
								<view  v-if="item.first == 0" style="display: flex;align-items: center;border-top: 1px solid #E7E9EE;border-left: 1px solid #E7E9EE;border-right: 1px solid #E7E9EE;">
									<view style="width: 60rpx;text-align: left;">{{item.shirt_number}}</view>
								<image style="width: 56rpx;height: 56rpx;" :src="item.logo"></image>
								<view>
									<view style="text-align: left;width: 280rpx;">{{item.name}}</view>
									<view style="color: #999999; text-align: left" v-if="item.position == 'M'">
										中场
									</view>
									<view style="color: #999999; text-align: left" v-if="item.position == 'F'">
										前锋
									</view>
									<view style="color: #999999; text-align: left" v-if="item.position == 'D'">
										后卫
									</view>
									<view style="color: #999999; text-align: left" v-if="item.position == 'G'">
										守门员
									</view>
								</view>
								</view>
							</view>		
						</view>
					</view>
				</view>
				
			</view>
		</view>


		<!-- <Empty v-if="baskObj==null" :txt="emptyObj.txt" :img="emptyObj.img" /> -->




	</view>
</template>

<script>
	import Empty from './Empty.vue';
	import {
		ajaxTemplate
	} from '../../../../../api/index.js'
	export default {
		components: {
			Empty
		},
		props: {
			Match_Id: {
				type: String,
				default: ''
			},
			home: {
				type: String,
				default: ''
			},
			away: {
				type: String,
				default: ''
			},
			home_Logo: {
				type: String,
				default: ''
			},
			away_Logo: {
				type: String,
				default: ''
			},
			category_id: {
				type: Number,
				default: 0
			},
		},
		watch:{
			category_id:function(newVal,old){
				this.category2_id=newVal
				console.log(newVal,old,'newValnewValnewVal');
				this.getList()
			}
		},
		data() {
			return {
				category2_id:'',
				type: '1',
				active: '阵容',
				titleList: [
					'进球',
					'射正',
					'射偏',
					'点球',
					'点球未进',
					'乌龙球',
					'助攻',
					'角球',
					'黄牌',
					'红牌',
					'换人',
					'两黄一红',
					'VAR'
				],
				baskObj: null,
				footObj: null,
				reasonType: [
					'未知',
					'犯规',
					'个人犯规',
					'侵犯对手 / 受伤换人',
					'战术犯规 / 战术换人',
					'进攻犯规',
					'无球犯规',
					'持续犯规',
					'持续侵犯',
					'暴力行为',
					'危险动作',
					'手球犯规',
					'严重犯规',
					'故意犯规(防守球员为最后一名防守人时)',
					'阻挡进球机会',
					'拖延时间',
					'视频回看裁定',
					'判罚取消',
					'争论',
					'对判罚表达异议',
					'犯规和攻击言语',
					'过度庆祝',
					'没有回退到要求的距离',
					'打架',
					'辅助判罚',
					'替补席',
					'赛后行为',
					'其他原因',
					'未被允许进入场地',
					'进入比赛场地',
					'离开比赛赛场',
					'非体育道德行为',
					'非主观意愿的恶意犯规',
					'冒充或顶替(指球员与球衣不是同一人上场比赛)',
					'干预var复审',
					'进入裁判评审区',
					'吐口水(向球员或裁判)',
					'病毒'
				],
				imgList: [{
						num: 1,
						value: '../../../static/image/logo1.png'
					},
					{
						num: 21,
						value: '../../../../static/image/logo2.png'
					},
					{
						num: 22,
						value: '../../../static/image/logo3.png'
					},
					{
						num: 8,
						value: '../../../static/image/logo4.png'
					},
					{
						num: 30,
						value: '../../../static/image/logo5.png'
					},
					{
						num: 17,
						value: '../../../static/image/logo6.png'
					},
					{
						num: 18,
						value: '../../../static/image/logo7.png'
					},
					{
						num: 2,
						value: './../../static/image/logo8.png'
					},
					{
						num: 3,
						value: '../../../static/image/logo9.png'
					},
					{
						num: 4,
						value: '../../../static/image/logo10.png'
					},
					{
						num: 9,
						value: '../../../static/image/logo11.png'
					},
					{
						num: 15,
						value: '/../../../static/image/logo12.png'
					},
					{
						num: 28,
						value: '../../../static/image/logo13.png'
					}
				],
				footTeam: {},
				sessions:[]
			}
		},
		computed: {
			emptyObj() {
				if (this.active == '比分') {
					return {
						txt: '比分没有噢',
						img: 'static/none-1.png'
					}
				}
				if (this.active == '赛况') {
					if (this.type == '0') {
						return {
							txt: '文字直播没有噢',
							img: 'static/none-1.png'
						}
					}
					if (this.type == '阵容') {
						return {
							txt: '技术统计没有噢',
							img: 'static/none-2.png'
						}
					}

				}
				if (this.active == '阵容') {
					return {
						txt: '阵容没有噢',
						img: 'static/none-1.png'
					}
				}
				return {
					txt: '啥都没有噢',
					img: 'static/none-1.png'
				}
			}
		},


		created(options) {
			console.log(this.Match_Id,this.category2_id,'aaaa');
		

			// this.category2_id=options.category2_id
			// console.log(category2_id,'category2_id');


		},
		onReady() {

		},

		onPageScroll(e) {

		},
		methods: {

	getList(){
		if (this.category2_id == 2) {
			ajaxTemplate('/User/Get_BasketBallMatchLive_List', {
				Match_Id: this.Match_Id
			}).then(Res => {
				console.log(Res, 'aaaaaaaaaaaaaaaaaaaaaa');
				this.baskObj = Res.Result
				if(this.footObj!=null||this.baskObj!=null){
					this.active='比分'
				}
				 this.sessions = []
				           
				           if (Res.Result != null) {
				             Res.Result.tlive.forEach((item) => {
				               // console.log(item, 'aaaaaaaaaa')
				               item.forEach((items) => {
				                 let str = items
				                 let arr = str.split(/\^/)
				                 console.log(arr, 'arrarr')
				                 arr.splice(0, 1)
				                 arr.splice(5, arr.length)
				                 let result = arr
				                   .map((itemc, index) => {
				                     if (itemc === '2') {
				                       return '客队'
				                     }
				                     if (itemc === '0') {
				                       return '中立'
				                     }
				                     if (itemc === '1') {
				                       return '主队'
				                     }
				                     return itemc
				                   })
				                   .join(' ')
				                 this.sessions.push(result)
				               })
				             })
				           }
			})
			
		} 
		
		if(this.category2_id==1){
			ajaxTemplate('/User/Get_FootBallMatchLive_List', {
				Match_Id: this.Match_Id
			}).then(Res => {
				console.log(Res,'cccccccccccccccc');
				this.footObj = Res.Result
				if(Res.Result!=null){
					this.footObj.incidents.forEach((item) => {
						item.check = false
						this.imgList.forEach((items) => {
							if (items.num == item.type) {
								item.check = true
							}
						})
					})
				}
				if(this.footObj!=null||this.baskObj!=null){
					this.active='比分'
				}
			})
			ajaxTemplate('/User/Get_FootLineUpMatchLive_List', {
				Match_Id: this.Match_Id
			}).then(Res => {
				console.log(Res, 'bbbbbbbbbbb');
				this.footTeam = Res.Result.results
		
			})
		
		}
		
		
	}

		}
	}
</script>


<style lang='scss' scoped>
	.btns-line {
		text-align: center;
		margin-top: 32rpx;

		.btns {

			display: inline-flex;
			height: 64rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			opacity: 1;
			border: 1px solid #E7E9EE;


			text {
				font-size: 24rpx;
				padding: 18rpx 52rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #f0222c;
				background: #fff;
				border-radius: 34rpx;
				transition: all 0.3s;

				&.active {
					color: #ffffff;
					background: #ee2144;
				}
			}
		}
	}


	.empty {
		margin-top: 148rpx;
	}

	.team1 {
		position: relative;
	}

	.team1::after {
		position: absolute;
		display: block;
		content: '';
		width: 3px;
		height: 9px;
		background: #E56361;
		border-radius: 2px 2px 2px 2px;
		top: 4px;
		left: 0px;
	}

	.team2 {
		position: relative;
	}

	.team2::after {
		position: absolute;
		display: block;
		content: '';
		width: 3px;
		height: 9px;
		background: #4F71F7;
		border-radius: 2px 2px 2px 2px;
		top: 4px;
		left: 0px;
	}

	.baskC {
		width: 12px;
		height: 12px;
		background: #F0222C;
		border-radius: 50%;
		opacity: 1;
		position: relative;
		margin: 80rpx 0;
	}

	.baskC::after {
		display: block;
		position: absolute;
		content: '';
		height: 60rpx;
		border: 1px dashed #B5B6B9;
		top: 14px;
		left: 5px;
	}

	.baskCBox {
		width: 600rpx;
		/* line-height: 26px; */
		background: #F9F9FB;
		border-radius: 2px 2px 2px 2px;
		opacity: 1;
		margin: 0px 0 0 30px;
		text-align: left;
		padding:0 16rpx;
	}

	.statistics_top_btm {
		width: 100%;
		display: flex;
		padding: 0 60rpx;
		margin-top: 40rpx;
		justify-content: space-between;
	}

	.statistics_center {
		width: 100%;
		padding: 40rpx 60rpx;
	}

	.statistics_top {
		width: 100%;
		display: flex;
		padding: 0 60rpx;
		margin-top: 40rpx;
		justify-content: space-between;
	}

	.time {
		display: inline-block;
		padding: 10px;
		background: #3c9cfe;
		opacity: 1;
		border-radius: 50%;
		font-size: 12px;
		font-weight: bold;
		color: #ffffff;
		margin-top: 60px;
		position: relative;
	}

	.time::after {
		position: absolute;
		display: block;
		content: '';
		border: 1px solid #dbdbdb;
		height: 100rpx;
		top: 38px;
		left: 50%;
		transform: translateX(-50%);
	}

	.footLeft {
		display: inline-block;
		width: 300rpx;
		background: #f9f9fb;
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		text-align: right;
		transform: translateY(160rpx);
		/* margin-right: 400rpx; */
	}

	.footRight {
		display: inline-block;
		width: 300rpx;
		background: #f9f9fb;
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		text-align: left;
		transform: translateY(160rpx);
		/* margin-left: 400rpx; */
	}

	.shoufa {
		text-align: left;
		line-height: 64rpx;
		padding-left: 30rpx;
		background: #F4F4F5;
		position: relative;
	}

	.shoufa::after {
		display: block;
		content: '';
		width: 3px;
		height: 12px;
		background: #F0222C;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		position: absolute;
		top: 10px;
		left: 8px;
	}
	.tb{
		text-align: left;
		line-height: 64rpx;
		padding-left: 30rpx;
		background: #F4F4F5;
		position: relative;
	}
	.tb::after {
		display: block;
		content: '';
		width: 3px;
		height: 12px;
		background: #F0222C;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		position: absolute;
		top: 10px;
		left: 8px;
	}
</style>
