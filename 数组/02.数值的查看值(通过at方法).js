const names=["a","b","c"]
//获取数值的值没什么好说的
const lastEl=names[names.length-1]
console.log(lastEl)
//还可以通过负值从末尾往前数，这是非常骚气的。
//这和names[names.length-1]结构上是非常类似的，都是-1
console.log(names.at(-1))
//正值和一般操作一样
console.log(names.at(0))