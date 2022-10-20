//函数声明
foo()

function foo() {
    var message = "Foo"
    console.log(message)
}

//函数表达式
bar()
var bar = function () {
    var message = "Bar"
    console.log(message)
}

foo(bar())

