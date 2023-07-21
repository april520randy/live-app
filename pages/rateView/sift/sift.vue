<template>
	<view @touchmove.stop.prevent="() => { }">
		<view class="sift_top">
			<view class="top_input">
				<image src="../../../static/image/newback.png" mode="" @click="backClick"></image>
				<view>
					筛选
				</view>
			</view>
		</view>

		<view class="content">

			<indexList :showEmptyDataElement="false" :list="listData" height="83vh" v-if="show" style="width: 100%;">


				<template #default="{ indexList }">
					<index-item v-for="(item, index) in indexList" :item="item" :key="index" style="padding :0 24rpx">
						<template #lineBody>
							<div style="
					                display: flex;
					                justify-content: space-between;
					                margin: 0 12px;
					                flex-wrap: wrap;
					              ">
								<view v-for="(child, childIndx) in item.data" :key="childIndx"
									:style="{ background: child.active == 1 ? '#F9F9FB' : '#F9F9FB' }" style="
					                  width: 44%;
					                  margin: 10px 0px;
					                  height: 30px;
					                  line-height: 30px;
									  display: flex;
									  justify-content: space-between;
									  padding: 0 15rpx;
					                ">
									<view style="display: flex;align-items: center;"
										:style="{ color: child.active == 1 ? '#8E92A4' : '' }">
										<view @click="chooseClick(1, child, childIndx)" v-if="child.active == 1"
											style="width: 32rpx;height: 32rpx;margin-top: -28rpx;">
											<uni-icons type="checkbox-filled" size="18" color="#F4764A">
											</uni-icons>
										</view>
										<image v-if="child.active == 0" @click="chooseClick(0, child, childIndx)"
											src="../../../static/image/yuan1.png" mode=""
											style="width: 32rpx;height: 32rpx;">
										</image>
										<view
											style="margin-left: 8rpx;text-overflow: ellipsis;width: 200rpx;overflow: hidden;white-space: nowrap;">
											{{ child.name }}
										</view>
									</view>
									<view :style="{ color: child.active == 1 ? '#8E92A4' : '' }">
										{{ child.Match_Count }}
									</view>
								</view>
							</div>
						</template>
					</index-item>

				</template>
			</indexList>

		</view>


		<view class="sift_btm">
			<view class="btm_choose">
				<view @click="chooseBtn('全选')" :style="{ color: choose == 0 ? '#F4764A' : '' }">
					全选
				</view>
				<view style="height: 24rpx;width: 2rpx;background-color: #F0F0F0;padding: 0;">

				</view>
				<view @click="chooseBtn('反选')" :style="{ color: choose == 1 ? '#F4764A' : '' }">
					反选
				</view>
			</view>
			<view style="font-size: 28rpx;width: 220rpx;text-align:right;margin-left: 3%;">
				已选中<text style="color:#F4764A;">{{ num }}</text>场比赛
			</view>
			<view class="btm_btn" @click="submitClick">
				确定
			</view>
		</view>


	</view>
</template>

<script>
	import indexItem from '@/uni_modules/trigger-indexList/components/trigger-indexList_item/trigger-indexList_item.vue'
	import indexList from '@/uni_modules/trigger-indexList/components/trigger-indexList/trigger-indexList.vue'
	import {
		ajaxTemplate
	} from '@/api/index.js'

	import {
		getChineseStrPY
	} from '@/api/szm.js'
	export default {
		components: {
			indexItem,
			indexList,
		},
		data() {
			return {
				show: true,
				num: 0,
				// active: 0,
				colortabs: 0,
				choose: 2,

				title: 'Hello',
				listData: [],
				tabsList: {}
			}
		},
		methods: {
			saveData(key, value) {
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
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e))
			},
			// 返回赛事
			backClick() {
				uni.switchTab({
					url: '/pages/rateView/index'
				})
			},
			chooseClick(type, child) {

				if (type == 0) {
					this.listData.find(item => child.Competition_id == item.Competition_id).active = 1
					this.$set(child, 'active', 1)
					this.num += 1
					if (this.num == this.listData.length) {
						this.choose = 0
					}
					console.log(this.listData);
				}
				if (type == 1) {

					this.listData.find(item => child.Competition_id == item.Competition_id).active = 0
					this.$set(child, 'active', 0)
					this.num -= 1
					if (this.num == 0) {
						this.choose = 1
					}
				}

			},
			chooseBtn(type) {

				this.show = false
				this.$nextTick(() => {
					if (type == '全选') {
						this.choose = 0
						for (let item of this.listData) {
							this.$set(item, 'active', 1)
						}
						this.num = this.listData.length

					}
					if (type == '反选') {
						this.choose = 1
						this.listData.forEach(item => {
							if (item.active == 1) {
								this.$set(item, 'active', 0)
								this.num -= 1
							} else {
								this.$set(item, 'active', 1)
								this.num += 1
								
							}
						})
						this.listData.filter
						
						// this.num = 0
					}
					this.show = true
					console.log('this.listData', this.listData);

				})
			},
			submitClick() {
				let list = []
				this.listData.forEach(item => {

					if (item.active == 1) {
						// console.log(1111111, item);
						list.push(item.Competition_id)
					}
				})
				
				this.saveData(this.key+'SX', list)
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]

				//console.log(this.list);
				prevPage.$vm.getValue(list)

				uni.navigateBack({
					delta: 1
				})
			},
			getZMIndex(word) {
				switch (word) {
					case 'A':
						return 0;
					case 'B':
						return 1;
					case 'C':
						return 2;
					case 'D':
						return 3;
					case 'E':
						return 4;
					case 'F':
						return 5;
					case 'G':
						return 6;
					case 'H':
						return 7;
					case 'I':
						return 8;
					case 'J':
						return 9;
					case 'K':
						return 10;
					case 'L':
						return 11;
					case 'M':
						return 12;
					case 'N':
						return 13;
					case 'O':
						return 14;
					case 'P':
						return 15;
					case 'Q':
						return 16;
					case 'R':
						return 17;
					case 'S':
						return 18;
					case 'T':
						return 19;
					case 'U':
						return 20;
					case 'V':
						return 21;
					case 'W':
						return 22;
					case 'X':
						return 23;
					case 'Y':
						return 24;
					case 'Z':
						return 25;

				}
			},
			loadData() {
				console.log( this.tabsList)
				ajaxTemplate('/Immediately/Get_ImmediatelyCompetition_List', this.tabsList).then(res => {
					console.log('数据', res);
					this.show = false
					this.$nextTick(() => {
						res.Result.forEach((item, index) => {
							item.active=0
							this.tabsList.Competition_id.forEach((it)=>{
								if(item.Competition_id==it ){
									item.active=1
								}
							})
							console.log(item)
							let obj = {
								Competition_id: item.Competition_id,
								name: item.Competition_Name,
								Match_Count: item.Match_Count,
								active: item.active,
								index: this.getZMIndex(getChineseStrPY(item.Competition_Name,
									'first')[0])

							}
							
							this.$set(this.listData, index, obj)
							
							
							

						})
						this.show = true
						console.log(1111111111111, this.listData);
						this.num=this.tabsList.Competition_id.length

					})

				})
			}

		},
		onLoad(options) {

			// uni.getStorageSync('Competition_Id')
			console.log(options)
			this.tabsList = JSON.parse(options.tabsList)
			this.key=options.key
			delete this.tabsList.Page
			delete this.tabsList.Limit
			this.loadData()
		},
		onHide() {
			uni.removeStorageSync('tabsList')
			
		}
	}
</script>

<style scoped lang="scss">
	* {
		::v-deep * {
			box-sizing: border-box;
		}
	}

	::v-deep .lineBox .lineHeadBox {
		padding: 0px !important;
		background: transparent !important;
	}

	::v-deep .root .indexBox[data-v-f73cc697] {
		// margin-top: -60rpx;

	}

	::v-deep .root .indexBox .index[data-v-f73cc697] {
		font-weight: 400;
		color: #8E92A4;
	}

	::v-deep element.style {
		background: transparent !important;
		color: #E3121E !important;

	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		z-index: 1;
		margin-top: 196rpx;
		width: 100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	// ::v-deep .uni-indexed-list__item[data-v-d26f185a] {
	// 	height: 60rpx;
	// 	width: 150px;
	// }

	// ::v-deep .uni-indexed-list__list[data-v-d26f185a] {
	// 	width: 100%;
	// 	flex-direction:row;
	// 	flex-wrap: wrap;
	// }

	// ::v-deep .uni-indexed-list__item-border[data-v-d26f185a] {
	// 	margin-top: 30rpx;
	// 	height: 60rpx;
	// 	width: 338rpx;
	// 	background: #F9F9FB;
	// 	border-radius: 8rpx 8rpx 8rpx 8rpx;
	// 	border: none;
	// 	flex-direction: row;
	// 	padding: 15rpx 20rpx;
	// }

	.active {
		color:#F4764A;
	}

	.nav {
		position: fixed;
		right: 10rpx;
		top: 280rpx;
		color: #8E92A4;
		font-size: 24rpx;
	}


	.sift_top {
		width: 100%;
		height: 176rpx;
		overflow: hidden;
		// background: url('../../../static/image/bjimg5.png') no-repeat  center/100% ;
		background-color: #fff;
		position: fixed;
		top: 0;
		z-index: 9999;

		.top_input {
			width: 100%;
			display: flex;
			margin-top: 100rpx;
			padding: 0 25rpx;
			position: fixed;
			top: 0;


			image {
				width: 40rpx;
				height: 40rpx;
			}

			view {
				margin-left: 39%;
				font-size: 32rpx;
				color: #333333;
			}
		}
	}

	.center_box {
		width: 100%;
		margin-bottom: 40rpx;
		font-size: 28rpx;

		.box_top {
			width: 100%;
			height: 58rpx;
			border-bottom: 2rpx solid #E7E9EE;
			line-height: 58rpx;
			color: #666666;
		}

		.box_btm {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			color: #8E92A4;
			justify-content: space-between;
		}
	}

	.sift_btm {
		width: 100%;
		height: 98rpx;
		border-top: 2rpx solid #E7E9EE;
		color: #8E92A4;
		z-index: 999;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;

		.btm_choose {
			display: flex;
			align-items: center;

			view {
				font-size: 30rpx;
				padding: 0 30rpx;

			}
		}

		.btm_btn {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #FFFFFF;
			width: 224rpx;
			height: 98rpx;
			background: #F4764A;
		}
	}
</style>