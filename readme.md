## 项目说明

> 一个简单的js工具项目，把平常用到的一些函数，汇总到一起。

## 安装

`yarn add yf-jstools`

或

`npm i yf-jstools`

## 使用demo

```javascript
import { LocalStorage } from 'yf-jstools'

// 定义变量a=123
let a = 123;
// 打印日志
console.log('set key:', a, typeof a); // set key: 123 number
// 存储
LocalStorage.setValue('key', a);

// 取出
let b = LocalStorage.getValue('key');
// 打印日志
console.log('get key:', b, typeof b); // get key: 123 number
```
