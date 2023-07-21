<template>



	<view class="content" style="height:91vh;background-color: #F5F5F5">
		<var-app-bar id="top" style="border: none; position: fixed; top:0;height:280rpx;z-index:2" round
			image="/static/image/bjimg5.png" :elevation="false">
			<template #content>
				<view class="box">
					<!-- <image style="width: 90px;height: 26px;" src="../../static/image/logo.png"></image> -->
					<view class="head_input" @click="Tosearch">
						<!-- <input type="text" placeholder-style="fontSize:20rpx" placeholder="#姆巴佩替补险些救主" /> -->
						<image src="../../static/image/search.png" style="width: 26rpx; height: 26rpx"></image>
						<view>#姆巴佩替补险些救主</view>

					</view>
					<view class="dR" @click="toaccomplishedperson()">
						<image src="../../static/image/dr.png" style="width: 48rpx; height: 48rpx"></image>
						<view style="font-size: 18rpx">达人榜</view>
					</view>
				</view>

				<scroll-view style="height:80rpx" class="scroll-view_H" scroll-x="true" @scroll="scroll">
					<view style="display: inline-block;" @click="changeType(item, index)"
						:class="tips == index ? 'items' : 'item'" v-for="(item, index) in tabList" :key="index">
						{{ item.name_zh }}
					</view>
				</scroll-view>

			</template>
		</var-app-bar>

		<view style="background-color: #F5F5F5;min-height: 100vh;">

			<!-- <scroll-view style="height:94vh" scroll-y="true" :refresher-enabled="true"
			@scrolltolower='scrolltolower' :refresher-threshold="30"
				:refresher-triggered="triggered" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
				@refresherrestore="onRestore" @refresherabort="onAbort" refresher-background="" :show-scrollbar="false"> -->
			<!-- <view v-if="isShow">别拉了，没有更多了~</view> -->
			<!-- <var-loading type="circle" v-if="isShow" /> -->
			<!-- <view style="height: 280rpx;"></view> -->
			<!-- 	<view v-if="isShow" style="text-align: center;">别拉了，没有更多了~</view> -->
			<view
				style="background-color: #F5F5F5;padding-top:280rpx;background-size: 108% 520rpx;background-position: top center ;minheight: 100vh;background-repeat: no-repeat;"
				v-if="tips == 0" :style="{backgroundImage:LBlist.length>0?'url('+'/static/image/sssy.png'+')':''}">
				<view v-if="LBlist.length>0">
					<swiper style="margin: 20px 10px 0 10px" circular :indicator-dots="indicatorDots"
						:autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item style="border-radius: 4px" v-for="(item, i) in LBlist" :key="i">
							<image style="border-radius: 4px; width: 100%; height: 100%" :src="item.Live_Rotation_Img"
								mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</view>

				<view v-if="Matchlist.length>0" style="display: flex; align-items: center; margin-top: 20px">
					<image src="../../static/image/newfire.png" style="width: 60rpx; height: 60rpx; margin-left: 10px;margin-right:2px">
					</image>
					
					<div>
						<div style="font-size: 28rpx;
font-family: Source Han Sans CN-Bold, Source Han Sans CN;
font-weight: bold;
color: #333333;">热门比赛</div>
						<div style="font-size: 20rpx;
font-family: DIN-Regular, DIN;
font-weight: 400;
color: #888C94;">Popular Games</div>
					</div>
					
					<!-- <image src="../../static/image/bs.png" style="width: 62px; height: 12px; margin-left: 10px">
					</image>
					<image src="../../static/image/s.png" style="width: 1px; height: 16px; margin-left: 10px">
					</image> -->
					<!-- <view style="margin-left: 10px">{{ Matchlist.length }}场比赛</view> -->
				</view>

				<view>
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
						<view>
							<view id="demo1" class="scroll-view-item_H" v-for="(item, index) in Matchlist" :key="index"
								@click="toBroadcast2(item)">
								<view class="scorll_head">
									<view class="scorll_headleft">{{ item.competition_Name }}</view>
									<view>{{ item.match_date }}</view>
								</view>
								<view style="
                      display: flex;
                      align-items: center;
                      justify-content: space-around;
                      font-size: 12px;
                      font-weight: 400;
                      color: #333333;
                      margin-top: 12px;
                    ">
									<view style="display: flex; align-items: center;width:70%;">
										<image v-if="item.home_team_Logo" :src="item.home_team_Logo" style="width: 18px; height: 18px">
										</image>
										<image v-else src="/static/image/noqd.png" style="width: 18px; height: 18px"
											/>
										<view style="margin-left: 4px;overflow: hidden;text-overflow: ellipsis;flex:1">{{
                        item.home_team_Name
                      }}</view>
									</view>
									<view>{{ item.home_scores }}</view>
								</view>
								<view style="
                      display: flex;
                      align-items: center;
                      justify-content: space-around;
                      font-size: 12px;
                      font-weight: 400;
                      color: #333333;
                      margin-top: 12px;
                    ">
									<view style="display: flex; align-items: center;width:70%;">
										<image v-if="item.away_team_Logo" :src="item.away_team_Logo" style="width: 18px; height: 18px">
										</image>
										<image v-else src="/static/image/noqd.png" style="width: 18px; height: 18px"
											/>
										<view style="margin-left: 4px;overflow: hidden;text-overflow: ellipsis;flex:1">{{
                        item.away_team_Name
                      }}</view>
									</view>
									<view>{{ item.away_scores }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<!-- <view v-if="hotList.length > 0" style="
              display: flex;
              align-items: center;
              font-size: 14px;
              font-weight: bold;
              color: #333333;
              margin-left: 10px;
              margin-top: 20px;
            ">
					<image src="../../static/image/zb.png" style="width: 20px; height: 20px"></image>
					<view style="margin-left: 6px">热门直播</view>
				</view> -->

				<!-- <view style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              margin: 0 10px;
            ">
					<view v-for="(item, index) in hotList" :key="index" class="zb_box" @click="toBroadcast(item)">
						<view class="bq">
							<image :src="'../../static/image/bq/' + item.Anchoer_Tab + '.png'" alt=""
								mode="heightFix" />
						</view>

						<image style="width: 100%; height: 98px;" :src="item.Match_Img" mode="aspectFill">
						</image>
						

						<view style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #333333;
                  margin-left: 6px;
				  overflow: hidden;
				  white-space: nowrap;
				  text-overflow: ellipsis;
                ">{{ item.Match_Title }}
						</view>
						<view style="
                  display: flex;
                  justify-content: space-between;
                  padding: 6px;
                  align-items: center;
                ">
							<view>{{ item.Anchoer_Name }}</view>
							<view style="font-size: 11px">
								<image src="../../static/image/gfire.png" style="width: 10px; height: 10px"></image>
								{{ item.Popularity_Value }}
							</view>
						</view>
					</view>
				</view> -->

				<view v-if="StartList.length>0" style="
              display: flex;
              align-items: center;
              font-size: 14px;
              font-weight: bold;
              color: #333333;
              margin-left: 10px;
              margin-top: 20px;
			  
            ">
					<image src="../../static/image/newzb.png" style="width: 60rpx; height: 60rpx"></image>
					<view style="margin-left: 6px">
						<view style="font-size: 28rpx;
font-family: Source Han Sans CN-Bold, Source Han Sans CN;
font-weight: bold;
color: #333333;">热门直播</view>
						<view style="font-size: 20rpx;
font-family: DIN-Regular, DIN;
font-weight: 400;
color: #888C94;">Popular Live</view>
					</view>
				</view>

				<view style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              margin: 0 10px 40rpx;
			  padding-bottom: 20rpx;
            ">
					<view v-for="(item, index) in StartList" :key="index" class="zb_box" @click="toBroadcast(item)">
						<view class="bq">
							<image :src="'../../static/image/bqq/' + item.Anchoer_Tab + '.png'" alt=""
								mode="heightFix" />
							
						</view>
						<image style="width: 100%; height: 98px" :src="item.Match_Img" mode="aspectFill">
						</image>
						<view style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #333333;
                  margin-left: 6px;
				  overflow: hidden;
				  white-space: nowrap;
				  text-overflow: ellipsis;
                ">{{ item.Match_Title }}
						</view>
						<view style="
                  display: flex;
                  justify-content: space-between;
                  padding: 6px;
                  align-items: center;
                ">
							<view>{{ item.Anchoer_Name }}</view>
							<view style="font-size: 11px">
								<image src="../../static/image/gfire.png" style="width: 10px; height: 10px"></image>
								{{ item.Match_Num }}
							</view>
						</view>
					</view>
				</view>
				<view v-if="StartList.length==0&&hotList.length==0" style="
				  display: flex;
				  justify-content: center;
				  flex-direction: column;
				  align-items: center;
				  width:100%;
				  height:100%;
				  margin-top:250rpx;
				">
					<image src="/static/image/sckong.png" mode="" style="width: 400rpx; height: 400rpx; ">
					</image>
					<view style="color: #9ea2af; font-size: 26rpx; margin-top: 15rpx">
						暂无数据
					</view>
				</view>
			</view>
			<view v-if="tips != 0" style="background: #F5F5F5;">
				<view style="height: 280rpx;"></view>
				<view>
					<view v-if="AnchoerList.length>0" class="bodyheader" style="margin-top: 28rpx;background: #F5F5F5">
						<image src="../../static/image/newzhub.png"
							style="width: 60rpx; height: 60rpx; margin-right: 24rpx">
						</image>
						<view style="font-size: 28rpx; color: #333333; font-weight: bold">
							<view style="font-size: 28rpx;
font-family: Source Han Sans CN-Bold, Source Han Sans CN;
font-weight: bold;
color: #333333;">推荐主播</view>
							<view style="font-size: 20rpx;
font-family: DIN-Regular, DIN;
font-weight: 400;
color: #888C94;">RECOMMENDED ANCHOR</view>
						</view>
					</view>
					<view>
						<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
							<view v-for="item in AnchoerList" class="zhuboitem">
								<view class="zhuboimg">
									<image :src="item.Anchoer_Logo"
										style="width: 110rpx; height: 110rpx;border-radius: 50%;"></image>

									<div class="zhubwgz" v-if="item.IsInterest==0" @click="addAnchoerDebounced(item.Anchoer_Id)">
										<!-- <image src="../../static/image/gz.png"
											style="width: 20rpx; height: 20rpx; margin-right: 2rpx"></image> -->
										<div>关注</div>
									</div>
									<div class='zhubgz' v-if="item.IsInterest==1" @click='submit2Debounced(item.Anchoer_Id)'>
										<!-- <image src="../../static/image/ygz.png"
											style="width: 20rpx;height: 20rpx;margin-right:2rpx"></image> -->
										<div>已关注</div>
									</div>
								</view>
								<view class="zhubotitle">
									<view>{{ item.Anchoer_Name }}</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view v-if="topList.length>0" style="
						  display: flex;
						  align-items: center;
						  font-size: 14px;
						  font-weight: bold;
						  color: #333333;
						  margin-left: 10px;
						  margin-top: 20px;
						">
						<image src="../../static/image/nezbb.png" style="width: 60rpx; height: 60rpx"></image>
						<view style="margin-left: 6px">
							<view style="font-size: 28rpx;
font-family: Source Han Sans CN-Bold, Source Han Sans CN;
font-weight: bold;
color: #333333;">推荐直播</view>
							<view style="font-size: 20rpx;
font-family: DIN-Regular, DIN;
font-weight: 400;
color: #888C94;">RECOMMENDED LIVEs</view>
						</view>
					</view>
					<view style="
						    display: flex;
						    flex-wrap: wrap;
						    justify-content: space-between;
						    margin: 0 10px 20px;
						  ">
						<view v-for="(item, index) in topList" :key="index" class="zb_box" @click="toBroadcast(item)">
							<view class="bq">
								<image :src="'../../static/image/bqq/' + item.Anchoer_Tab + '.png'" alt=""
									mode="heightFix" />
							</view>

							<image style="width: 100%; height: 98px" :src="item.Match_Img" mode="aspectFill">
							</image>
							<view style="
						        font-size: 14px;
						        font-weight: 500;
						        color: #333333;
						        margin-left: 6px;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
						      ">{{item.Match_Title}}
							</view>
							<view style="
						        display: flex;
						        justify-content: space-between;
						        padding: 6px;
						        align-items: center;
						      ">
								<view>{{item.Anchoer_Name}}</view>
								<view style="font-size: 11px">
									<image src="../../static/image/gfire.png" style="width: 10px; height: 10px">
									</image>
									{{item.Popularity_Value}}
								</view>
							</view>
						</view>

						<view v-if="topList.length==0" style="
						  display: flex;
						  justify-content: center;
						  flex-direction: column;
						  align-items: center;
						  width:100%;
						  height:100%;
						  margin-top:250rpx;
						">
							<image src="/static/image/sckong.png" mode="" style="width: 400rpx; height: 400rpx; ">
							</image>
							<view style="color: #9ea2af; font-size: 26rpx; margin-top: 15rpx">
								暂无数据
							</view>
						</view>
					</view>
				</view>

			</view>

			<m-tabbar fixed fill :current="current" :tabbar="tabbar"></m-tabbar>
		</view>

		<!-- 是否去更新 -->
		<view v-if="GXshow" class="clean">
			<view class="cleancontent">
				<view style="color:#333333;font-size: 30rpx;margin:60rpx 20rpx 0;">当前版本号：{{version}}</view>
				<view style="color:#333333;font-size: 30rpx;margin:20rpx;">最新版本号：{{versionInfo.NewVersion}}</view>
				<view class="foot">
					<view class="left" @click="GXshow=false">取消</view>
					<view class="right" @click="toGX">去更新</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import TabbarConfig from '/utils/tabbar.js'
	import _ from 'lodash'
	import {
		ajaxTemplate
	} from '../../api/index.js'
	// const module = uni.requireNativePlugin("leven-device-UniqueModule");
	export default {
		data() {
			return {
				Animation_State:'',
				key: '推荐',
				versionInfo: {},
				version: '',
				GXshow: false,
				current: 2,
				tabbar: TabbarConfig,
				title: '直播',
				tabList: [{
					name_zh: '推荐',
					category2_id: '推荐'
				}], //分类
				category2_id: '',
				LBlist: [], //轮播
				Matchlist: [], //比赛
				hotList: [], //热门
				topList: [],
				AnchoerList: [],
				StartList: [],
				nomore: false,
				tatal: 0,
				page: 1,
				limit: 10,
				User_Id: "",
				tips: 0,
				show: true,
				triggered: false,
				_freshing: false,
				isShow: false,
				Live_Rotation_Type: 'App',
				autoplay: false,
				needSave: {},
			}
		},

	 onShow() {
		 
			uni.hideTabBar()
			
			setTimeout(()=>{
				console.log(uni.getStorageSync("New_State"))
				if (uni.getStorageSync("New_State") == 1) {
					this.current = 2
				}else{
					this.current = 1
				}
			},1000)
			
			this.gettypelist()

			// plus.runtime.getProperty(plus.runtime.appid, (inf) => {
			// 	console.log(JSON.stringify(inf.version));
			// 	this.version = inf.version

			// 	this.getversion()
			// });
			this.page=1
			
			//获取本地数据for key
			console.log(this.getData('推荐'), 'this.getData("")')
			if (this.getData('推荐') !== null) {
				console.log(111)
				//获取本地数据
				//赋值
				// this.LBlist = this.getData('推荐').getLBlist
				// this.hotList = this.getData('推荐').gethotlist
				// this.Matchlist = this.getData('推荐').GetMatchList
				// this.StartList = this.getData('推荐').getStartList
				this.refreshnew("推荐")

			} else {
				uni.startPullDownRefresh()
				//调接口获取新数据
				// this.refreshnew("推荐")
			}

			//tabbar
			
			


		},
	onLoad() {
		plus.runtime.getProperty(plus.runtime.appid, (inf) => {
			console.log(JSON.stringify(inf.version));
			this.version = inf.version
			this.getversion()
		});
		
		},
		onReady() {},
		onReachBottom() {
			if (this.getData("推荐").getStartList.length < this.tatal) {
			
				// this.tabsList.Page++
				this.page++
				this.getStartList("推荐")
			}
			
			// if (this.StartList.length < this.tatal) {
			// 	this.page++
			// 	this.getStartList()
			// } 

		},
		onPullDownRefresh() {
			uni.removeStorageSync(this.key)
			if (this.key == "推荐") {
				this.page=1
				this.refreshnew("推荐")
				uni.removeStorageSync("total")
				
			} else {
				this.refresh2(this.key)
			}

			// this.refresh()

		},
		onPageScroll(e) {
			if (e.scrollTop > 0) {
				this.show = false
			} else {
				this.show = true
			}
		},
		methods: {
			saveTotal(key, value) {
				uni.setStorageSync(key, value)
			},
			getTotal(key) {
				return uni.getStorageSync(key)
			},
			saveData(key, value) {
				console.log(value, "saveData")
				uni.setStorageSync(key, JSON.stringify(value))
			},
			getData(key) {
				let data = null
				if (uni.getStorageSync(key)) {
					data = JSON.parse(uni.getStorageSync(key)) || null
				}
				if (data === null) {
					uni.removeStorageSync(key)
				}
				return data
			},
			async refreshnew(key) {

				await this.getLBlist(key)
				// await this.gethotlist(key)
				await this.GetMatchList(key)
				await this.getStartList(key)

				uni.stopPullDownRefresh()

				console.log(this.needSave, 'refreshnew')

			},
			// async refresh() {
			// 	await this.getLBlist()
			// 	await this.gethotlist()
			// 	await this.GetMatchList()
			// 	await this.getStartList()
			// 	await this.gettoplist()
			// 	uni.stopPullDownRefresh()

			// 	console.log(this.needSave,'refresh')
			// 	this.saveData(key, this.needSave)
			// },
			async refresh2(key) {
				await this.gettoplist(key)
				await this.getAnchoerList(key)
				uni.stopPullDownRefresh()
			},
			getversion() {
				console.log({
					Code: uni.$Code,
					Version: this.version
				},"77777777777777777777777")
				
				ajaxTemplate("/User/GetVersion_Replace", {
					Code: uni.$Code,
					Version: this.version
				}).then((res) => {
					console.log(res, 999999)
					this.versionInfo = res.Result
					if (res.Result.IsReplace == 1) {
						if(uni.getStorageSync("gogx")){
							this.GXshow = true
							uni.setStorageSync("gogx", false)
						}
						
					}
				})
			},
			toGX() {
				//this.versionInfo.Jump_Url
				plus.runtime.openURL(this.versionInfo.Jump_Url)
				console.log(this.versionInfo.Jump_Url)
				
				this.GXshow = false
				
			},

			//获取开赛数据列表/Live/GetMatch_Start_List
			getStartList(key) {
				ajaxTemplate('/Live/GetMatch_Start_List', {
					Page: this.page,
					Limit: this.limit
				}).then((res) => {
					console.log('开赛', res)
					this.tatal = res.Count
					this.saveTotal('total', this.tatal)
					
					if (this.StartList.length < res.Count) {
						this.StartList = this.StartList.concat(res.Data) || []

						this.needSave.getStartList = this.StartList
						console.log(this.needSave)
						this.saveData(key, this.needSave)

					} else {
						this.StartList = res.Data || []
						this.needSave.getStartList = this.StartList
						console.log(this.needSave)
						this.saveData(key, this.needSave)
					}


				})
			},
			//获取推荐主播/LiveIndex/GetRecommend_AnchoerList
			getAnchoerList(key) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					ajaxTemplate('/LiveIndex/GetRecommend_AnchoerList', {
						Category2_id: this.category2_id,
						Page: 1,
						Limit: 100,
					}).then((res) => {
						console.log('主播0', res)
						this.AnchoerList = res.Data || []
						this.AnchoerList.forEach((item) => {
							if (item.Anchoer_Tab == 2) {
								item.Anchoer_Tab = '美女主播'
							}
							if (item.Anchoer_Tab == 3) {
								item.Anchoer_Tab = '专业解说'
							}
							if (item.Anchoer_Tab == 4) {
								item.Anchoer_Tab = '热门主播'
							}
							if (item.Anchoer_Tab == 5) {
								item.Anchoer_Tab = '明星主播'
							}
						})
						this.needSave.getAnchoerList = this.AnchoerList
						this.saveData(key, this.needSave)
					})
					return
				}
				console.log(this.$store.state.userInfo.User_Id)
				this.User_Id = this.$store.state.userInfo.User_Id
				ajaxTemplate('/LiveIndex/GetRecommend_AnchoerList', {
					Category2_id: this.category2_id,
					User_Id: this.User_Id,
					Page: 1,
					Limit: 100,
				}).then((res) => {
					console.log('主播1', res)
					this.AnchoerList = res.Data || []

					this.AnchoerList.forEach((item) => {
						if (item.Anchoer_Tab == 2) {
							item.Anchoer_Tab = '美女主播'
						}
						if (item.Anchoer_Tab == 3) {
							item.Anchoer_Tab = '专业解说'
						}
						if (item.Anchoer_Tab == 4) {
							item.Anchoer_Tab = '热门主播'
						}
						if (item.Anchoer_Tab == 5) {
							item.Anchoer_Tab = '明星主播'
						}
					})

					this.needSave.getAnchoerList = this.AnchoerList
					this.saveData(key, this.needSave)
				})
			},
			//获取热门直播/LiveIndex/GetRecommend_LiveList
			// gethotlist(key) {
			// 	ajaxTemplate('/LiveIndex/GetRecommend_LiveList', {}).then((res) => {
			// 		console.log('热门', res)
			// 		this.hotList = res.Result.hot || []

			// 		this.needSave.gethotlist = this.hotList
			// 		console.log(this.needSave)
			// 		this.saveData(key, this.needSave)
			// 	})
			// },
			//获取推荐直播/LiveIndex/GetRecommend_LiveList
			gettoplist(key) {
				ajaxTemplate('/LiveIndex/GetRecommend_LiveList', {
					Category2_id: this.category2_id
				}).then((res) => {
					this.topList = res.Result.hot || []

					this.needSave.gettoplist = this.topList
					this.saveData(key, this.needSave)
					console.log(this.needSave)
				})
			},

			//获取比赛分类/Live/GetMatchTypeList
			gettypelist() {
				this.tabList = [{
					name_zh: '推荐',
					category2_id: '推荐'
				}]

				// if (this.tabList.length != 1) return

				ajaxTemplate('/Live/GetMatchTypeList').then((res) => {
					console.log(res)
					let arr = []
					res.Result.forEach((item) => {
						item.ChildList.forEach((item2) => {
							arr.push(item2)
						})
					})
					console.log(arr)
					this.tabList = this.tabList.concat(arr)

				})
			},
			//滚动图列表/Live/GetLive_RotationList
			getLBlist(key) {
				ajaxTemplate('/Live/GetLive_RotationList', {
					Live_Rotation_Type: "App"
				}).then((res) => {

					this.LBlist = res.Result || []

					this.needSave.getLBlist = this.LBlist
					this.saveData(key, this.needSave)
				})
			},
			//获取无主播的已开赛未开赛数据列表/Live/GetMatch_List
			GetMatchList(key) {
				ajaxTemplate('/Live/GetMatch_List').then((res) => {
					// this.Matchlist = res.Result.filter((req) => {
					// 	return req.matchstatus == 1
					// })
					this.Matchlist = res.Result
					console.log(this.Matchlist, 999)
					this.Matchlist.forEach((item, index) => {
						item.match_date = item.match_date.substring(11, 16)
					})

					this.needSave.GetMatchList = this.Matchlist
					this.saveData(key, this.needSave)
				})
			},
			addAnchoerDebounced: _.debounce(function (id) {
			      this.addAnchoer(id)
			    }, 500),
			//关注主播/Interest/Add_InterestList
			addAnchoer(id) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					// uni.showToast({
					// 	title: "请先登录",
					// 	duration: 1000,
					// });
					uni.navigateTo({
						url: "/pages/login/index",
					});
					this.show = false
					return;
				}
				this.User_Id = this.$store.state.userInfo.User_Id
				ajaxTemplate("/Interest/Add_InterestList", {
					User_Id: this.User_Id,
					Anchoer_Id: id
				}).then((res) => {
					console.log(res)
					if (res.Code == 200) {
						uni.showToast({
							title: res.Message,
							mask: true,
							icon: "none"
						})

					} else {
						uni.showToast({
							title: res.Message,
							mask: true,
							icon: "none"
						})
					}

					this.getAnchoerList()
				})
			},
			submit2Debounced: _.debounce(function (id) {
			      this.submit2(id)
			    }, 500),
			submit2(id) {
				if (this.$store.state.userInfo.User_Id != undefined) {
					ajaxTemplate('/Interest/Cancel_InterestList', {
						User_Id:this.$store.state.userInfo.User_Id,
						Anchoer_Id: id
					}).then(res => {
						uni.showToast({
							icon: 'none',
							title: res.Message,
							mask: true
						})
						this.getAnchoerList()
					})
				} else {
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
			},

			//
			changeType(item, index) {
				this.needSave = {}
				this.key = item.name_zh

				this.tips = index
				this.page = 1
				uni.pageScrollTo({
					scrollTop: 0, //滚动的距离
					duration: 0, //过渡时间
				})
				if (item.category2_id == '推荐') {
					console.log(this.getData('推荐'))
					if (this.getData('推荐') !== null) {
						//获取本地数据
						//赋值
						// this.LBlist = this.getData('推荐').getLBlist
						// this.hotList = this.getData('推荐').gethotlist
						// this.Matchlist = this.getData('推荐').GetMatchList
						// this.StartList = this.getData('推荐').getStartList
						uni.startPullDownRefresh()
						//调接口获取新数据
						// this.refreshnew("推荐")

					} else {
						uni.startPullDownRefresh()
						//调接口获取新数据
						// this.refreshnew("推荐")
					}

					// if (this.LBlist.length == 0 || this.hotList.length == 0 || this.Matchlist.length == 0 || this.StartList
					// 	.length == 0 || this.topList.length == 0) {
					// 	uni.startPullDownRefresh()
					// }

					// this.refresh()
					// setTimeout(() => {
					// 	this.gethotlist()
					// 	this.getStartList()
					// 	this.getLBlist()
					// 	this.GetMatchList()
					// }, 1000)
					// if (this.hotList.length == 0) {
					// 	this.gethotlist()
					// }
					// if (this.StartList.length == 0) {
					// 	this.getStartList()
					// }
					// if (this.LBlist.length == 0) {
					// 	this.getLBlist()
					// }
					// if (this.Matchlist.length == 0) {
					// 	this.GetMatchList()
					// }
					return
				}
				this.category2_id = item.category2_id
				console.log(item.name_zh)
				if (this.getData(item.name_zh) !== null) {
					//获取本地数据
					//赋值
					
					// this.AnchoerList = this.getData(item.name_zh).getAnchoerList
					// this.topList = this.getData(item.name_zh).gettoplist
					uni.startPullDownRefresh()
					
					//调接口获取新数据
					this.refresh2(item.name_zh)


				} else {
					uni.startPullDownRefresh()

					//调接口获取新数据
					this.refresh2(item.name_zh)
				}

				// if (this.AnchoerList == 0 || this.topList.length == 0) {
				// 	uni.startPullDownRefresh()
				// }

				// this.refresh2()




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
					Match_Id,
					Id
				} = item
				uni.navigateTo({
					url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&Id=${Id}&category2_id=${this.category2_id}&activeIndex=${this.Animation_State}`
					// url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}`
				})
			},
			toBroadcast2(item) {
				
				
				const {
					Anchoer_Id,
					Match_Id,
					Id
				} = item
				uni.navigateTo({
					url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&Id=${Id}&category2_id=${this.category2_id}&activeIndex=2`
					// url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}`
				})
			},
			Tosearch() {
				// console.log(22)
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			// onRefresh() {
			// 	console.log(444)
			// 	this.page = 1
			// 	this.StartList = []
			// 	this.getStartList()
			// 	if (this._freshing) return
			// 	this._freshing = true
			// 	setTimeout(() => {
			// 		this.triggered = false
			// 		this._freshing = false
			// 	}, 1000)
			// },

			// onRestore() {
			// 	this.triggered = 'restore' // 需要重置
			// 	console.log('onRestore')
			// 	this.isShow = false
			// },

			// onAbort() {
			// 	console.log('onAbort')
			// 	this.isShow = false
			// },
			// onPulling(e) {
			// 	console.log('onpulling', e)
			// 	this.isShow = true
			// },
			toaccomplishedperson() {
				if (this.$store.state.userInfo.User_Id == undefined) {
					uni.navigateTo({
						url: "/pages/login/index",
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/liveView/accomplishedperson/accomplishedperson'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clean {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);

		position: fixed;
		top: 0;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;

		.cleancontent {
			width: 530rpx;
			height: 274rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin: auto;
			// text-align: center;
		}

		.foot {
			margin: auto;
			display: flex;


			font-size: 28rpx;

			.left {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				border-radius: 38rpx;
				opacity: 1;
				border: 2rpx solid #FC683E;
				color: #FC683E;
				margin: 0 20rpx 0 38rpx;
			}

			.right {
				width: 212rpx;
				height: 64rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				background: linear-gradient(90deg, #FC683E 0%, #FC683E 100%);
				border-radius: 38rpx;
				opacity: 1;
			}
		}
	}

	page {
		background-color: #f5f5f5;
		// height: 100%;

	}

	// ::v-deep .uni-page-refresh{
	// 	top: 145px !important;
	// }
	.box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx 20rpx;
	}

	.head_input {
		width: 80%;
		height: 58rpx;
		line-height: 58rpx;
		background: #ffffff;
		border-radius: 15px 15px 15px 15px;
		opacity: 0.9;
		position: relative;
		font-size: 13rpx;
		display: flex;
		align-items: center;
		padding-left: 68rpx;
	}

	.head_input view {


		color: #97878A;
		font-size: 26rpx;
		line-height: 26rpx;
	}

	.head_input image {
		position: absolute;
		top: 50%;
		left: 12px;
		transform: translateY(-50%);
	}

	.dR {
		font-size: 9px;
		font-weight: 400;
		color: #ffffff;
		text-align: center;
	}

	.var-app-bar {
		background-color: rgba(255, 255, 255, 0);
		// z-index: 0 !important;
		// height: 480rpx;
		background-repeat: no-repeat;
	}

	.items {

		font-size: 32rpx;
		font-weight: 500;
		position: relative;
		color: #ffffff;
		padding: 5rpx 20rpx;
	}

	.items:after {
		display: block;
		position: absolute;
		content: '';
		width: 16px;
		border-radius: 8px;
		background-color: #ffffff;
		bottom: -8px;
		z-index: 9;
		height: 4px;
		left: 50%;
		transform: translateX(-50%);
	}

	.item {
		// width: 30px;
		font-size: 14px;
		font-weight: 400;
		color: #fff;
		padding: 5px 10px;
	}

	.swipe-example {
		height: 160px;
	}

	.swipe-example-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
	}

	// page {
	// 	background-color: #ffffff;
	// }

	.scroll-Y {
		/* height: 300rpx; */
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 150px;
		/* height: 96px; */
		border-radius: 4px 4px 4px 4px;
		opacity: 1;
		border: 1px solid #FC683E;
		margin-left: 10px;
		margin-top: 15px;
		padding-bottom: 12px;
		/* margin-right: 10px; */
	}

	.scorll_head {
		width: 100%;
		line-height: 26px;
		
background: linear-gradient(270deg, #EE5E2D 0%, #FFA383 100%);
		border-radius: 4px 4px 0px 0px;
		opacity: 1;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 10px;
		font-weight: 400;
		color: #ffffff;
		.scorll_headleft{
			width:70%;
			margin-left:10rpx;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.zb_box {
		width: 346rpx;
		/* height: 146px; */
		// padding-bottom: 12rpx;
		background: #ffffff;
		box-shadow: 0px 0px 6px 1px #e7e8eb;
		border-radius: 4px 4px 4px 4px;
		/* margin-left: 10px; */
		/* margin: 8px; */
		margin-top: 10px;
		position: relative;
		overflow: hidden;
	}

	.bodyheader {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}

	.zhuboitem {
		display: inline-block;
		width: 184rpx;
		height: 168rpx;
		padding: 20rpx 0;
		background: #ffffff;
		border-radius: 12rpx;
		opacity: 1;
		margin-left: 18rpx;
		text-align: center;

		.zhuboimg {
			width: 110rpx;
			height: 110rpx;
			margin: auto;
			border-radius: 50%;
			border: 1px solid #FC683E;
			position: relative;
			// overflow: hidden;

			.zhubgz {
				width: 106rpx;
				height: 40rpx;
				background: #ffffff;
				border-radius: 20rpx;
				opacity: 1;
				border: 2rpx solid #FC683E;
				position: absolute;
				bottom: -22rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 22rpx;
				font-weight: 400;
				color: #FC683E;
			}

			.zhubwgz {
				width: 106rpx;
				height: 40rpx;
				background: #FC683E;
				border-radius: 20rpx;
				opacity: 1;
				border: 2rpx solid #FC683E;
				position: absolute;
				bottom: -22rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 22rpx;
				font-weight: 400;
				color: #fff;
			}
		}

		.zhubotitle {
			margin-top: 20rpx;
			font-size: 22rpx;
			color: #333333;
			font-weight: 500;
		}
	}

	.swiper {
		height: 272rpx;
	}

	.swiper-item {
		display: block;
		height: 272rpx;
		line-height: 272rpx;
		text-align: center;
	}

	.swiper-scroll {
		// height: 100%;
		height: calc(100vh - 260rpx);
	}

	::v-deep .uni-scroll-view-refresher {
		max-height: 140px;
	}

	.bq {
		width: 104px;
		text-align: right;
		top: -9px;
		right: -27px;
		position: absolute;
		transform: scale(0.5);
		z-index: 1;
		height: 36px;

		image {
			height: 36px;
		}
	}
</style>