
 
//1.这样是不允许的
var flag=true
// if (flag) {
//     import obj from "./foo.js"
// }

if(flag){
    var importPromise=import("./foo.js")
    importPromise.then(res=>{
        console.log(res.name);
    })
}

if(flag){
     import("./foo.js").then(res=>{
        console.log(res.name);
    })
}