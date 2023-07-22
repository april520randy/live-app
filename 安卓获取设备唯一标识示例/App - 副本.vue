<!-- 测试推送消息 -->
<script>
  import permision from "utils/permission.js"
  export default {
    onLaunch: function() {
      console.log('App Launch')
      // 开启通知权限
      // permision.judgeIosPermission("push");
      setTimeout(() => {
        // this.registerPush();
        // plus.push.addEventListener("receive", (message) => {
        //   // console.log(message)
        //   let content = "这是一条测试推送的消息";
        //   plus.push.createMessage(content, "LocalMSG", {
        //     // cover: true,
        //     title: "实时异常"
        //   });
        // })
        // 创建本地推送
        // this.testPush();
        setInterval(() => {
          plus.device.vibrate(500);
          plus.push.createMessage("这是一条测试推送的消息", "LocalMSG", {
            // cover: true,
            // sound:"system",
            title: "实时异常"
          });
          console.log(222)
        }, 10000)
      }, 1000)
      // plus.push.addEventListener("receive", (message) => {
      //   console.log(message)
      // })
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
    methods: {
      registerPush() {
        let pinf = plus.push.getClientInfo(),
          cid = pinf.clientid; //客户端标识
        return cid
      },

      testPush() {
        let content = "这是一条测试推送的消息";
        plus.push.createMessage(content, "LocalMSG", {
          // cover: true,
          title: "实时异常"
        });
      }
    }
  }
</script>

<style>
  /*每个页面公共css */
</style>
