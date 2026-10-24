/**
 * 这里最大的问题是你可能记不住方法的作用。
 * 告诉你一个记忆技巧，push,unshit因为字比较多，所以是添加，pop,shift字比较少，所以是删除。
 */
const arr=["a","b","c"]
const lastItem=arr.pop()
const firstItem=arr.shift()
console.log(lastItem,firstItem)
//不推荐这样做，只是清空数据，位置还是在的
delete arr[0]
console.log(arr)