// 什么是生成器（Generator）？
// 1. 生成器函数是 ES6 提供的一种异步编程解决方案，它的语法行为与传统函数完全不同。
// 2. 特征：function 后面带一个星号 *；内部使用 yield 关键字来【暂停】代码执行。
// 3. 执行生成器函数，并不会立即执行里面的代码，而是返回一个【生成器对象（也是一个迭代器对象）】！

// 这个叫生成器构造函数 GeneratorFunction
function* foo() {
  console.log("代码段 1 执行");
  yield "第一次产出的值";

  console.log("代码段 2 执行");
  yield "第二次产出的值";

  console.log("代码段 3 执行");
  return "最终结束的值";
}

// 💥 调用生成器函数，返回生成器对象（此时函数体内的代码一行都还没执行！）
const generator = foo();

// 通过调用 .next() 来分段推进代码执行：
// 第 1 次调用 next：执行到第 1 个 yield 处暂停，把 yield 后面的值作为 value 产出
console.log(generator.next()); // 输出: 代码段 1 执行 -> { value: '第一次产出的值', done: false }

// 第 2 次调用 next：从上次暂停的地方恢复，执行到第 2 个 yield 暂停
console.log(generator.next()); // 输出: 代码段 2 执行 -> { value: '第二次产出的值', done: false }

// 第 3 次调用 next：执行到 return 结束，done 变为 true
console.log(generator.next()); // 输出: 代码段 3 执行 -> { value: '最终结束的值', done: true }

// 第 4 次调用 next：已经结束了，value 为 undefined
console.log(generator.next()); // 输出: { value: undefined, done: true }

