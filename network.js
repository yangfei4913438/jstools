/**
 * 目前仅适用于mock.js 用于其他业务场景，请自行判断是否有BUG
 * */
function parseGetUrl (url) {
  // 去掉URL前缀，保留参数部分
  const st = url.split('?')[1];

  // 获取参数部分数组
  const s = st.split('&');

  // 定义一个字典
  let dict = {};

  // 遍历参数数组
  s.forEach(row => {
    // 切割参数，=前面的是key，=后面的是value
    // 值里面，+用空白来替代【如果值里面真的有+，这里要进行修改，否则有BUG。使用正则之前先使用转义符号将+转义，否则会识别为运算符号】
    dict[row.split('=')[0]] = row.split('=')[1].replace(/\+/g, ' ')
  });

  // 返回字典
  return dict
}

export default {
  // 解析url传参
  parseGetUrl
}
