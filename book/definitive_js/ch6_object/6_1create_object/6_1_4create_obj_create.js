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



//4.非常重要的继承方法
//这个方法在这章一直用到，非常的不合理，也没有解释清楚这个方法的含义。
//在第二个判断后面的代码是不会执行的，可以把这个方法理解为就是Object.create(p)
function inherit(p) {
    if (p==null) {
        throw TypeError
    }

    if(Object.create){
        return Object.create(p)
    }

    var t=typeof p
    if (t!=="object"&&t !== "function") {
        throw TypeError
    }

    function f() {}
    f.prototype=p
    return new f()
}