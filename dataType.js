/**
 * 传入一个字符串，获取这个字符串中，每个字符Unicode编码的值，返回这些编码相加后的数值。主要用于字符串比较大小，排序
 * demo:
 * let aaa = 'aa'
 * console.log(getStrUnicode(aaa)) // 194 => 97 + 97 = 194
 * */
function sumStrUnicode (str) {
  let tmp = 0;
  for (let i in str) {
    tmp += str.codePointAt(i)
  }
  return tmp
}

/**
 * 传入一个对象，获取数据类型
 * */
function getDataType (obj) {
  let type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type
}

/**
 * 传入字符串，获取字符串的长度，
 * 参数：字符串
 * 返回：字符串的长度。每个中文字符长度为 2，英文字符长度为 1
 * */
function getStrLength (str) {
  let realLength = 0
  let len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) realLength += 1
    else realLength += 2
  }
  return realLength
}

/**
 * 截取字符串 包含中文处理
 * 参数:
 * 1、字符串
 * 2、要截取多长
 * 3、是否增加。。。
 * */
function subString(str, len, hasDot)
{
  let newLength = 0;
  let newStr = "";
  let chineseRegex = /[^\x00-\xff]/g;
  let singleChar = "";
  let strLength = str.replace(chineseRegex,"**").length;
  for(let i = 0;i < strLength;i++)
  {
    singleChar = str.charAt(i).toString();
    if (singleChar.match(chineseRegex)) {
      newLength += 2;
    } else {
      newLength++;
    }
    if (newLength > len) {
      break;
    }
    newStr += singleChar;
  }

  if (hasDot && strLength > len) {
    newStr += "...";
  }
  return newStr;
}

module.exports = {
  // 获取字符串中字符的Unicode编码之和，主要用于字符串比较大小，然后排序
  sumStrUnicode,
  // 获取数据类型
  getDataType,
  // 获取字符串的长度
  getStrLength,
  // 根据指定长度截取字符串
  subString
};
