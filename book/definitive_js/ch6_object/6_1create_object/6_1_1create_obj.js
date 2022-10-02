/**对象创建方式一：通过对象直接量的方式创建对象。
 * 对象直接量指的就是{}。叫法比较奇怪，熟悉就好。
 */

//1.创建空对象
var empty={}
//2.创建两个属性的对象。
//和Java是非常类似的，只是等号变成冒号，分号变成逗号
var point={x:0,y:0}
//3.复杂一点的对象
var pointx={x:point.x,y:point.y}
//4.对象的嵌套
var book={
    title:"JS",
    price:50.00,
    author:{
        firstName:"Tom",
        lastName:"Jack"
    }
}


