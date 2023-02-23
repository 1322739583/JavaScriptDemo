const person={
    name:"Tom",
    age:18
}
//对象解构的基本使用
function test1(){
    //ES6新语法,对象解构
    const {name,age}=person
    console.log(name," ",age)
    //传统写法看起来很长
    console.log(person.name," ",person.age)
}
//可以在解构的时候取别名
function test2(){
    //可以取别名
    const {name:personName,age:personAge}=person
    console.log(personName," ",personAge)
}

//解构属性不存在，输出undefined
function test3(){
    const {abc}=person
    //属性不存在，输出undefined
    console.log(abc)
}

//对象解构的初始值
function test4(){
    //赋初始值，不存在的值才有效果，如果已经有值，是不会修改的。
    //下面的name和age是没有效果的，addr有效果。
    const {name="Jack",age="19",addr="广东"}=person
    console.log(name,age,addr)
}

//不能解构null和undefined
function test5(){
    //不能解构，报错
    const {a}=null
    const {b}=undefined
}

test1()
test2()
test3()
test4()
test5()