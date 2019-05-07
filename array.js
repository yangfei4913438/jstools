/* eslint-disable */
const dataType = require('./dataType');

/**
 * 传入一个数组，每次执行返回一个不重复的元素，一直取到数组为空，值就是undefined
 * */
function getUnique (arr) {
  if (arr.length >= 1) {
    let ran = Math.floor(Math.random() * arr.length);
    return arr.splice(ran, 1)[0]
  }
}

/**
 * 传入一个数组，以及一个数字。将数组按这个指定的数来切割成为几个小的数组。
 * 比如传入的数组： [1, 2, 3, 4, 5]  传入的数字 2
 * 那么你会得到一个二维数组 [[1, 2], [3, 4], [5]]
 * */
function split_array(arr, len){
  if (typeof arr !== typeof [1, 2] || arr === null || arr === undefined) {
    return []
  } else {
    const a_len = arr.length;
    let result = [];
    for(let i = 0; i < a_len; i+=len){
      result.push(arr.slice(i,i+len))
    }
    return result
  }
}

/**
 * 传入一个数组，根据输入输出，生成若干个，输出2个一组的小数组。
 * */
function split_array_out_in(arr) {
  if (typeof arr !== typeof [1, 2] || arr === null || arr === undefined) {
    return []
  } else {
    const arr_out = arr.filter(o => o.device_name === o.rrs_name_pre)
    const arr_in = arr.filter(o => o.device_name === o.rrs_name_next)
    if (arr_in.length > arr_out.length) {
      for (let i = 0; i < (arr_in.length-arr_out.length); i++) {
        arr_out.push(null)
      }
    } else {
      for (let i = 0; i < (arr_out.length-arr_in.length); i++) {
        arr_in.push(null)
      }
    }
    let result = [];
    for(let i = 0; i < arr_in.length; i++){
      result.push([arr_out[i], arr_in[i]])
    }
    return result
  }
}

/**
 * 数组去重
 * 传入一个数组，返回一个不重复的数组
 * */
function uniqueArr (arr) {
  let tmp = new Set(arr);
  return [...tmp]
}

/**
 * 数组求交集
 * 判断一个数组中存在多少个元素，是对方数组的
 * @return {number}
 */
function intersectArr (arrX, arrY) {
  let arr1, arr2
  if (arrX.length < arrY.length) {
    arr1 = arrY
    arr2 = arrX
  } else {
    arr1 = arrX
    arr2 = arrY
  }
  arr1 = arr1.map(o => JSON.stringify(o))
  arr2 = arr2.map(o => JSON.stringify(o))
  // 求交集，目标对象转换成元组快一点
  let sb = new Set(arr2);
  return arr1.filter(x => sb.has(x)).length
}

/**
 * 数组求差集, 默认是大数组减去小数组
 * 传入两个数组，第一个减去第二个数组里面的元素，返回剩下的元素
 * */
function minusArr (arrX, arrY) {
  let arr1, arr2
  if (arrX.length < arrY.length) {
    arr1 = arrY
    arr2 = arrX
  } else {
    arr1 = arrX
    arr2 = arrY
  }
  // 放置对象等无法直接比较的元素，统一转化为 JSON 字符串
  arr1 = arr1.map(o => JSON.stringify(o))
  arr2 = arr2.map(o => JSON.stringify(o))
  // 求差集，目标对象转换成元组快一点
  let sb = new Set(arr2);
  return arr1.filter(x => !sb.has(x)).map(o => JSON.parse(o))
}

/**
 * 数组排序，根据数组中某个属性的值来排序，支持数字和字符串
 * 第一个参数是数组，第二个参数是排序的key, 第三个参数表示正序还是倒序，asc 正序 其他都是倒序
 * */
function arrObjectSort (arrObj, keyName, sort='asc') {
  // 参数处理
  if ((sort+'').toLowerCase() !== 'asc' && (sort+'').toLowerCase() !== 'desc') {
    sort = 'desc'
  }
  //表示把对象复制给另一个对象，两者间互不影响
  let arr = arrObj.slice(0);
  // 比较函数
  function compare (property, sort) {
    return function(a, b) {
      let value1 = typeof a[property] === typeof 'str' ? dataType.sumStrUnicode(a[property]) : a[property];
      let value2 = typeof b[property] === typeof 'str' ? dataType.sumStrUnicode(b[property]) : b[property];
      if (value1 < value2) {
        return (sort.toLowerCase() === 'asc' ? -1 : 1)
      } else if ( value1 > value2 ) {
        return (sort.toLowerCase() === 'asc' ? 1 : -1)
      } else {
        return 0
      }
    }
  }
  return arr.sort(compare(keyName, sort))
}

module.exports = {
  // 从数组中取出不重复的值，取完返回未定义
  getUnique,
  // 数组分割
  split_array,
  split_array_out_in,
  // 数组去重
  uniqueArr,
  // 数组求差集
  minusArr,
  // 数组求交集
  intersectArr,
  // 数组排序
  arrObjectSort
};
