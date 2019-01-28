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


module.exports = {
  // 获取字符串中字符的Unicode编码之和，主要用于字符串比较大小，然后排序
  sumStrUnicode,
  // 获取数据类型
  getDataType
};
