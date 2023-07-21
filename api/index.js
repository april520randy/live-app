const token = "token";
const baseUrl = "https://api.dltkh.top";


export const ajaxTemplate = function (url, data, method = "POST") {
  return new Promise((response, reject) => {
    //const test = "9NRFemVnGpGrJOlFuVW0bISHufj2eiTIg+FH0g4tc/8=";
    console.log(uni.$Crypto.encrypt(JSON.stringify(data)),'加密参数');
    uni.request({
      url: baseUrl + url, //仅为示例，并非真实接口地址。
      data: {
        data: uni.$Crypto.encrypt(JSON.stringify(data)),
      },
      method,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (callback) => {
        const result = JSON.parse(uni.$Crypto.decrypt(callback.data));
        console.log(result);
        response(result);
      },
      fail: (callback) => {
        reject(callback);
      },
    });
  });
};







