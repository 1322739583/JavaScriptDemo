//有...就是剩余参数，这是语法。
//这种情况就相当于是arguments，但剩余参数是数组，而arguments不是数组。
function foo(...args){
    console.log(args)
}

foo(1,2,3)

//剩余参数必须放到最后一个位置
//剩余参数是es6用来替代arguments的，剩余参数本身就是一个数组，操作起来更加的方便。
function bar(n1,n2,...otherNums){
    console.log(otherNums)
}

bar(1,2,3,4,5,6)