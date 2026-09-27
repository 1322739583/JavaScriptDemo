// ==========================================
// Level 0: 你的思考原点（你的原始代码与评价）
// ==========================================
// 【原代码 1】使用到了闭包？
var name = "Tom";
function foo1() {
  console.log(name);
}

// 【原代码 2】没有闭包只能传参数
function foo2(name) {
  console.log(name);
}

/*
 * 💡【对你所写代码的评价】：
 *
 * 1. 敏锐度非常高：
 *    你敏锐地注意到了“函数不传参却能跨作用域拿到外层数据”这一现象，这正是闭包与作用域链最基础的物理表现。
 *
 * 2. 严格意义上的界定：
 *    - 【学术/广义定义】：MDN 认为 JS 中所有函数都是闭包，因为它们在创建时都绑定了词法环境，foo1 访问了外层变量，理论上符合。
 *    - 【工程/实际定义】：工程实践中一般不把 foo1 当闭包。因为 `name` 是全局变量，全局变量永远不会被销毁，
 *      无法体现出闭包“让即将被销毁的局部变量常驻内存”以及“保护数据不被外界随意篡改”的核心价值。
 *
 * 3. 为什么需要向后演进？
 *    - foo1 中全局的 name 很容易被其他代码污染（如被改成了 Jerry）；
 *    - foo2 纯传参虽然纯粹，但无法跨多次调用维持状态。
 *    这就是为什么真实业务中，必须结合【函数嵌套】与【高阶函数】（如下面的 Level 1 ~ 5），把变量封装成“局部私有变量”。
 */

// ==========================================
// Level 1: 概念初探 —— 嵌套函数读取外层局部变量
// ==========================================
// 只要外层函数执行完，内层函数把变量“拽住”，变量就不会被销毁
function level1_outer() {
  const message = "Hello, Closure!"; // 局部变量

  function inner() {
    console.log(message); // 访问了外层函数的局部变量
  }

  return inner;
}
// 有没有这个引用才是核心，用强引用“拽住”里面的变量
const sayHello = level1_outer(); // level1_outer 执行完毕，正常来说message变量马上被销毁。
//sayHello是一个强引用，如果level1_outer()()这样运行，直接销毁变量，因为没有强引用“拽住”。
sayHello(); // 输出: "Hello, Closure!"（依然可以访问到已经执行结束的外层变量，“被拽住”）

// ==========================================
// Level 2: 经典入门 —— 状态记忆与数据独立（计数器工厂）
// ==========================================
// 体现闭包的核心特性：变量常驻内存 + 多个实例互不干扰
function createCounter() {
  let count = 0; // 私有状态

  return function () {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log("A:", counterA()); // A: 1
console.log("A:", counterA()); // A: 2
console.log("B:", counterB()); // B: 1（B 有自己的独立背包，不影响 A）

// ==========================================
// Level 3: 进阶实用 —— 数据私有化与封装（模块模式 Module Pattern）
// ==========================================
// 模拟面向对象的 private 属性：外部不能直接篡改，只能通过受控方法操作
function createBankAccount(initialBalance) {
  let balance = initialBalance; // 真正的私有属性，外部无法直接访问

  return {
    deposit(amount) {
      if (amount > 0) balance += amount;
      console.log(`存入 ${amount}，当前余额: ${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("余额不足！");
        return;
      }
      balance -= amount;
      console.log(`取出 ${amount}，当前余额: ${balance}`);
    },
    getBalance() {
      return balance;
    },
  };
}

const myAccount = createBankAccount(100);
myAccount.deposit(50); // 存入 50，当前余额: 150
myAccount.withdraw(30); // 取出 30，当前余额: 120
// myAccount.balance 无法直接拿到（undefined），杜绝了被非法赋值 myAccount.balance = 999999 的风险

// ==========================================
// Level 4: 高级抽象 —— 参数复用与函数工厂（柯里化思想）
// ==========================================
// 利用闭包将“配置参数”预先锁在函数里，生成更专用的函数
function createLogger(prefix) {
  return function (message) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] [${prefix}] ${message}`);
  };
}

const infoLog = createLogger("INFO");
const errorLog = createLogger("ERROR");

infoLog("用户登录成功"); // [xx:xx:xx] [INFO] 用户登录成功
errorLog("网络连接超时"); // [xx:xx:xx] [ERROR] 网络连接超时

// ==========================================
// Level 5: 生产级高级模式 —— 结果缓存器（Memoize 记忆化函数）
// ==========================================
// 利用闭包内部维护一个私有 cache 对象，避免高消耗函数的重复运算
function memoize(fn) {
  const cache = {}; // 私有缓存表，长久驻留内存

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log(`命中缓存 [${key}]，直接返回结果`);
      return cache[key];
    }

    console.log(`未命中缓存 [${key}]，进行真实运算...`);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// 模拟一个昂贵的斐波那契运算
function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

const fastFib = memoize(slowFib);

console.log(fastFib(30)); // 第一次运算：进行真实运算...
console.log(fastFib(30)); // 第二次运算：命中缓存，瞬间返回！
