const names=["a","b","c"]
//这样是允许的，不会存在越界问题。但没人会这样做，了解就行。
names[3]="d"
console.log(names)
//这样写就更奇怪了，中间会留空，没人这样做，了解就行。
names[10]="l"
console.log(names)

const arr=["a","b","c"]
//后插,可以插入多个元素
arr.push("e","f","g")
//前插，可以插入多个元素
arr.unshift("1","2","3")
console.log(arr)