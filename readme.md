## 项目说明

> 一个简单的js工具项目，把平常用到的一些函数，汇总到一起。

## 安装

`yarn add yf-jstools`

或

`npm i yf-jstools`

## 使用demo

```javascript
import { LocalStorage } from 'yf-jstools'

// 获取当前系统中可能存在的语言设置
let language = LocalStorage.getValue('lang');
```
