<script>
  import permision from "utils/permission.js"
  export default {
    onLaunch: function() {
      console.log('App Launch')
      // this.requestAndroidPermission("photoLibrary");
      // plus.screen.lockOrientation('landscape-primary');
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
    methods: {
      async requestAndroidPermission(permisionID) {
        var result = await permision.requestAndroidPermission(permisionID)
        var strStatus = "";
        if (result == 1) {
          strStatus = "已获得授权"
          this.initSDK();
        } else if (result == 0) {
          strStatus = "未获得授权"
        } else {
          strStatus = "被永久拒绝权限"
        }
      },
    }
  }
</script>

<style>
  /*每个页面公共css */
</style>
