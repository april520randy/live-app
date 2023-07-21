<script>
	import TabbarConfig from '/utils/tabbar.js'
	import { getUUID } from '@/utils/cainiaoPrint'
	import {
		ajaxTemplate
	} from '/api/index.js'
	import store from '@/store/index.js'
	import {
		genTestUserSig,
		aegisID
	} from "/pages/TUIKit/debug/index.js";
	import {
		TIM,
		TIMUploadPlugin,
		Aegis
	} from "/pages/TUIKit/debug/tim.js";
	import mitt  from '/utils/bus.ts'
	const aegis = new Aegis({
		id: aegisID, // 项目key
		reportApiSpeed: true, // 接口测速
	});
	uni.$aegis = aegis;

	// uni.$chat_SDKAppID = config.SDKAppID;
	// uni.$chat_userID = config.userID;
	// uni.$chat_userSig = userSig; 
	// 创建 sdk 实例
	uni.$TUIKit = TIM.create({
		SDKAppID: 1400813717,
	});
	uni.$TIM = TIM;
	export default {
		data() {
			return {
				isself:false,
				tabbar: TabbarConfig,
				successSX: 1,
				config: {
					userID: "", //User ID
					SDKAppID: 1400813717, // Your SDKAppID
					secretKey: "c74d2910cc6c7180b015d75d44e73ba0af399d5f3e3d159c6d09bd5903ff01a0"
				}
			}
		},
		onLaunch: function() {
			uni.setStorageSync("gogx", true)
			
			if(uni.getStorageSync('UUID')){
				//
			}else{
				//
				
				let bill_uuid = getUUID(32, 16)
				uni.setStorageSync("UUID", bill_uuid)
				console.log('生成uuid',uni.getStorageSync('UUID'))
			}
			if(plus.runtime.isAgreePrivacy()){
			    //隐私协议
				console.log('disfisf')
				//安卓获取设备唯一标识，集成了获取imei，获取安卓ID，获取GUID，获取获取OAID/AAID等
				const module = uni.requireNativePlugin("leven-device-UniqueModule");
				module.getAll(res => {
					console.log(res,'安卓获取设备唯一标识')
					uni.setStorageSync("deviceInfo", res.data)
				
					
					
				})
				
			  }
			
			
		
			
			mitt.on('loginOut', (data) => {
			 this.isself=data
			})
			
			this.bindTIMEvent()

			console.log('App Launch')
			store.dispatch('getUserInfo')
			// 获取用户信息
			uni.$on('getUserInfo', () => {
				store.dispatch('getUserInfo')
			})

			//首次进入刷新
			// uni.setStorageSync('successSX', this.successSX + 1)
			// console.log(uni.getStorageSync('successSX'))
			//



		},
		onShow: function() {
			// console.log(this.$eventBus)
			this.getcodeInfo()
			let dateList = []
			let daysSecond = 24 * 60 * 60 * 1000
			for (let index = 0; index <= 6; index++) {
				let obj = {}
				// obj.time = this.time(Date.now() + daysSecond * index).substring(5, 10)
				// obj.week = this.getWeekDate(this.time(Date.now() + daysSecond * index))
				obj.timeall = this.time(Date.now() + daysSecond * index).substring(
					0,
					10
				)
				dateList.push(obj)
			}
			dateList.forEach((item) => {
				uni.removeStorageSync("焦点赛程" + item.timeall)
				uni.removeStorageSync("焦点赛果" + item.timeall)
				uni.removeStorageSync("足球赛程" + item.timeall)
				uni.removeStorageSync("足球赛果" + item.timeall)
				uni.removeStorageSync("篮球赛程" + item.timeall)
				uni.removeStorageSync("篮球赛果" + item.timeall)
			})



			let arr = ["即时", "进行中", "赛程", "赛果", "收藏"]
			arr.forEach((item) => {
				uni.removeStorageSync("焦点" + item)
				uni.removeStorageSync("焦点" + item + "total")
				uni.removeStorageSync("焦点" + item + "page")
				uni.removeStorageSync("焦点" + item + "SX")
				
				uni.removeStorageSync("足球" + item)
				uni.removeStorageSync("足球" + item + "total")
				uni.removeStorageSync("足球" + item + "page")
				uni.removeStorageSync("足球" + item + "SX")
				
				uni.removeStorageSync("篮球" + item)
				uni.removeStorageSync("篮球" + item + "total")
				uni.removeStorageSync("篮球" + item + "page")
				uni.removeStorageSync("篮球" + item + "SX")
			})


			uni.removeStorageSync("推荐")


			console.log('App Show')
			this.gettypelist()
			
		},
		onHide: function() {
			console.log('App Hide')
		},

		methods: {

			bindTIMEvent() {
				uni.$TUIKit.on(uni.$TIM.EVENT.SDK_READY, this.handleSDKReady);
				uni.$TUIKit.on(uni.$TIM.EVENT.SDK_NOT_READY, this.handleSDKNotReady, this);
				uni.$TUIKit.on(uni.$TIM.EVENT.KICKED_OUT, this.handleKickedOut);
			},
			// sdk ready 以后可调用 API
			handleSDKReady(event) {
				uni.$chat_isSDKReady = true;
				uni.hideLoading();
				uni.navigateTo({
					url: "/pages/TUIKit/TUIPages/TUIConversation/index",
				});
			},
			handleSDKNotReady(event) {
				console.log(event)
				
				// uni.$on("testEvent",event=>{
				// 				console.log(event)})
				// uni.showToast({
				// 	title: "SDK 未完成初始化",
				// });
				
				// uni.setStorageSync('DLstate',true)
				
				if(isself) return
				uni.showModal({
					title: '提示',
					content: '当前账号已在其他设备登录聊天室',
					cancelText:'退出登录',
					confirmText:'重新进入',
					success :(res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							
							this.config.userID=String(uni.getStorageSync("user_Id"))
							const userSig = genTestUserSig(this.config).userSig;
							// login(s.Result.User_Id,()=>{})
							
							uni.$TUIKit.login({
								userID: String(uni.getStorageSync("user_Id")),
								userSig
							}).then((res) => {
								// sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
								
							});
							
							
						} else if (res.cancel) {
							console.log('用户点击取消');
							store.commit('CHANGE_USER_ID', '')
							// uni.removeStorage({ key: 'user_Id' });
							store.commit('CHANGE_USER_INFO', {})
							uni.removeStorageSync('user_Id')
							uni.setStorageSync("currentIndex", 0)
							uni.switchTab({
								url: '/pages/myView/index',
								animationType: 'pop-in',
								animationDuration: 200,
							});
							
						}
					}
				});
			},
			handleKickedOut(event) {
				// alert(66666)
				// uni.clearStorageSync();
				// uni.removeStorageSync('user_Id')
				// uni.showToast({
				// 	title: `${this.kickedOutReason(event.data.type)}被踢出。`,
				// 	icon: "none",
				// });
				uni.showModal({
					title: '提示',
					content: '当前账号已在其他设备登录聊天室',
					cancelText:'退出登录',
					confirmText:'重新进入',
					success :(res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							
							this.config.userID=String(uni.getStorageSync("user_Id"))
							const userSig = genTestUserSig(this.config).userSig;
							// login(s.Result.User_Id,()=>{})
							
							uni.$TUIKit.login({
								userID: String(uni.getStorageSync("user_Id")),
								userSig
							}).then((res) => {
								// sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
								
							});
							
							
						} else if (res.cancel) {
							console.log('用户点击取消');
							store.commit('CHANGE_USER_ID', '')
							// uni.removeStorage({ key: 'user_Id' });
							store.commit('CHANGE_USER_INFO', {})
							uni.removeStorageSync('user_Id')
							uni.setStorageSync("currentIndex", 0)
							uni.switchTab({
								url: '/pages/myView/index',
								animationType: 'pop-in',
								animationDuration: 200,
							});
							
						}
					}
				});
			},
			kickedOutReason(type) {
				switch (type) {
					case uni.$TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
						return "多实例登录";
					case uni.$TIM.TYPES.KICKED_OUT_MULT_DEVICE:
						return "多设备登录";
					case uni.$TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
						return "userSig 过期";
					case uni.$TIM.TIM.TYPES.KICKED_OUT_REST_API:
						return "REST API kick 接口踢出";
					default:
						return "";
				}
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
			time(time) {
				let date = new Date(time + 8 * 3600 * 1000) // 增加8小时
				return date.toJSON().substring(0, 19).replace('T', ' ')
			},
			gettypelist() {
				//首页
				ajaxTemplate('/Live/GetMatchTypeList').then((res) => {
					res.Result.forEach((item) => {
						item.ChildList.forEach((item2) => {
							console.log(item2)
							uni.removeStorageSync(item2.name_zh)
						})
					})

				})
				//资讯
				
				ajaxTemplate("/Information/GetInfo_Type_List").then((res) => {
					res.Result.forEach((item) => {
						uni.removeStorageSync(item.Info_Type_Name+'ZX')
					})
					
					
				})
			},
			getcodeInfo() {
				console.log({
					Code: uni.$Code,
					"Imei": uni.getStorageSync("deviceInfo").imei,
					"Oaid":uni.getStorageSync("deviceInfo").OAID,
					"GUID":uni.getStorageSync("deviceInfo").guid,
					"Android_id":uni.getStorageSync("deviceInfo").androidID,
					'UUID':uni.getStorageSync('UUID')
				},'==============uuid')
				ajaxTemplate('/User/Get_CodeInfo', {
					Code: uni.$Code,
					"Imei": uni.getStorageSync("deviceInfo").imei,
					"Oaid":uni.getStorageSync("deviceInfo").OAID,
					"GUID":uni.getStorageSync("deviceInfo").guid,
					"Android_id":uni.getStorageSync("deviceInfo").androidID,
					'UUID':uni.getStorageSync('UUID')
				}).then((res) => {
					// //资讯
					uni.setStorageSync('New_State', res.Result.New_State)
					// uni.setStorageSync('New_State', 0)
					// //聊天
					uni.setStorageSync('Chat_State', res.Result.Chat_State)
					// uni.setStorageSync('Chat_State', 0)
					// //动画直播开关 Animation_State
					uni.setStorageSync('Animation_State', res.Result.Animation_State)




					if (res.Result.New_State == 0 && res.Result.Chat_State == 0) {

						var num = this.tabbar.list.findIndex(item => {
							console.log(item, '=========');
							return item.text == '资讯'
						})

						if (num != -1) {
							this.tabbar.list.splice(num, 1)
						}
						var num1 = this.tabbar.list.findIndex(item => {
							console.log(item, '=========');
							return item.text == '聊天'
						})
						if (num1 != -1) {
							this.tabbar.list.splice(num1, 1)
						}

					}
					if (res.Result.New_State == 1 && res.Result.Chat_State == 0) {
						var num2 = this.tabbar.list.findIndex(item => {
							console.log(item, '=========');
							return item.text == '聊天'
						})
						if (num2 != -1) {
							this.tabbar.list.splice(num2, 1)
						}
					}
					if (res.Result.New_State == 0 && res.Result.Chat_State == 1) {
						var num3 = this.tabbar.list.findIndex(item => {
							console.log(item, '=========');
							return item.text == '资讯'
						})

						if (num3 != -1) {
							this.tabbar.list.splice(num, 1)
						}
					}


					// if (uni.getStorageSync('New_State') == 0 && uni.getStorageSync('Chat_State') == 0) {
					// 	this.tabbar.list.splice(1, 1)
					// 	this.tabbar.list.splice(2, 1)
					// }
					// if (uni.getStorageSync('New_State') == 1 && uni.getStorageSync('Chat_State') == 0) {
					// 	this.tabbar.list.splice(3, 1)
					// }
					// if (uni.getStorageSync('New_State') == 0 && uni.getStorageSync('Chat_State') == 1) {
					// 	this.tabbar.list.splice(1, 1)
					// }


					// uni.$isResolve()

					// console.log(this.tabbar.list)

					// console.log(uni.getStorageSync('successXY'))

					// if (uni.getStorageSync('successXY')) {
					// 	plus.navigator.closeSplashscreen() // 关闭启动页
					// } else {
					// 	//首次隐私页面开关
					// 	if (res.Result.Privacy_State == 1) {
					// 		uni.navigateTo({
					// 			url: '/pages/firing2/index',
					// 			success() {
					// 				plus.navigator.closeSplashscreen() // 关闭启动页
					// 			}
					// 		})
					// 	} else {
					// 	}
					// }
				})
			}
		}
	}
</script>

<style lang="scss">
	//@import 'uview-plus/theme.scss';
	/*每个页面公共css */
</style>