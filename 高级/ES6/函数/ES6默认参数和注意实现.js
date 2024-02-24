function foo(name = "Tom", age) {
    console.log(name, age)
}

// foo("Tom",18)
// foo()
//默认值写法一
//不严谨
function test1(name, age, isStudent) {
    name = name ? name : "Tom"
    age = age ? age : 0
    isStudent = isStudent ? isStudent : false
    console.log(name, age, isStudent)
}

// test1()
test1("", 0, false)

//默认写法二
//这种写法是不严谨的，因为||是根据真值判断的，可能传入的就是false,或者可以转成false的值。
function test2(name, age, isStudent) {
    name = name || "Tom"
    age = age || 0
    isStudent = isStudent || false
    console.log(name, age, isStudent)
}

//这里就会出问题
test2("", 0, false)

//严谨的写法
function test3(name, age, isStudent) {
    name = (name === undefined || name === null) ? "Tom" : name
    age = (age === undefined || age === null) ? 0 : age
    isStudent = (isStudent === undefined || isStudent === null) ? false : isStudent
    console.log(name, age, isStudent)
}

test3("", 0, false)

//ES高版本写法
function test4(name, age, isStudent) {
    name = name ?? "Tom"
    age = age ?? 0
    isStudent = isStudent ?? false
    console.log(name, age, isStudent)
}

//对象的初始值：空对象
function test5( age, isStudent,name=false,options={} ) {
    console.log(name, age, options)
}
test5()

//对象的初始值：给属性初始值
function test6(name ,info={score:0}) {
    console.log(name,  info)
}
test6()

//对象参数的解构写法
function test7(info,{name,age}={name:"Tom",age:0}) {
    console.log(name, age)
}
test7()

//解构写法的简化写法，比较奇怪，但是要掌握
function test8(info,{name="Tom",age=0}={} ) {
    console.log("test8:",name, age)
}
test8()

//默认值是不算在length里面的。
function test9(name, age, isStudent=false) {

    console.log(test9.length)
}
test9()








