/**
 * 从时间角度来说，最推荐使用for of的形式来遍历，这是ES6的语法
 */



const arr=["a","b","c"]
//方式一：传统方式 从js诞生就存在，最原始写法，缺点就是比较繁琐
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
}
console.log("..........")
//方式二：这个非常的早，和方式一是同时存在的，其实是专门给对象用的，不推荐在数组里面使用
for(let index in arr){
    console.log(arr[index])
}
console.log("..........")
//方式三：ES6新语法推荐使用  
for (let item of arr){
    console.log(item)
}
console.log("..........")
//这种方式可以同时获取索引，但是一般只推荐使用for of或者forEach
for(let [item,index] of arr.entries()){
    console.log(item,index);
}

arr.forEach((item,index)=>{
    console.log(item,index);
})

 
