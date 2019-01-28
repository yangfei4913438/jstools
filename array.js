/* eslint-disable */
import dataType from './dataType'

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
 * 数组去重
 * 传入一个数组，返回一个不重复的数组
 * */
function uniqueArr (arr) {
  let tmp = new Set(arr);
  return [...tmp]
}

/**
 * 数组求差
 * 传入两个数组，第一个减去第二个数组里面的元素，返回剩下的元素
 * */
function minusArr (arrX, arrY) {
  let arr1, arr2;
  if (arrX.length < arrY.length) {
    arr1 = JSON.parse(JSON.stringify(arrY));
    arr2 = JSON.parse(JSON.stringify(arrX))
  } else {
    arr1 = JSON.parse(JSON.stringify(arrX));
    arr2 = JSON.parse(JSON.stringify(arrY))
  }
  for (let i = arr1.length - 1; i >= 0; i--) {
    let a = arr1[i];
    for (let j = arr2.length - 1; j >= 0; j--) {
      let b = arr2[j];
      if (a === b) {
        arr1.splice(i, 1);
        arr2.splice(j, 1);
        break
      }
    }
  }
  return arr1
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
  // 数组去重
  uniqueArr,
  // 数组求差
  minusArr,
  // 数组排序
  arrObjectSort
};
