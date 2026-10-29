// 生成器的高级特性：通过 next() 方法向生成器内部传递参数
// 核心规则：next(参数) 传递进去的值，会作为【上一个暂停的 yield 表达式的返回值】！

function* calc(num1) {
  console.log("1. 初始参数：", num1);

  // yield 产出 100，同时等待外部下一次 next 传入的值赋给 n2
  const n2 = yield 100;
  console.log("2. 外部传入并赋给 n2 的值：", n2);

  const n3 = yield 200;
  console.log("3. 外部传入并赋给 n3 的值：", n3);

  return num1 + n2 + n3;
}

const gen = calc(10);

// 第 1 次调用 next：启动生成器，执行到第 1 个 yield 产出 100
// （注意：第 1 次 next 传参通常无意义，因为前面没有上一个 yield）
console.log(gen.next()); 
// 输出: 1. 初始参数：10 -> { value: 100, done: false }

// 第 2 次调用 next(50)：把 50 喂给上一个 yield，因此 n2 接收到了 50！
console.log(gen.next(50)); 
// 输出: 2. 外部传入并赋给 n2 的值：50 -> { value: 200, done: false }

// 第 3 次调用 next(30)：把 30 喂给上一个 yield，因此 n3 接收到了 30！
console.log(gen.next(30)); 
// 输出: 3. 外部传入并赋给 n3 的值：30 -> { value: 90, done: true } (10 + 50 + 30)

