// ==============================================================================
// 什么是高阶函数（Higher-Order Function, HOF）？
// 只要满足以下任意【一个】条件，就是高阶函数：
//   1. 接收一个或多个函数作为参数
//   2. 返回（return）一个函数
// ==============================================================================


// ==============================================================================
// 分类一：函数作为参数（“逻辑注入 / 委托给别人处理”）
// ==============================================================================
// 场景：模板代码（如循环遍历、异步等待）由外层负责，你只需要注入最核心的“动作规则”。

// 1. 原生中最常见的例子：数组的 map / filter / sort
const numbers = [1, 2, 3, 4, 5];

// 把 (x => x * 2) 这个函数当成参数丢进 map
const doubled = numbers.map(x => x * 2);
console.log("【分类一】map 结果:", doubled); // [2, 4, 6, 8, 10]


// 2. 自定义高阶函数：手写一个自己的 filter
// 感受它的价值：外层只管通用循环，具体“按什么标准过滤”由传入的 predicate 函数决定
function myFilter(array, predicateFn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    // 调用传入的函数做条件判断
    if (predicateFn(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

const evens = myFilter(numbers, n => n % 2 === 0);
console.log("【分类一】自定义 filter 筛选偶数:", evens); // [2, 4]


// ==============================================================================
// 分类二：函数作为返回值（“函数制造工厂 / 预设参数定制”）
// ==============================================================================
// 场景：生成特定用途的专用函数，常常配合闭包锁住某些初始参数。

// 案例：定制问候语生成器
function createGreeter(greeting) {
  // 返回一个新函数，该函数把 greeting 锁在闭包里
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");
const sayBye = createGreeter("Goodbye");

console.log("【分类二】定制工厂 1:", sayHello("张三")); // Hello, 张三!
console.log("【分类二】定制工厂 2:", sayBye("李四"));   // Goodbye, 李四!


// ==============================================================================
// 分类三：既收函数，又返回函数（“函数增强器 / 装饰器 Decorator / AOP”）
// ==============================================================================
// 场景：不改变原函数的代码，但在原函数运行的前后悄悄“加特效”（防抖、节流、计时、日志）

// 案例：打造一个通用的“函数性能测量器（withTimer）”
function withTimer(originalFn) {
  // 返回一个包装增强后的新函数
  return function (...args) {
    console.log(`⏱️ 开始执行函数 [${originalFn.name}]...`);
    const start = performance.now();

    // 运行原函数并保留结果
    const result = originalFn.apply(this, args);

    const end = performance.now();
    console.log(`✅ [${originalFn.name}] 执行完毕，耗时: ${(end - start).toFixed(2)} ms`);

    return result;
  };
}

// 模拟一个费时的任务
function calculateSum(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
}

// 用高阶函数给 calculateSum “镀金”，返回增强版函数
const timedCalculate = withTimer(calculateSum);

const total = timedCalculate(10000000);
console.log("计算结果:", total);


// ==============================================================================
// 总结：回看“防抖（Debounce）”，它到底是个什么？
// ==============================================================================
/*
 * function debounce(fn, delay) {
 *   let timer = null; // 👈 闭包保存状态
 *   return function(...args) { ... } // 👈 高阶函数：接收函数 fn，返回增强版函数
 * }
 * 
 * 看到这里，所有的拼图全部完整了：
 * 1. 它是高阶函数：因为接收了 fn，并且 return 了一个加工后的新函数；
 * 2. 它用了闭包：因为新函数长期强引用着外层的 timer，阻止其被垃圾回收。
 */
