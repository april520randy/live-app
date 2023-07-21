<template>
    <view class="empty">

        <var-image :src="img" style="width: 332rpx;height: 332rpx;" />
        <text>{{ txt }}</text>
    </view>
</template>

<script>
export default {
    props: {
        txt: {
            default: ''
        },
        img: {
            default: ''
        }
    },
    components: {

    },
    data() {
        return {
            gifModalTabIndex: '0',
            active: 0

        }
    },


    onLoad() {

    },
    onReady() {

    },

    onPageScroll(e) {

    },
    methods: {



    }
}
</script>


<style lang='scss' scoped>
.empty {
    margin-top: 148rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
