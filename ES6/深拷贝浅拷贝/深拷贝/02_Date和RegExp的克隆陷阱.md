# Date 与 RegExp 的克隆陷阱

在实现手写深拷贝时，`Date`（日期）和 `RegExp`（正则）常常被称为“特殊对象”，它们是所有基础深拷贝方案的“试金石”。

## 为什么它们很特殊？
虽然在 JS 中它们都属于 `Object` 的子类型，但它们的**核心数据并不存储在普通的可枚举属性（键值对）里**：
* `Date` 的时间戳数据存储在 V8 引擎底层的内部插槽（Internal Slot `[[DateValue]]`）中。
* `RegExp` 的匹配模式和修饰符也是底层维护的。

## 如果当成普通对象处理会怎样？
1. **用 JSON 方式 (`JSON.parse(JSON.stringify)`)**：
   * Date 会调用 `.toJSON()`，变成一个纯**字符串**。
   * RegExp 无法序列化，直接变成一个**空对象 `{}`**。
2. **用 `for...in` 递归遍历**：
   * 既然核心数据不在枚举属性里，遍历不到任何东西，最后克隆出来的都会变成**空对象 `{}`**。

## 解决办法
这也是为什么手写深拷贝算法里，必须给它们设立“特权分支”。我们要识别出它们的类型，并通过它们自带的构造函数，把原来的值传进去重新 `new` 出来：
```javascript
if (target instanceof Date) return new Date(target);
if (target instanceof RegExp) return new RegExp(target);
```
