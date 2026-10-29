// Promise.race：赛跑机制，谁最快冲过终点线，就以谁的结果为准（不管成功还是失败）！
// 应用场景：网络请求超时熔断控制（接口请求与定时器赛跑）

// 模拟真实接口请求（耗时 3 秒）
function fetchApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("从服务器成功拿到了数据！");
    }, 3000);
  });
}

// 模拟超时计时器（设置 2 秒超时）
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(`请求超时：超过了规定的 ${ms}ms 限制！`);
    }, ms);
  });
}

// ----------------------------------------------------
// 经典实战：让真实请求和 2秒 定时器去赛跑！
// 因为定时器只要 2000ms，而接口需要 3000ms，所以定时器跑赢，直接进入 catch 报错
Promise.race([fetchApi(), timeout(2000)])
  .then((res) => {
    console.log("成功结果：", res);
  })
  .catch((err) => {
    console.log("赛跑结果：", err);
    // 输出: 赛跑结果： 请求超时：超过了规定的 2000ms 限制！
  });

