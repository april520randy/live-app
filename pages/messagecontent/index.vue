<template>
	<view style="background-color: #F4F4F5;">

		<var-app-bar :style="{opacity:show==true?1:0,zIndex:show==true?999:0 }"
			style="position:fixed;top:0;border-radius:0;background-color: #FFFFFF;" round :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="@/static/image/back2.png" mode="widthFix">
					</image>
					<view class="navtitle">资讯详情</view>
				</view>
			</template>
		</var-app-bar>

		<var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0" round :elevation='false'>
			<template #content>
				<view class='nav'>
					<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
						src="@/static/image/back2.png" mode="widthFix">
					</image>
					<view class="navtitle">资讯详情</view>
				</view>
			</template>
		</var-app-bar>


		<view class="middle">
			<p style="font-size: 36rpx;color: #333333;">{{ data.Information_Title }}</p>
			<p style="font-size: 24rpx;color: #B0B2BE;margin-top: 28rpx;" v-if="data.Operate_Time != undefined">
				{{ data.Operate_Time.substring(0, 19).replace('T', ' ') }}
			</p>
			<!-- <p style="margin-top:0px;margin-bottom:0px;padding:0px;box-sizing:border-box;color:#333333;font-family:PingFangSC-Regular, &quot;font-size:16px;white-space:normal;word-spacing:1px;background-color:#FFFFFF;">
				<img src="https://bfw-pic-new.obs.cn-south-1.myhuaweicloud.com/avatar/p0020230327102930089524.png" alt="" data-mce-id="__mcenew" style="border:0px;vertical-align:middle;max-width:100%;height:439.125px;" />
			</p> -->


			<!-- <rich-text :nodes="text"></rich-text> -->

			<!-- <u-parse :content="data.Information_Content"></u-parse> -->

			<mp-html :content="text" />
		</view>

		<view class="foot-header" v-if="zxList.length>0">
			<view style="padding: 24rpx 546rpx 24rpx 32rpx;">
				<image src="@/static/image/textimg.png" style="width: 32rpx;height: 32rpx;" />
				<image src="@/static/image/textmeaasge.png" style="width: 124rpx;height: 26rpx;margin-left: 16rpx;" />
			</view>
		</view>

		<view style="padding: 0 20rpx;background-color: #FFFFFF;">
			<view class="foot-content" v-for="(item,index) in zxList" :key="index" @click="tomessage(item)">
				<p style="font-size: 28rpx;color: #333333;flex:1;overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
">{{ item.Information_Title }}</p>
				<image :src="item.CoverImg" style="width: 140rpx;height: 100rpx;margin-left:66rpx;border-radius: 8rpx;" />
			</view>
		</view>

	</view>
</template>

<script>
//import mpHtml from '@/node_modules/mp-html/mp-html'
import parseHtml from '/utils/htmlParser.js'
	import {
		ajaxTemplate
	} from "../../api/index.js";
	export default {
		
		data() {
			return {
				show: false,
				Information_Id: '',
				data: {},
				zxList: [],
				text:''
			}
		},
		methods: {
			//详情
			InfomationDetail() {
				console.log(this.Information_Id)
				ajaxTemplate("/Information/Get_Infomation_Detail", {
					Information_Id: this.Information_Id
				}).then((res) => {
					//console.log(res)
					this.data = res.Result
					//console.log(this.data.Information_Content, 1)
					
					
					 this.text = this.data.Information_Content
					//console.log(this.text.replace(/&lt;|&gt;/g,'<'))
					this.text = this.text.replace(/&lt;/g,'<')
					this.text = this.text.replace(/&gt;/g,'>')
					 // this.text = this.text.replaceAll('&lt;','<')
					 // this.text = this.text.replaceAll('&gt;','>')
					 
					 
					
					console.log(this.text,'=================')
				})
			},
			//资讯
			initDate() {
				ajaxTemplate("/Information/Get_Recommend_Information").then((res) => {
					this.zxList = res.Result

					console.log(res.Result)

				})
			},
			tomessage(item) {
				// this.Information_Id=item.Information_Id
				// this.InfomationDetail()
				uni.navigateTo({
					url: '/pages/messagecontent/index?id=' + item.Information_Id
				})
			},
			back() {
				uni.switchTab({
					url: '/pages/advice/index'
				})
			},
			htmlDecode(text) {
				//1.首先动态创建一个容器标签元素，如DIV
				var temp = document.createElement('div')
				//2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
				temp.innerHTML = text
				//3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
				var output = temp.innerText || temp.textContent
				temp = null
				return output
			},
			//解析富文本方法
			formatRichText(html) {
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				return newContent;
			},
			richText(richTextData) {
				if (richTextData) {
					var richtext = richTextData;
					const regex = new RegExp('<img', 'gi');
					const regex2 = new RegExp('src="/api', 'gi');
					richtext = richtext.replace(regex2, `src="${this.$ServerBaseUrl}/api`);
					richtext = richtext.replace(regex, `<img style="max-width: 100%;"`);
					return richtext;
				} else {
					return '';
				}
			},
		},
		onLoad(option) {
			console.log(option)
			this.Information_Id = option.id
			this.InfomationDetail()
			this.initDate()
		},
		onPageScroll(e) {
			console.log(e)
			if (e.scrollTop > 0) {
				this.show = true
			} else {
				this.show = false
			}
		}
	}
</script>

<style scoped lang="less">
	.nav {
		height: 88rpx;
		display: flex;
		align-items: center;

		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #000;
			margin-left: 252rpx;
		}

	}

	.var-app-bar {
		background-color: #fff;
		color: #000
	}

	.middle {
		padding: 0 28rpx 20rpx 32rpx;
		background-color: #FFFFFF;
	}

	.foot-header {
		margin-top: 16rpx;
		height: 80rpx;
		background: url(/static/image/linkbackgroud.png) no-repeat top center/100%;
		display: flex;
		align-items: center;
	}

	.foot-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx solid #E7E9EE;
		padding: 30rpx 0;
	}
</style>
