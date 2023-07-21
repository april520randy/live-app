<template>
	<var-app-bar style="border: none; position: fixed; top:0;z-index:2" round color="#fff"
		:elevation='false'>
		<template #content>
			<view class='nav'>
				<image @click="back" style="width: 40rpx;height: 40rpx;margin:0 20rpx;position: absolute;left:0"
					src="/static/image/newback.png" mode="widthFix">
				</image>
				<view class="navtitle">群聊信息</view>
			</view>
		</template>
	</var-app-bar>

	<TUIGroupManage class="setting" :conversation="conversation" :userInfo="userInfo" />
</template>
<script lang="ts">
	import TUIGroupManage from "./manage-components/manage.vue";
	import { defineComponent, reactive, toRefs, computed } from 'vue';
	import { onUnload } from "@dcloudio/uni-app";
	import store from '../../TUICore/store';
	import { TUIGroupServer } from '../../TUICore/server'


	const TUIConversation = defineComponent({
		name: "TUIConversation",
		components: {
			TUIGroupManage,
		},

		setup(props) {
			const timStore = store.state.timStore;
			uni.$TUIKit.TUIGroupServer = new TUIGroupServer();
			const data : any = reactive({
				conversation: computed(() => timStore.conversation),
				userInfo: {
					isGroup: false,
					list: [],
				},
			});

			const back = () => {
				uni.navigateBack({
					delta: 1
				})
				

			};
			onUnload(() => {
				uni.$TUIKit.TUIGroupServer.destroyed();
			});
			return {
				...toRefs(data),
				back,
				data
			};
		},
	});
	export default TUIConversation;
</script>

<style lang="scss" scoped>
	.nav {
		height: 88rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			// margin-left:252rpx;
		}

	}

	.title-container {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 34px 0px 0px;
		font-size: 17px;
	}

	.icon-container {
		width: 66px;
		display: flex;
		justify-content: center;
		padding: 34px 0 0 0;

		.add-icon-image {
			width: 24px;
			height: 24px;
		}

		&.right-icon-container {
			position: relative;
			left: 20px;
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
</style>