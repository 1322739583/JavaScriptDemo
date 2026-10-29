// 隐式绑定：通过某个上下文对象来调用函数（前面有小圆点和对象前缀，如 obj.fn()）
// 核心规则：谁调用这个方法，this 就隐式绑定到谁身上！

const obj = {
  name: "Tom",
  foo: function () {
    console.log(this.name);
  },
};

obj.foo(); // 输出 'Tom'，this 隐式绑定到 obj

// ----------------------------------------------------------------------
// 进阶 1：原型链继承下的隐式绑定
// 哪怕方法不是自身的，而是定义在原型上的，只要是通过实例调用的，this 依然严格指向调用者实例！
function Father() {
  this.name = "Father";
}
Father.prototype.sayHi = function () {
  console.log("Hi,", this.name);
};

function Son() {
  this.name = "Son";
}
Son.prototype = new Father();

const son = new Son();
son.sayHi(); // 输出 "Hi, Son"！因为是 son 点调用的，this 依然隐式绑定到 son！

// ----------------------------------------------------------------------
// 进阶 2：隐式丢失（面试高频考点）
// 当把对象的方法赋值给独立变量，或者作为回调函数传递时，会丢失上下文，退化为【默认绑定】

// 情况 A：赋值给变量
const bar = obj.foo; 
bar(); // 💥 输出 undefined！此时变成了独立函数调用，this 指向全局/undefined

// 情况 B：作为回调函数参数传递
setTimeout(obj.foo, 100); // 💥 同样输出 undefined！回调函数内部被独立调用了

