<template>
  <view class="face">
    <view class="face-main" ref="dialog">
      <view class="face-main-box" v-for="(item, index) in list" :key="index">
        <view class="face-list" v-if="index === 0">
          <view
            class="face-list-item"
            v-for="(childrenItem, childrenIndex) in item"
            :key="childrenIndex"
            @touchend.prevent="select(childrenItem, childrenIndex)"
          >
            <image
              class="emo-image"
              v-if="index === 0"
              :src="emojiUrl + emojiMap[childrenItem]"
            />
            <image
              class="face-img"
              v-else
              :src="faceUrl + childrenItem + '@2x.png'"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  emojiUrl,
  emojiMap,
  emojiName,
  faceUrl,
  bigEmojiList
} from '/pages/TUIKit/utils/emojiMap'
export default {
  props: {
    messageType: {
      type: String,
      default: () => 'group'
    },
    show: {
      type: Boolean,
      default: () => false
    },
    isMute: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    list() {
      const emjiList = [this.emojiName]
      for (let i = 0; i < bigEmojiList.length; i++) {
        emjiList.push(bigEmojiList[i].list)
      }
      return emjiList
    }
  },
  watch: {},
  data() {
    return {
      emojiUrl,
      emojiMap,
      emojiName,
      faceUrl,
      bigEmojiList,
      showF: false,
      currentIndex: 0
    }
  },

  methods: {
    async select(item, index) {
      const options = {
        name: item
      }
      options.url = emojiUrl + emojiMap[item]
      options.index = index
      this.$emit('send', options)
    },
    selectFace(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.face {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  &-main {
    position: absolute;
    // z-index: 5;
    width: 100%;
    height: 100%;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    // padding: 10px;
    display: flex;
    flex-direction: column;
  }
  &-main-box {
    width: 100%;
    height: 100%;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    display: flex;
    flex-direction: column;
  }
  &-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    justify-content: center;
    &-item {
      padding: 4px;
      .emo-image {
        display: block;
        height: 35px;
        width: 35px;
      }
    }
  }
  &-tab {
    display: flex;
    align-items: center;
    &-item {
      padding: 8px;
      .face-icon {
        display: block;
        height: 30px;
        width: 30px;
      }
      img {
        width: 30px;
      }
    }
    .send-btn {
      position: absolute;
      background-color: #55c06a;
      color: #ffffff;
      line-height: 30px;
      font-size: 13px;
      text-align: center;
      width: 50px;
      height: 30px;
      right: 0;
      bottom: 10px;
    }
  }
}
</style>
