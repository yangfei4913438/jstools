// 检查email合法性
function checkEmail (emailAddress) {
  let Regex = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return Regex.test(emailAddress)
}

// 用户名正则，2到12位（汉字，字母，数字，下划线，减号, 空格）空格不能是第一位
function checkUserName (name) {
  let Regex = /^(?!\s)[a-zA-Z0-9_\u4e00-\u9fa5\s-]{2,12}$/;
  return Regex.test(name)
}

// 密码正则，6-16位，包括至少1个大写字母，1个小写字母，1个数字
function checkPassword (password) {
  let Regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,16}$/;
  // let Regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*?()~`=+{}[\]|:;'",.<>\/ ]).{6,12}$/
  return Regex.test(password)
}

// 检测是否为IP地址
function checkIPAddress (ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip)
}

export default {
  checkEmail,
  checkUserName,
  checkPassword,
  checkIPAddress
}
