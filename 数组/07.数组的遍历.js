const arr=["a","b","c"]
//方式一：传统方式
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
}
console.log("..........")
//方式二：in 非常的好记，in和index是非常相似的
for(let index in arr){
    console.log(arr[index])
}
console.log("..........")
//方式三：of 这种方式是不可以获取索引的
for (let item of arr){
    console.log(item)
}
