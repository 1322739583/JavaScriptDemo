//转化为数组的第一种方式
function foo() {
    let newArr = []
    for (const arg of arguments) {
        newArr.push(arg)
    }
    console.log(newArr)
}

foo(1, 2, 3)

//转化为数组的第二种方式
function bar() {
    let arr = Array.from(arguments);
    console.log(arr)
}

bar(4, 5, 6)

//转化为数组的第三种方式
function baz(){
    //...可以取出数组，并遍历到一个对象里面
    let arr=[...arguments]
    console.log(arr)
}

baz(7,8,9)

//转化为数组的第四种方式
//slice回顾：直接调用slice可以做拷贝
// let nums=[1,2,3]
// let newArr = nums.slice();
// console.log(newArr)

function qux(){
    //这个写法在es6之前是非常常见的。
     let arr = [].slice.apply(arguments);
    // let arr = Array.prototype.slice.apply(函数的arguments);
    console.log(arr)
}

qux(10,11,12)