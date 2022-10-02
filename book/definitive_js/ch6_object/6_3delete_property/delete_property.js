
var book={
    "main-title":"JS",
    price:50.00,
    author:{
        fiistname:"Tom",
        lastname:"Jack"
    }
}

//1.删除属性后，只剩一个price属性了
delete book.author
delete book["main-title"]   
console.log(book);
console.log(book.author);

//2.这个例子看起来非常的奇怪，但其实非常的好理解。
//delete只是删除关系，并没有删除内存中的实例。
//其实就是指针没有了，指针所指的东西还在。
a={
    p:{
        x:1
    }
}

b=a.p

console.log(".........");
//其实就是把a到p的指针删除了，但这时候b还是指向p的
console.log(delete a.p);  
console.log(a.p);
console.log(b.x);

//3.delete是有返回值的，删除成功或者没有副作用的时候(例如属性不存在)，都是返回true
var o={x:1}
//返回true
console.log(delete o.x);
//什么都没做，返回true
console.log(delete o.x);
//什么都没做，返回true,toString是继承过来的
console.log(delete o.toString());
//无意义返回true
console.log(delete 1);

//4.delete不可配置的属性会返回false,严格模式抛出错误
//Object.prototype不可配置
console.log(delete Object.prototype);
var x=1
//变量是带有不可删除特性的
console.log(delete x);
function foo() {
}
//函数也是不可配置的
console.log(delete foo);


//测试下面代码的时候，要把前面的var x注释掉
//直接这样写是不会报错的，这样写的意思是x是window对象的一个属性。
//而写成var x=2表示x是一个变量，变量是带有不可删除特性的。
x=2
//在严格模式下，在编译阶段就报错，需要写成this.x
//前面的foo方法在这种情况下也会报错。
console.log(delete x);

