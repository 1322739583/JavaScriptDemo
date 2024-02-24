// setTimeout(() => {
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     setTimeout(() => {
//         console.log("Hello JS")
//         console.log("Hello JS")
//         console.log("Hello JS")
//         console.log("Hello JS")
//         console.log("Hello JS")
//         setTimeout(() => {
//             console.log("Hello Python")
//             console.log("Hello Python")
//             console.log("Hello Python")
//             console.log("Hello Python")
//             console.log("Hello Python")
//         }, 1000)
//     }, 1000)
// }, 1000)
//
//
// //使用promise处理
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve()
//     }, 1000)
// }).then(() => {
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, 1000)
//     })
// }).then(() => {
//     console.log("Hello JS")
//     console.log("Hello JS")
//     console.log("Hello JS")
//     console.log("Hello JS")
//     console.log("Hello JS")
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, 1000)
//     })
// }).then(() => {
//     console.log("Hello Python")
//     console.log("Hello Python")
//     console.log("Hello Python")
//     console.log("Hello Python")
//     console.log("Hello Python")
// })
//
// //错误处理
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve()
//         reject("err message")
//     }, 1000)
// }).then(() => {
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
// }).catch((err) => {
//     console.log(err);
// })
//
//
// //第二种错误处理方式
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve()
//         reject("err message")
//     }, 1000)
// }).then(() => {
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
//     console.log("Hello World")
// }, err => {
//     console.log(err);
// })
//
//
// //使用Promise进行多次处理，任务分解。
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("aaa")
//     }, 1000)
// }).then(res => {
//     console.log("第一次10行处理")
//     return new Promise(resolve => {
//         //对结果进行第一次处理
//         resolve(res + "111")
//     })
// }).then(res => {
//     console.log("第二次10行处理")
//     return new Promise(resolve => {
//         //对结果进行第一次处理
//         resolve(res + "222")
//     })
// }).then(res => {
//     console.log("第三次10行处理")
//     return new Promise(resolve => {
//         //对结果进行第一次处理
//         resolve(res + "333")
//     })
// })
//
//
// //使用Promise进行多次处理，任务分解。
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("aaa")
//     }, 1000)
// }).then(res => {
//     console.log("第一次10行处理")
//     return Promise.resolve(res + "111")
// }).then(res => {
//     console.log("第二次10行处理")
//     return Promise.resolve(res + "222")
// }).then(res => {
//     console.log("第三次10行处理")
//     return Promise.resolve(res + "333")
// })
//
//
// //还能进一步简写，Promise都不想写，这样已经非常舒服了
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("aaa")
//     }, 1000)
// }).then(res => {
//     console.log("第一次10行处理")
//     return res + "111"
// }).then(res => {
//     console.log("第二次10行处理")
//     return res + "222"
// }).then(res => {
//     console.log("第三次10行处理")
//     return res + "333"
// })
//
// //reject的简写
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("aaa")
//     }, 1000)
// }).then(res => {
//     console.log("第一次10行处理")
//     return res + "111"
// }).then(res => {
//     console.log("第二次10行处理")
//     //第一种简写方式
//     //return Promise.reject("err message")
//     //第二种简写方式 不想写Promise
//     throw "err message"
// }).then(res => {
//     console.log("第三次10行处理")
//     return res + "333"
// }).catch(err => {
//     console.log("err message from second process")
// })


Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log("开始第一个请求")
            resolve("result1")
        },2000)

    }),
    new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log("开始第二个请求")
            resolve("result2")
        },1000)
    })
]).then(results=>{
    console.log(results[0])
    console.log(results[1])
    console.log("开始第三个请求")
})
