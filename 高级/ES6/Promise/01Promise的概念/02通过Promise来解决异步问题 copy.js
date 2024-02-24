function getCities(path) {
    //1.使用promise处理
    const promise = new Promise((resolve, reject) => {
    if (path === "") {
      //或者path格式有问题
      reject("path不能为空");
    } else {
      //发生请求
      console.log("开始发生请求");
      console.log("数据请求中......");
      setTimeout(() => {
        console.log("请求到数据了");
        //假装获取到数据了
        const data = ["广州", "上海", "温州"];
        resolve(data);
      }, 2000);
    }
  });

  return promise;
}
//2.成功的情况
const promose2=getCities("/home/getCityData");
//3.失败的情况
// const promose2=getCities("");

//4.处理结果
promose2.then(value=>{
    console.log("数据为："+value);
})

promose2.catch(err=>{
    console.log("失败的原因是："+err);
})

//5.处理结果的简写
promose2.then(value=>{
    console.log("数据为："+value);
}).catch(err=>{
    console.log("失败的原因是："+err);
})