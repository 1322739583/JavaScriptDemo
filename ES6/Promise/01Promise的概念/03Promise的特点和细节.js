function getCities(path) {
  const promise = new Promise((res, reject) => {

    // reject("path不能为空");
    console.log("........."); 
    res("xxx");
    res("xxx");
  });
  return promise;
}

getCities("/home/getCityData")
.then(value=>{
    console.log("数据为："+value);
}).catch(err=>{
    console.log("失败的原因是："+err);
})