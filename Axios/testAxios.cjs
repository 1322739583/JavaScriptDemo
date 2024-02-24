const axios = require('axios');


axios.defaults.baseURL='https://api.qqsuu.cn/api';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("testAxios.cjs request config:",config)
    config.data.city="温州"
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("testAxios.cjs response config:",response)
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 向给定ID的用户发起请求
axios.post('/dm-naowan',{
    num:10,
})
    .then(function (response) {
        // 处理成功情况
        console.log(response);
    })
    .catch(function (error) {
        // 处理错误情况
        console.log(error);
    })
    .then(function () {
        // 总是会执行
    });

axios.get("/user",{
 name:"Tom"
},{
    method:"get"
})
