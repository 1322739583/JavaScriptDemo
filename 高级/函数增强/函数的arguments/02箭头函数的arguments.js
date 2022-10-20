//1.箭头函数没有argument
// var foo = () => {
//     console.log(arguments)
// }
// foo(1,2,3)

//2.会去上层作用域找arguments
function bar(){
    var baz=()=>{
        console.log(arguments)
    }
    baz()
}

bar(4,5,6)