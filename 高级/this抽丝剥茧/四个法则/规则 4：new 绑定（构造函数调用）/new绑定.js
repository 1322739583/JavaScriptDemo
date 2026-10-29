// new 绑定：使用 new 操作符调用构造函数时产生的绑定
// 核心规则：构造函数内部的 this，会被引擎自动绑定到【新创建出来的那个空对象】上！

function Person(name, age) {
  // 这里的 this 就是 new 出来的新对象实例
  this.name = name;
  this.age = age;
}

const p1 = new Person("Alice", 18);
console.log(p1.name); // 输出 'Alice'，this 绑定成功

// ----------------------------------------------------------------------
// 进阶陷阱：构造函数的返回值对 this 的影响（面试必考题）
// 规则：
// 1. 如果构造函数没有 return，或者 return 的是基本数据类型（如数字、字符串、null、布尔），则忽视 return，最终依然返回 this！
// 2. 如果构造函数显式 return 了一个【对象】（引用类型），那么 new 出来的结果会被强行篡改，丢弃 this，返回那个对象！

function PersonA() {
  this.name = "Alice";
  return "hello"; // 返回原始类型，被直接忽略
}
const a = new PersonA();
console.log(a.name); // 输出 'Alice'

function PersonB() {
  this.name = "Alice";
  return { name: "Bob" }; // 💥 显式返回了一个新对象
}
const b = new PersonB();
console.log(b.name); // 输出 'Bob'！原来的 this 被完全替换掉了！

// ----------------------------------------------------------------------
// 🏆 4 大法则的终极优先级（谁说了算？）
// new 绑定 > 显式绑定 (call/apply/bind) > 隐式绑定 (obj.fn()) > 默认绑定 (独立调用)

