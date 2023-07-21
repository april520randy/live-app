 import CryptoJS from 'crypto-js'
 export default {
   // 特别注意：此次是将密文写死到函数内部，也可以当成函数的参数进行动态绑定密文,列如：
   encrypt(word) {
      let keyStr = "dbvb3ywoqownm8sjgtcrz2lncdwvfwxt"; // 密钥
     
      let ivStr = "hff8q3gdbowligoo"; // 偏移量
     
      let key = CryptoJS.enc.Utf8.parse(keyStr);
     
      let iv = CryptoJS.enc.Utf8.parse(ivStr);
     
      let srcs = CryptoJS.enc.Utf8.parse(word);
     
      let encrypted = CryptoJS.AES.encrypt(srcs, key, {
     
         iv:iv,
         
         mode: CryptoJS.mode.CBC,
         
         padding: CryptoJS.pad.Pkcs7
     
      });
     
      return encrypted.toString();
     
    },
   // 解密
    decrypt(word) {
 
    let keyStr = "dbvb3ywoqownm8sjgtcrz2lncdwvfwxt";
   
    let ivStr = "hff8q3gdbowligoo";
 
    let base64 = CryptoJS.enc.Utf8.parse(word)
 
    var key = CryptoJS.enc.Utf8.parse(keyStr);
 
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
 
    let src = CryptoJS.enc.Utf8.stringify(base64)
 
    var decrypt = CryptoJS.AES.decrypt(src, key, {
 
         iv,
 
         mode: CryptoJS.mode.CBC,
 
         padding: CryptoJS.pad.Pkcs7
 
    });
 
    return decrypt.toString(CryptoJS.enc.Utf8);
 
    }
 }
