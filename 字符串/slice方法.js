var str="123322"
//slice可以传两个值。第一个参数start是开始下标，负数表示从尾部开始。第一个参数end是结束下标。
//返回截取后的值。
//slice本质上是一个截取函数。

//删除第一个位置的内容，返回删除后的字符串
var s = str.slice(1,2);

console.log(s)
console.log(str)