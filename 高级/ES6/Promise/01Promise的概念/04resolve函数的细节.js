function getCityData(path){
    return new Promise((resolve,reject)=>{
        //1.传递普通值
        //  resolve("Tom")
        //  resolve(10)
        //  resolve([1,2,3])

        //2.传一个Promise
        //  console.log("..第二个Promise..");
        //  resolve(new Promise((resolve,reject)=>{
        //     console.log("..第二个Promise..");
        //     resolve("在第二个Promise的resolve被处理")
        //  }))

        //3.
        resolve({
            name:"Tom",
            then:function(resolve){
                console.log("........");
                resolve("333")
                console.log(">>>>>>>>");
            }
        })
    })
}

getCityData("/home/city").then(res=>{
    console.log("数据是"+res);
})