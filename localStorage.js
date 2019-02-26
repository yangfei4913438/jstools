// cookie默认不使用，优先localStorage，如果无法使用，系统才会调用cookie
const cookie = require('./cookie');

/**
 * 加密函数
 * @param str 待加密字符串
 * @returns {string}
 */
function strEncrypt(str) {
  str = encodeURI(str);

  let c = String.fromCharCode(str.charCodeAt(0) + str.length);

  for (let i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1));
  }

  return encodeURIComponent(c);
}

/**
 * 解密函数
 * @param str 待解密字符串
 * @returns {string}
 */
function strDecrypt(str) {
  str = decodeURIComponent(str);
  let c = String.fromCharCode(str.charCodeAt(0) - str.length);

  for (let i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return decodeURI(c);
}

// 存储数据
function setValue (key, val) {
  // 如果用户关闭了本地存储功能，或者使用隐身模式。使用localStorage会让浏览器抛出异常，导致程序无法执行。
  // 所以这里要进行异常处理

  // 保存数据前，先将数据用JSON进行序列化
  let value = JSON.stringify(val);

  // 数据进行加密处理
  value = strEncrypt(value);

  try {
    localStorage.setItem(key, value)
  } catch (e) {
    // 默认cookie存储1天
    let days = 1;
    // 如果是语言类型，那就存储1年
    if (key === 'lang') {
      days = 365
    }
    cookie.setCookie(key, value, days)
  }
}

// 获取数据
function getValue (key) {
  try {
    let value = localStorage.getItem(key);
    if (value) {
      // 解密
      value = strDecrypt(value);
      // 返回的数据，需要用JSON进行反序列化
      return JSON.parse(value)
    } else {
      return ''
    }
  } catch (e) {
    let value = cookie.getCookie(key);
    if (value) {
      // 解密
      value = strDecrypt(value);
      // 返回的数据，需要用JSON进行反序列化
      return JSON.parse(value)
    } else {
      return ''
    }
  }
}

// 删除数据
function delValue (key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    cookie.delCookie(key)
  }
}

/***
 * 清空数据, 没有返回值
 * @param args 本地存储的key，组成的数组
 */
function clearValue (args) {
  typeof args === typeof [1, 2] && args.map(o => delValue(o))
}

module.exports = {
  setValue,
  getValue,
  delValue,
  clearValue
};
