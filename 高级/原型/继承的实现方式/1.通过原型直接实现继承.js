function Father(){
   this.name="Father"
}
// 这是公约，方法一定要挂载到prototype上，
// 你写到Father里面不会报错，但是会在创建很多对象的时候存在内存占用的问题。
Father.prototype.sayHi=function(){
    console.log("Hi",this.name);
}
function Son(){

}

Son.prototype=new Father()//继承父类的属性
var son=new Son()
son.sayHi()

console.log(son.name);
