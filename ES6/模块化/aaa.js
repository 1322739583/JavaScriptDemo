let name="Tom";
let age=20;
function sum(a,b) {
    return a+b
}
console.log("name:"+name+" age:"+age+" in aaa.js")

export {
    sum,name,age
}

export var isChange=true

export function foo(a) {
    console.log(a)
}

export class Person{
   constructor(name,age) {
      this.name=name
       this.age=age
   }

   run(){
       console.log(this.name+"在奔跑")
   }

}
