<template>
	<view>
		<phone v-show="type == 1" @changeType="changeType"></phone>
		<pwd v-show="type == 2" @changeType="changeType" @pwdLogin="pwdLogin"></pwd>
	</view>
</template>


<script>
	import {
		login
	} from '/utils/iM.js'
	import pwd from './pwd.vue'
	import phone from './phone.vue'
	import store from '@/store/index.js'; //需要引入store
	import {
		genTestUserSig
	} from '/pages/TUIKit/debug/index.js'
	// import AES from './tools/aes';
	import mitt  from '/utils/bus.ts'

	export default {
		components: {
			pwd,
			phone
		},
		data() {
			return {
				type: 1,
				config: {
					userID: "", //User ID
					SDKAppID: 1400813717, // Your SDKAppID
					secretKey: "c74d2910cc6c7180b015d75d44e73ba0af399d5f3e3d159c6d09bd5903ff01a0"
				}
			}
		},


		onLoad() {
			//正确账号
			console.log(uni.$Crypto.decrypt(
				'cLqPP7TEVANDphbf8YMNr199sj6Jsqo+pJS7wyDKgMzUdrnM0MNEC56+vH5SZkZqcT7VRQAJfZ89xQeUi6ijUg=='))

			// this.getRegistrationID()

		},
		onUnload() {
				uni.switchTab({
					url:"/pages/liveView/index"
				})
			
		},
		onPageScroll(e) {

		},
		methods: {
			// login() {
			// 	// login TUIKit
			// 	uni.$TUIKit.login({
			// 		userID: uni.$chat_userID,
			// 		userSig:uni.$chat_userSig
			// 	}).then((res) => {
			// 		// sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
			// 		// uni.showLoading({
			// 		// 	title: "初始化...",
			// 		// });
			// 	});
			// },
			getRegistrationID() {
				//安卓获取设备唯一标识，集成了获取imei，获取安卓ID，获取GUID，获取获取OAID/AAID等
				const module = uni.requireNativePlugin("leven-device-UniqueModule");
				module.getAll(res => {
					console.log(res)

				})
				//极光id
				// const jv = uni.requireNativePlugin('JG-JPush')
				// jv.getRegistrationID(result => {
				// 	let registerID = result.registerID
				// 	this.registrationID = registerID
				// 	console.log(this.registrationID, 1212);
				// })
			},
			pwdLogin(data) {
				
				let newdata = {
					"User_Phone": data.User_Phone,
					"User_Password": data.User_Password,
					"Imei": uni.getStorageSync("deviceInfo").imei,
					"Oaid":uni.getStorageSync("deviceInfo").OAID,
					"GUID":uni.getStorageSync("deviceInfo").guid,
					"Android_id":uni.getStorageSync("deviceInfo").androidID,
					// "Aurora_RegisterId": uni.getStorageSync("deviceInfo").Aurora_RegisterId,
					// "imei": uni.getStorageSync("deviceInfo").Aurora_RegisterId,
					// "imei_md5": uni.getStorageSync("deviceInfo").Aurora_RegisterId,
					// "oaid": uni.getStorageSync("deviceInfo").Aurora_RegisterId,
					// "oaid_md5": uni.getStorageSync("deviceInfo").Aurora_RegisterId,
					// "android_id": "65",
					// "android_id_md5": "83",
					// "GUID": "69"
					
				}
				// newdata={...newdata,...uni.getStorageSync("deviceInfo")}
				// this.login()

				uni.$api('/User/LoginByPassword', newdata).then(s => {
					if (s.Code !== 200) {
						uni.showToast({
							title: s.Message,
							icon: 'none',
						})
					} else {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						mitt.emit('loginOut',false)
						store.commit('CHANGE_USER_ID', s.Result.User_Id)
						store.dispatch("getUserInfo")
						// uni.$emit("getUserInfo");
						
						this.config.userID = String(s.Result.User_Id)
						const userSig = genTestUserSig(this.config).userSig;
						// login(s.Result.User_Id,()=>{})
						uni.$TUIKit.login({
							userID: this.config.userID,
							isOnlineStatusNotify: true,
							userSig
						}).then((res) => {
							// sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
							console.log(res)
							// uni.showLoading({
							// 	title: "初始化...",
							// });
						});
						uni.reLaunch({
							url: '/pages/myView/index',
							animationType: 'pop-in',
							animationDuration: 200,

						});



					}
				})

			},
			changeType(value) {
				this.type = value
			},




		},

	}
</script>




<style lang='scss' scoped></style>