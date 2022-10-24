//1.使用到了闭包
var name="Tom"
function foo(){
    console.log(name)
}
//2.没有闭包只能传参数
function foo(name){
    console.log(name)
}