const complexObj = {
  // 7个基本数据类型
  str: "hello",
  num: 10,
  bool: false,
  nul: null,
  undef: undefined,
  symbol: Symbol("name"), // ES6
  bigInt: BigInt(10), //ES11
  // 引用类型
  obj: { name: "child" },
  arr: [1, 2, 3],
  // 对象类型
  date: new Date(),
  reg: /^regexp$/i,
  // 函数
  func: function () {
    console.log("I am a function");
  },
};
// 浅拷贝 对象展开运算符
// const newObj = { ...complexObj };// 对象展开运算符 es9
// complexObj.obj.name = "Jack";
// complexObj.num = 11;
// console.log(complexObj);
// console.log(newObj);

// 浅拷贝 Object.assign
// const newObj = Object.assign({}, complexObj);
// complexObj.obj.name = "Jack";
// complexObj.num = 11;
// console.log(complexObj);
// console.log(newObj);

// 浅拷贝 手写循环
function shadowClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    // 或者抛出溢出  throw new Error("类型错误")
    return obj;
  }
  const target = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    // 或者使用 Object.hasOwn(key)
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      target[key] = obj[key];
    }
  }
  return target;
}

const cloneTarget = shadowClone(complexObj);
cloneTarget.num = 11;
cloneTarget.obj.name = "Jack";
console.log(complexObj);
console.log(cloneTarget);
