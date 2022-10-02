//练习一:函数的最基本使用

//知识点一:对于function关键字的解释
/**
 * function关键字是不可以省略的。和Java比起来这看起来似乎是多余可以省去的。
 * 但因为js没有指定返回类型，所以还是有必要用function这个关键字来标识是函数的。
 */

//知识点二:js的参数和返回值都不需要指定类型,你想加也是不可以的，会报错。
/**
 *
 */
// var t = function (num) {
//     console.log(num)
//     return num + 1
// }
    // var res = foo(1);
    // console.log(res)


    //知识点三:立即执行函数，也就是直接跟小括号。
    //  function a(x) {
    //     console.log("123")
    // }(10)

   (function(num){
       console.log(num)
        console.log();
        console.log();

   })(10)