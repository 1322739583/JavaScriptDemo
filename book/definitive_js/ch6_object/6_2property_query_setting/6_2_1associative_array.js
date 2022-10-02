//关联数组，这个概念非常的重要非常的有用。

//1.下标查询和字符串查询。
//这个字符串查询是别的语言都没有的功能，非常的有用，能够实现别的语言无法实现的功能。
//例如拼接出属性名称字符串来动态获取属性的值
var book={
    title:"JS",
    price:50.00,
    author:{
        fiistname:"Tom",
        lastname:"Jack"
    }
}

console.log(book.title);
console.log(book["title"]);
//2.拼接出属性名称字符串来动态获取属性的值
//这个功能非常的吊。
var factory={
    product1:"p1",
    product2:"p2",
    product3:"p3"
}

for(var i=1;i<=3;i++){
    console.log(factory["product"+i]);
}

//3.使用字符串属性可以定义一些特殊的名字
// -在JS里面是不可以作为变量名的，在加了""变成字符串类型后就可以了。
//甚至在字符串里面写空格也没有问题。
var book2={
    "sub - title":"JS",
    price:50.00,
    author:{
        firstName:"Tom",
        lastName:"Jack"
    }
}
//在使用字符串做为名字后，必须用下面这种形式
console.log(book2["sub - title"]);

//4.在网络请求中的实际应用
//我们需要的数据对象有三个板块，三个板块都是goods的属性。
//我们定义了一个可复用的请求方法。
//没有字符串查询功能的话，实现这个功能我们只能通过写三个不同的方法来实现。

//数据对象
goods={
    sell:{},
    pop:{},
    news:{}
}

//封装的网络请求
function getGoodsData(type){
   return goods[type]=new Object("来自服务器的数据")
}
//传入类型
let sellData=getGoodsData("sell")
let popNews=getGoodsData("news")
let popData=getGoodsData("pop")


