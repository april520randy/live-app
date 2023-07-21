<template>
  <l-svga ref="svga"> </l-svga>
</template>

<script>
export default {
  data() {
    return {
      svgList: []
    }
  },
  async mounted() {},
  methods: {
    //播放svg动画
    playSvg(svg) {
      this.$refs.svga.render(async (parser, player) => {
        //https://udimg.12861.ltd/lpz.svga
        //../../../static/image/qss.svga
        const videoItem = await parser.load(svg)
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
          this.svgList.splice(0, 1)

          if (this.svgList.length > 0) {
            this.playSvg(this.svgList[0])
          } else {
            this.svgList = []

            this.$emit('svgCallBack')
            //清空礼物动画
            // this.$parent.showGiftSvg = false
            // this.$parent.gift = {}
          }
          console.log('动画结束')
        })
      })
    }
  }
}
</script>

<style></style>
