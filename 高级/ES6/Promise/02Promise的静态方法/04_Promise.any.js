// Promise.any（ES2021）：只要任意一个成功就宣布全盘成功；只有全员失败，才算失败！
// 特点：它是 Promise.all 的镜像反面
// 应用场景：多节点容灾、多 CDN 镜像服务器测速（哪个先连通就立刻用哪个）

// 场景 1：只要有一个成功
const pFail1 = new Promise((_, reject) => setTimeout(() => reject("电信节点挂了"), 500));
const pSuccess = new Promise((resolve) => setTimeout(() => resolve("联通节点连接成功！"), 800));
const pFail2 = new Promise((_, reject) => setTimeout(() => reject("移动节点超时"), 1000));

Promise.any([pFail1, pSuccess, pFail2])
  .then((res) => {
    console.log("第一个成功的节点：", res);
    // 输出: 第一个成功的节点： 联通节点连接成功！
  })
  .catch((err) => {
    console.log("全部失败：", err);
  });

// ----------------------------------------------------
// 场景 2：全军覆没（所有人都挂了）
// 会抛出一个特殊的内置错误对象：AggregateError（聚合错误）
const p1 = Promise.reject("节点1 崩溃");
const p2 = Promise.reject("节点2 崩溃");

Promise.any([p1, p2])
  .then((res) => {
    console.log("成功：", res);
  })
  .catch((err) => {
    console.log("所有节点都挂掉了：", err); // AggregateError: All promises were rejected
    console.log("所有失败原因集合：", err.errors); // ['节点1 崩溃', '节点2 崩溃']
  });

