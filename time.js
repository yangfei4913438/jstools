/**
 * 获取时区，但是这里返回的时区为相反的，比如东八区的值为 -8
 **/
function getTimeZone () {
  let t = new Date();
  // 本地时间与GMT时间的时间偏移差
  let offset = t.getTimezoneOffset() * 60000;
  // 计算时区
  return offset / 1000 / 60 / 60
}

/**
 * 获取当前时间的时间戳
 * 注：将时间戳四舍五入返回，这样的精度相对比较高。单纯的，向上，向下取整都是错的。
 * @return {number}
 */
function getTimestamp () {
  let s = new Date();
  return Math.round(s.valueOf() / 1000)
}

/**
 * 标准时间字符串，转时间戳
 * 传入一个时间字符串：'Tue Mar 27 2018 08:40:00 GMT+0800 (CST)'
 * 返回一个时间戳： 1522111200
 * 测试代码：console.log(timeStrToTimestamp('Tue Mar 27 2018 08:40:00 GMT+0800 (CST)'))
 * @return {number}
 * */
function timeStrToTimestamp (str) {
  let res = new Date(str);
  // 因为完整时间格式的字符串，自带时区信息，所以这里，不用做任何处理，直接转换就行了。
  return res.valueOf() / 1000
}

/**
 * 根据本地时间字符串，得到时间戳
 * 范例：getTimesTamp('2006-01-02 15:04:05')
 */
function timesTampFromLocal (str) {
  if (!checkTimeStr(str)) {
    console.error('error format:' + str, 'right format: 2018-10-10 10:00:00')
    return ''
  }

  // 截取时间
  let tempStrs = str.split(' ');

  // 解析日期部分
  let dateStrs = tempStrs[0].split('-');
  let year = parseInt(dateStrs[0], 10);
  let month = parseInt(dateStrs[1], 10) - 1;
  let day = parseInt(dateStrs[2], 10);

  // 解析时间部分
  let timeStrs = tempStrs[1].split(':');
  let hour = parseInt(timeStrs[0], 10);
  let minute = parseInt(timeStrs[1], 10);
  let second = parseInt(timeStrs[2], 10);

  let res = new Date(year, month, day, hour, minute, second);

  return Math.round(res.valueOf() / 1000)
}

/**
 * 这个函数单纯的就是给小于10的数字，前面补0，返回一个2位长度的字符串
 * */
// 如果小于10，就在前面补一个0
function add0 (obj) {
  if (obj < 10) {
    obj = '0' + obj
  }
  return obj
}

/**
 * 根据时间戳，转换为本地时间字符串。
 * @return {string}
 * */
function getLocalTime (untime) {
  // js中时间戳转成时间，需要先乘以1000!
  let myDate = new Date(untime * 1000);
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;
  let day = myDate.getDate();
  let hours = myDate.getHours();
  let minutes = myDate.getMinutes();
  let second = myDate.getSeconds();
  return year + '-' + add0(month) + '-' + add0(day) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(second)
}

/**
 * 根据时间戳，转换为UTC时间字符串
 * @return {string}
 * */
function getUtcTime (untime) {
  // js中时间戳转成时间，需要先乘以1000!
  let myDate = new Date(untime * 1000);
  let year = myDate.getUTCFullYear();
  let month = myDate.getMonth() + 1;
  let day = myDate.getUTCDate();
  let hours = myDate.getUTCHours();
  let minutes = myDate.getUTCMinutes();
  let second = myDate.getUTCSeconds();
  return year + '-' + add0(month) + '-' + add0(day) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(second)
}

/**
 * 根据时间戳，计算加减多少秒，返回一个本地时间字符串
 * */
function addSecond (untime, val) {
  // 时间戳的单位默认是秒，所以可以直接进行计算
  let tmp = untime + val;

  // 返回本地时间
  return getLocalTime(tmp)
}

/**
 * 根据时间戳，获取最靠近的5秒，如果本身就是最靠近的5秒，那么就向前取
 * */
function lastFive (untime) {
  // js中时间戳转成时间，需要先乘以1000!
  let myDate = new Date(untime * 1000);
  let second = myDate.getSeconds();
  let m = second % 5;
  return (untime - m) === untime ? untime - 5 : untime - m
}

/**
 * 传入一个UTC的时间字符串: 2018-10-10 10:00:00
 * 得到一个本地字符串: 2018-10-10 18:00:00
 * 注意：时间格式不能变化，否则取值就取不到正确的值了。
 * @return {string}
 * */
function StrFromUTCToLocal (str) {
  if (!checkTimeStr(str)) {
    console.error('error format:', str, ' format: 2018-10-10 10:00:00')
    return ''
  }

  // 截取时间
  let tempStrs = str.split(' ');

  // 解析日期部分
  let dateStrs = tempStrs[0].split('-');
  let year = parseInt(dateStrs[0], 10);
  let month = parseInt(dateStrs[1], 10) - 1;
  let day = parseInt(dateStrs[2], 10);

  // 解析时间部分
  let timeStrs = tempStrs[1].split(':');
  let hour = parseInt(timeStrs[0], 10);
  let minute = parseInt(timeStrs[1], 10);
  let second = parseInt(timeStrs[2], 10);

  let res = new Date(year, month, day, hour, minute, second);

  let s = res.valueOf();

  s -= getTimeZone() * 60 * 60 * 1000;

  s = new Date(s);

  return s.getFullYear() + '-' + add0(s.getMonth() + 1) + '-' + add0(s.getDate()) + ' ' +
    add0(s.getHours()) + ':' + add0(s.getMinutes()) + ':' + add0(s.getSeconds())
}

/**
 ** 本地时间字符串转本地date类型
 ** 参数： str  待转字符串(yyyy-MM-dd hh:mm:ss)
 ** 返回： date类型时间对象, 本地时区
 */
function stringToDate (str) {
  // 先检查是否是允许的时间格式
  if (!checkTimeStr(str)) {
    return false
  }

  // 截取时间
  let tempStrs = str.split(' ');
  // 解析日期部分
  let dateStrs = tempStrs[0].split('-');
  let year = parseInt(dateStrs[0], 10);
  let month = parseInt(dateStrs[1], 10) - 1;
  let day = parseInt(dateStrs[2], 10);

  // 解析时间部分
  let timeStrs = tempStrs[1].split(':');
  let hour = parseInt(timeStrs[0], 10);
  let minute = parseInt(timeStrs[1], 10);
  let second = parseInt(timeStrs[2], 10);

  // 默认返回的时间，是带有本地时区信息的
  return new Date(year, month, day, hour, minute, second)
}

/**
 * 检查字符串是不是时间字符串
 * 字符串范例: '2006-01-02 15:04:05'
 * @return {boolean}
 * */
function checkTimeStr (str) {
  // 第一步，检查能否进行正常切片
  const Regex = /^(\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  const res = Regex.test(str);

  // 第二步，检查数值是否合法
  if (res) {
    // 截取时间
    let tempStrs = str.split(' ');

    // 解析日期部分
    let dateStrs = tempStrs[0].split('-');
    // let year = parseInt(dateStrs[0], 10)
    let month = parseInt(dateStrs[1], 10) - 1;
    let day = parseInt(dateStrs[2], 10);

    // 解析时间部分
    let timeStrs = tempStrs[1].split(':');
    let hour = parseInt(timeStrs[0], 10);
    let minute = parseInt(timeStrs[1], 10);
    let second = parseInt(timeStrs[2], 10);

    // 判断基本的时间规则
    if (month > 12 || day > 31 || hour > 24 || minute > 59 || second > 59) {
      return false
    }

    // 分和秒在时针到达24的时候，只能为0，否则就是错误的时间
    if (hour === 24) {
      if (minute > 0 || second > 0) {
        return false
      }
    }
  } else {
    // 不能切片，则返回错误
    return false
  }

  // 到这里都没事，就是正常的
  return true
}

/**
 * 传入两个时间，求相隔多少个小时
 * */
function getIntervalHour (startDate, endDate) {
  let ms = endDate.getTime() - startDate.getTime();
  // 毫秒转换为分钟
  let res = Math.abs(ms) / 1000 / 60;
  // console.log(res)
  // 10分为1，进行换算
  if (res < 10) {
    return 1
  } else {
    return Math.round(res / 10)
  }
}

/**
 * 传入时间戳之差，计算距离现在过去了多长时间，1分钟以内算现在
 * */
function showTimeAgo (val) {
  switch (true) {
    case (val >= 0 && val < 60):
      return 'Now';
    case (val >= 60 && val < 3600):
      let min = Math.floor(val / 60);
      if (min > 1) {
        return min + ' minutes ago'
      } else {
        return min + ' minute ago'
      }
    case (val >= 3600):
      let hour = Math.floor(val / 3600);
      let temp = val - (hour * 3600);
      let min2 = Math.floor(temp / 60);
      if (hour > 1) {
        if (min2 > 1) {
          return hour + ' hours ' + min2 + ' minutes ago'
        } else if (min2 > 0) {
          return hour + ' hours ' + min2 + ' minute ago'
        } else {
          return hour + ' hours ago'
        }
      } else {
        if (min2 > 1) {
          return hour + ' hour ' + min2 + ' minutes ago'
        } else if (min2 > 0) {
          return hour + ' hour ' + min2 + ' minute ago'
        } else {
          return hour + ' hour ago'
        }
      }
    default:
      return ''
  }
}

/**
 * 传入秒，转换成时间分钟
 * */
function secToStr (val) {
  switch (true) {
    case (val < 3600):
      let min = Math.floor(val / 60);
      if (min > 1) {
        return min + ' minutes'
      } else if (min > 0) {
        return min + ' minute'
      } else {
        return '1 minute'
      }
    case (val >= 3600):
      let hour = Math.floor(val / 3600);
      let temp = val - (hour * 3600);
      let min2 = Math.floor(temp / 60);
      if (hour > 1) {
        if (min2 > 1) {
          return hour + ' hours ' + min2 + ' minutes'
        } else if (min2 > 0) {
          return hour + ' hours ' + min2 + ' minute'
        } else {
          return hour + ' hours'
        }
      } else {
        if (min2 > 1) {
          return hour + ' hour ' + min2 + ' minutes'
        } else if (min2 > 0) {
          return hour + ' hour ' + min2 + ' minute'
        } else {
          return hour + ' hour'
        }
      }
    default:
      return ''
  }
}

/**
 * 获取用于chart的参数
 * 传入截止时间戳:秒，返回一个数组，一共有三个元素：截止时分秒字符串，开始时分秒字符串，开始时间时间戳
 * @return {Array}
 * */
function chartArgs (untime) {
  // js中时间戳转成时间，需要先乘以1000!
  let myDate = new Date(untime * 1000);
  let hours = myDate.getHours();
  let minutes = myDate.getMinutes();
  let second = myDate.getSeconds();
  // 计算前一个小时的时间戳，也就是开始时间
  let nTime = untime - 60 * 60;
  let nDate = new Date(nTime * 1000);
  let nHour = nDate.getHours();
  let nMin = nDate.getMinutes();
  let nSec = nDate.getSeconds();
  return [add0(hours) + ':' + add0(minutes) + ':' + add0(second), add0(nHour) + ':' + add0(nMin) + ':' + add0(nSec), nTime]
}

/**
 * 时间往最近的时间移动一个小时，默认整点，截止时间超过当前时间，就是最新时间，也就是默认的显示时间
 * 传入截止时间戳:秒，返回一个数组，一共有四个元素：截止时分秒字符串，开始时分秒字符串，开始时间时间戳，截止时间戳
 * @return {Array}
 * */
function lastArgs (untime, curr) {
  // 上一次的结束时间
  let myDate = new Date(untime * 1000);
  let minutes = myDate.getMinutes();
  let second = myDate.getSeconds();
  // 判断结束时间是否为整点
  if (minutes === 0 && second === 0) {
    // 如果是整点就把时间加上1小时
    untime += 3600;
    // 新的结束时间(服务器当前时间)和当前时间进行比较，如果大于当前时间，就载入默认显示的内容，小于当前时间，就可以按计算后的时间戳计算
    if (untime >= curr) {
      let res = chartArgs(curr);
      return res.concat([curr])
    } else {
      let res = chartArgs(untime);
      return res.concat([untime])
    }
  } else {
    // 如果不是整点。。。只有默认显示的时间不是整点，所以，这种情况下，直接显示最新的默认时间就好了。
    let res = chartArgs(curr);
    return res.concat([curr])
  }
}

/**
 * 时间向前移动一个小时，取整点
 * 传入截止时间戳:秒，返回一个数组，一共有四个元素：截止时分秒字符串，开始时分秒字符串，开始时间时间戳，截止时间戳
 * @return {Array}
 * */
function nextArgs (untime) {
  // 上一次的结束时间
  let myDate = new Date(untime * 1000);
  let minutes = myDate.getMinutes();
  let second = myDate.getSeconds();
  // 判断结束时间是否为整点
  if (minutes === 0 && second === 0) {
    // 如果是整点就把时间推迟1小时
    untime -= 3600;
    let res = chartArgs(untime);
    return res.concat([untime])
  } else {
    // 如果不是整点，就向下取整
    let year = myDate.getFullYear();
    let month = myDate.getMonth(); // 这里要用于转换时间戳，就不+1了，否则还要再减1处理
    let day = myDate.getDate();
    let hours = myDate.getHours();
    let result = new Date(year, month, day, hours, 0, 0); // 分秒
    let newTS = Math.round(result.valueOf() / 1000);
    let res = chartArgs(newTS);
    return res.concat([newTS])
  }
}

/**
 * 用于获取时间数组，从大到小排序
 * 传入结束时间戳:秒，返回一个数组，一共有六个元素：按十分钟递减，十分钟一个数组，开始时间和结束时间组合成一个对象
 * @return {Array}
 * */
function timeArr (untime) {
  // 计算出每十分钟的中断时间戳
  let time1 = untime - 10 * 60;
  let time2 = untime - 20 * 60;
  let time3 = untime - 30 * 60;
  let time4 = untime - 40 * 60;
  let time5 = untime - 50 * 60;
  let time6 = untime - 60 * 60;
  let res = [];
  // 因为大的都在后面，所以这里要反过来写
  res.push({
    from: getLocalTime(time1),
    to: getLocalTime(untime)
  });
  res.push({
    from: getLocalTime(time2),
    to: getLocalTime(time1)
  });
  res.push({
    from: getLocalTime(time3),
    to: getLocalTime(time2)
  });
  res.push({
    from: getLocalTime(time4),
    to: getLocalTime(time3)
  });
  res.push({
    from: getLocalTime(time5),
    to: getLocalTime(time4)
  });
  res.push({
    from: getLocalTime(time6),
    to: getLocalTime(time5)
  });
  return res
}

export default {
  // 获取时区
  getTimeZone,
  // 根据时间戳，计算距离现在有多久
  showTimeAgo,
  // 根据秒，转换成时间字符串
  secToStr,
  // 获取当前时间的时间戳 (无参数)
  getTimestamp,
  // 获取前5秒的时间戳
  lastFive,
  // 标准时间字符串，转时间戳
  timeStrToTimestamp,
  // 根据本地时间字符串，得到时间戳
  timesTampFromLocal,
  // 根据时间戳，转换为本地时间字符串
  getLocalTime,
  // 根据时间戳，转换为UTC时间字符串
  getUtcTime,
  // 根据时间戳，计算加减多少秒，返回一个本地时间字符串
  addSecond,
  // 传入一个UTC的时间字符串, 得到一个本地字符串
  StrFromUTCToLocal,
  // 检查字符串是不是时间字符串
  checkTimeStr,
  // 本地时间字符串转本地date类型
  stringToDate,
  // 获取两个时间相隔多少小时
  getIntervalHour,
  // 传入截止时间戳:秒，返回一个数组，一共有三个元素：截止时分秒字符串，开始时分秒字符串，开始时间时间戳
  chartArgs,
  // 传入截止时间戳:秒，返回一个数组，一共有四个元素：截止时分秒字符串，开始时分秒字符串，开始时间时间戳，截止时间戳(时间往最近的时间移动一个小时，默认整点，截止超过当前，就是最新时间)
  lastArgs,
  // 传入截止时间戳:秒，返回一个数组，一共有四个元素：截止时分秒字符串，开始时分秒字符串，开始时间时间戳，截止时间戳(时间向前移动一个小时，取整点)
  nextArgs,
  // 用于获取时间数组, 一个小时分成6份，传入的时间戳是截止时间。每个元素都是一个开始时间，一个结束时间
  timeArr
}
