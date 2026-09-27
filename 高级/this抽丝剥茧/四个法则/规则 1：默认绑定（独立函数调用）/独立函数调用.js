// 默认绑定就是指这种独立函数的调用，这个函数是直接调用，前面没有任何的前缀
function foo() {
  console.log(this);
}
foo(); //指向global
// 默认绑定this指向取决于是否开启严格模式
/**
 * 非严格模式，this指向全局对象，浏览器是window,node是global。
 * 严格模式this都指向undefined。
 */
