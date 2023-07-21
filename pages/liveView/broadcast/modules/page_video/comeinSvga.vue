<template>
  <view style="width: 100%">
   <view
      style="
        display: flex;
        justify-content: space-between;
        height: 300px;
        width: 100%;
        position: relative;
      "
    >
      <l-svga ref="svga1" style="width: 50%; height: 100%"> </l-svga>
      <l-svga ref="svga2" style="width: 50%; height: 100%"> </l-svga>

      <view
        style="
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 125px;
          z-index: 1000;
          left: 42px;
          color: white;
        "
      >
        <image
		v-if="header"
          :src="header"
          alt=""
          style="height: 22px; width: 22px; border-radius: 90px"
        />

        <view style="display: flex; flex-flow: column; margin-left: 10px">
          <span style="color: #ffee00; font-size: 13px">{{ name }}</span>
          <span style="color: white; font-size: 12px">欢迎进入直播间</span>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {},

  data() {
    return {
      name: '',
      header: '',
      svgLeft: '',
      svgRight: ''
    }
  },

  mounted() {},

  methods: {
    playLeft() {
      this.$refs.svga1.render(async (parser, player) => {
        //https://udimg.12861.ltd/lpz.svga
        //../../../static/image/qss.svga
        const videoItem = await parser.load(this.svgLeft)
        await player.setVideoItem(videoItem)
        // 设置当前动画的循环次数，0代表无限循环 默认 0
        player.loops = 1
        // 设置动画缩放模式，可选值为 Fill / AspectFill / AspectFit
        player.setContentMode(() => {
          contentMode: 'Fill'
        })
        // 开始播放动画，reverse = true 时则反向播放。
        player.startAnimation()

        // 监听动画完成
        player.onFinished(() => {
          player.clear()

          this.$parent.showSvgComein = false
        })
      })
    },

    playRight() {
      this.$refs.svga2.render(async (parser, player) => {
        //https://udimg.12861.ltd/lpz.svga
        //../../../static/image/qss.svga
        const videoItem = await parser.load(this.svgRight)
        await player.setVideoItem(videoItem)
        // 设置当前动画的循环次数，0代表无限循环 默认 0
        player.loops = 1
        // 设置动画缩放模式，可选值为 Fill / AspectFill / AspectFit
        player.setContentMode(() => {
          contentMode: 'Fill'
        })
        // 开始播放动画，reverse = true 时则反向播放。
        player.startAnimation()

        // 监听动画完成
        player.onFinished(() => {
          player.clear()

          this.$parent.showSvgComein = false
        })
      })
    }
  }
}
</script>

<style></style>
