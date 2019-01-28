/**
 * 得到分页结果
 * 第一个参数: 第几页
 * 第二个参数: 每页多少条记录
 * 第三个参数: 一共有多少条记录
 * 第四个参数: 用于分页的数组
 * 返回: 指定的分页数据切片
 * @return {array}
 */
/* eslint-disable */
function pagesVal (page, pageNumbers, allNumbers, arr) {
  // 计算开始值
  let start_num = (page - 1) * pageNumbers;
  // 计算结束值
  let end_num = 0;
  if (start_num < allNumbers) {
    if (pageNumbers > (allNumbers - start_num)) {
      end_num = allNumbers
    } else {
      end_num = start_num + pageNumbers
    }
  } else {
    return []
  }
  return arr.slice(start_num, end_num)
}

module.exports = {
  // 前端分页函数
  pagesVal
};
