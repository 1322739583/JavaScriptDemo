// 精髓在于在js机制里面，小括号里面的内容会被认为是表达式，而括号内的表达式返回函数地址。
(function () {
  foo();
})();

function foo() {
  console.log("this is foo ", this);
}
