//这个函数非常的好用
//既可以做删除，也可以做添加，而替换的本质就是先删除后添加
//splice(start[,deleteCount[,item1[,item2[]]]])
//参数里面的[]表示是可选的，这种写法在一些库里面非常的常见。
const arr=[1,2,3,4,5]
//splice操作的是原数组
//从下标1位置开始删除两个。
arr.splice(1,3)
console.log(arr)
arr.splice(1,0,2,3)
console.log(arr)
arr.splice(1,2,6,7)
console.log(arr)