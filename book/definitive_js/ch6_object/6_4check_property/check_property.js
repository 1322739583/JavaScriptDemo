//检查是否包含一个属性有很多种方法，可以用 in

//1.使用in检测是否包含属性
var o={x:1}
console.log("x" in o);//true
console.log("y" in o);//false
console.log("toString" in o);//父类继承，true

var book={
    "main-title":"JS",
    price:50.00,
    author:{
        firstname:"Tom",
        lastname:"Jack"
    }
}
console.log("..........");
//返回false
console.log("firstname" in book);

//2.使用hasOwnProperty方法
console.log(o.hasOwnProperty("x"));//true
console.log(o.hasOwnProperty("y"));//false
console.log(o.hasOwnProperty("toString"));//这里和上面不太一样，toString不是自身属性
console.log(book.hasOwnProperty("firstname"));//false
console.log(book.hasOwnProperty("main-title"));//true