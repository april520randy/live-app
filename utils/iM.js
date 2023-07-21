import TIM from 'tim-js-sdk'
//import {tim} from '../main.js'
//import TIMUploadPlugin from 'tim-upload-plugin'
//import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin'
import { genTestUserSig } from '/pages/TUIKit/debug/index.js'
	import { TUIChatServer } from "/pages/TUIKit//TUICore/server";



const SDKAppID = 1400813717

const secretKey =
  'c74d2910cc6c7180b015d75d44e73ba0af399d5f3e3d159c6d09bd5903ff01a0'



 

// TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
// // 注册腾讯云即时通信 IM 本地审核插件
// TUIKit.registerPlugin({
//   'tim-profanity-filter-plugin': TIMProfanityFilterPlugin
// })

// uni.$TUIKit.setLogLevel(1)




//登录IM
export const login = (userID, callback) => {
  if (userID === '' || userID === undefined || userID === null) {
    if(uni.getStorageSync('匿名')){
      userID = uni.getStorageSync('匿名')
    }else{
      userID = '匿名'+(Math.random(1,10)*1000000000).toFixed(0)
       uni.setStorageSync('匿名',userID)
    }
  }

  console.log(
    userID,
    '=========================userID========================='
  )

  const userSig = genTestUserSig({ userID:String(userID), SDKAppID, secretKey }).userSig
	
  uni.$TUIKit.login({ userID:String(userID), userSig }).then((res) => {
    console.log('TUIKit登录返回', res)
    //new TUIChatServer()
    callback(res)
  })
}

//监听消息
export const onMessageReceived = (context) =>{
  return new Promise ((resolve)=>{
    let onMessageReceived = function (event) {
      resolve(event)
     
    }

    uni.$TUIKit.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived,context)
  })
}

export const onMessageReceivedOFF = () =>{
  return new Promise ((resolve)=>{
    let onMessageReceived = function (event) {
      resolve(event.data)
     
    }

    uni.$TUIKit.off(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)
  })
}


//加入直播群组
export const joinAVChatRoom = (groupID, callback) => {
  uni.$TUIKit.joinGroup({ groupID, type: TIM.TYPES.AVChatRoom }).then((res) => {
    switch (res.data.status) {
      case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
        console.log(res)
        return
      case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
        callback(res.data.group) // 加入的群组资料
        return
      case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
        console.log(res)
        return
    }
  })
}

//加入普通群
export const joinGroup = (groupID, callback) => {
  uni.$TUIKit.joinGroup({ groupID, type: TIM.TYPES.Public }).then((res) => {
    switch (res.data.status) {
      case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
      console.log(res)  
      return
      case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
        callback(res.data.group) // 加入的群组资料
        return
      case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
      console.log(res)   
      return
    }
  })
}

/*
发送消息
conversationType
TIM.TYPES.CONV_C2C（端到端会话）
TIM.TYPES.CONV_GROUP（群组会话）
自定义参数，json传入
{
  lv: 0, //等级
  lvColor: '', //等级颜色
  backgroundColor:''//背景色
  name: '', //昵称
  text: '', //消息文字
  textColor:''//文字颜色
  isUp: false, //是否主播
  vip: '', //贵族等级，无则不是贵族
  isRoomManager: false, //是否房管
  colorful: '', //炫彩样式，无则空
  gift: [], //礼物图标，无则空，
  isComeIn: false //是否为进入直播间消息
  multipleHit:''//为空则不是连击
}
*/
export const sendDIY = (id, TYPE, data, callback) => {
  let message = uni.$TUIKit.createCustomMessage({
    to: id,
    conversationType:
      TYPE === 'group' ? TIM.TYPES.CONV_GROUP : TIM.TYPES.CONV_C2C,
    payload: {
      data: JSON.stringify(data), // 用于标识该消息是骰子类型消息
      description: '',
      extension: ''
    }
  })

  let promise = uni.$TUIKit.sendMessage(message)
  promise
    .then((imResponse) => {
      callback(imResponse.data)
    })
    .catch((imError) => {
      // 发送失败
      console.warn('sendMessage error:', imError)
    })
}
//普通文本消息
export const sendText = (id, TYPE, text, callback) => {
  let message = uni.$TUIKit.createTextMessage({
    to: id,
    conversationType:
      TYPE === 'group' ? TIM.TYPES.CONV_GROUP : TIM.TYPES.CONV_C2C,
    payload: {
      text
    },
    needReadReceipt: true
  })

  let promise = uni.$TUIKit.sendMessage(message)
  promise
    .then((imResponse) => {
      callback(imResponse)
    })
    .catch((imError) => {
      // 发送失败
      console.warn('sendMessage error:', imError)
    })
}

//表情发送
export const sendFace = (id, TYPE, index, data, callback) => {
  let message = uni.$TUIKit.createFaceMessage({
    to: id,
    conversationType:
      TYPE === 'group' ? TIM.TYPES.CONV_GROUP : TIM.TYPES.CONV_C2C,
    payload: {
      index,
      data
    }
  })

  uni.$TUIKit.sendMessage(message)
    .then((imResponse) => {
      callback(imResponse)
    })
    .catch((imError) => {
      // 发送失败
      console.warn('sendMessage error:', imError)
    })
}

//获取群资料
export const getGroupProfile = (groupID, callback) => {
  let promise = uni.$TUIKit.getGroupProfile({ groupID, groupCustomFieldFilter: [] })
  promise
    .then(function (imResponse) {
      console.log(imResponse.data.group)
      callback(imResponse.data.group)
    })
    .catch(function (imError) {
      console.warn('getGroupProfile error:', imError) // 获取群详细资料失败的相关信息
    })
}

//获取群成员
export const groupMemberList = (groupID, callback, count = 100, offset = 0) => {
  let promise = uni.$TUIKit.getGroupMemberList({ groupID, count, offset }) // 从0开始拉取30个群成员
  promise
    .then(function (imResponse) {
      callback(imResponse.data.memberList) // 群成员列表
    })
    .catch(function (imError) {
      console.warn('getGroupMemberList error:', imError)
    })
}

//根据id获取群员信息
export const groupMemberProfile = (id, groupID, callback) => {
  let promise = uni.$TUIKit.getGroupMemberProfile({
    groupID,
    userIDList: [id] // 请注意：即使只拉取一个群成员的资料，也需要用数组类型，例如：userIDList: ['user1']
  })

  promise
    .then(function (imResponse) {
      callback(imResponse.data.memberList) // 群成员列表
    })
    .catch(function (imError) {
      console.warn('getGroupMemberProfile error:', imError)
    })
}
//清空消息
export const clearHistoryMessage = (groupID, callback) => {
  let promise = uni.$TUIKit.clearHistoryMessage(groupID)
  promise
    .then(function (imResponse) {
      // 清空消息成功
      callback('清空成功' + imResponse)
    })
    .catch(function (imError) {
      console.warn('clearHistoryMessage error:', imError) // 清空消息失败的相关信息
    })
}

//禁言
export const setGroupMemberMuteTime = (groupID, userID, muteTime = 600) => {
  let promise = uni.$TUIKit.setGroupMemberMuteTime({
    groupID,
    userID,
    muteTime // 禁言10分钟；设为0，则表示取消禁言
  })
  promise
    .then(function (imResponse) {
      console.log(imResponse.data.group) // 修改后的群资料
      console.log(imResponse.data.member) // 修改后的群成员资料
    })
    .catch(function (imError) {
      console.warn('setGroupMemberMuteTime error:', imError) // 禁言失败的相关信息
    })
}

//群体禁言
export const setAllGroupMemberMute = (groupID, muteAllMembers = false) => {
  let promise = uni.$TUIKit.updateGroupProfile({
    groupID,
    muteAllMembers // true 表示全体禁言，false表示取消全体禁言
  })
  promise
    .then(function (imResponse) {
      console.log(imResponse.data.group) // 修改成功后的群组详细资料
    })
    .catch(function (imError) {
      console.warn('updateGroupProfile error:', imError) // 修改群组资料失败的相关信息
    })
}

//退群

export const quitFroup = (group) => {
  let promise = uni.$TUIKit.quitGroup(group)
  promise
    .then(function (imResponse) {
      console.log(imResponse.data.groupID) // 退出成功的群 ID
    })
    .catch(function (imError) {
      console.warn('quitGroup error:', imError) // 退出群组失败的相关信息
    })
}

//踢人

export const deleteGroupMember = (
  groupID,
  userIDList,
  reason,
  isGroup = false
) => {
  let obj = {
    groupID,
    userIDList,
    reason
  }
  if (isGroup) {
    obj.duration = 60
  }
  let promise = uni.$TUIKit.deleteGroupMember(obj)

  promise
    .then(function (imResponse) {
      console.log(imResponse.data.group) // 删除后的群组信息
      console.log(imResponse.data.userIDList) // 被删除的群成员的 userID 列表
    })
    .catch(function (imError) {
      console.warn('deleteGroupMember error:', imError) // 错误信息
    })
}

//历史消息列表
export const getMessageList = (type, id, callback) => {
  uni.$TUIKit.getMessageList({ conversationID: `${type}${id}` }).then((imResponse) => {
    callback(imResponse.data.messageList)
  })
}

//登出
export const logout = () => {
  uni.$TUIKit.logout()
    .then(function (imResponse) {
		
     
    })
    .catch(function (imError) {
      console.warn('logout error:', imError)
    })
}

// 监听
 // export const bindTIMEvent=()=> {
	//  console.warn(12132132132)
 //      uni.$TUIKit.on(uni.$TIM.EVENT.SDK_READY, handleSDKReady);
 //      uni.$TUIKit.on(uni.$TIM.EVENT.SDK_NOT_READY, handleSDKNotReady);
 //      uni.$TUIKit.on(uni.$TIM.EVENT.KICKED_OUT, handleKickedOut);
 //    }
 //    // sdk ready 以后可调用 API
 //  function  handleSDKReady(event) {
 //      uni.$chat_isSDKReady = true;
 //      uni.hideLoading();
 //      uni.navigateTo({
 //        url: "/pages/TUIKit/TUIPages/TUIConversation/index",
 //      });
 //    }
 //  function  handleSDKNotReady(event) {
 //      uni.showToast({
 //        title: "SDK 未完成初始化",
 //      });
 //    }
 //  function  handleKickedOut(event) {
 //      uni.clearStorageSync();
 //      uni.showToast({
 //        title: `${kickedOutReason(event.data.type)}被踢出。`,
 //        icon: "none",
 //      });
 //    }
 //  function  kickedOutReason(type) {
 //      switch (type) {
 //        case uni.$TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
 //          return "多实例登录";
 //        case uni.$TIM.TYPES.KICKED_OUT_MULT_DEVICE:
 //          return "多设备登录";
 //        case uni.$TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
 //          return "userSig 过期";
 //        case uni.$TIM.TIM.TYPES.KICKED_OUT_REST_API:
 //          return "REST API kick 接口踢出";
 //        default:
 //          return "";
 //      }
 //    }

// const handleSDKReady = (event) => {
// 	  uni.$chat_isSDKReady = true;
//   console.log('handleSDKReady', event)
// }
// const handleSDKNotReady = (event) => {
//   console.log('handleSDKNotReady', event)
// }
// const handleKickedOut = (event) => {
//   console.log('handleKickedOut', event)
// }

// TUIKit.on(TIM.EVENT.SDK_READY, handleSDKReady)
// TUIKit.on(TIM.EVENT.SDK_NOT_READY, handleSDKNotReady)
// TUIKit.on(TIM.EVENT.KICKED_OUT, handleKickedOut)