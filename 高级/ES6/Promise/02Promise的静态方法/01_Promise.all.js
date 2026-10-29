// Promise.all：全员成功才成功（同生共死）；只要有一个失败，当场一票否决宣布失败！
// 应用场景：页面初始化时多个独立并发请求，全部就绪后再渲染页面

const p1 = new Promise((resolve) => {
  setTimeout(() => resolve("用户基本资料"), 1000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => resolve("粉丝数量"), 500);
});

const p3 = new Promise((resolve) => {
  setTimeout(() => resolve("荣誉勋章列表"), 1500);
});

// ----------------------------------------------------
// 场景 1：全部成功（输出所有结果的数组，顺序与传入顺序严格一致）
Promise.all([p1, p2, p3])
  .then((results) => {
    console.log("全部成功：", results);
    // 输出: ['用户基本资料', '粉丝数量', '荣誉勋章列表']
  })
  .catch((err) => {
    console.log("失败：", err);
  });

// ----------------------------------------------------
// 场景 2：其中一个失败（一票否决，直接进入 catch）
const pError = new Promise((_, reject) => {
  setTimeout(() => reject("网络错误：获取勋章失败"), 800);
});

Promise.all([p1, p2, pError])
  .then((results) => {
    console.log("成功：", results);
  })
  .catch((err) => {
    console.log("一票否决，失败原因：", err);
    // 输出: 一票否决，失败原因： 网络错误：获取勋章失败
  });

