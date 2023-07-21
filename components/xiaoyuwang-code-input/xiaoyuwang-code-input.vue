<template>
  <view class="code-box">
    <view class="flex-box">
      <input
        type="number"
        focus="true"
        :maxlength="maxlength"
        class="hide-input"
        v-model="inputData.code"
        @input="getVal"
      />
      <block v-for="(item, index) in maxlength" :key="item">
        <view
          :class="[
            'item',
            {
              active: codeIndex === item,
              middle: type === 'middle',
              bottom: type === 'bottom',
              box: type === 'box',
            },
          ]"
        >
          <view class="line" v-if="type !== 'middle'" />
          <view
            v-if="type === 'middle' && codeIndex <= item"
            class="bottom-line"
          />
          <block v-if="isPwd && inputData.codeArr.length >= item">
            <text class="dot">*</text>
          </block>
          <block v-else>
            {{
              inputData.codeArr[index] ? inputData.codeArr[index] : ''
            }}</block
          >
        </view>
      </block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, reactive, ref, defineEmits } from 'vue';
const props = defineProps({
  maxlength: {
    type: Number,
    default: 4,
  },
  isPwd: {
    type: Boolean,
    default: false,
  },
  // middle-middle line, bottom-bottom line, box-square box
  type: {
    type: String,
    default: 'middle',
  },
  modelValue: {
    type: Number,
  },
});
const emit = defineEmits(['update:modelValue']);
const flexWidth = 80 / props.maxlength + '%';

const inputData = reactive({
  codeArr: [] as Array<number>,
  code: null,
});
const codeIndex = ref(1);

const getVal = e => {
  let { value } = e.detail;
  let arr: Array<number> = value.split('');
  codeIndex.value = arr.length + 1;
  inputData.codeArr = arr;
  if (codeIndex.value > Number(props.maxlength)) {
    emit('update:modelValue', inputData.code);
  }
};
</script>

<style scoped>
@keyframes twinkling {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}
.code-box {
  text-align: center;
  width: 680upx;
}
.flex-box {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  position: relative;
}
.flex-box .hide-input {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  text-align: left;
  z-index: 9;
  opacity: 1;
}
.flex-box .item {
  position: relative;
  width: v-bind('flexWidth');
  height: 100upx;
  font-size: 70upx;
  font-weight: bold;
  color: #333333;
  line-height: 100upx;
}
.flex-box .item:last-child {
  margin-right: 0;
}
.flex-box .middle {
  border: none;
}
.flex-box .box {
  box-sizing: border-box;
  border: 2upx solid #999999;
  border-radius: 6rpx;
}
.flex-box .bottom {
  box-sizing: border-box;
  border-bottom: 1upx solid #999999;
}
.flex-box .active {
  border-color: #ffcc00;
}
.flex-box .active .line {
  display: block;
}

/* 虚拟制作 */
.flex-box .line {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2upx;
  height: 50upx;
  background: #333333;
  animation: twinkling 1s infinite ease;
}
.flex-box .dot {
  font-size: 80upx;
  line-height: 40upx;
}
.flex-box .bottom-line {
  height: 1rpx;
  background: #999999;
  width: 80%;
  position: absolute;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
