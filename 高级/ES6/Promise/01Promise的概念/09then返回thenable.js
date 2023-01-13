const promise = new Promise((resolve, reject) => {
  resolve("success");
  //reject("failure");
});

const p=new Promise((resolve,reject)=>{
  resolve("来自新的promise")
})

promise
  .then((res) => {
    console.log("第一次调用：", res);
    return {
      then:function(resolve){
           resolve("来自thenable的数据")
      }
    }
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
 