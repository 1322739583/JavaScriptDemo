/**
 * JavaScript 深浅拷贝全景示例
 * 包含：基础实现、不同 API 的优缺点对比、手写完整版深拷贝
 */

// ===================================================================
// 0. 准备一个极其复杂的“测试对象”，涵盖大多数边界情况
// ===================================================================
const complexObj = {
  // 1. 基本数据类型
  str: "hello",
  num: 42,
  bool: true,
  undef: undefined,
  sym: Symbol("mySymbol"),

  // 2. 引用数据类型
  obj: { childName: "child" },
  arr: [1, 2, 3],

  // 3. 特殊对象
  date: new Date("2026-01-01"),
  reg: /^regex$/i,

  // 4. 函数
  func: function () {
    console.log("I am a function");
  },

  // 5. ES6 新集合
  map: new Map([["key1", "value1"]]),
  set: new Set([1, 2, 3]),
};

// 构造循环引用 (Circular Reference)
complexObj.loop = complexObj;

console.log("---------- 0. 原始对象 ----------");
console.log(complexObj);
console.log("\n");

// ===================================================================
// 1. 浅拷贝 (Shallow Copy) 各种实现
// 效果：只拷贝第一层，嵌套的子对象依然共享内存地址。
// ===================================================================
console.log("---------- 1. 浅拷贝 ----------");

// 方式一：扩展运算符 (最常用)
const shallowCopy1 = { ...complexObj };

// 方式二：Object.assign
const shallowCopy2 = Object.assign({}, complexObj);

// 验证浅拷贝：修改第二层属性，原始对象也会受影响
shallowCopy1.obj.childName = "CHANGED_BY_SHALLOW";
console.log("浅拷贝修改后，原对象的 obj.childName:", complexObj.obj.childName); // 输出 CHANGED_BY_SHALLOW
console.log("\n");

// ===================================================================
// 2. 深拷贝 (JSON.parse 方式)
// 优点：代码最短。
// 缺点：不能处理函数、Symbol、undefined，Date变字符串，正则变空对象，不支持循环引用。
// ===================================================================
console.log("---------- 2. 深拷贝 (JSON 方式) ----------");
// 注意：由于 complexObj 存在循环引用，直接 JSON stringify 会报错。
// 因此我们用一个没有循环引用的简化对象来演示它的“丢失/变形”缺陷：

const jsonTestObj = {
  date: new Date(),
  reg: /test/i,
  func: () => {},
  undef: undefined,
  sym: Symbol("sym"),
  normal: "ok",
};

const jsonCopy = JSON.parse(JSON.stringify(jsonTestObj));
console.log("JSON 深拷贝结果 (看看丢失和变形了什么):", jsonCopy);
// 结果说明：
// date: "2026-..." (Date 被强制转成了字符串)
// reg: {}          (RegExp 变成了空对象)
// func, undef, sym 被直接无视丢弃了！
console.log("\n");

// ===================================================================
// 3. 深拷贝 (structuredClone 现代原生 API)
// 优点：原生支持，完美处理 Date, RegExp, Map, Set 以及循环引用。
// 缺点：遇到函数 (Function) 和 DOM 节点时会直接抛出 DataCloneError。
// ===================================================================
console.log("---------- 3. 深拷贝 (structuredClone) ----------");

const cloneTestObj = {
  date: new Date(),
  reg: /test/i,
  map: new Map([["a", 1]]),
  obj: { a: 1 },
};
cloneTestObj.loop = cloneTestObj; // 构造循环引用

const nativeDeepCopy = structuredClone(cloneTestObj);
nativeDeepCopy.obj.a = 999;
console.log("原对象的 obj.a:", cloneTestObj.obj.a); // 依然是 1，深拷贝成功
console.log(
  "克隆对象的 map 是否依然是 Map 对象:",
  nativeDeepCopy.map instanceof Map,
); // true
console.log("\n");

// ===================================================================
// 4. 深拷贝 (面试必考：手写完整版)
// 解决：循环引用、特殊对象(Date/RegExp)、数组/对象
// ===================================================================
console.log("---------- 4. 深拷贝 (手写实现) ----------");

function deepClone(target, weakMap = new WeakMap()) {
  // 1. 如果是基本数据类型，或者 null/undefined，或者函数，直接返回
  if (target === null || typeof target !== "object") {
    return target;
  }

  // 2. 处理特殊引用类型
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  // (生产级还会补充对 Map, Set, Error 等类型的拦截)

  // 3. 解决循环引用：如果已经拷贝过，直接返回之前缓存的引用，防止死循环
  if (weakMap.has(target)) {
    return weakMap.get(target);
  }

  // 4. 创建新容器 (区分是数组还是对象)
  const cloneTarget = Array.isArray(target) ? [] : {};

  // 5. 将当前对象存入弱引用 Map 中（重点：必须在递归子属性之前放入）
  weakMap.set(target, cloneTarget);

  // 6. 递归遍历对象
  // 这里使用 Reflect.ownKeys 替代 Object.keys，因为它可以遍历到 Symbol 类型的键
  Reflect.ownKeys(target).forEach((key) => {
    cloneTarget[key] = deepClone(target[key], weakMap);
  });

  return cloneTarget;
}

// 用手写的 deepClone 来克隆最开头那个极其复杂的 complexObj
const myDeepCopy = deepClone(complexObj);

// 验证
myDeepCopy.obj.childName = "CHANGED_BY_HANDWRITTEN";
console.log(
  "手写深拷贝修改后，原对象 obj.childName 是否变化:",
  complexObj.obj.childName,
);
console.log("循环引用是否被成功处理保留:", myDeepCopy.loop === myDeepCopy); // true
console.log("正则对象是否依然是正则:", myDeepCopy.reg.test("regex")); // true
