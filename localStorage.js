// cookie默认不使用，优先localStorage，如果无法使用，系统才会调用cookie
const cookie = require('./cookie');

/**
 * encryptor 加密程序
 * @param {String} str 待加密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 * @return {String} 加密后的字符串
 */
function encryptor( str, xor, hex ) {
  try {
    if ( typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
      throw new Error('args type error!')
    }

    let resultList = [];
    hex = hex <= 25 ? hex : hex % 25;

    for ( let i=0; i<str.length; i++ ) {
      // 提取字符串每个字符的ascll码
      let charCode = str.charCodeAt(i);
      // 进行异或加密
      charCode = Number(charCode) ^ xor;
      // 异或加密后的字符转成 hex 位数的字符串
      charCode = charCode.toString(hex);
      resultList.push(charCode);
    }

    let splitStr = String.fromCharCode(hex + 97);
    return resultList.join( splitStr );
  }
  catch (e) {
    console.error(e)
  }
}

/**
 * decryptor 解密程序
 * @param {String} str 待加密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 * @return {String} 加密后的字符串
 */
function decryptor( str, xor, hex ) {
  try {
    if ( typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
      throw new Error('args type error!')
    }
    let resultList = [];
    hex = hex <= 25 ? hex : hex % 25;
    // 解析出分割字符
    let splitStr = String.fromCharCode(hex + 97);
    // 分割出加密字符串的加密后的每个字符
    let strCharList = str.split(splitStr);

    for ( let i=0; i<strCharList.length; i++ ) {
      // 将加密后的每个字符转成加密后的 ascll 码
      let charCode = parseInt(strCharList[i], hex);
      // 异或解密出原字符的ascll码
      charCode = charCode ^ xor;
      let strChar = String.fromCharCode(charCode);
      resultList.push(strChar);
    }
    return resultList.join('');
  }
  catch (e) {
    console.error(e)
  }
}

// 存储数据
function setValue (key, val) {
  // 如果用户关闭了本地存储功能，或者使用隐身模式。使用localStorage会让浏览器抛出异常，导致程序无法执行。
  // 所以这里要进行异常处理

  // 保存数据前，先将数据用JSON进行序列化
  let value = JSON.stringify(val)

  // 数据进行加密处理
  key = encryptor(key,2333,16)
  value = encryptor(value,2333,16)

  try {
    localStorage.setItem(key, value)
  } catch (e) {
    // 默认cookie存储1天
    let days = 1
    // 如果是语言类型，那就存储1年
    if (key === 'lang') {
      days = 365
    }
    cookie.setCookie(key, value, days)
  }
}

// 获取数据
function getValue (key) {
  // 数据进行加密处理
  key = encryptor(key,2333,16)
  try {
    let value = localStorage.getItem(key)
    if (value) {
      // 解密
      value = decryptor(value,2333,16)
      // 返回的数据，需要用JSON进行反序列化
      return JSON.parse(value)
    } else {
      return ''
    }
  } catch (e) {
    let value = cookie.getCookie(key)
    if (value) {
      // 解密
      value = decryptor(value,2333,16)
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
  // 清空全部数据
  localStorage.clear()
}

module.exports = {
  setValue,
  getValue,
  delValue,
  clearValue
};
