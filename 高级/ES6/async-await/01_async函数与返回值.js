// 什么是 async 函数？
// async 是 "asynchronous"（异步）的缩写。
// async 函数用来声明一个异步函数，它的行为和普通函数有很大的区别。

// -------------------------------------------------------------
// 1. async 函数的书写形式
// -------------------------------------------------------------
// 普通声明
async function foo1() {}
// 函数表达式
const foo2 = async function() {};
// 箭头函数
const foo3 = async () => {};
// 类方法
class Person {
  async run() {}
}

// -------------------------------------------------------------
// 2. async 函数的核心特征：【永远返回一个 Promise 对象！】
// -------------------------------------------------------------

// 情况 ①：普通返回值（没有显式 return 或 return 普通值）
// -> 会被自动包装成 Promise.resolve(返回值)
async function getNumber() {
  console.log("getNumber 执行了");
  return 123;
}

const resPromise = getNumber();
console.log("返回值类型是 Promise 吗？", resPromise instanceof Promise); // true

resPromise.then((res) => {
  console.log("情况① then 拿到的结果:", res); // 123
});

// 没有 return 时，默认返回 Promise.resolve(undefined)
async function noReturn() {
  // empty
}
noReturn().then((res) => {
  console.log("未写 return 时的结果:", res); // undefined
});

// 情况 ②：返回一个 Promise
// -> async 函数返回的新 Promise 的状态将由内部 return 的 Promise 决定
async function returnPromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("内部 Promise 兑现了"), 200);
  });
}
returnPromise().then((res) => {
  console.log("情况② 拿到的结果:", res);
});

// 情况 ③：函数内部抛出异常（throw）
// -> 不会导致全局崩溃，而是会被自动包装成 Promise.reject(err)！
async function throwError() {
  console.log("准备抛出异常...");
  throw new Error("async 内部发生了严重错误");
  console.log("这行不会执行");
}

throwError()
  .then(() => {
    console.log("这里不会被调用");
  })
  .catch((err) => {
    console.log("情况③ catch 捕获到的错误:", err.message);
  });

