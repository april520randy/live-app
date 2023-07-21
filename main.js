import App from './App'

import '@varlet/ui/es/style'
import Crypto from './utils/CryptoJS.js'
import {ajaxTemplate} from './api/index.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false


// Vue.prototype.$eventBus = new Vue()
// Vue.prototype.$Crypto=Crypto
App.mpType = 'app'
const app = new Vue({
	...App
})
// uni.$getToken = new Promise(resolve => {
//   uni.$isResolve = resolve;
// })
/* 挂载全局对象 start */
// app.config.globalProperties.$Crypto = $Crypto
/* 挂载全局对象 end */

app.$mount()


// #endif

// #ifdef VUE3
import {
	createSSRApp 
} from 'vue' 
import store from './store'  
import mitt  from './utils/bus.ts'    
import Varlet from '@varlet/ui'
uni.$Crypto = Crypto
uni.$api = ajaxTemplate  

uni.$Code = "XIAOMI" 
 

import { genTestUserSig, aegisID } from '/pages/TUIKit/debug/index.js'
import { TIM, TIMUploadPlugin, Aegis } from '/pages/TUIKit/debug/tim.js'
const aegis = new Aegis({
  id: aegisID, // 项目key
  reportApiSpeed: true // 接口测速
})
uni.$aegis = aegis
const config = {
  userID: '231327', //User ID
  SDKAppID: 1400813717, // Your SDKAppID
  secretKey: 'c74d2910cc6c7180b015d75d44e73ba0af399d5f3e3d159c6d09bd5903ff01a0' // Your secretKey
}
const userSig = genTestUserSig(config).userSig
uni.$chat_SDKAppID = config.SDKAppID
uni.$chat_userID = config.userID
uni.$chat_userSig = userSig
uni.$config = config
// 创建 sdk 实例
uni.$TUIKit = TIM.create({
  SDKAppID: uni.$chat_SDKAppID
})
uni.$TIM = TIM
// 注册文件上传插件
uni.$TUIKit.registerPlugin({
  'tim-upload-plugin': TIMUploadPlugin
})


 // sdk ready 以后可调用 API
 function handleSDKReady(event) {
  uni.$chat_isSDKReady = true
  uni.hideLoading()
}
function handleSDKNotReady(event) {
  uni.$chat_isSDKReady = false
  uni.hideLoading()
  // uni.showToast({
  //   title: 'SDK 未完成初始化'
  // })
}
function handleKickedOut(event) {
  uni.$chat_isSDKReady = false
  uni.hideLoading()
  // uni.clearStorageSync()
  // uni.removeStorageSync('user_Id')

}

let onMessageReceived = function (event) {
  console.log(event, 'onMessageReceived')
  mitt.emit('messageReceived',event)
}


uni.$TUIKit.on(TIM.EVENT.SDK_READY,  handleSDKReady)
uni.$TUIKit.on(TIM.EVENT.SDK_NOT_READY, handleSDKNotReady)
uni.$TUIKit.on(TIM.EVENT.KICKED_OUT, handleKickedOut)
uni.$TUIKit.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)




function messageReceived(event) {
  console.log('messageReceived', event)
  Vue.prototype.$eventBus.$emit('messageReceived',event)

}

// if(uni.$TUIKit != undefined){



// }

//uni.$TIM = TIM
uni.$http='https://svga-1317257643.cos-website.ap-shanghai.myqcloud.com/'

export function createApp() {
	const app = createSSRApp(App)
	app.use(Varlet)
	app.use(store)
	//app.use(uviewPlus)
	return {
		app
	}
}
// #endif
