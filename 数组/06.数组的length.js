//js数组的length是可以直接实现数组的扩容和截取的。
//当设置为0的时候表示情况数组，这个还是非常好用的
const arr=[1,2,3,4,5]
console.log(arr.length)
arr.length=10
console.log(arr)
arr.length=2
console.log(arr)
arr.length=0
console.log(arr)