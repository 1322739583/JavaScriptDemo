    //create方法可以传入一个参数，这个参数类型可以是对象类型或者null。传入的对象当做原型
    /**
     * Creates an object that has the specified prototype or that has null prototype.
     * @param o Object to use as a prototype. May be null.
     * 
     *   create(o: object | null): any;
     */


//1.和new Object()是一样的
var o1=Object.create(Object.prototype)

//2.比new Object()还少了一些功能，不继承任何属性和方法，比如toString,+等
var o2=Object.create(null)
console.log(o2);

//3.原型来自用户给的直接量
var o3=Object.create({x:0,y:0})
console.log(o3);
console.log();