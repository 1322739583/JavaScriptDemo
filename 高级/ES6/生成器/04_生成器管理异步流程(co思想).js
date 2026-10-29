// 异步进化的历史桥梁：Generator + Promise => 自动执行器 (co 库的思想)
// 这是理解 async/await 本质的关键！
// async/await 实际上就是【生成器函数 + 自动执行器（co思想）】的官方语法糖！

// -------------------------------------------------------------
// 0. 模拟三个有顺序依赖的异步请求（返回 Promise）
// -------------------------------------------------------------
function fetchUserId() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("user_1001"), 300);
  });
}

function fetchOrderId(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`order_for_${userId}`), 300);
  });
}

function fetchOrderDetail(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: orderId, product: "MacBook Pro", price: 16999 }), 300);
  });
}

// -------------------------------------------------------------
// 1. 使用生成器函数组织异步流程
// -------------------------------------------------------------
// 用同步的代码风格来写异步逻辑！
function* getData() {
  console.log("--> 流程开始");
  const userId = yield fetchUserId();
  console.log("获取到用户ID:", userId);

  const orderId = yield fetchOrderId(userId);
  console.log("获取到订单ID:", orderId);

  const detail = yield fetchOrderDetail(orderId);
  console.log("获取到订单详情:", detail);

  return "全部处理完毕！";
}

// -------------------------------------------------------------
// 2. 如果手动执行 Generator：痛苦的手动回调嵌套 (只做演示)
// -------------------------------------------------------------
/*
const gen = getData();
gen.next().value.then((userId) => {
  gen.next(userId).value.then((orderId) => {
    gen.next(orderId).value.then((detail) => {
      const result = gen.next(detail);
      console.log(result.value);
    });
  });
});
*/

// -------------------------------------------------------------
// 3. 封装通用的自动执行器 execGenerator (co 库的极简实现)
// -------------------------------------------------------------
function execGenerator(genFn) {
  return new Promise((resolve, reject) => {
    // 1. 调用生成器函数，获取生成器对象
    const gen = genFn();

    // 2. 定义逐步执行的递归步进函数
    function step(nextVal) {
      let result;
      try {
        // 将上一步 Promise 的兑现结果传入 next()，赋值给 yield 左侧的变量
        result = gen.next(nextVal);
      } catch (err) {
        return reject(err);
      }

      // 3. 判断生成器是否全部执行完成
      if (result.done) {
        return resolve(result.value);
      }

      // 4. 将 yield 产出的值统一包装成 Promise，成功后自动递归推进下一步
      Promise.resolve(result.value)
        .then((res) => {
          step(res); // 递归调用，把结果传给下一次 next
        })
        .catch((err) => {
          // 如果 Promise 失败，通知生成器内部抛错
          try {
            gen.throw(err);
          } catch (e) {
            reject(e);
          }
        });
    }

    // 启动执行
    step();
  });
}

// -------------------------------------------------------------
// 4. 执行体验
// -------------------------------------------------------------
execGenerator(getData).then((finalRes) => {
  console.log("--> 自动执行器完成通知:", finalRes);
  console.log("💡 看到了吗？把 function* 换成 async，把 yield 换成 await，代码一模一样！");
});

