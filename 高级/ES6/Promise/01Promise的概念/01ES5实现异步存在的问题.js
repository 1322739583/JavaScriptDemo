//1.实现主要逻辑
function getCities(path, onSuccess, onErr) {
  if (path === "") {
    //或者path格式有问题
    onErr("请求失败，path不能为空");
  } else {
    //发生请求
    console.log("开始发生请求");
    console.log("数据请求中......");
    setTimeout(()=>{
        console.log("请求到数据了");
        //假装获取到数据了
        const data = ["广州", "上海", "温州"];
        onSuccess(data);
    },2000)
  }
}
//2.测试成功状况
// console.log("..............测试成功请求...............");
// getCities(
//   "/home/getCityData",
//   res => {
//     console.log(res);
//   },
//   err=> {
//     console.log(err);
//   }
// );

// //3.测试失败状况
console.log("..............测试失败请求...............");
getCities("",
    res => {
      console.log(res);
    },
    err=> {
      console.log(err);
    }
  );
