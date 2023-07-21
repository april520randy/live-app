export function checkPhone(value) {
  if (!value || value === "") {
    return false;
  }

  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
    return false; //不满足条件
  } else {
    return true; //满足条件
  }
}

export function filterPhoneNumber(phoneNumber) {
  let reg = /^1[3456789]{1}\d{9}$/;
  //校验手机号是否正确
  if (reg.test(phoneNumber)) {
    phoneNumber = phoneNumber.toString();
    return phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
  } else {
    return "";
  }
}

export function pwdVerify(pwd) {
  let reg = /^[a-zA-Z0-9]{6,12}$/;
  return reg.test(pwd);
}
