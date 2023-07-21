<template>
	<view class="box" style="background-color: #F4F4F5;">
	<!-- 		<var-app-bar :style="{opacity:show==true?1:0,zIndex:show==true?999:0 }"
				style="position:fixed;top:0;border-radius:0" round image="/static/image/beij.png" :elevation='false'>
				<template #content>
					<view class='nav'>
						<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="../../static/image/back.png" mode="widthFix">
						</image>
						<view class="navtitle">隐私政策</view>
					</view>
				</template>
			</var-app-bar>
			<var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0" round image="/static/image/beij.png"
				:elevation='false'>
				<template #content>
					<view class='nav'>
						<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="../../static/image/back.png" mode="widthFix">
						</image>
						<view class="navtitle">隐私政策</view>
					</view>
				</template>
			</var-app-bar> -->
			<var-app-bar :style="{opacity:show==false?1:0}" style="border-radius:0;background: #fff;" round
				:elevation='false'>
				<template #content>
					<view class='nav1'>
						<image @click="back" style="width: 40rpx;height: 40rpx;margin-left:20rpx"
							src="../../static/image/newback.png" mode="widthFix">	
						</image>
						<view class="navtitle">隐私协议</view>
					</view>
				</template>
			</var-app-bar>
			<view style="padding-left: 10px; padding-right: 10px;" class="content">
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">欢呼吧隐私政策</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">发布日期：2023年3月1日</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">本版更新日期：2023年3月1日</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">本版生效日期：2023年3月1日</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">版本更新提示：</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们于近日更新了《欢呼吧隐私政策》。本次更新的内容主要包括：<strong>更加详细地介绍了您所享有的个人信息权利，细化消息通知等功能收集使用说明信息的情况，调整和优化部分章节结构与条款的表述，使本政策更便于您的理解。请您在使用/继续使用欢呼吧的产品与/或服务前仔细阅读和充分理解全文，并在同意全部内容后使用/继续使用。</strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">提示条款：</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">欢呼吧公司（下称“我们”或“欢呼吧”）非常重视用户的隐私和个人信息保护，也感谢您对我们的信任。本隐私政策阐述了我们将如何处理您的个人信息，并申明了公司对保护用户隐私的承诺。因此我们希望您能够仔细阅读、充分理解本政策的内容，并在需要时，按照本政策的说明，作出您认为适当的选择。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">本隐私政策适用于大连桐凯鸿科技有限公司开发和运营的欢呼吧互联网直播平台及其他互联网产品，包括但不限于欢呼吧PC客户端及欢呼吧相关APP软件（下称“欢呼吧软件”或“本软件”），但如相关产品或服务单独设置了隐私政策或个人信息保护规则的，单独的隐私政策或规则优先适用，单独的隐私政策或规则未提及的内容，使用本政策。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style=" font-family: 微软雅黑, sans-serif; color: black;">如果为了向您提供服务而需要将您的信息共享至第三方，我们将要求第三方对您的信息采取保护措施并且严格遵守相关法律法规与监管要求。需要特别说明的是，本政策不适用其他独立第三方向您提供服务。例如我们平台上的第三方依托本平台向您提供服务时，这些服务由第三方负责运营，适用第三方另行向您说明的个人信息处理规则。</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">在使用我们的产品或服务前，<strong>请您务必仔细阅读并充分理解本隐私政策，特别是以粗体/粗体下划线标识的条款，您应重点阅读，并在确认充分理解并同意后使用相关产品或服务。您使用或继续使用我们的提供的各项产品或服务，表示您已充分理解并同意我们本隐私政策（包括更新版本）的全部内容。</strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如您在阅读本隐私政策过程中有任何疑惑的，我们为您提供了多种反馈渠道，具体请见本政策“如何联系我们”章节，我们会尽快为您作出解答。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">《欢呼吧隐私政策》目录</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">一、我们如何收集和使用您的个人信息</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-family: 微软雅黑, sans-serif; color: black;">二、我们如何使用Cookie及同类技术</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">三、我们如何共享、转让、公开披露您的个人信息</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">四、您如何管理个人信息</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">五、我们如何存储您的个人信息</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">六、我们如何保护您的个人信息</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">七、未成年人保护</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">八、本政策的更新</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">九、争议解决</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">十、如何联系我们</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">十一、附录&nbsp;名词解释</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">一、我们如何收集和使用您的个人信息</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">在您使用我们的服务过程中，我们会按照如下方式收集您在使用我们服务时主动提供的或因为使用服务而产生的信息，用以向您提供、优化我们的服务以及保证您的账户安全。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">请注意，如果您仅需用欢呼吧直播的基本功能服务（即进行实时视频、音频、图文等形式的信息浏览），您无需授权并向我们提供任何个人信息。但我们会出于保障产品和服务安全的目的收集您使用我们的产品或服务过程中所产生的网络日志和行为日志信息。单独的设备信息、日志信息是无法识别特定自然人身份的信息，在您未提供其他能够识别您个人身份的个人信息的情况下，此类信息无法与特定自然人进行关联。如果我们将这类非个人信息与您提供的其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将这类信息做匿名化去标识化处理。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">您需授权我们收集和使用您的个人信息的其他功能/场景包括：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">（一）注册、登录</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（1）当您注册、登录欢呼吧直播账号时，我们会收集您的手机号码、密码，并为平台注册用户生成欢呼吧号，收集这些信息是为了帮助您完成欢呼吧账号注册，保护您账号的安全。手机号码属于敏感信息，收集该信息是为了以此作为更为高效、可靠的登录凭证。通过注册验证且您阅读并同意本政策及用户协议后，将完成账号注册及登录。如果您仅需使用浏览、搜索服务，您不需要注册账号及提供上述信息。</span>
				</p> 
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（2）在您登录欢呼吧直播账号后，您可以自愿选择是否完善头像、昵称、年龄、性别、生日、地区、签名等个人资料。如果您不提供前述信息，不会影响您享受欢呼吧直播的基本功能。如果您仅需要使用浏览功能，您也可以选择在不登录且不提供上述信息的情况下进行。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">（二）实名认证</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">在您使用身份认证的功能或相关服务所需时，根据国家相关法律法规，您可能需要提供您的真实身份信息以完成实名认证，如果您不提供相关信息，可能无法使用具体功能或服务。主要包括以下几类：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（1）注册欢呼吧账号时，需要提供您的手机号码完成实名认证，完成认证后您方可发送弹幕或上传内容。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（2）当您申请注册为网络直播服务发布者（主播）时，欢呼吧直播将根据相关法律规定收集您的真实姓名、身份证件信息进行实名身份认证，并通过您的面部识别信息进行身份一致性核验。如您选择人工认证方式完成实名认证，我们可能收集您的真实姓名、身份证件信息（包括但不限于身份证、相应证件的正反面图片和您手持相应身份证件的照片）。通过实名认证后，您方可在平台上从事直播发布活动。如果您有主播佣金提现需求，您还需要提供与您身份信息一致的银行卡信息。为了准确验证您的身份，我们将对上述信息进行比对核验。您的真实姓名、身份证件信息、面部识别信息、手持身份证件信息和银行卡号属于个人敏感信息，我们收集该类信息是基于实名认证要求，您可以拒绝提供，如果拒绝提供您将可能无法获得相关服务（直播开播、提现等功能），但不影响您正常使用产品的浏览和观看功能。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（3）当您参与某些提现活动时，根据相关监管政策要求，我们需要对提现用户进行实名认证，可能需要获取您的身份证号、姓名等信息，具体以活动页面公示内容为准。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">（三）安全保障</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">为保障网络安全、预防网络犯罪、识别您的账号异常以及反欺诈目的，我们会收集您以下信息：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（1）网络访问日志信息和用户日志信息。这些日志信息包括：账号、登录日志、操作时间、操作记录、网络源地址和目标地址、网络源端口、客户端硬件特征、通讯群组名称、昵称、简介、备注、标识、用户信息发布、转发、评论记录、服务故障信息；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（2）您的设备信息。包括：ICCID（Android端）、IMEI、Android ID、设备序列号、设备型号、操作系统、唯一设备标识符、浏览器类型、使用的语言、访问日期、登陆IP地址、软件版本号、接入网络的方式、类型和状态、网络质量数据、WIFI扫描列表、WIFI名称（SSID）、WIFI
						MAC地址（BSSID）。</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">上述信息将被用于综合识别、检测违规行为和内容、实名核验，并采取必要的记录、审计、分析和处置措施。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">（四）调研与推广营销</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">当您选择参加我们及我们的关联方或第三方举办的有关调查问卷、抽奖中奖、线上或线下推广营销等运营活动时，可能需要您在相关表单中填写姓名、通信地址、联系方式等个人信息。如拒绝提供相关信息，可能会影响您参加相关活动，但不会影响您使用其他功能。只有经过您的同意，我们及第三方才会收集和处理相关信息，以保障为您提供相应的产品服务。此外，基于平台运营管理需求，我们可能会使用部分平台主播联系方式与其沟通业务运营事宜。</span>
				</p>
	  
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">（五）客服和申诉报销</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">当您向我们的客服或通过产品交互页面发起有关账号安全和未成年人消费相关的申诉或进行咨询时，为了方便与您联系、帮助您解决问题，确保您的账号安全，我们可能需要您提供部分信息或资料，您可以自行决定是否向我们提供，这些资料可能包括您的账号实名信息和账号使用信息，收集这些信息是为了确保您的账号不在被盗或未被授权的情况下发起申诉或咨询，保障您的账号和财产安全。</span>
				</p>
	 
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">（六）授权同意的例外</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用、共享、转让、公开披露您的相关个人信息无需征求您的授权同意：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1、与国家安全、国防安全等国家利益直接相关的；</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">2、与公共安全、公共卫生、公众知情等重大公共利益直接相关的；</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">3、与犯罪侦查、起诉、审判和判决执行等直接相关的；</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">4、出于维护您或其他个人的生命、财产、声誉等重大合法权益但又很难得到本人同意的；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">5、所收集的个人信息是您自行向社会公众公开的；</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">7、根据您要求签订和履行合同、提供服务、实现售后和交易服务所必需的；</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">8、用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">9、有权机关的要求、法律法规规定的其他情形。</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">请理解，由于欢呼吧服务的更新迭代，如果某一功能或服务未及时在本隐私政策中声明收集了你的信息，我们仍然会通过页面提示、交互流程、网站公告等方式另行向您说明信息收集的内容、范围和目的，以征得您的授权同意。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">请知悉，根据适用的法律，若我们对个人信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原，则此类处理后数据的共享、转让、公开披露无需另行向您通知并征得您的同意。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">二、我们如何使用Cookie和同类技术</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">Cookie
						和设备信息标识等同类技术是互联网中普遍使用的技术。当您使用欢呼吧及相关服务时，我们可能会使用相关技术向您的设备发送一个或多个Cookie
						或匿名标识符，以收集、标识您访问、使用本产品时的信息。我们承诺，不会将Cookie 用于本隐私政策所述目的之外的任何其他用途。我们使用Cookie 和同类技术主要为了实现以下功能或服务：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">1.
							</span></strong><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">保障产品与服务的安全、高效运转</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们可能会设置认证与保障安全性的Cookie
						或匿名标识符，使我们确认您是否安全登录服务，或者是否遇到盗用、欺诈及其他不法行为。这些技术还会帮助我们改进服务效率，提升登录和响应速度。</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">2.
							</span></strong><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">帮助您获得更轻松的访问体验</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">使用此类技术可以帮助您省去重复您填写个人信息、输入搜索内容的步骤和流程（例如：记录搜索、表单填写）。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">3.
								Cookie</span></strong><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">的清除</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">大多数浏览器均为用户提供了清除浏览器缓存数据的功能，您可以在浏览器设置功能中进行相应的数据清除操作。如您进行清除，您无能无法使用由我们提供的、依赖于Cookie的服务或相应功能。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">三、我们如何共享、转让、公开披露您的个人信息</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（一）共享</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们将对您的信息承担保密义务，除以下情形外，我们不会对外共享或提供您的个人信息：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1、事先已获得您的明确授权或同意；</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">2、根据适用的法律法规、法律程序、行政司法机关的要求或司法争议解决而需共享您的个人信息；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">3、在法律要求或允许的范围内，为了保护欢呼吧直播及其用户或社会公众的利益、财产或安全免遭损害而有必要提供您的个人信息给第三方。</span>
				</p> 
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">4、与授权合作伙伴共享：为了向您提供更完善、优质的产品和服务，我们可能委托授权合作伙伴或使用第三方SDK相关技术为您提供服务或代表我们履行职能。我们仅会出于本隐私政策声明的合法、正当、必要、特定、明确的目的共享您的信息，合作伙伴只能接触到其履行职责所需的信息，且不得将信息用于其他任何目的。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">目前，我们的授权合作伙伴包括以下类型：</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（1）基础服务提供商：包括提供实名认证、支付、一键登录、消息推送、地理位置定位、反欺诈的合作方。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（2）提供数据服务（包括网络广告监测、数据统计、数据分析）的合作伙伴：为维护/改进我们的产品/服务、为您提供更好的内容，我们可能会与提供该服务的指定合作伙伴共享您的相关信息（包括：设备信息、广告展示和点击记录、终端型号、地理位置），除非得到您的同意，我们不会与其共享您的个人身份信息。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（3）提供电商服务的合作伙伴：欢呼吧与接入第三方电商平台合作，需要与第三方电商共享用户在欢呼吧的昵称、头像等账号信息，以及具体订单信息（例如收件人、电话、收件地址、物流信息），从而帮助用户实现购买及物流派送功能。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（4）内容安全监测服务提供商：我们可能与特定内容安全监测服务提供商合作进行违规音视频标注和分析，可能会与这些服务提供商共享直播流信息。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（5）提供开播或直播推流服务的合作伙伴：当我们与提供开播或直播推流服的第三方平台进行合作时，我们可能共享用户昵称、弹幕、评论、排行榜、打赏信息等直播间已公开的用户数据。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（6）提供内容推广服务的合作伙伴：当我们与游戏提供方进行合作时，我们可能共享用户昵称、头像等账号信息和设备信息，以便帮助用户实现游戏账号绑定、游戏道具领取等功能（仅当用户主动选择参与活动时），您也可以查阅具体游戏合作方隐私政策进行了解其收集处理个人信息的情况。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">对共享信息的合作方，我们会与其订立专门的数据保护协议或数据安全条款，约定严格的数据保护措施，在确保安全的前提下共享信息，令其按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">目前，我们使用到的SDK包括：</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><br>
				</p>
				<table width="0" border="1" cellspacing="0">
					<!--<colgroup><col width="100"><col width="100"><col width="100"><col width="100"><col width="100"><col width="100"></colgroup>-->
					<tbody>
						<tr style="height: 21px;" class="firstRow">
							<td
								style="border-color: rgb(204, 204, 204);overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; font-weight: bold;">
								<span style="font-size: 16px;">序号</span></td>
							<td
								style="border-color: rgb(204, 204, 204);overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; font-weight: bold;">
								SDK名称</td>
							<td
								style="border-color: rgb(204, 204, 204);overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; font-weight: bold;">
								访问用户权限</td>
							<td
								style="border-color: rgb(204, 204, 204);overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; font-weight: bold;">
								SDK功能</td>
							<td
								style="border-color: rgb(204, 204, 204);overflow: hidden; padding: 4px 6px; vertical-align: middle; font-weight: bold;">
								<p>SDK隐私协议网址</p>
							</td>
						</tr>
						<tr style="height: 21px;">
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								1</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; white-space: normal; overflow-wrap: break-word;">
								chat-uikit-uniapp</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								不需要用户权限</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								即时通讯</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: visible; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; text-decoration-line: underline;">
								<p><a class="in-cell-link" href="https://cloud.tencent.com/document/product/269/58094?from=copy"
										target="_blank">https://cloud.tencent.com/document/product/269/58094?from=copy</a></p>
							</td>
						</tr>
						<tr style="height: 21px;">
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								2</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; white-space: normal; overflow-wrap: break-word;">
								移动智能终端补充设备标识体系统一调用SDK</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								不需要用户权限</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								设备信息</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: visible; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; text-decoration-line: underline;">
								<p><a class="in-cell-link" href="http://www.msa-alliance.cn/col.jsp?id=122"
										target="_blank">http://www.msa-alliance.cn/col.jsp?id=122</a></p>
							</td>
						</tr>
						<tr style="height: 21px;">
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								3</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; white-space: normal; overflow-wrap: break-word;">
								comandroid.okhttp</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								不需要用户权限</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								网络连接</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: visible; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; text-decoration-line: underline;">
								<p><a class="in-cell-link" href="https://github.com/square/okhttp"
										target="_blank">https://github.com/square/okhttp</a></p>
							</td>
						</tr>
						<tr style="height: 21px;">
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								4</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; white-space: normal; overflow-wrap: break-word;">
								移动安全联盟 OAID</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								不需要用户权限</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								获取oaid</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: visible; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; text-decoration-line: underline;">
								<p><a class="in-cell-link" href="http://www.msa-alliance.cn/col.jsp?id=122"
										target="_blank">http://www.msa-alliance.cn/col.jsp?id=122</a></p>
							</td>
						</tr>
						<tr style="height: 21px;">
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								5</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; white-space: normal; overflow-wrap: break-word;">
								com.github.gzuliyujiang</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								不需要用户权限</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: hidden; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;;">
								获取Android_ID</td>
							<td
								style="border-color: rgb(204, 204, 204); overflow: visible; padding: 4px 6px; vertical-align: middle; font-family: &quot;Microsoft YaHei&quot;; text-decoration-line: underline;">
								<p><a class="in-cell-link" href="https://ext.dcloud.net.cn/plugin?id=9044"
										target="_blank">https://ext.dcloud.net.cn/plugin?id=9044</a></p>
							</td>
						</tr>
					</tbody>
				</table>
				<p style="margin-top:5px;margin-bottom:5px;"><br>
					<span style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;"></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（二）转让</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1、&nbsp;您自行提出要求的；</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">2、&nbsp;事先已征得您的明确授权同意：</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">3、&nbsp;在欢呼吧公司发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（三）公开披露</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们仅会在以下情况下，公开披露您的个人信息：&nbsp;</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1、除了因需要对违规账号、欺诈行为等违反欢呼吧协议及平台规则进行处罚公告、公布中奖/获胜者等名单时脱敏展示相关信息等必要事宜而进行的必要披露外，我们不会对您的个人信息进行公开披露。您同意我们在上述必要场景披露您的相关信息，同时我们将审慎评估公开披露的合法性、正当性、合理性，采取严格的个人信息安全保护措施对其进行保护。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">2、如具备合理事由确需公开披露的，我们会在公开披露前向您告知公开披露的信息的目的、类型（如涉及您的个人敏感信息的，我们还会向您告知涉及的敏感信息的内容），并在征得您的授权同意后再公开披露，但法律法规另有规定的或本政策另有约定的除外。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">四、您如何管理个人信息</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">欢呼吧非常重视用户的个人信息权益，并尽全力保障您对自己个人信息享有的各项权利，以便您拥有充分的能力保障您的信息安全。您的权利包括：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（一）查询、更正和删除个人信息</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">你可以通过以下方式查询、更正或删除自己的信息：</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1.&nbsp;登录欢呼吧官网，进入“个人中心”→“我的信息”，访问、修改或删除用户昵称、头像、年龄、性别、所在地、个性签名、绑定手机号等个人信息；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">2.&nbsp;登录欢呼吧官网，进入“个人中心”→“订阅与历史”，访问、删除订阅或观看记录；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">3.&nbsp;登录欢呼吧官网，进入“个人中心”，访问我的财产、我的头衔、陪练订单等信息。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如您在行使上述权利的过程中遇到困难，或其他目前可能无法向您提供自行查询/更正/删除服务的，您可以按照本隐私政策所提供的方式联系我们。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">当您发现我们违反法律、行政法规的规定或者双方的约定存储处理您的个人信息，您可以要求我们删除。如您发现我们收集、存储的您的个人信息有错误的，您也可以要求我们更正或补充。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><br>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（二）个人信息副本获取与转移</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如您需要获取您的个人信息副本，您可以发送信息到欢呼吧官方客服，与我们联系并说明您的要求，我们将在收到您联系后的15个工作日内完成核验用户身份和处理。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如您需要转移我们处理的个人信息，我们将根据相关法律法规的要求，协助您进行转移。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（三）注销账号</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">您可以通过以下方式注销自己的账号：</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1、登录欢呼吧直播App，进入“我的”→“设置”→“账号与安全”→“注销账号”；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">2、通过在线客服的指引了解账号的条件并完成账号注销。</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">3、按照本政策文末所列明的公开联系方式，联系我们协助您注销账号。</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">在您主动注销账户之后，我们将在十五个工作日内进行处理。账号注销后，我们将停止为您提供与该欢呼吧账号相关联的所有产品服务，根据适用法律的要求删除您的个人信息或进行匿名化处理，但法律法规另有规定的除外。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">请注意，账号注销后您已发布的所有内容（包括提供的音视频、图文等信息）将转为匿名发布，如需删除内容，请在申请注销前自行处理。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（四）访问和要求解释隐私政策</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们将在您首次注册欢呼吧直播时，向您提示本隐私政策并由您自主作出选择同意的决定。另外，您可以通过欢呼吧直播网页末端或在【欢呼吧平台规则】-【隐私政策】页面，随时查看本隐私政策的全部内容。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如您对我们的个人信息处理规则有任何疑问，您可以通过本隐私政策披露的联系方式要求我们解释说明。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（五）有权提前获得停止运营的告知</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如果欢呼吧直播平台终止服务或运营，我们将及时停止收集您个人信息的活动，并至少提前三十日将停止运营的通知以公告或逐一送达等形式通知您，并在终止服务或运营后对所持有的您的个人信息进行删除或匿名化处理，法律法规另有规定的除外。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（六）其他权利</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如欢呼吧用户（仅限自然人）不幸逝世，其近亲属为了自身的合法、正当利益，可以对去世用户的相关个人信息行使查阅、复制、更正、删除等权利，但去世用户生前另有安排的除外。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">关于上述权利，您可以通过（邮箱待确定）与我们联系并说明您的要求，我们将在收到您联系后的15个工作日内进行身份核验和处理。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">五、我们如何存储您的个人信息</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，不会对您的个人信息跨境传输。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们仅在为提供服务目的所必须的期间内保留您的个人信息，在您未撤回、删除或未注销账号前，我们会保留相关信息。超出必要期限后，我们将对个人信息进行删除或匿名化处理，但在下列情形下，我们需要遵守相关法律法规要求留存您的个人信息。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1、《中华人民共和国网络安全法第二十一条第三款要求监测、记录网络运行状态、网络安全事件的技术措施的网络日志留存不得少于六个月；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">2、《互联网直播服务管理规定》要求记录互联网直播服务使用者发布内容和日志信息，保存六十日；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">3、《电子商务法》规定商品和服务信息、交易信息保存时间自交易完成之日起不少于三年。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">4、为遵守法院判决、裁定或其他法律程序的规定；</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">5、为执行平台协议或本政策、维护社会公共利益，保护公司及公司关联公司、其他用户或雇员的人身安全或其他合法权益所合理必须的用途。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">六、我们如何保护您的个人信息</span></strong><span
							style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">&nbsp;</span></span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">为保障您的信息安全，我们努力采取各种合理的物理、电子和管理方面的安全措施来保护您的信息，使您的信息不会被泄漏、毁损或者丢失，包括但不限于SSL、信息加密存储、数据中心的访问控制。我们对可能接触到您的信息的员工或外包人员也采取了严格管理，包括但不限于根据岗位的不同采取不同的权限控制，与他们签署保密协议，监控他们的操作情况等措施。我们会按现有技术提供相应的安全措施来保护您的信息，提供合理的安全保障，我们将尽力做到使您的信息不被泄漏、毁损或丢失。目前，欢呼吧已经通过了国家信息安全等级保护（三级）的备案和测评，具备相应的数据安全和信息保护能力。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">您的账户均有安全保护功能，请妥善保管您的账户及密码信息。我们将通过向其它服务器备份、对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您理解在信息网络上不存在“完善的安全措施”。如您发现自己的个人信息泄密，尤其是您的账户及密码发生泄露，请您立即按照本政策文末所列明的公开联系方式联络我们客服，以便我们采取相应措施。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">七、未成年人保护</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如您为未成年人，我们要求您请您的父母或监护人在仔细阅读本隐私政策，并在征得您的父母或监护人的同意之后，在他们的指导下使用我们的服务。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。如果您认为我们可能不当地持有关于未成年人的信息，请联系我们。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">如果您是未满14周岁的儿童的监护人，当您在完成或帮助儿童完成产品或服务的注册、使用前，应当仔细阅读本政策，具体产品的隐私政策（如有）和《欢呼吧儿童个人信息保护指引》&nbsp;以决定是否同意本政策、具体产品隐私政策，以便儿童能使用我们提供的产品或服务。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">为保护儿童及未成年人的个人信息，我们设立了专门的儿童个人信息保护专职机构，如您对您所监护的儿童的个人信息保护有相关疑问或权利请求时，请通过《欢呼吧儿童个人信息保护指引》&nbsp;中披露的联系方式与我们联系。我们会在合理的时间内处理并回复您。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">八、本政策的更新</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1、为给您提供更好的服务以及随着欢呼吧业务的发展，本隐私政策也会随之更新，该等更新构成本隐私政策一部分。但未经您明确同意，我们不会削减您依据本隐私政策所应享有的权利。我们将在更新后的本隐私政策生效前，通过显著位置提示或向您发送推送消息或以其他方式通知您，也请您访问欢呼吧直播以便及时了解最新的隐私政策。如该等更新造成您在本隐私政策下权利的实质减少或重大变更，我们会再次征求您的明示同意。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">您需理解，只有在您确认并同意变更后的隐私政策，我们才会依据变更后的隐私政策收集、使用、处理和存储您的个人信息；您有权拒绝同意变更后的隐私政策，但请您知悉，一旦您拒绝同意变更后的隐私政策，可能导致您不能或不能继续完整使用欢呼吧直播的相关服务和功能，或者无法达到我们拟达到的服务效果。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black;">2、本隐私政策所指的重大变更包括但不限于：</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（1）我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（2）我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（3）个人信息共享、转让或公开披露的主要对象发生变化；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（4）您参与个人信息处理方面的权利及其行使方式发生重大变化；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（5）我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">（6）个人信息安全影响评估报告表明存在高风险时。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">九、争议解决</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">本隐私政策适用中华人民共和国大陆地区法律。任何因本隐私政策以及我们处理您个人信息事宜引发的争议，首先可友好协商解决；协商不成的，您同意通过向本协议签署地有管辖权的法院提起诉讼来寻求解决方案。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">本隐私政策的标题仅为方便及阅读而设，并不影响正文其中任何规定的含义或解释。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">十、如何联系我们</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">若您对我们的隐私政策有任何疑问、意见或建议，可随时联系我们。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">联系人：欢呼吧法务合规部</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">联系邮箱：dltkh03@163.com</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">我们将尽快审核所涉问题，并在验证您的用户身份后十五日内回复。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">&nbsp;</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">十一、附录&nbsp;名词解释</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">1.个人信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反特定自然人活动情况的各种信息。（出自于GB/T
						35273-2020《信息安全技术&nbsp;个人信息安全规范》）</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">2.个人敏感信息：指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。（出自于GB/T
						35273-2020《信息安全技术&nbsp;个人信息安全规范》）</span></p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style="font-family: 微软雅黑, sans-serif; color: black; font-size: 16px;">相比其他个人信息，个人敏感信息可能对您的个人权益影响更大。我们在此善意的提醒您需在谨慎考虑后再向我们提供您的个人敏感信息。在本政策中，我们将对您的个人敏感信息以加粗形式进行显著标识（例：身份证号）。</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">3.儿童：指不满十四周岁的未成年人。（出自于《儿童个人信息网络保护规定》）</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span
						style=" font-family: 微软雅黑, sans-serif; color: black;">4.未成年人：不满十八周岁的自然人为未成年人。十六周岁以上的未成年人，以自己的劳动收入为主要生活来源的，视为完全民事行为能力人。（出自于《中华人民共和国民法典》）</span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;"></span></strong><strong><span
								style=" font-family: 微软雅黑, sans-serif; color: black;">5.账户：允许应用访问收已知的账户列表，用户首次打开欢呼吧App时弹窗询问，可选择关闭。</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;"></span></strong><strong><span
								style=" font-family: 微软雅黑, sans-serif; color: black;">6.修改或删除您得SD卡中的内容：允许应用修改或删除SD卡内中的内容，用户首次打开&nbsp;欢呼吧App时弹窗询问，可选择关闭。</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;"></span></strong><strong><span
								style=" font-family: 微软雅黑, sans-serif; color: black;">7.读取存储：允许应用读取及写入SD卡内中的内容，用户首次打开欢呼吧App时弹窗询问，可选择关闭</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;"></span></strong><strong><span
								style=" font-family: 微软雅黑, sans-serif; color: black;">8.拍摄照片和视频：允许获取摄像头拍摄照片和视频或获取相册图片，用户首次打开欢呼吧App时弹窗询问，可选择关闭。</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style=" font-family: 微软雅黑, sans-serif; color: black;">允许应用会在“后台状态”下获取（MAC）信息</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><span style="font-size: 16px;"><strong><span
								style="font-size: 23px; font-family: 微软雅黑, sans-serif; color: black;">&nbsp;</span></strong></span>
				</p>
				<p style="margin-top:5px;margin-bottom:5px;"><br>
				</p>
				<p><br>
				</p>
				<!-- <view class="redword">
					<p>具体内容参考网站</p>
					<p>名称改成欢呼吧</p>
				</view> -->
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onPageScroll(e) {
			console.log(e)
			if (e.scrollTop > 0) {
				this.show = true
			} else {
				this.show = false
			}
		},
	}
</script>

<style lang='scss' scoped>
	.box {
		background-color: #F4F4F5;
	
		.nav {
			height: 88rpx;
			display: flex;
			align-items: center;
	
			.navtitle {
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
				margin-left: 252rpx;
			}
	
		}
	
		.header {
			height: 176rpx;
			background: #E73449 url(/static/image/headerball.png) no-repeat top center/100%;
			position: relative;
		}
	
		.content {
			height: 100vh;
			// margin-top: 180rpx;
	
			.redword {
				border: 8rpx solid #FF0000;
				font-size: 48rpx;
				color: #FF0000;
				text-align: center;
				padding: 36rpx 44rpx;
				margin: 80rpx 124rpx;
			}
		}
	
	}
	
	.nav1 {
		height: 88rpx;
		display: flex;
		align-items: center;
	
		.navtitle {
			font-size: 32rpx;
			font-weight: 500;
			color: #333;
			margin-left: 252rpx;
		}
	
	}
</style>