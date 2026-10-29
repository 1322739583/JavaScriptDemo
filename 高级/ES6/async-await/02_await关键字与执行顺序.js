// await 关键字与事件循环执行顺序深入解析

// -------------------------------------------------------------
// 1. await 关键字的基础特性
// -------------------------------------------------------------
// ① await 必须在 async 函数内部使用（或 ES2022 顶层顶级作用域中使用）。
// ② await 后面可以接：
//    - Promise 对象：等待该 Promise 状态变为 fulfilled，并拿到其 resolve 的结果。
//    - 普通值（数字、字符串、普通对象等）：会自动用 Promise.resolve() 包装并立即返回该值。
// ③ 如果 await 后面的 Promise 变成 rejected，await 表达式会直接把该错误抛出（throw）！

function fetchName() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("张三"), 200);
  });
}

async function testAwait() {
  console.log("--> testAwait 开始");

  // 接普通值
  const num = await 42;
  console.log("await 普通值:", num);

  // 接 Promise
  const name = await fetchName();
  console.log("await Promise 结果:", name);

  console.log("--> testAwait 结束");
}

testAwait();

// -------------------------------------------------------------
// 2. 面试王牌考点：await 后续代码的微任务机制与执行顺序
// -------------------------------------------------------------
// 核心心法：
// 遇到 await expr 时：
// 1. 先同步执行 expr 表达式本身。
// 2. 将 await 后面的所有代码（剩余的函数体）作为微任务放入微任务队列（就相当于 .then(callback)）！
// 3. 跳出当前 async 函数，继续执行外部的同步主线程代码！

console.log("--- 面试执行顺序经典题演示 ---");

async function async1() {
  console.log("1. async1 start");
  // 同步执行 async2()，但下一行代码会被挂起到微任务队列！
  await async2();
  console.log("2. async1 end"); // 相当于 async2().then(() => { console.log("2. async1 end") })
}

async function async2() {
  console.log("3. async2");
}

console.log("4. script start");

setTimeout(() => {
  console.log("5. setTimeout 宏任务");
}, 0);

async1();

new Promise((resolve) => {
  console.log("6. promise 构造函数");
  resolve();
}).then(() => {
  console.log("7. promise1 微任务");
}).then(() => {
  console.log("8. promise2 微任务");
});

console.log("9. script end");

// 💡 预期输出顺序（浏览器/Node最新标准规范一致）：
// 4. script start
// 1. async1 start
// 3. async2
// 6. promise 构造函数
// 9. script end
// (宏任务第一阶段完成，开始清空微任务队列)
// 2. async1 end
// 7. promise1 微任务
// 8. promise2 微任务
// (微任务队列清空，进入下一轮事件循环处理宏任务)
// 5. setTimeout 宏任务

