// 显式绑定：通过 JavaScript 原生提供的 call、apply、bind 方法，强行指定 this 指向
// 核心规则：括号里传入谁，函数执行时的 this 就死死绑定到谁身上！

function greet(greeting, punctuation) {
  console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

const user = {
  name: "Jerry",
};

// ----------------------------------------------------------------------
// 1. call 方式绑定
// 特点：立即执行函数，第一个参数是 this 绑定的对象，后面的参数逐个传入
greet.call(user, "Hello", "!"); // 输出: Hello, I am Jerry!

// ----------------------------------------------------------------------
// 2. apply 方式绑定
// 特点：立即执行函数，第一个参数是 this 绑定的对象，第二个参数是【数组】（所有实参放进数组里）
greet.apply(user, ["Hi", "~"]); // 输出: Hi, I am Jerry~

// ----------------------------------------------------------------------
// 3. bind 方式绑定（硬绑定）
// 特点：【不会立即执行函数】！而是返回一个被永久锁死 this 的全新函数，后续随时可以手动调用
const boundGreet = greet.bind(user, "Good morning");
boundGreet("."); // 输出: Good morning, I am Jerry.

// ----------------------------------------------------------------------
// 4. 边缘情况（面试常考细节）：
// 如果 call/apply/bind 传入 null 或 undefined，会发生什么？
// 在非严格模式下，传入 null 或 undefined 会被引擎忽略，自动退化为【默认绑定】（指向全局对象）。
// 在严格模式下，传入什么就是什么（传入 null 就是 null，传入 undefined 就是 undefined）。

