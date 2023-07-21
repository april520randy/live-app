<template>
	<view class="content">
		<view class="event_top" style="position: fixed; top: 0; z-index: 2">
			<view class="top_imgbox">
				<image src="/static/image/sou1.png" alt="" @click="jumpClick(1)" />
				<view class="top_nav">
					<view @click="changeNav(index,item)" v-for="(item, index) in navs" :key="index" :style="{
              background: index == navIndex ? '#fff' : '',
              color: index == navIndex ? '#D4121E' : ''
            }">{{ item }}
					</view>
				</view>

				<image src="/static/image/shai1.png" alt="" @click="jumpClick(2)" />
			</view>

			<image style="
          position: absolute;
          z-index: -1;
        
          height: 100%;
          width: 100%;
        " src="/static/image/bjimg5.png"></image>

			<view class="" style="width: 100%; padding: 0 25rpx; box-sizing: border-box">
				<view style="margin-top: 10rpx; position: relative">
					<view v-if="num > 0" style="
              width: 16px;
              height: 16px;
              background: #ffffff;
              border-radius: 50%;
              text-align: center;
              font-size: 12rpx;
              color: #FC683E;
              position: absolute;
              right: 8rpx;
              top: 2rpx;
              display: flex;
              justify-content: center;
              line-height: 16px;
            ">
						<text>{{ num }}</text>
					</view>
					<yui-tabs :tabs="tabs" v-model="activeIndex" @click="tabChange" duration="0" background="none"
						color="#fff" title-active-color="#fff" title-inactive-color="#fff">
					</yui-tabs>
				</view>
			</view>
		</view>
		<!-- <view :style="styleback(activeIndex)"> -->
		<!-- </view> -->
		<view class="event_btm">
			<!-- 赛程 -->
			<view class="dates" v-if="activeIndex == 2 && listData" style="position: fixed; top: 240rpx;  z-index: 2">
				<image src="/static/image/qian.png" alt="" class="jiantou1" @click="arrowClick('赛程', '左')" />
				<scroll-view scroll-x="true" class="dates_boxs" :scroll-left="scrollLeft" :scroll-with-animation="true">
					<view class="smallbox" v-for="(item, index) in dateList" :key="index"
						@click="dateClick('赛程', index, item.timeall)" :style="{
              background: dateIndex == index ? 'linear-gradient(180deg, #FFCEB9 0%, #FFF5F0 100%)' : '',
              color: dateIndex == index ? '#FC683E' : ''
            }">
						<view style="margin-bottom: 8rpx" v-if="index > 0" class="timechoose">
							{{ item.time }}
						</view>
						<view class="timechoose1" v-if="index > 0">
							{{ item.week }}
						</view>
						<view v-else class="timechoose2">
							{{ item.week }}
						</view>
					</view>
				</scroll-view>

				<image src="/static/image/hou.png" alt="" class="jiantou2" @click="arrowClick('赛程', '右')" />
			</view>

			<!-- 赛果 -->

			<view class="dates" v-if="activeIndex == 3 && listData" style="position: fixed; top: 240rpx; z-index: 2">
				<image src="/static/image/qian.png" alt="" class="jiantou1" @click="arrowClick('赛果', '左')" />
				<scroll-view scroll-x="true" class="dates_boxs" :scroll-left="scrollLeft" :scroll-with-animation="true">
					<view class="smallbox" v-for="(item, index) in dateList1" :key="index"
						@click="dateClick('赛果', index, item.timeall)" :style="{
              background: dateIndex1 == index ? 'linear-gradient(180deg, #FFCEB9 0%, #FFF5F0 100%)' : '',
              color: dateIndex1 == index ? '#FC683E' : ''
            }">
						<view style="margin-bottom: 8rpx" v-if="index < 6" class="timechoose">
							{{ item.time }}
						</view>
						<view class="timechoose1" v-if="index < 6">
							{{ item.week }}
						</view>
						<view v-else class="timechoose2">
							{{ item.week }}
						</view>
					</view>
				</scroll-view>

				<image src="/static/image/hou.png" alt="" class="jiantou2" @click="arrowClick('赛果', '右')" />
			</view>

			<view style="padding-bottom:100rpx;" v-if="listData.length != 0">
				<view :style="styleback(activeIndex)">
				</view>
				<view class="btm_box" v-for="(item, index) in listData" :key="index" @click.stop="rowClick(item)">
					<view class="btm_box_top">
						<view class="groups" :style="{
              color: item.IsCollect == 1 ? '#5934BF' : '',
              background: item.IsCollect == 1 ? '#EDE4FD' : '',
              color: item.IsCollect == 0 ? '#C37A2B' : '',
              background: item.IsCollect == 0 ? '#FEE2B2' : ''
            }">
							{{ item.Competition_Name }}
						</view>
						<view class="times">
							{{ item.Match_Date.substring(10, 16).replace('T', ' ') }}
						</view>

						<view class="section" style="color: #8e92a4">
							<!-- {{ section(item) }} -->
							{{item.Status_Name}}
						</view>

						<view class="progress" v-if="item.Status_Id != 1 && item.Category_Id
 == 2">
							<!-- <text v-if="item.Status_Id==10" style="color: #FC683E;">完</text> -->
							<!-- <text v-if="item.Status_Id != 10">一</text>
							<text v-if="item.Status_Id != 10">二</text>
							<text v-if="item.Status_Id != 10">三</text>
							<text v-if="item.Status_Id != 10">四</text>
							<text v-if="item.Status_Id == 9">五</text> -->
							<text>一</text>
							<text>二</text>
							<text>三</text>
							<text>四</text>
							<text v-if="item.Status_Id == 9">五</text>

							<text style="color: #FC683E" :style="{
                'margin-left': item.Status_Id == 9 ? '17rpx' : '20rpx'
              }">总</text>
						</view>

						<view class="progress" style="color: #FC683E" v-if="item.Status_Id != 1 && item.Category_Id
 == 1">
							<!-- <text v-if="item.Status_Id==10">完</text>
						<text v-if="item.Status_Id==16" style="">上半场</text>
						<text v-if="item.Status_Id==17">中场</text>
						<text v-if="item.Status_Id==18" style="">下半场</text>
						<text v-if="item.Status_Id==9">加时</text>
						<text v-if="item.Status_Id==19">点球</text>
						<text v-if="item.Home_Scores!=-1">角球</text>
							<textstyle="color: #FC683E;margin-left: 22rpx;">总</text> -->
						</view>
					</view>
					<view class="btm_box_btm">
						<image v-if="item.IsCollect == 1" src="/static/image/xin.png" alt="" class="btm1"
							@click.stop="collectionClickDebounced('取消', item,index)" />
						<image v-if="item.IsCollect == 0" src="/static/image/xin2.png" alt="" class="btm1"
							@click.stop="collectionClickDebounced('收藏', item)" />
						<view class="btm2">
							<view class="btm2_top">
								<image v-if="item.Home_Team_Logo" :src="item.Home_Team_Logo" alt="" />
								<image v-else src="/static/image/noqd.png"
									/>
								<view class="btm2_top_name">
									<view style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 130rpx;
                  ">
										{{ item.Home_Team_Name }}
									</view>
									<view v-if="item.Home_Scores[2] > 0 && item.Category_Id
 == 1" style="
                    width: 26rpx;
                    height: 24rpx;
                    color: #ffffff;
                    background: #f56161;
                    text-align: center;
                    line-height: 24rpx;
                    font-size: 20rpx;
                    border-radius: 2rpx 2rpx 2rpx 2rpx;
                    margin-left: 6rpx;
                  ">
										{{ item.Home_Scores[2] }}
									</view>
									<view v-if="item.Home_Scores[3] > 0 && item.Category_Id
 == 1" style="
                    width: 26rpx;
                    height: 24rpx;
                    color: #ffffff;
                    background: #f5ce61;
                    text-align: center;
                    line-height: 24rpx;
                    font-size: 20rpx;
                    border-radius: 2rpx 2rpx 2rpx 2rpx;
                    margin-left: 6rpx;
                  ">
										{{ item.Home_Scores[3] }}
									</view>
								</view>
							</view>
							<view class="btm2_btm">
								<image v-if="item.Away_Team_Logo" :src="item.Away_Team_Logo" alt="" />
								<image v-else src="/static/image/noqd.png"
									/>
								<view class="btm2_btm_name">
									<view style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 130rpx;
                  ">
										{{ item.Away_Team_Name }}
									</view>
									<view v-if="item.Away_Scores[2] > 0 && item.Category_Id
 == 1" style="
                    width: 26rpx;
                    height: 24rpx;
                    color: #ffffff;
                    background: #f56161;
                    text-align: center;
                    line-height: 24rpx;
                    font-size: 20rpx;
                    border-radius: 2rpx 2rpx 2rpx 2rpx;
                    margin-left: 6rpx;
                  ">
										{{ item.Away_Scores[2] }}
									</view>
									<view v-if="item.Away_Scores[3] > 0 && item.Category_Id
 == 1" style="
                    width: 26rpx;
                    height: 24rpx;
                    color: #ffffff;
                    background: #f5ce61;
                    text-align: center;
                    line-height: 24rpx;
                    font-size: 20rpx;
                    border-radius: 2rpx 2rpx 2rpx 2rpx;
                    margin-left: 6rpx;
                  ">
										{{ item.Away_Scores[3] }}
									</view>
								</view>
							</view>
						</view>

						<view class="btm3" v-if="item.Status_Id != 1 && item.Category_Id
 == 2">
							<view class="btm3_top">
								<view
									:style="{color:index2 == item.Home_Scores.length - 1 &&item.Home_Scores.length - 1 != 0? '#FC683E': '', 'margin-left':index2 == item.Home_Scores.length - 1 ? '15rpx' : ''}"
									v-for="(item2, index2) in item.Home_Scores" :key="index2">
									{{ item2}}
								</view>
							</view>
							<view class="btm3_btm">

								<view :style="{
                  color:
                    index3 == item.Away_Scores.length - 1 &&
                    item.Away_Scores.length - 1 != 0
                      ? '#FC683E'
                      : '',
                  'margin-left':
                    index3 == item.Away_Scores.length - 1 ? '15rpx' : ''
                }" v-for="(item3, index3) in item.Away_Scores" :key="index3">{{ item3 >= 0 ? item3 : '-' }}</view>
							</view>
						</view>

						<view class="btm3" v-show="item.Status_Id != 1 && item.Category_Id
 == 1">
							<view class="btm3_top">
								<!-- <view v-if="item.Status_Id==10">
								11
							</view> -->
								<!-- <view style="text-align: center"
									:style="{ width: item.Status_Id == 17 ? '26%' : '35%' }">
									{{ item.Home_Scores[1] >= 0 ? item.Home_Scores[1] : '-' }}
								</view> -->
								<view style="text-align: center">
									{{ item.Home_Scores[0] >= 0 ? item.Home_Scores[0] : '-' }}
								</view>
								<!-- <view style="text-align: center" :style="{width:item.Status_Id==17?'26%':'35%'}"
								v-if="item.Status_Id==16||item.Status_Id==17||item.Status_Id==18">
								{{item.Home_Scores[1]>=0?item.Home_Scores[1]:'-'}}
							</view>
							<view style="width: 20%;text-align: center" v-if="item.Status_Id==9">
								{{item.Home_Scores[5]>=0?item.Home_Scores[5]:'-'}}
							</view>
							<view style="width: 20%;text-align: center" v-if="item.Status_Id==19">
								{{item.Home_Scores[6]>=0?item.Home_Scores[6]:'-'}}
							</view>
							<view style="width: 25%;text-align: center" v-if="item.Home_Scores[4]!=-1">
								{{item.Home_Scores[4]>=0?item.Home_Scores[4]:'-'}}
							</view> -->
							</view>
							<view class="btm3_btm">

								<view style="text-align: center">
									{{ item.Away_Scores[0] >= 0 ? item.Away_Scores[0] : '-' }}
								</view>

							</view>
						</view>

						<!-- <view @click="toClick(item)" v-if="item.Anchoer_Logo" class="btm4" :style="{
              'margin-left':
                item.Status_Id == 1 || item.Status_Id == 10 ? '350rpx' : ''
            }">
							<image :src="item.Anchoer_Logo" alt="" />
						</view> -->
						<view :style="{marginLeft:item.Status_Name=='未开赛' ?'350rpx':''}" @click.stop="toClicklive(item)"
							v-if="item.Anchoer_Logo&&item.Status_Name!=='完场'" class="btm4">
							<image :src="item.Anchoer_Logo" alt="" />
						</view>


						<view :style="{marginLeft:item.Status_Name=='未开赛' ?'350rpx':''}" @click.stop="toClick(item)"
							v-if="!item.Anchoer_Logo&&item.Coverage_Mlive==1||(item.Status_Name=='完场'&&item.Coverage_Mlive==1)"
							class="btm4" style="border: none">
							<image src="/static/image/bzb7.png" alt="" />
						</view>
						<view :style="{marginLeft:item.Status_Name=='未开赛' ?'350rpx':''}" @click.stop="toClick(item)"
							v-if="!item.Anchoer_Logo&&item.Coverage_Mlive==0||(item.Status_Name=='完场'&&item.Coverage_Mlive==0)"
							class="btm4" style="border: none">
							<image src="/static/image/bzb2.png" alt="" />
						</view>
					</view>
				</view>
			</view>

			<view v-if="listData.length == 0" style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          flex-direction: column;
        ">
				<image src="/static/image/sckong.png" mode="" style="width: 400rpx; height: 400rpx; "></image>
				<view style="color: #9ea2af; font-size: 26rpx; margin-top: 15rpx">
					暂无数据
				</view>
			</view>
		</view>
		<m-tabbar fixed fill :current="0" :tabbar="tabbar"></m-tabbar>
	</view>



</template>

<script>
	import _ from 'lodash'
	import TabbarConfig from '/utils/tabbar.js'
	import {
		ajaxTemplate
	} from '@/api/index.js'
	import store from '@/store/index.js'
	import {
		Loading
	} from '@varlet/ui'

	export default {
		data() {
			return {
				tabbar: TabbarConfig,
				newrefresh: '首次',
				listDatastate: 0,
				loads: '上拉可以加载更多',
				collect: 0,
				title: '赛事',
				navs: ['焦点', '足球', '篮球'],
				navIndex: 0,
				active: 0,
				dateIndex: 0,
				dateIndex1: 6,
				tabsList: {
					Category_Id: 0,
					User_Id: '',
					Index_Type: 0,
					Time: '',
					Live_Type: 0,
					Competition_id: [],
					Page: 1,
					Limit: 10
				},
				dateList: [],
				dateList1: [],
				listData: [],
				tabs: ['即时', '进行中', '赛程', '赛果', '收藏'],
				activeIndex: 0,
				scrollLeft: 0,
				total: 0,
				num: '',
				key1: '焦点',
				key2: '即时',
				key3: '',
				key: '焦点即时',
				needSave: {},
				Animation_State: ""
			}
		},
		computed: {
			isLogin() {
				return store.getters.is_login
			},
			userInfo() {
				if (this.isLogin) {
					return store.state.userInfo
				}
				return this.default_userInfo
			}
		},

		onHide() {},
		onReady() {},
		onShow() {

			uni.hideTabBar()
			this.tabsList.Page = 1
			if (uni.getStorageSync("Animation_State") == 1) {
				//动画直播开了
				this.Animation_State = 1
			} else {
				//动画直播关了
				this.Animation_State = 0
			}


			setTimeout(() => {

				console.log(this.$store.state.userInfo.User_Id, this.activeIndex)
				if (uni.getStorageSync('currentIndex') == 5) {
					this.activeIndex = 4
					this.tabsList.Index_Type = 3
					this.tabsList.Live_Type = 0
					this.tabsList.Time = ""
					this.key = "焦点收藏"
					this.listData=[]
				}
				// this.activeIndex = 0
				// this.tabsList.Index_Type = 0
				if (this.$store.state.userInfo.User_Id == undefined) {
					this.tabsList.User_Id = ''
				} else {
					this.tabsList.User_Id = this.$store.state.userInfo.User_Id
				}
				if (this.$store.state.userInfo.User_Id == undefined && this.activeIndex == 4) {
					this.activeIndex = 0
					this.tabsList.Index_Type = 0
				}


				// this.tabsList.Index_Type =this.activeIndex

				// uni.startPullDownRefresh()
				this.getTime()
				this.collectNum()
				// this.getValue()

				// this.loadData()


				// if (this.getPage('焦点即时page') !== null) {

				// 	this.tabsList.Page = this.getPage('焦点即时page')
				// } else {
				// 	this.savePage('焦点即时page', 1)
				// }


				//获取本地数据for key
				console.log(this.getData(this.key), 'this.getData("")')
				if (this.getData(this.key) !== null) {
					console.log(111)
					//获取本地数据
					//赋值
					// this.listData = this.getData(this.key).listData
					this.loadData(this.key)
				} else {
					uni.startPullDownRefresh()
					//调接口获取新数据
					// this.loadData(this.key)
				}

			}, 500)
		},
		onPullDownRefresh() {
			this.tabsList.Page = 1
			this.tabsList.Competition_id = []
			this.listData = []
			uni.removeStorageSync(this.key + "total")
			uni.removeStorageSync(this.key + "page")
			uni.removeStorageSync(this.key + 'SX')
			uni.removeStorageSync(this.key)
			this.loadData(this.key)
			this.collectNum()

		},
		onReachBottom() {
			//触底事件
			
			// if (this.tabsList.Page * this.tabsList.Limit >= this.total) {
			// 	this.loads = '没有更多数据了'
			// } else {
			// 	this.tabsList.Page++
			// 	// this.tabsList.Limit+=10
			// 	this.loadData()
			// }

			// console.log(this.getData(this.key).listData.length)
			
			// if (this.getData(this.key).listData.length < this.getTotal(this.key + "total")) {

			// 	// this.tabsList.Page++
			// 	this.savePage(this.key + 'page', this.getPage(this.key + 'page') + 1)
			// 	this.loadData(this.key)
			// 	this.collectNum()
			// }

			if (this.listData.length < this.tatal) {
				this.tabsList.Page++
				this.loadData()
			} else {
				console.log(123)
			}
		},
		onPageScroll(e) {
			console.log(e.scrollTop)
			this.savescroll(this.key + "scroll", e.scrollTop)
		},

		methods: {
			savescroll(key, value) {
				uni.setStorageSync(key, value)
			},
			getscroll(key) {
				let data = null
				if (uni.getStorageSync(key)) {
					data = uni.getStorageSync(key) || null
				}

				if (data === null) {
					uni.removeStorageSync(key)
				}
				return data
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
			saveTotal(key, value) {
				uni.setStorageSync(key, value)
			},
			getTotal(key) {
				return uni.getStorageSync(key)
			},
			savePage(key, value) {
				uni.setStorageSync(key, value)
			},
			getPage(key) {
				let data = null
				if (uni.getStorageSync(key)) {
					data = uni.getStorageSync(key) || null
				}

				if (data === null) {
					uni.removeStorageSync(key)
				}
				return data
			},
			collectNum() {
				if (this.userInfo) {
					let tabsList2=this.tabsList
					if (this.getData(this.key + 'SX') !== null) {
						console.log(111)
						//获取本地数据
						//赋值
						tabsList2.Competition_id = this.getData(this.key + 'SX')
					} 
					console.log(111111, tabsList2)
					ajaxTemplate('/Immediately/Get_CollectCount', {
						Category_ld: tabsList2.Category_Id,
						User_ld: tabsList2.User_Id,
						Competition_id: tabsList2.Competition_id,
					}).then((res) => {
						console.log('收藏个数', res)
						this.num = res.Result
						// this.loadData()
					})
				} else {
					this.num = 0
				}
			},
			getValue(list) {
				console.log(list, 'B页面传递的数据')
				if (list) {
					this.tabsList.Competition_id = list
					uni.startPullDownRefresh()
					//调接口获取新数据
					this.loadData(this.key)
					this.collectNum()
				}
			},
			// 收藏
			collectData(data) {
				ajaxTemplate('/Immediately/Collect_Match', data).then((res) => {
					// console.log('收藏',res);
					this.collectNum()
					this.needSave.listData = this.listData
					this.saveData(this.key, this.needSave)
				})
			},
			collectionClickDebounced: _.debounce(function (type, item,index) {
			      this.collectionClick(type, item,index)
			    }, 500),
			collectionClick(type, item,index) {
				if (this.$store.state.userInfo.User_Id == undefined) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
					return
				}

				if (type == '取消') {
					console.log('取消', this.userInfo.User_Id)
					item.IsCollect = 0
					let arr = ["焦点", "足球", "篮球"]
					arr.forEach((item) => {
						uni.removeStorageSync(item+"收藏")
						uni.removeStorageSync(item+"收藏" + "total")
						uni.removeStorageSync(item+"收藏" + "page")
					})
					
					// if(this.activeIndex==4){
					// 	this.listData.splice(index,1)
					// }
					// 
					this.collectData({
						Match_Id: item.Match_Id,
						User_Id: this.userInfo.User_Id,
						Type: 1
					})
				}
				if (type == '收藏') {
					console.log('收藏', this.userInfo.User_Id)
					item.IsCollect = 1
					let arr = ["焦点", "足球", "篮球"]
					arr.forEach((item) => {
						uni.removeStorageSync(item+"收藏")
						uni.removeStorageSync(item+"收藏" + "total")
						uni.removeStorageSync(item+"收藏" + "page")
					})
					this.collectData({
						Match_Id: item.Match_Id,
						User_Id: this.userInfo.User_Id,
						Type: 0
					})
				}
				console.log(88888888, item.Type)
			},
			// 赛事数据
			loadData(key) {
				// if (this.userInfo.User_Id) {
				// 	this.tabsList.User_Id = this.userInfo.User_Id
				// }


				console.log(this.getPage(key + 'page'), 'this.getpage')

				// if (this.getPage(this.key + "page") !== null) {
				// 	this.tabsList.Page = this.getPage(this.key + "page")
				// } else {
				// 	this.savePage(this.key + "page", 1)
				// 	this.tabsList.Page = this.getPage(this.key + "page")
				// }
				console.log(this.getPage(key + 'page'), 'this.getpage')



				ajaxTemplate(
					'/Immediately/Get_ImmediatelyMatch_List',
					this.tabsList
				).then((res) => {
					console.log('赛事', res.Data)


					this.tatal = res.Count
					this.saveTotal(key + 'total', this.tatal)

					
					// //
					if (this.listData.length < res.Count) {
						
						this.listData = this.listData.concat(res.Data) 
						// this.listData = res.Data  //相当于无分页

						if (this.listData) {
							for (let item of this.listData) {
								item.Home_Scores =
									typeof item.Home_Scores === 'string' ?
									item.Home_Scores.split(',') :
									item.Home_Scores
								item.Away_Scores =
									typeof item.Away_Scores === 'string' ?
									item.Away_Scores.split(',') :
									item.Away_Scores
								if (item.Home_Scores.length == 6 && item.Status_Name != "加时" && item.Category_Id ==
									2) {

									item.Home_Scores.splice(4, 1)
									item.Away_Scores.splice(4, 1)
								}
							}
						}

						this.needSave.listData = this.listData
						this.saveData(key, this.needSave)
					} else {
						this.listData = res.Data
						if (this.listData) {
							for (let item of this.listData) {
								item.Home_Scores =
									typeof item.Home_Scores === 'string' ?
									item.Home_Scores.split(',') :
									item.Home_Scores
								item.Away_Scores =
									typeof item.Away_Scores === 'string' ?
									item.Away_Scores.split(',') :
									item.Away_Scores
								if (item.Home_Scores.length == 6 && item.Status_Name != "加时" && item.Category_Id ==
									2) {

									item.Home_Scores.splice(4, 1)
									item.Away_Scores.splice(4, 1)
								}
							}
						}
						this.needSave.listData = this.listData
						this.saveData(key, this.needSave)
					}




					// this.listDatastate = 1
					uni.stopPullDownRefresh()



					//console.log('赛事', this.listData);
					// console.log('赛事', res)
				})
			},

			// 赛程获取日期
			getTime() {
				let daysSecond = 24 * 60 * 60 * 1000

				for (let index = 0; index <= 6; index++) {
					let obj = {}
					obj.time = this.time(Date.now() + daysSecond * index).substring(5, 10)
					obj.week = this.getWeekDate(this.time(Date.now() + daysSecond * index))
					obj.timeall = this.time(Date.now() + daysSecond * index).substring(
						0,
						10
					)
					if (this.time(Date.now()).substring(5, 10) == obj.time) {
						obj.week = '今日'
					}
					this.dateList.push(obj)
				}
				console.log(this.dateList, '赛事时间')

				for (let index = -6; index <= 0; index++) {
					let obj1 = {}
					obj1.time = this.time(Date.now() + daysSecond * index).substring(5, 10)
					obj1.week = this.getWeekDate(this.time(Date.now() + daysSecond * index))
					obj1.timeall = this.time(Date.now() + daysSecond * index).substring(
						0,
						10
					)
					if (this.time(Date.now()).substring(5, 10) == obj1.time) {
						obj1.week = '今日'
					}
					this.dateList1.push(obj1)
				}
				console.log(this.dateList1, '赛事时间111')
			},
			time(time) {
				let date = new Date(time + 8 * 3600 * 1000) // 增加8小时
				return date.toJSON().substring(0, 19).replace('T', ' ')
			},
			getWeekDate(date) {
				var now = new Date(date)
				var day = now.getDay()
				var weeks = new Array(
					'星期日',
					'星期一',
					'星期二',
					'星期三',
					'星期四',
					'星期五',
					'星期六'
				)
				var week = weeks[day]
				return week
			},
			// 节
			section(item) {
				switch (item.Status_Id) {
					case 0:
						return '比赛异常'
					case 1:
						return '未'
					case 2:
						return '第一节'
					case 3:
						return '第一节完'
					case 4:
						return '第二节'
					case 5:
						return '第二节完'
					case 6:
						return '第三节'
					case 7:
						return '第三节完'
					case 8:
						return '第四节'
					case 9:
						return '加时'
					case 10:
						return '完'
					case 11:
						return '中断'
					case 12:
						return '取消'
					case 13:
						return '延期'
					case 14:
						return '腰斩'
					case 15:
						return '待定'
					case 16:
						return '上半场'
					case 17:
						return '中场'
					case 18:
						return '下半场'
					case 19:
						return '点球决战'
					case 20:
						return '推迟'
				}
			},
			styleback(index) {
				if ((index === 2 || index === 3) && this.listData) {
					return {
						height: '340rpx'
					}
				}
				return {
					height: '232rpx'
				}
			},
			// 类型切换
			changeNav(index, item) {
				console.log('类型切换', index, item)

				this.key1 = item
				this.needSave = {}
				this.key = this.key1 + this.key2 + this.key3
				console.log(this.key)


				this.navIndex = index

				this.tabsList.Page = 1

				this.listData = []
				this.tabsList.Competition_id = []
				this.tabsList.Category_Id = index


				if (this.getscroll(this.key + "scroll") !== null) {
					console.log(this.getscroll(this.key + "scroll"))
					uni.pageScrollTo({
						scrollTop: this.getscroll(this.key + "scroll"),
						duration: 0,
					})
				} else {
					console.log(this.getscroll(this.key + "scroll"))
					this.savescroll(this.key + "scroll", 0)
					uni.pageScrollTo({
						scrollTop: this.getscroll(this.key + "scroll"),
						duration: 0,
					})
				}

				// console.log(this.getPage(this.key + "page"))
				// if (this.getPage(this.key + "page") !== null) {
				// 	this.tabsList.Page = this.getPage(this.key + "page")
				// } else {
				// 	this.savePage(this.key + "page", 1)
				// 	this.tabsList.Page = this.getPage(this.key + "page")
				// }

				//获取本地数据for key
				console.log(this.getData(this.key), 'this.getData("")')
				if (this.getData(this.key) !== null) {
					console.log(111)
					//获取本地数据
					//赋值
					// this.listData = this.getData(this.key).listData
					// this.loadData(this.key)
					uni.startPullDownRefresh()
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0,
					})
				} else {
					uni.startPullDownRefresh()
					//调接口获取新数据
					// this.loadData(this.key)
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0,
					})
				}
				this.collectNum()
			},

			// 日期滚选择
			dateClick(type, index, timeall) {
				// this.listDatastate=0
				this.listData = []
				this.tabsList.Competition_id = []
				if (type == '赛程') {
					this.dateIndex = index
					this.key3 = timeall
				}
				if (type == '赛果') {
					this.dateIndex1 = index
					this.key3 = timeall
				}
				console.log(1111111111, index, timeall)


				this.tabsList.Time = timeall
				this.key = this.key1 + this.key2 + this.key3
				// uni.startPullDownRefresh()

				// this.loadData()


				if (this.getscroll(this.key + "scroll") !== null) {
					console.log(this.getscroll(this.key + "scroll"))
					uni.pageScrollTo({
						scrollTop: this.getscroll(this.key + "scroll"),
						duration: 0,
					})
				} else {
					console.log(this.getscroll(this.key + "scroll"))
					this.savescroll(this.key + "scroll", 0)
					uni.pageScrollTo({
						scrollTop: this.getscroll(this.key + "scroll"),
						duration: 0,
					})
				}
				//获取本地数据for key
				console.log(this.getData(this.key), 'this.getData("")')
				if (this.getData(this.key) !== null) {
					console.log(111)
					//获取本地数据
					//赋值
					// this.listData = this.getData(this.key).listData
					uni.startPullDownRefresh()
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0,
					})
				} else {
					uni.startPullDownRefresh()
					//调接口获取新数据
					// this.loadData(this.key)
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0,
					})
				}
				this.collectNum()
			},

			// 标签切换事件
			tabChange(index, item) {
				console.log('标签切换', index, item)
				this.key2 = item
				this.needSave = {}


				this.collectNum()
				this.tabsList.Time = ''


				uni.setStorageSync('currentIndex', index)
				console.log(this.tabsList, 55555)
				// this.dateIndex = 0
				// this.dateIndex1 = 6
				this.loads = '上拉可以加载更多'

				this.tabsList.Page = 1
				this.listData = []
				if (item != '收藏') {
					this.tabsList.Competition_id = []
				}


				if (index === 1) {
					this.tabsList.Live_Type = 1
					this.tabsList.Index_Type = 0
				} else {
					this.tabsList.Live_Type = 0

					if (index === 0) {
						this.tabsList.Index_Type = 0
					} else {
						this.tabsList.Index_Type = index - 1

						console.log('this.tabsList.Index_Type', this.tabsList.Index_Type)
					}
				}
				if (index === 2) {
					this.tabsList.Time = this.dateList[this.dateIndex].timeall
					this.key3 = this.dateList[this.dateIndex].timeall
				}
				if (index === 3) {
					this.tabsList.Time = this.dateList1[this.dateIndex1].timeall
					this.key3 = this.dateList1[this.dateIndex1].timeall
				}
				if (index != 2 && index != 3) {
					this.key3 = ""
				}
				this.key = this.key1 + this.key2 + this.key3
				console.log(this.userInfo, 'this.userInfo')

				if (this.userInfo == undefined && index == 4) {
					console.log(this.activeIndex)

					uni.navigateTo({
						url: '/pages/login/index'
					})
					console.log(this.activeIndex)
					return
				}

				if (this.tabsList.Index_Type === 3) {
					this.tabsList.User_Id = this.userInfo.User_Id
				}


				// if (this.getscroll(this.key + "scroll") !== null) {
				// 	console.log(this.getscroll(this.key + "scroll"))
				// 	uni.pageScrollTo({
				// 		scrollTop: this.getscroll(this.key + "scroll"),
				// 		duration: 0,
				// 	})
				// } else {
				// 	console.log(this.getscroll(this.key + "scroll"))
				// 	this.savescroll(this.key + "scroll", 0)
				// 	uni.pageScrollTo({
				// 		scrollTop: this.getscroll(this.key + "scroll"),
				// 		duration: 0,
				// 	})
				// }



				// if (this.getPage(this.key + "page") !== null) {
				// 	this.tabsList.Page = this.getPage(this.key + "page")
				// } else {
				// 	this.savePage(this.key + "page", 1)
				// 	this.tabsList.Page = this.getPage(this.key + "page")
				// }

				//获取本地数据for key
				console.log(this.getData(this.key), 'this.getData("")')
				if (this.getData(this.key) !== null) {
					console.log(111)
					//获取本地数据
					//赋值
					// this.listData = this.getData(this.key).listData
					// this.loadData(this.key)
					uni.startPullDownRefresh()
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0,
					})
				} else {
					uni.startPullDownRefresh()
					//调接口获取新数据
					// this.loadData(this.key)
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0,
					})
				}

				this.collectNum()
			},
			// 日期滚动
			arrowClick(choose, type) {
				this.listData = []
				this.tabsList.Competition_id = []
				if (choose == '赛程') {
					if (type == '左') {
						if (this.dateIndex == 0) {
							this.dateIndex = 0
						} else {
							this.dateIndex -= 1
						}
					} else {
						if (this.dateIndex == 6) {
							this.dateIndex = 6
						} else {
							this.dateIndex += 1
						}
					}
					this.tabsList.Time = this.dateList[this.dateIndex].timeall
					this.key3 = this.tabsList.Time
				}
				if (choose == '赛果') {
					if (type == '左') {
						if (this.dateIndex1 == 0) {
							this.dateIndex1 = 0
						} else {
							this.dateIndex1 -= 1
						}
					} else {
						if (this.dateIndex1 == 6) {
							this.dateIndex1 = 6
						} else {
							this.dateIndex1 += 1
						}
					}
					this.tabsList.Time = this.dateList1[this.dateIndex1].timeall
					this.key3 = this.tabsList.Time
				}

				// uni.startPullDownRefresh()
				// this.loadData()
				this.key = this.key1 + this.key2 + this.key3
				if (this.getData(this.key) !== null) {
					console.log(111)
					//获取本地数据
					//赋值
					// this.listData = this.getData(this.key).listData
					// this.loadData(this.key)
					uni.startPullDownRefresh()
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0,
					})
				} else {
					uni.startPullDownRefresh()
					//调接口获取新数据
					// this.loadData(this.key)
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0,
					})
				}
				this.collectNum()
			},

			// 跳转搜索
			jumpClick(type) {
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/rateView/search/search'
					})
				}

				if (type == 2) {

					console.log(this.tabsList)
					let tabsList2 = this.tabsList
					if (this.getData(this.key + 'SX') !== null) {
						console.log(111)
						//获取本地数据
						//赋值
						tabsList2.Competition_id = this.getData(this.key + 'SX')
					} else {

						tabsList2 = this.tabsList
					}

					uni.navigateTo({
						url: '/pages/rateView/sift/sift?tabsList=' + JSON.stringify(tabsList2) + '&key=' + this.key
					})



				}
			},
			toClick(item) {
				if (this.Animation_State == 1) {
					if (item.Coverage_Mlive == 1) {
						console.log("动画直播间")
						uni.navigateTo({
							// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
							url: `/pages/liveView/broadcast/index?Match_Id=${item.Match_Id}&activeIndex=2&Id=${item.Id}`
						})
					} else {
						console.log("无反应")
					}
				} else {
					if (item.Coverage_Mlive == 1) {
						console.log("动画直播间")
						uni.navigateTo({
							// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
							url: `/pages/liveView/broadcast/index?Match_Id=${item.Match_Id}&activeIndex=2&Id=${item.Id}`
						})
					} else {
						console.log("无反应")
					}
				}
			},
			rowClick(item) {
				// this.tabsList.Competition_id = item.Match_Id
				console.log(item)
				const {
					Anchoer_Id,
					Match_Id
				} = item
				if (
					this.activeIndex == 0 ||
					this.activeIndex == 1 ||
					this.activeIndex == 2 ||
					this.activeIndex == 3 ||
					this.activeIndex == 4
				) {
					if (this.Animation_State == 1) {
						if (item.Coverage_Mlive == 1) {
							console.log("动画直播间")
							uni.navigateTo({
								// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
								url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&activeIndex=2&Id=${item.Id}`
							})
						} else {
							console.log("无反应")
						}
					} else {
						if (item.Coverage_Mlive == 1) {
							console.log("动画直播间")
							uni.navigateTo({
								// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
								url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&activeIndex=2&Id=${item.Id}`
							})
						} else {
							if (item.Anchoer_Logo) {
								console.log("视频直播间")
								uni.navigateTo({
									// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
									url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}&activeIndex=1&Id=${item.Id}`
								})
							}
							console.log("无反应")
						}
					}

					// uni.navigateTo({
					// 	// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
					// 	url: `/pages/liveView/broadcast/index?Match_Id=${Match_Id}`
					// })
				}
			},
			toClicklive(item) {
				if (this.Animation_State == 1) {
					if (item.Coverage_Mlive == 1) {
						console.log("动画直播间")
						uni.navigateTo({
							// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
							url: `/pages/liveView/broadcast/index?Match_Id=${item.Match_Id}&activeIndex=2&Id=${item.Id}`
						})
					} else {
						console.log("无反应")
					}
				} else {
					if (item.Coverage_Mlive == 1) {
						console.log("视频直播间")
						uni.navigateTo({
							// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
							url: `/pages/liveView/broadcast/index?Match_Id=${item.Match_Id}&activeIndex=1&Id=${item.Id}`
						})
					} else {
						console.log("视频直播间")
						uni.navigateTo({
							// url:`/pages/liveView/broadcast/index?Anchoer_Id=${Anchoer_Id}&Match_Id=${Match_Id}`
							url: `/pages/liveView/broadcast/index?Match_Id=${item.Match_Id}&activeIndex=1&Id=${item.Id}`
						})
					}
				}

			}
		}
	}
</script>

<style scoped lang="less">
	body,
	.page {
		overscroll-behavior-y: none;
	}

	/* ::v-deep(.var-tabs--layout-horizontal-indicator){
		width: 500px !important;
	} */
	// ::v-deep uni-page-wrapper{
	// 	background: #f4f4f5;
	// }
	.activetop {
		margin-top: 345rpx;
	}

	.content {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		background: #f4f4f5;
		height: 100vh;
	}

	.event_top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: RGBA(230, 29, 41, 1);
		// background:  url("/static/image/bgimg.png") no-repeat center/center;
		width: 100%;

		.top_imgbox {
			width: 100%;
			display: flex;
			margin-top: 94rpx;
			align-items: center;
			justify-content: space-between;
			// justify-content: center;
			text-align: center;
			box-sizing: border-box;
			padding: 0 30rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}

			.top_nav {
				width: 318rpx;
				height: 56rpx;
				border: 3rpx solid #fff;
				border-radius: 8rpx;
				display: flex;
				align-items: center;
				text-align: center;
				box-sizing: border-box;

				view {
					flex: 3;
					box-sizing: border-box;
					// width: 106rpx;
					height: 103%;
					color: #fff;
					font-size: 26rpx;
					border-radius: 3rpx;
					line-height: 56rpx;
					font-weight: 500;
					// position: relative;
				}
			}
		}
	}

	.tab2 {
		margin-top: 20rpx;
	}

	.dates {
		width: 100%;
		display: flex;
		background: #ffffff;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 10rpx;

		.dates_boxs ::-webkit-scrollbar {
			display: none;
		}

		.dates_boxs {
			width: 90%;
			height: 96rpx;
			// display: flex;
			// align-items: center;
			color: #b0b2be;
			font-size: 20rpx;
			// background-color: greenyellow;
			white-space: nowrap;
			overflow: hidden;

			.smallbox {
				// display: flex;
				// flex-direction: column;
				// justify-content: center;
				// align-items: center;
				box-sizing: border-box;
border-radius: 14rpx 14rpx 14rpx 14rpx;
				width: 94rpx;
				height: 96rpx;
				padding: 20rpx 0;
				position: relative;

				// background-color: black;
				display: inline-block;

				.timechoose {
					text-align: center;
					position: absolute;
					top: 18rpx;
					left: 0;
					right: 0;
				}

				.timechoose1 {
					text-align: center;
					position: absolute;
					top: 48rpx;
					left: 0;
					right: 0;
				}

				.timechoose2 {
					text-align: center;
					position: absolute;
					top: 38%;
					left: 0;
					right: 0;
				}
			}
		}

		.jiantou1,
		.jiantou2 {
			width: 32rpx;
			height: 32rpx;
		}
	}

	.event_btm {
		width: 100%;
		background: #f4f4f5;

		.btm_box {
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #ffffff;
			margin-top: 10rpx;

			.btm_box_top {
				width: 100%;
				height: 52rpx;
				display: flex;
				align-items: center;
				border-bottom: 2px solid #e7e9ee;

				.groups {
					width: 92rpx;
					height: 32rpx;
					font-size: 20rpx;
					background: #ffe3d8;
					color: #cd6d47;
					text-align: center;
					line-height: 32rpx;
					border-radius: 6rpx 6rpx 6rpx 6rpx;
					margin: 0 30rpx 0 20rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					padding: 0 5rpx;
				}

				.times {
					width: 65rpx;
					color: #8e92a4;
					font-size: 22rpx;
					overflow: hidden;
				}

				.section {
					width: 100rpx;
					font-size: 24rpx;
					color: #FC683E;
					margin: 0 0 0 25rpx;
				}

				.progress {
					margin-left: 7%;
					min-width: 300rpx;
					// display: flex;
					// align-items: center;
					// justify-content: space-around;
					line-height: 52rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;

					text {
						margin: 0 8rpx;
					}
				}
			}

			.btm_box_btm {
				width: 100%;
				display: flex;
				align-items: center;
				height: 122rpx;

				.btm1 {
					width: 40rpx;
					height: 40rpx;
					margin: 0 20rpx 0 20rpx;
				}

				.btm2 {
					width: 15%;
					display: flex;
					flex-direction: column;
					margin: 0 120rpx 0 0;

					.btm2_top,
					.btm2_btm {
						display: flex;
						width: 230rpx;
						margin: 5rpx 0;
						font-weight: 500;
						color: #333333;

						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 8rpx;
						}

						.btm2_top_name,
						.btm2_btm_name {
							width: 190rpx;
							font-size: 26rpx;
							display: flex;
							align-items: center;
						}
					}
				}

				.btm3 {
					margin-left: 9%;
					width: 250rpx;

					.btm3_top,
					.btm3_btm {
						margin: 5rpx 0 13rpx 0;
						width: 250rpx;
						// display: flex;
						// align-items: center;
						// justify-content: space-around;
						font-size: 24rpx;
						font-weight: 500;
						color: #8e92a4;
						font-weight: bold;
						font-size: 22rpx;
						display: flex;
						margin-left: 4%;

						view {
							width: 14.3%;
							margin-left: 5rpx;
							text-align: center;
							// margin: 0 11rpx 0 16rpx;
						}
					}
				}

				.btm4 {
					width: 52rpx;
					height: 52rpx;
					border: 2rpx solid #FC683E;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 35rpx;

					image {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>