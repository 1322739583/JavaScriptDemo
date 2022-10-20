// function request(fn){
//     //做一些耗时操作
//     //操作完成
//     fn();
// };
// function callback(){
//     console.log("bar")
// };
// request(callback);

url = "http://xyz.com/index.html";

function request(url, callback) {
    console.log("通过" + url + "发送网络请求")
    console.log("网络请求完成")
    var data = [1, 2, 3]
    callback(data)
}

function callback(data) {
    console.log("回调成功")
    //对data进行处理
}

//  request(url,callback)
//
request(url, function callback(data) {
    console.log("回调成功")
    console.log("请求到的数据是" + data)
    //对data进行处理
})

request(url, function (data) {
    console.log("回调成功")
    console.log("请求到的数据是" + data)
    //对data进行处理
})
//
request(url, data => {
    console.log("回调成功")
    console.log("请求到的数据是" + data)
    //对data进行处理
})