"use strict"

//1.属性不存在返回undefine,并没有报错
var book={
    subtitle:"KS"
}
//注意这里名字故意写错，book里面的是subtitle，而这里写的是subTitle
console.log(book.subTitle);

//2.对undefine读取属性会报错误，TypeError: Cannot read properties of undefined
//console.log(book.subTitle.length);

//3.避免出错的两种写法 
//第一种写法：只要不是0，false,null和undefine就是true
if (book) {
    if (book.subtitle) {
        console.log(book.subtitle.length);
    }
}
//第二种写法
console.log(book&&book.subtitle&&book.subtitle.length);

//4.有些例外，Object.prototype是一个自读属性，但下面的代码没有报错误。
//这是一个bug,是一个历史遗留问题。通过在文件开头添加"use strict"开启严格模式就会报错了。
var obj=new Object()
Object.prototype=obj