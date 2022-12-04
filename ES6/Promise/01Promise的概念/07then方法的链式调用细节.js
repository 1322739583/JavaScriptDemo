const promise = new Promise((resolve, reject) => {
  resolve("success");
  //reject("failure");
});

promise
  .then((res) => {
    console.log("第一次调用：", res);
    return "来自第一次调用的结果"
  })
  .then((res) => {
    console.log("第二次调用：", res);
  })
  .then((res) => {
    console.log("第三次调用：", res);
  });

promise.then((res) => {
  console.log("独立的then：", res);
});

promise.catch((err) => {
  console.log("失败：", err);
});
