const arr=["a","b","c"]
const lastItem=arr.pop()
const firstItem=arr.shift()
console.log(lastItem,firstItem)
//不推荐这样做，只是清空数据，位置还是在的
delete arr[0]
console.log(arr)