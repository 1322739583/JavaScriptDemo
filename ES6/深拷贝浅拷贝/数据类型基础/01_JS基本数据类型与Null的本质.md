# JS 数据类型全貌及 Null 的本质

截止最新 ECMAScript 标准，JavaScript 共有 **8 种**数据类型，被划分为两大类。

## 一、基本数据类型（Primitive Types）
基本类型按**值**存储在栈内存中，共 7 种：
1. **`String`**（字符串）
2. **`Number`**（数字，包括 NaN, Infinity）
3. **`Boolean`**（布尔值）
4. **`Null`**（空值指针）
5. **`Undefined`**（未定义）
6. **`Symbol`**（ES6新增，唯一的标识符）
7. **`BigInt`**（ES2020新增，大整数，可突破 2^53 - 1 的限制）

### 关于 Null 和 Undefined 的本质：
很多人疑惑：它们不是“值”吗？怎么成了“类型”？
在 JS 中，“类型（Type）”是值的集合。
* `Boolean` 类型包含 2 个值（`true`, `false`）。
* `Null` 和 `Undefined` 是非常特殊的类型，**它们的集合里分别只有唯一的一个值（即 `null` 和 `undefined`）**。它们既是值的本身，也代表了所属的孤立数据类型。

> **著名的 typeof Bug**：`typeof null` 会返回 `"object"`。这是 JS 诞生第一版底层的设计失误（底层将二进制全为 0 的 null 误识别为了对象的 000 标签），为了兼容全世界的历史网页，官方决定永远不修复它。切记：`null` 绝不是引用对象，它是基本数据类型。

## 二、引用数据类型（Reference Types）
引用类型按**址**存储，实际数据存在堆内存中，共 1 种宏观大类：
1. **`Object`**
它包含了无数个子类型：普通 `{}`、`Array`（数组）、`Function`（函数）、`Date`、`RegExp`、`Map`、`Set`、`Promise` 等等。
涉及到引用类型的复制时，就会出现复制内存地址的现象，这就是**深浅拷贝问题诞生的根源**。
