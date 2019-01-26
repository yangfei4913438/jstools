// 存储cookie
function setCookie (key, value, days) {
  let d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = key + '=' + value + ';path=/;' + expires
  // console.info(document.cookie)
}

// 获取cookie
function getCookie (key) {
  let value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return value ? value[2] : null
}

// 清除cookie
function delCookie (key) {
  setCookie(key, '', -1)
}

export default {
  setCookie,
  getCookie,
  delCookie
}
