const token = "token";
// const baseUrl = "https://api.dltkh.top";
const baseUrl = "https://ad.tongkaihong.top";


export const ajaxTemplates = function (url, data, method = "POST",isParse=true) {
  return new Promise((response, reject) => {
    //const test = "9NRFemVnGpGrJOlFuVW0bISHufj2eiTIg+FH0g4tc/8=";
    console.log(uni.$Crypto.encrypt(JSON.stringify(data)),'加密参数');
    uni.request({
      url: baseUrl + url, //仅为示例，并非真实接口地址。
      data,
      method,
      header: {
        "Content-Type": "application/json",
      },
      success: (callback) => {
        let result = callback.data;
        if(isParse){
           result = JSON.parse(callback.data);
        }

        response(result);
      },
      fail: (callback) => {
        reject(callback);
      },
    });
  });
};







