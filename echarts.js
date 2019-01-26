// 下面获取数组的依赖函数！
import localTime from './time'

/**
 * 数据转换
 * 第一个参数：传入的数据是什么类型的
 * 第二个参数：数据的值是什么
 * @return {string}
 */
function dataChange (type, val) {
  switch (type.toLowerCase()) {
    case 'time':
      switch (true) {
        case (val >= 0 && val < 60):
          return val + 's';
        case (val >= 60 && val < 3600):
          let min = Math.floor(val / 60);
          let sec = val - (min * 60);
          return min + 'min ' + sec + 's';
        case (val >= 3600):
          let hour = Math.floor(val / 3600);
          let temp = val - (hour * 3600);
          let min2 = Math.floor(temp / 60);
          let sec2 = temp - (min2 * 60);
          return hour + 'h ' + min2 + 'min ' + sec2 + 's';
        default:
          return ''
      }
    case 'traffic':
      // 和rrs保持一致，使用1024进制
      const unit = 1024;
      switch (true) {
        case (val >= 0 && val < unit):
          return val + ' bps';
        case (unit <= val && val < Math.pow(unit, 2)):
          return (val / unit).toFixed(2) + ' Kbps';
        case (Math.pow(unit, 2) <= val && val < Math.pow(unit, 3)):
          return (val / Math.pow(unit, 2)).toFixed(2) + ' Mbps';
        case (Math.pow(unit, 3) <= val && val < Math.pow(unit, 4)):
          return (val / Math.pow(unit, 3)).toFixed(2) + ' Gbps';
        case (Math.pow(unit, 4) <= val && val < Math.pow(unit, 5)):
          return (val / Math.pow(unit, 4)).toFixed(2) + ' Tbps';
        default:
          return ''
      }
    default:
      return ''
  }
}

// 用于展示折线图Y轴刻度
function unitSwitch (name, bw, u) {
  let unit = u;
  if (name === 'RATE') {
    if (bw === 0) {
      return '0 bps'
    } else if (bw < unit) {
      return bw + ' bps'
    } else if (unit <= bw && bw < Math.pow(unit, 2)) {
      return (bw / unit).toFixed(2) + ' Kbps'
    } else if (Math.pow(unit, 2) <= bw && bw < Math.pow(unit, 3)) {
      return (bw / Math.pow(unit, 2)).toFixed(2) + ' Mbps'
    } else if (Math.pow(unit, 3) <= bw && bw < Math.pow(unit, 4)) {
      return (bw / Math.pow(unit, 3)).toFixed(2) + ' Gbps'
    } else if (Math.pow(unit, 4) <= bw && bw < Math.pow(unit, 5)) {
      return (bw / Math.pow(unit, 4)).toFixed(2) + ' Tbps'
    }
  } else if (name === 'RTT' || name === 'JITTER') {
    return bw + 'ms'
  } else {
    if (bw >= 1) {
      return '100%'
    } else {
      return (bw * 100).toFixed(2) + '%'
    }
  }
}

/**
 * 第一个参数：类型为时间字符串, 这里请传入开始时间，不要传结束时间！！！
 * 第二个参数，是一共有多少个小格子
 * 返回：一个数组，数组内容，从小到大排列，每个元素相隔5秒
 * @return {array}
 **/
function getArray (str, t) {
  let res = []

  for (let i = 0; i < t * 5; i += 5) {
    res.push(addSecond(str, i))
  }

  return res
}

/**
 * 第一个参数：类型为时间字符串
 * 第二个参数，是一共有多少个小格子
 * 返回：一个数组，数组内容，从小到大排列，每个元素相隔1秒
 * @return {array}
 **/
function getArraySec (str, t) {
  let res = []

  for (let i = 0; i < t; i++) {
    res.push(addSecond(str, i))
  }

  return res
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
 * 根据传入的字符串，增减一定的秒数，返回一个时间(时:分:秒)结构的字符串
 * */
function addSecond (str, t) {
  // 将字符串转成时间格式
  let s = localTime.stringToDate(str)

  s = s.valueOf()

  s += t * 1000

  s = new Date(s)

  return s.getHours() + ':' + add0(s.getMinutes()) + ':' + add0(s.getSeconds())
}

/**
 *  本地时间字符串，加上时间(单位：秒)
 *  如：传入 ('10:22:05'，5)
 *  返回：'10:22:00'
 *  测试代码：console.log(titleshow('10:22:05', 5))
 *  @return {string}
 * */
function titleshow (str, t) {
  // 解析时间部分
  let timeStrs = str.split(':')
  let hour = parseInt(timeStrs[0], 10)
  let minute = parseInt(timeStrs[1], 10)
  let second = parseInt(timeStrs[2], 10)

  // 这里生成的是本地时间
  let res = new Date(2018, 3, 30, hour, minute, second)

  let s = res.valueOf()

  s += t * 1000

  s = new Date(s)

  return s.getHours() + ':' + add0(s.getMinutes()) + ':' + add0(s.getSeconds())
}

/**
 ** 传入两个时间，获取一共有多少个小格子
 ** 时间格式 '2006-01-02 15:04:05'
 ** @return {number}
 **/
function lineCount (date1, date2) {
  // 字符串转换为时间,这里不用考虑时区问题，只要转换方式相同就可以了
  let d1 = localTime.stringToDate(date1);
  let d2 = localTime.stringToDate(date2);

  // 计算秒
  let seconds = Math.abs(parseInt(d1 - d2)) / 1000;

  // 因为是5秒一个小格子，所以需要除以5
  return Math.ceil(seconds / 5)
}

export default {
  // 用于展示折线图Y轴刻度
  unitSwitch,
  // 一个数组，数组内容，从小到大排列，每个元素相隔5秒
  getArray,
  // 同上，只不过相隔1秒
  getArraySec,
  // 时间字符串加秒处理
  titleshow,
  // 传入两个时间，获取一共有多少个小格子
  lineCount,
  // 传入类型和值，得到一个适合的字符串
  dataChange
}
