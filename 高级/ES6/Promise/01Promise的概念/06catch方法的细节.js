const promise = new Promise((resolve, reject) => {
    resolve("success")
  //reject("failure");
});

promise
  .then((res) => {
    console.log("成功：", res);
  })

promise.catch((err) => {
    console.log("失败：", err);
});

promise.catch((err) => {
  console.log("失败：", err);
});


