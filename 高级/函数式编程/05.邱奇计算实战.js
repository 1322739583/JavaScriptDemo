/**
 * 05.邱奇计算实战.js
 * 演示：在世界上没有任何数字、布尔值和 if-else 的情况下，
 * 仅靠 JavaScript 箭头函数（Lambda 演算）实现完整的逻辑计算！
 */

console.log("=== 1. 邱奇布尔值与条件判断 ===");

// 永远返回第 1 个参数，代表 TRUE
const TRUE = (x) => (y) => x;

// 永远返回第 2 个参数，代表 FALSE
const FALSE = (x) => (y) => y;

// 条件选择器：将两个分支传递给条件本身进行调用
const IF = (condition) => (thenBranch) => (elseBranch) => condition(thenBranch)(elseBranch);

console.log("IF(TRUE) 的结果: ", IF(TRUE)("吃火锅")("吃泡面")); // 吃火锅
console.log("IF(FALSE) 的结果: ", IF(FALSE)("吃火锅")("吃泡面")); // 吃泡面


console.log("\n=== 2. 邱奇自然数（函数嵌套执行的次数） ===");

// 0：函数执行 0 次，原样返回 x
const ZERO = (f) => (x) => x;

// 1：函数执行 1 次
const ONE = (f) => (x) => f(x);

// 2：函数执行 2 次
const TWO = (f) => (x) => f(f(x));

// 3：函数执行 3 次
const THREE = (f) => (x) => f(f(f(x)));

// 工具辅助：将邱奇数转为阿拉伯数字展示（通过给数字每次 +1）
const toInt = (churchNum) => churchNum((n) => n + 1)(0);

console.log("邱奇 ZERO  ->", toInt(ZERO));  // 0
console.log("邱奇 ONE   ->", toInt(ONE));   // 1
console.log("邱奇 TWO   ->", toInt(TWO));   // 2
console.log("邱奇 THREE ->", toInt(THREE)); // 3


console.log("\n=== 3. 邱奇加法运算（不使用任何 + 运算符） ===");

// 加法本质：在 n 次执行的基础上，再嵌套执行 m 次
const PLUS = (m) => (n) => (f) => (x) => m(f)(n(f)(x));

const result1 = PLUS(ONE)(TWO); // 1 + 2
console.log("邱奇计算 1 + 2 =", toInt(result1)); // 3

const result2 = PLUS(TWO)(THREE); // 2 + 3
console.log("邱奇计算 2 + 3 =", toInt(result2)); // 5


console.log("\n=== 4. 邱奇逻辑运算（不使用 !、&&、|| 等原生运算符） ===");

// 辅助打印布尔值函数
const toBool = (churchBool) => churchBool(true)(false);

// 逻辑非 NOT：给它一个布尔值，利用它自身去挑 FALSE 和 TRUE
const NOT = (b) => b(FALSE)(TRUE);

console.log("邱奇 NOT(TRUE)  ->", toBool(NOT(TRUE)));   // false
console.log("邱奇 NOT(FALSE) ->", toBool(NOT(FALSE)));  // true

// 逻辑与 AND：只有两者皆为真才为真
const AND = (p) => (q) => p(q)(FALSE);

console.log("邱奇 TRUE  AND TRUE  ->", toBool(AND(TRUE)(TRUE)));   // true
console.log("邱奇 TRUE  AND FALSE ->", toBool(AND(TRUE)(FALSE)));  // false
console.log("邱奇 FALSE AND TRUE  ->", toBool(AND(FALSE)(TRUE)));  // false
console.log("邱奇 FALSE AND FALSE ->", toBool(AND(FALSE)(FALSE))); // false

