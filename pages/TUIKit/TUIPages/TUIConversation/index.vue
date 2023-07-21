<template>

	<view>
		<var-app-bar style="border: none; position: fixed; top:0;z-index:2;background-color: #FFFFFF;" color="#fff" round 
			:elevation='false'>
			<template #content>
				<view class='nav'>
					<view class="navtitle">聊天列表</view>
					<view v-if="Anchoer_Attest_Status == 2"
						style="display: flex;align-items: center;position: absolute;right:20rpx" @click="addgroup()">
						<image src="/static/image/memberaadd2.png" style="width: 40rpx;height: 40rpx;" />
						<!-- <p style="font-size: 28rpx;color: #333333;">创建群聊</p> -->
					</view>
				</view>
			</template>
		</var-app-bar>
		
		<!-- <var-app-bar style="border-radius:0;background: #fff;" round  :elevation='false'>
			<template #content>
				<view class='nav1'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="/static/image/bq/newback.png" mode="widthFix">	
					</image>
					<view class="navtitle1">聊天列表</view>
				</view>
			</template>
		</var-app-bar> -->
		<view style="width: 100%;height: 1px;background: #E7E9EE;">
			
		</view>
<!-- 		<view style="width:100%;height:200rpx">

		</view> -->
		<Dialog :visible="showDialog" :styleConfig="styleConfig" :handleClose="handleClose">
			<view v-for="(item, index) in chatList" :key="index" class="chat-container"
				@click.stop="handleContentClick(item)">
				<image class="item-icon" v-if="item.imgType === 'SINGLE'" src="../../assets/icon/singlePerson.svg" />
				<image class="item-icon" v-else src="../../assets/icon/multiPerson.svg" />
				<view>{{ item.content }}</view>
			</view>
		</Dialog>

		<view class="TUI-conversation" style="margin-top:170rpx">
			<!-- <view class="create-group" @click="handleShow"> + 发起聊天</view> -->
			<TUIConversationList :currentID="currrentConversationID" :conversationList="conversationList"
				@handleGotoItem="handleCurrrentConversation" />
		</view>



		

		<m-tabbar fixed fill :current="current" :tabbar="tabbar" v-show="Chat_State==1"></m-tabbar>
	</view>
</template>
<script lang="ts">
	import TabbarConfig from '/utils/tabbar.js'
	import { defineComponent, reactive, toRefs, computed, onMounted } from "vue";
	import { onNavigationBarButtonTap, onShow, onUnload,onLoad } from "@dcloudio/uni-app";
	import TUIConversationList from "./conversation-list";
	import Dialog from "./components/dialog.vue";
	import store from "../../TUICore/store";
	import { TUIConversationServer, TUIProfileServer } from "../../TUICore/server";

	import { useStore } from 'vuex' // 引入useStore 方法
	import {
		genTestUserSig
	} from '/pages/TUIKit/debug/index.js'
	const TUIConversation = defineComponent({
		name: "TUIConversation",
		components: {
			TUIConversationList,
			Dialog,
		},

		setup(props) {
			const stores = useStore()  // 该方法用于返回store 实例

			const timStore = store.state.timStore;
			uni.$TUIKit.TUIConversationServer = new TUIConversationServer();
			uni.$TUIKit.TUIProfileServer = new TUIProfileServer();
			// const { t } = uni.$TUIKit.config.i18n.useI18n();
			const data : any = reactive({
				current: 3,
				Chat_State: 0,
				clean: false,
				tabbar: TabbarConfig,
				Anchoer_Attest_Status: '',
				conversationList: [],
				currrentConversationID: "",
				open: false,
				searchUserID: "",
				selectedList: [],
				searchUserList: [],
				step: 1,
				showDialog: false,
				item: {
					flow: "out",
					status: "success",
				},
				styleConfig: {
					width: "150px",
					// height: '160px',
					padding: "16px 16px 0px",
					top: "8px",
					right: "8px",
				},
				chatList: [
					{
						imgType: "SINGLE",
						type: uni.$TIM.TYPES.CONV_C2C,
						id: 1,
						content: "发起会话",
					},
					{
						imgType: "GROUP",
						type: uni.$TIM.TYPES.GRP_WORK,
						id: 1,
						content: "工作群",
					},
					{
						imgType: "GROUP",
						type: uni.$TIM.TYPES.GRP_PUBLIC,
						id: 2,
						content: "社交群",
					},
					{
						imgType: "GROUP",
						type: uni.$TIM.TYPES.GRP_MEETING,
						id: 3,
						content: "会议群",
					},
				],
				config: {
					userID: "", //User ID
					SDKAppID: 1400813717, // Your SDKAppID
					secretKey: "c74d2910cc6c7180b015d75d44e73ba0af399d5f3e3d159c6d09bd5903ff01a0"
				}
			});

			onUnload(() => {
				uni.$TUIKit.TUIConversationServer.destroyed();
				
				
			});

			onNavigationBarButtonTap(() => {
				data.showDialog = !data.showDialog;
			});
			console.log(store, 'store.state.userInfo.User_Idstore.state.userInfo.User_Id');
			
			onLoad(()=>{
				uni.$TUIKit.on(uni.$TIM.EVENT.SDK_NOT_READY, handleSDKNotReady);
			})
			onShow(() => {
				
				
				
				
				
				
				if (stores.state.userInfo.User_Id == undefined) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
					return
				}
				


				setTimeout(() => {
					uni.hideTabBar()
					console.log(data.conversationList,'data.conversationList')
					
					let arr=[]
					timStore.conversationList.forEach((item)=>{
						if(item.type=="@TIM#SYSTEM"||item.subType=="AVChatRoom"){
							
						}else{
							arr.push(item)
						}
						
					})
					console.log(arr,'data.conversationList')
					data.conversationList=arr
					
					store.commit("timStore/setConversationList", arr)
					
					data.Anchoer_Attest_Status = stores.state.userInfo.Anchoer_Attest_Status
					console.log('222', data.Anchoer_Attest_Status);
					
					data.Chat_State = uni.getStorageSync("Chat_State")
					console.log(uni.getStorageSync("New_State"))
					if (data.Chat_State == 1) {
						if (uni.getStorageSync("New_State") == 1) {
							data.current = 3
						} else {
							data.current = 2
						}
					}
				}, 1000);
				

			});
			const handleSDKNotReady=(event)=>{
				console.log(event)
				
				// uni.$on("testEvent",event=>{
				// 				console.log(event)})
				// uni.showToast({
				// 	title: "SDK ",
				// });
				
				data.clean=true
			}
			const newIM = () => {
				
				
				const userSig = genTestUserSig(data.config).userSig;
				// login(s.Result.User_Id,()=>{})
				uni.$TUIKit.login({
					userID: String(stores.state.userInfo.User_Id),
					userSig
				}).then((res) => {
					// sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
					console.log(res)
					// uni.showLoading({
					// 	title: "初始化...",
					// });
				
					data.clean = false
				});
				// uni.$TUIKit.logout({
				// 	userID: String(stores.state.userInfo.User_Id),
				// 	userSig
				// }).then((res) => {
				// 	// sdk 初始化，当 sdk 处于ready 状态，才可以使用API，文档
				// 	console.log(res)
				// 	// uni.showLoading({
				// 	// 	title: "初始化...",
				// 	// });

					
				// });
			}
			const submit = () => {
				stores.commit('CHANGE_USER_ID', '')
				// uni.removeStorage({ key: 'user_Id' });
				stores.commit('CHANGE_USER_INFO', {})
				uni.removeStorageSync('user_Id')
				uni.setStorageSync("currentIndex", 0)
				data.clean=false
				uni.switchTab({
					url: '/pages/myView/index',
					animationType: 'pop-in',
					animationDuration: 200,
				});
			}
			// 切换当前会话
			const handleCurrrentConversation = (value : any) => {
				data.currrentConversationID = value.conversationID;
				store.commit("timStore/setConversationID", value.conversationID);
				//uni.$TUIKit.TUIChatServer.updateStore(value.conversationID)
				uni.navigateTo({
					url: `../TUIChat/index?conversationName=${handleItemName(value)}`,
				});
				uni.$TUIKit.TUIConversationServer.setMessageRead(value.conversationID);
				const curConversation = data.conversationList.filter((item : any) => {
					return item.conversationID == value.conversationID;
				});
				store.commit("timStore/setConversation", curConversation);
				uni.$TUIKit.TUIConversationServer.getConversationProfile(
					value.conversationID
				).then((res : any) => {
					// 通知 TUIChat 关闭当前会话
					store.commit("timStore/setConversation", res.data.conversation);
					// uni.$TUIKit.getStore()['TUIChat'].conversation = res.data.conversation;
				});
			};

			const handleShow = () => {
				data.showDialog = true;
			};

			// dialog 内部有效区域点击
			const handleContentClick = (item) => {
				data.showDialog = false;
				uni.navigateTo({
					url: `../TUIConversation/create?title=${item.content}&type=${item.type}`,
				});
			};
			// 关闭 dialog
			const handleClose = () => {
				data.showDialog = false;
			};
			const handleItemName = (item : any) => {
				let name = "";
				switch (item.type) {
					case uni.$TIM.TYPES.CONV_C2C:
						name = item?.userProfile.nick || item?.userProfile?.userID || "";
						break;
					case uni.$TIM.TYPES.CONV_GROUP:
						name = item.groupProfile.name || item?.groupProfile?.groupID || "";
						break;
					case uni.$TIM.TYPES.CONV_SYSTEM:
						name = "系统通知";
						break;
				}
				return name;
			};
			const addgroup = () => {
				uni.navigateTo({
					url: '/pages/chatView/addgroup/addgroup'
				})
			};

			return {
				...toRefs(data),
				handleCurrrentConversation,
				handleContentClick,
				handleItemName,
				handleClose,
				handleShow,
				addgroup,
				newIM,
				submit
			};
		},
	});
	export default TUIConversation;
</script>

<style lang="less" scoped>
	.nav {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
		}

	}

	.TUI-conversation {
		.create-group {
			font-weight: 800px;
			padding: 10px;
			font-size: 14px;
			text-align: center;
		}
	}

	.chat-container {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		color: #444444;

		.item-icon {
			display: inline-block;
			width: 21px;
			height: 21px;
			margin-right: 12px;
		}
	}

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
			height: 472rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin: auto;
			text-align: center;
		}

		.foot {
			margin: auto;
			display: flex;
			justify-content: space-around;

			font-size: 28rpx;

			.left {
				width: 232rpx;
				height: 88rpx;
				text-align: center;
				line-height: 88rpx;
				border-radius: 44rpx;
				opacity: 1;
				border: 2rpx solid #E41322;
				color: #E41422;
				// margin: 0 20rpx 0 38rpx;
			}

			.right {
				width: 232rpx;
				height: 88rpx;
				text-align: center;
				line-height: 88rpx;
				color: #fff;
				background: linear-gradient(90deg, #EE2144 0%, #E3121E 100%);
				border-radius: 44rpx;
				opacity: 1;
			}
		}
	}
	
	.nav1 {
		height: 88rpx;
		display: flex;
		align-items: center;
	
		.navtitle1 {
			font-size: 32rpx;
			font-weight: 500;
			color: #333;
			margin-left: 252rpx;
		}
	
	}
</style>