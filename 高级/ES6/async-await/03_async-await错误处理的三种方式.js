// async/await 错误处理的三种实战方案

// 模拟一个可能失败的接口
function requestUserData(isSuccess = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve({ id: 101, name: "Alice" });
      } else {
        reject(new Error("网络超时或服务器 500 异常"));
      }
    }, 200);
  });
}

// -------------------------------------------------------------
// 方案一：标准 try...catch 捕获
// -------------------------------------------------------------
// 适用场景：需要统一处理错误、或者需要阻断后续代码继续执行时。
// 缺点：如果代码中有大量不同的 await，且每个的错误处理逻辑不同，try...catch 块会显得臃肿。
async function solution1() {
  console.log("--> 方案一：try...catch 开始");
  try {
    const user = await requestUserData(false);
    console.log("请求成功:", user);
  } catch (error) {
    console.error("方案一捕获到错误:", error.message);
  } finally {
    console.log("方案一清理工作（无论成败都执行）");
  }
}

// -------------------------------------------------------------
// 方案二：为特定 Promise 挂载 .catch() 返回兜底值
// -------------------------------------------------------------
// 适用场景：某个次要接口请求失败不影响整体页面渲染，希望给一个默认降级值（fallback）。
// 优点：不需要包一层冗长的 try...catch，单行搞定！
async function solution2() {
  console.log("\n--> 方案二：.catch() 兜底降级开始");

  // 如果请求失败，.catch 捕获并返回默认兜底对象，不会抛错中断函数
  const user = await requestUserData(false).catch((err) => {
    console.warn("请求失败，使用兜底游客数据:", err.message);
    return { id: 0, name: "默认游客" };
  });

  console.log("最终使用的用户信息:", user);
}

// -------------------------------------------------------------
// 方案三：仿 Go 语言风格的 [err, data] 元组封装 (await-to-js 方案)
// -------------------------------------------------------------
// 核心思想：把 Promise 转成始终 resolve 的 [error, data] 数组。
// 优点：代码完全扁平化，无任何缩进地狱，业界企业级项目极其推崇！

// 极简包装工具函数 to
function to(promise) {
  return promise
    .then((data) => [null, data])
    .catch((err) => [err, null]);
}

async function solution3() {
  console.log("\n--> 方案三：to 模式解构开始");

  const [err, user] = await to(requestUserData(false));

  if (err) {
    console.error("方案三判断发现错误:", err.message);
    // 处理错误或提前 return 退出
    return;
  }

  // 没有错误，直接安全使用数据
  console.log("方案三顺利获取数据:", user);
}

// 依次调用测试
async function runAll() {
  await solution1();
  await solution2();
  await solution3();
}

runAll();

