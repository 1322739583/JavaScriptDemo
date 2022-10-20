function foo(num1,num2){
    console.log("num1:"+num1+" num2:"+num2)
    console.log(this)
    console.log("..........")
}

var obj={
    message:"哈哈哈",
    age:18
}

// foo(10,20)

foo.apply(obj,[10,20])
//必须传数组，哪怕只有一个参数
foo.apply(obj,[10])

foo.call(obj,[10,20],30,40)