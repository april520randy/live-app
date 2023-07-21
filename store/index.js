import { createStore } from "vuex";
const USER_ID_KEY = "user_Id";
let user_Id = uni.getStorageSync(USER_ID_KEY);
const store = createStore({
  state: {
    //存放状态
    userInfo: {},
    user_Id: user_Id || "",
	chatAnchoer:{}
  },
  mutations: {
    CHANGE_USER_ID(state, user_Id) {
      // 变更状态
      state.user_Id = user_Id;
      uni.setStorage({
        key: USER_ID_KEY,
        data: user_Id,
      });
    },
    CHANGE_USER_INFO(state, data) {
      // 变更状态
      state.userInfo = data;
    },
  },
  actions: {
    getUserInfo({ commit, state }) {
      //如果不存在user_Id,用户未登录
      if (!state.user_Id) {
        return;
      }

      uni
        .$api("/User/GetUserInfoByUserId", {
          User_Id: state.user_Id,
        })
        .then((s) => {
          // 如果失败，清空本地储存和vuex
          if (s.Code !== 200) {
            commit("CHANGE_USER_ID", "");
            uni.removeStorage({ key: USER_ID_KEY });
          } else {
            commit("CHANGE_USER_INFO", s.Result);
			console.log(this.state.userInfo,3543564)
          }
        });
    },
  },
  getters: {
    is_login: (state) => {
      // 通过User_Id判断是否登录
      return !!state.userInfo.User_Id;
    },
  },
});

export default store;
