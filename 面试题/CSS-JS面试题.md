# CSS相关
## 盒子模型
### 什么是盒子模型？
html的每个元素都可以当成是一个矩形盒子。盒子模型包含四个部分——content（内容区域）,padding（内边距），margin（外边距）,border（边框）。
### 有几种盒子模型？
有两种。标准盒模型和IE盒模型(怪异盒模型)。“怪异盒模型”这一说法来自Web开发社区。

可以通过box-size来指定标准盒模型和IE盒模型。
box-size:content-box 是标准盒模型
box-size:border-box 是IE盒模型。 
### 标准盒模型和IE盒模型(怪异盒模型)有什么区别？
**标准盒模型：**
设置的width和height只包含content。实际内容占用空间=width/height+padding+border
**IE盒模型：**
设置的width和height包含content,padding和border。实际内容占用空间=width/height-padding-border。
### 推荐使用哪种盒模型？为什么？
推荐使用IE盒模型。
原因如下：
1.设置weight和height的时候不需要计算上padding和border。
2.能防止子元素因为padding和border的原因撑破父元素。
3.在使用多列或者响应式布局的时候，尺寸更容易控制（原因还是第二条，不会因为子元素的padding,border撑破父元素）

**题外话：**
IE盒模型早于w3c标准盒模型。但是，当时大部分主流浏览器（网景，火狐，opera等都是使用的标准盒模型）。w3c做标准的时候参考的是主流浏览器的实现方式。只有IE盒模型是特殊的，为了大部分浏览器的兼容性，选择主流浏览器的模型最为w3c的标准盒模型是非常合理的。ie盒模型更好用是随着前端业务变的复杂才有所体现。
## 水平居中和垂直居中
### 都有哪些方式实现水平居中？
1.margin 0 auto,前提是父元素大小固定。
2.flex设置，justify-content:center。
3.grid布局，justify-items:center。
4.绝对定位，left:50%;transform:translateX(-50%)
5.text-align:center,适用于行内或者块行内元素。

**题外话：**
flex和grid的justify是不同的，flex是对于主轴整体，所以用content。而grid是作用于单元格，所以用item。

### 都有哪些方式实现垂直居中
1.line-height等于父元素高度，适用于文本居中。
2.flex布局，align-items:center。
3.grid布局，align-items:center。
4.绝对定位，top:50%,transform:translateY(-50%)。
5.vertical-align:middle。
## CSS 选择器
### CSS 选择器有哪些？
1.标签选择器。如div,p,h1,h2,span等。
2.id选择器。如#app,#id,#title等。
3.类选择器。如.title,.content,.name等。
4.伪类选择器。a:hover
5.伪元素选择器。::after,::before
6.后代选择器。div span,选中div下的所有span.
7.子选择器。div > span,选中div下的第一个span.
8.相邻兄弟选择器。h2 + p，紧跟h2后面的p元素。
9.属性选择器。input[type="text"]
10.通用选择器。*，在初始化全局样式的时候非常有用。
11.组合选择器。后代选择器，子选择器，相邻兄弟选择器都是组合选择器。
12.复合选择器。li.active。（\<li class="active">）。是连写的，不能有空格。li .active是后代选择器,完全是两回事。（\<li>\<div class="active">\<li/>）
### 优先级如何计算？（可以和上一个问题连问）
1.最高等级。!important 不建议滥用。
2.1000分。内联样式（style）
3.100分。id选择器。
4.10分。类，伪类，属性选择器。
5.1分。通用，标签，伪元素选择器。
6.组合选择器的分数需要累加计算。并且不能进位。如果优先级分数一样，那么后写的样式会覆盖前面的样式。
7.复合选择器分数也需要累加计算。li.active的分数是1+10=11。比单独类选择器分数多1分。

**题外话：** 内联样式分数高主要原因是历史原因。因为早期css样式都是直接写在style里面的，浏览器为了兼容性，优先把页面中的style属性先渲染。
### display 属性有哪些常见值？分别有什么作用？
block:块元素，独占一整行，能设置宽高。
inline:行内元素，在一行内显示，不能设置宽高
inline-block:行内块元素，在一行内显示，又能设置宽高。
none:不显示元素。
flex:使用flex布局。
grid:使用grid布局。
### position 属性有哪些值？作用是什么？
static:默认值，按照正常的文档流排列，这时候left,right,top,bottom是无效的。
relative:相对定位，配合left,right,top,bottom使用。相对自身移动，例如left:100px,表示相对自身左边界右移(x方向)100px。但仍占用原来位置。
abslute:绝对定位，默认是相对body的，如果父元素设置了relative相对定位，那么就会相对该父元素定位，一般配合相对定位使用。脱离文档流。
fixed:相当于窗口固定，即使页面滚动，常用于悬浮按钮，导航栏。
stick:正常流和fixed的结合，常用于吸顶和吸底。
### float 和 clear 的作用是什么？为什么 float 容器高度会塌陷？如何解决？
float主要用于实现图文环绕效果，也可用于定位。clear属性用于清除元素浮动对他的影响，例如图文环绕下面需要实现标题，分割线。高度坍塌是因为子元素设置了浮动，脱离文档流，父元素没有内容支持，所以高度坍塌。解决办法可以通过设置clear属性摆脱float对他的影响，或者通过触发BFC来解决。
### 什么是 BFC？如何触发 BFC？BFC 有哪些实际应用？
BFC是块级格式化上下文（Block Formatting Context）。是一种布局规则，用于决定元素在块元素中如何布局。
可以通过下面的方式触发BFC:
overflow:auto,hidden,scroll.
display:flow-root
float:left,right
position:absolute,fixed
BFC的实际用途可以用于解决浮动造成的高度坍塌问题，和内边距重叠问题。
### 响应式布局怎么实现？媒体查询的基本写法是什么？
可以通过下面的方式实现响应式布局：
1.媒体查询
2.flex布局
3.grid布局
4.相对单位：em,rem,百分百布局
5.视口单位：vh,vw。
### CSS 动画和过渡的区别和用法？
动画是css3的新特性。
动画支持帧动画，可以对动画进行更加精确的控制，更加灵活，功能也更强大。
过度不能循环播放，动画可以设置循环播放。
过渡需要触发条件（平移也是需要鼠标悬浮的），动画不需要触发条件也能播放。

题外话：
css的动画都是占用空间的。
# JS相关
## 基础问题
### js有几种基本数据类型？
有7种基本数据类型。
null,undefined,string,number,boolean,symbol,bigint。
另外，对象类型属于引用类型，不是基本类型，数组也是对象。
**题外话:** 基本数据类型有7种。如果问有多少种数据类型，那么是8种。
bigint是2020引入的新特性。number的范围是双精度浮点型，范围是2的-53次方到2的53次方。
### \=\=和\=\=\=的区别
==会先进行类型转化再比较。\=\=\=进行严格的比较。
类型转化以数字优先为原则。
boolean转化为0,1。
string转化为number.
### null和undefined的区别？
null是空值，是手动给变量赋的一个值。
undefiend的表示变量已经声明，但还没有赋值。
### typeof和instanceof有什么区别？
typeof用于判断变量的类型，可以是基本类型和引用类型，结果用字符串表示。
instanceof用于判断对象是否是构造函数的实例。
例如：
```bash
[] instanceof Array
{} instanceof Object
function(){} instanceof Function
```
只能用于引用类型，不能用于基本数据类型
### 怎么判断一个变量是不是数组类型？
使用instanceof
```bash
const t = []
if(t instanceof Array)
```
或者
```bash
Array.isArray()
```
### slice,splice和split的区别？
slice可以操作数组和字符串，可以对数组或者字符串的部分做截取。slice本身的含义就是切片。不改变原内容。
splice只能用于数组，对数组先删除再拼接，splice本身的含义就是粘接，改变原内容。

```bash
const arr = [1, 2, 3, 4, 5];
//删除
arr.splice(2, 2); // 从索引 2 开始删除 2 个元素
//插入
arr.splice(1, 0, 'a', 'b'); // 在索引 1 处插入 'a' 和 'b'
//替换
arr.splice(1, 2, 'x', 'y'); // 从索引 1 开始删除 2 个元素，插入 'x' 和 'y'
```
split只能用于字符串，可以根据给点的要求拆分字符串。不改变原来内容。
```bash
// 1.逗号
const str = "apple,banana,orange";
const result = str.split(",");//["apple", "banana", "orange"]
// 2.空格
const str = "hello";
const result = str.split("");// ["h", "e", "l", "l", "o"]
// 3.正则，按数字
const str = "apple1banana2orange3";
const result = str.split(/\d/); // ["apple", "banana", "orange", ""]
```
### for循环in和of关键字有什么区别？

in用于遍历对象的属性值。
of用于遍历集合的每一个值。

记忆：in表示在对象里面，对象里面当然是属性了。
## DOM相关
### 什么是DOM？
文档对象模型（Document Object Model）。是JS用于描述页面元素的树状数据结构。用户可以通过DOM API来操作DOM。
## 事件冒泡和事件捕获
### 什么是事件流？
事件流是指事件在 DOM 中传播的顺序。
### 事件流分为几个阶段？
捕获阶段：事件从最外层元素传递到目标元素的过程。
目标阶段：事件到达目标元素本身。
冒泡阶段：事件从目标元素传递到最外层元素的过程。
### 事件冒泡和事件捕获的区别是什么？
事件捕获中，事件是从最外层一直传到目标元素。而事件冒泡，事件从目标元素一直传到最外层元素。
### 如何阻止事件冒泡？
在监听器里面调用event.stopPropagation();

```bash
element.addEventListener('click', function(event) {
    // 阻止事件继续冒泡
    event.stopPropagation();
    console.log('事件已处理，不会继续冒泡');
});
```
**题外话：**
只有问怎么阻止事件冒泡的。没有阻止事件捕获这种说法。
### 如何阻止事件的默认行为？
使用 preventDefault() 方法。

```bash
element.addEventListener('click', function(event) {
    // 阻止默认行为
    event.preventDefault();
    console.log('默认行为已被阻止');
});
```
### 如何同时使用事件捕获和事件冒泡？
可以通过addEventListener()方法同时对事件捕获和事件冒泡进行监听。默认值是false,默认是事件冒泡，要想监听事件捕获将这个值设置为true。
### 事件委托是什么？它有什么优点？
把监听事件添加在父元素身上，对子元素的事件做统一处理。
优点：
1.减少资源开销，提升性能。
2.代码简化，更加优雅。
3.动态的子元素也能做处理，不用再次绑定。
### 如何判断事件是在捕获阶段还是冒泡阶段触发的？
可以通过addEventListener的第三个参数判断，默认值是事件冒泡，值为false,设置为true就是事件捕获。

或者通过event.eventPhase判断。

```bash
eventPhase===1，表示捕获阶段
eventPhase===2,表示目标阶段
eventPhase===3,表示冒泡阶段
```
### 事件对象的 target 和 currentTarget 有什么区别？
target是指目标元素，而currentTarget指设置监听器的那个元素。

### IE 和标准浏览器的事件流模型有何不同？
早期的IE只有冒泡阶段，没有捕获阶段，事件直接从目标阶段到冒泡阶段。标准浏览器有捕获阶段，目标阶段，冒泡阶段。
### 什么是宏任务，什么是微任务？
宏任务指js指向的较大的任务单元。例如setTimeout,setInteval,IO,UI渲染。
微任务指更小的任务单元。例如Promise。
优先级是先执行宏任务里面的微任务，再执行宏任务。
## var、let、const 的区别？

var：函数作用域或者全局作用域，可重复声明，存在变量提升。
let：块级作用域或者全局作用域，不可重复声明，无变量提升。
const：块级作用域或者全局作用域，声明后值不可变（对象/数组引用不可变），无变量提升。

## 闭包
### 什么是闭包？闭包的作用和常见应用场景？
闭包是函数及这个函数所包含的上下文。
闭包的作用包括，保存变量状态，实现私有变量，异步/回调访问外部变量。
例子：
1.保存变量状态（计数器）
2.实现私有变量，（数据封装）。
3.事件监听，回调，异步，定时器等。

## this绑定
###  this 的几种绑定方式？
默认绑定，隐式绑定，显式绑定，new绑定。
**默认模式：**
直接调用函数时，this指向全局对象，浏览器中是window，严格模式下是undefined。
```bash
function foo() {
  console.log(this);
}
foo(); // 浏览器下输出 window，严格模式下输出 undefined
```
**隐式绑定：**
通过对象调用方法时，this指向这个对象。
```bash
const obj={
	name: "Tom",
	sayHello: function (){
		console.log(this.name) //输出Tom
	}
}
obj.sayHello()
```
**显示绑定：**
通过call,apply,bind绑定。指定绑定哪个对象就是绑定哪个对象。

```bash
function foo() {
  console.log(this.name);
}
const obj = { name: 'Jerry' };

foo.call(obj);  // 输出 'Jerry'
foo.apply(obj); // 输出 'Jerry'
const boundFoo = foo.bind(obj);
boundFoo();     // 输出 'Jerry'
```
**new绑定：**
通过new创建对象时，this指向新创建的对象。
```bash
function Person(name) {
  this.name = name;
}
const p = new Person('Alice');
console.log(p.name); // 输出 'Alice'
```
### this 绑定的优先级是怎样的？
new 绑定 > 显式绑定 (call/apply/bind) > 隐式绑定 > 默认绑定 (独立调用)
### call,apply,bind有什么区别？
call和apply立即执行，bind可以返回一个函数，立即执行或者手动执行。
call出现的最早，参数需要逐个传入。apply可以通过数组传入参数。
apply的出现只是历史原因，那时候没有扩展运算符。现在通过扩展运算符，apply和bind实际上都能通过扩展运算符传入数组。
### 箭头函数的 this 有什么特点？
this的指向由定义时的上下文决定。
call,apply,bind不会改变this的指向。


## 原型和继承
### 原型和原型链是什么？
**1. 官方核心定义：**
- **什么是原型（Prototype）？**
  按 ECMA-262 官方规范定义：**原型就是“为其他对象提供共享属性的对象”**。它的核心目的是为了让实例共享方法和属性，避免重复创建以节省内存。
- **什么是原型链（Prototype Chain）？**
  当我们访问一个对象的属性或方法时，若自身没有，就会顺着 **`__proto__`** 去它的原型对象上找；若还没有，继续顺着原型对象的 `__proto__` 往上一层找，直到最顶层的 **`Object.prototype`**（终点为 `null`）。这条逐层向上查找的链条就叫**原型链**。

**2. `__proto__` 与 `prototype` 的核心区别：**

| 属性名 | 谁拥有它？ | 它是干什么的？ | 一句话人话总结 |
| :--- | :--- | :--- | :--- |
| **`__proto__`** | 所有对象都有 | 指向自己正在生效的原型对象 | “我自身的原型是谁” |
| **`prototype`** | 只有函数/类才有 | 存放给未来子孙实例共享的方法和属性 | “我给孩子们准备的原型模具” |
### 如何实现继承？
 **1.原型链继承：**
```bash
function Parent() {
  this.name = 'parent';
}
Parent.prototype.sayHi = function() {
  console.log('Hi');
};

function Child() {}
Child.prototype = new Parent();

const child = new Child();
child.sayHi(); // 输出 'Hi'
```
**2.构造器继承**

```bash
function Parent() {
  this.name = 'parent';
}
function Child() {
  Parent.call(this); // 继承属性
}
const child = new Child();
console.log(child.name); // 'parent'
```
 **3. 组合继承（原型链 + 构造函数）**

```bash
function Parent() {
  this.name = 'parent';
}
Parent.prototype.sayHi = function() {
  console.log('Hi');
};
function Child() {
  Parent.call(this);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child = new Child();
child.sayHi(); // 'Hi'
```
**4. ES6 class 继承**

```bash
class Parent {
  constructor() {
    this.name = 'parent';
  }
  sayHi() {
    console.log('Hi');
  }
}
class Child extends Parent {
  constructor() {
    super();
  }
}
const child = new Child();
child.sayHi(); // 'Hi'
```
### 为什么会有组合继承？ 

原型链继承只能继承父类原型上的方法，不能继承父类构造函数里的属性（如引用类型属性会被所有子实例共享）。

构造函数继承只能继承父类构造函数里的属性，不能继承父类原型上的方法。

### 怎么区分是属于自己的属性还是继承的属性？
## 深拷贝和浅拷贝
### 什么是浅拷贝？什么是深拷贝？请举例说明。
浅拷贝：只拷贝对象属性的第一层，引用类型只复制引用。
示例：object.assign({},obj),展开运算符。数组可以通过slice，concat方法。
深拷贝：遍历拷贝所有层级的属性，引用也重新复制一份。
示例：Json.parse(Json.stringify(obj)),遍历属性复制。

### 如何实现一个对象的浅拷贝？有哪些常用方法？
object.assign({},obj),展开运算符。数组可以通过slice，concat方法。
### 如何实现一个对象的深拷贝？常见的实现方式有哪些？
JSON.parse(JSON.stringify(obj))（不能拷贝函数、undefined、循环引用等）
递归遍历所有属性手动复制
使用第三方库，如 lodash 的 _.cloneDeep
## 节流和防抖
### 什么是防抖，什么是节流，举例说明
防抖：短时间内多次触发，但只执行最后一次。例如输入框搜索。
节流：规定时间内只执行一次，如按钮的点击，滚动，窗口的resize（一般用节流）。

题外话：节流根据实现的不同可以分为头节流，尾节流，或者二者组合。我们一般使用的是头节流，因为响应速度最快。 

窗口的resize可以用节流也可以用防抖，但是一般用节流，这是因为resize要考虑到内容在改变大小时候的渲染问题。用防抖就只考虑最后的宽高，这和输入框是非常类似的，如果你完全不考虑大小改变时候的渲染性能问题的话。

 //  es ===  es // 
## 数组
### 如何给数组去重？
可以通过Array.from(new Set(arr))的方式去重，使用于基本数据类型。
可以通过JSON.stringify的方式将对象转化为字符串进行比较来去重。支持对象比较，但需要保证属性顺序，并且不支持嵌套对象。
可以通过filter+findIndexOf的方式实现对某个属性的比较来去重，比如id。
通过第三方库，例如lodash。他的uniqWith方法支持全对象属性比较，也支持自定义属性比较。


## 异步编程与 Promise
### 1. Promise 的三种状态是什么？
pending,fulfilled（兑现承诺，）,rejected。
#### 1.2 这个三个状态分别在什么时机？
pending:在任务开始之后但没有调用resolve()或者reject()之前。
fulfilled:调用resolve()的时候触发。
rejected:调用rejected的时候触发。
#### 1.3 状态流转有什么特点？
状态一但改变就不可以再改变状态，也就是状态不可逆。下面这个超时报错逻辑能够成立就是因为状态不可逆。
```js
const p = new Promise((resolve, reject) => {
  // 1. 启动一个 3 秒超时闹钟
  setTimeout(() => {
    reject("网络太慢，超时失败！"); // 💥 假设 3 秒到了，执行了 reject
  }, 3000);

  // 2. 发起真实的网络请求
  fetchApi().then(data => {
    resolve(data); // 💥 如果网络在 3.1 秒时数据突然又回来了！
  });
});
```

### 2. Promise.all、Promise.race、Promise.allSettled、Promise.any 的区别和使用场景分别是什么？

| 方法名 | 成功条件 | 失败条件 | 一句话人话总结 | 必背使用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **`Promise.all`** | **全部成功** | **一票否决**（任意 1 个失败就失败） | *“同生共死”* | 页面初始化多个并发接口全部拉齐 |
| **`Promise.race`** | **谁最快就是谁**（不管成败） | *“短跑赛跑”* | **接口请求超时控制**（接口和定时器赛跑） |
| **`Promise.allSettled`** | **永远成功**（等全员落定，返回详细清单） | *“老好人统计”* | **批量操作**（批量上传图片，互不影响） |
| **`Promise.any`** | **任意 1 个成功** | **全军覆没**（全部失败才失败） | *“一人力挽狂澜”* | **多节点容灾 / 测速**（只要一个能通就行） |
### 3. async/await 的本质是什么？如何捕获和处理 async/await 中的错误？
#### 3.1 本质：
`async/await` 是 **Generator（生成器）+ Promise + 自动执行器（co思想）** 的官方语法糖。
- `async` 函数会将其返回值默认包装为 `Promise.resolve(val)`，遇到异常包装为 `Promise.reject(err)`。
- `await` 暂停当前协程，出让主线程；当 Promise 敲定时，将其后续代码作为**微任务**放入队列，实现“用同步的书写风格来写异步逻辑”。

#### 3.2 错误捕获处理的三种方式：
1. **`try...catch`**：标准方式，统一捕获块内所有 `await` 抛出的错误，适合粗粒度业务阻断。
2. **`.catch()` 兜底降级**：`await api().catch(err => fallbackVal)`，单行处理非核心接口异常，给默认值避免阻断流程。
3. **`to` 元组解构模式（类似 Go 风格）**：封装 `to(promise)` 返回 `[err, data]`，代码彻底扁平化，避免多层 `try...catch` 嵌套。


### 4. 什么是事件循环（Event Loop）？宏任务与微任务的执行优先级和顺序是怎样的？

## 浏览器渲染与性能优化
### 1. 从浏览器地址栏输入 URL 到页面最终呈现在屏幕上，完整的流程是怎样的？

> 💡 **【面试 30 秒高分精炼版（必背 4 句话）】**：
> 1. **缓存与 DNS**：先检查浏览器本地是否有**有效强缓存**，没有就通过 **DNS 递归/迭代查询**找到目标服务器的 IP 地址；
> 2. **连接与请求**：通过 **TCP 三次握手**（HTTPS 需 TLS 握手）建立连接，向服务器发送 HTTP 请求把 HTML 资源拉回来；
> 3. **解析建树**：浏览器一边解析 HTML 生成 **DOM 树**，一边解析 CSS 生成 **CSSOM 树**，二者合并生成 **渲染树（Render Tree）**；
> 4. **布局绘制上屏**：根据渲染树计算几何尺寸与坐标进行**布局（回流/重排）**，填充颜色进行**绘制（重绘）**，最终由 GPU 合成并在屏幕呈现。

---

#### 详细全流程拓展参考（两大阶段、5 个步骤）：

#### 阶段一：网络与数据传输（把 HTML 资源拿回来）
1. **URL 解析与缓存检查**：
   - 浏览器解析输入的 URL（协议、域名、端口、路径）。
   - 检查本地是否有有效的**强缓存**（`Cache-Control` / `Expires`）。如果有且未过期，直接从本地读取缓存渲染，不走网络请求。
2. **DNS 域名解析（寻找目标服务器 IP）**：
   - 依次查询：**浏览器缓存 ➔ 操作系统 hosts 缓存 ➔ 本地路由器缓存 ➔ 本地 DNS 服务器（LDNS）**。
   - 若未命中，LDNS 向上级根域名服务器发起递归/迭代查询，最终解析出对应的 IP 地址。
3. **建立连接（TCP/TLS 握手）与 HTTP 交互**：
   - **TCP 三次握手**：建立浏览器与服务器之间的可靠连接（如果是 HTTPS，还需进行 TLS 四次握手协商加密密钥）。
   - **发送 HTTP 请求**：浏览器构建请求行、请求头，向服务端发送 GET 请求。
   - **服务端响应**：服务端检查协商缓存（`Etag` / `Last-Modified`），若命中返回 `304 Not Modified`；否则返回状态码 `200` 及 HTML 数据包。

---

#### 阶段二：浏览器渲染流水线（把 HTML 变成屏幕像素）
4. **解析与构建渲染树（Render Tree）**：
   - **构建 DOM 树**：HTML 解析器将字节流标记化，构建出文档对象模型（DOM Tree）。
   - **构建 CSSOM 树**：CSS 解析器将外部样式表及内联样式解析为样式规则树（CSSOM Tree）。
   - **合并为渲染树（Render Tree）**：将 DOM 树与 CSSOM 树结合，过滤掉不可见节点（如 `head`、`display: none`），生成最终可见的渲染树。
   - *（注：遇到 `<script>` 标签默认会阻塞 HTML 解析，需等 JS 下载执行完毕，可通过 `defer` 或 `async` 异步优化）*。
5. **布局、绘制与 GPU 合成（回流、重绘与上屏）**：
   - **布局 / 重排（Layout / Reflow）**：根据渲染树计算每个节点在屏幕上的确切几何位置和尺寸大小。
   - **绘制 / 重绘（Painting / Repaint）**：根据计算结果，调用绘图指令绘制各元素的背景色、文字、边框、阴影等视觉样式。
   - **合成与显示（Compositing）**：将页面拆分为多个图层（Layers），由合成线程交给 GPU 进行栅格化并绘制上屏，最终在屏幕呈现页面。

### 2. 什么是回流（Reflow/重排）？什么是重绘（Repaint）？两者有什么关系和区别？
### 3. 哪些常见操作会触发页面的回流？在日常开发中有哪些优化手段可以减少回流和重绘？

## 浏览器缓存与本地存储
### 1. 什么是强缓存？什么是协商缓存？它们分别依赖哪些 HTTP 标头（Headers）进行控制？
### 2. Cookie、localStorage、sessionStorage、IndexedDB 的区别是什么？分别适用于哪些业务场景？

## 网络通信与跨域（HTTP & CORS）
### 1. 什么是同源策略？什么是跨域？在日常开发中有哪些常用的跨域解决方案？

> 💡 **【30 秒口试速记版】**：
> - **定义**：跨域是**浏览器**的同源策略限制，只要**协议、域名、端口**三者有任意一个不同就是跨域。
> - **底层真相**：跨域时请求**其实已经发到后端并执行完毕了**，只是数据包在返回浏览器时被浏览器保安拦截扣押了！
> - **三种主流解法**：
>   1. **开发环境**：配置 Vite/Vue CLI 的 `proxy` 本地代理（node 服务器转发，避开浏览器同源策略）；
>   2. **生产环境（最主流）**：运维配置 **Nginx 反向代理**，把前端静态页面和后端接口转发到同域下；
>   3. **后端解决**：后端接口开启 **CORS 响应头**（配置 `Access-Control-Allow-Origin: *`）。

#### 详细实战配置参考：
1. **开发环境（Vite 配置 `vite.config.js`）**：
   ```js
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:8080', // 后端真实接口地址
         changeOrigin: true,              // 伪装请求源
         rewrite: (path) => path.replace(/^\/api/, '')
       }
     }
   }
   ```
2. **生产环境（Nginx 反向代理配置）**：
   ```nginx
   server {
       listen 80;
       server_name myapp.com;

       # 前端静态页面
       location / {
           root /usr/share/nginx/html;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       # 后端 API 接口统一代理
       location /api/ {
           proxy_pass http://127.0.0.1:8080/;
       }
   }
   ```
3. **后端 CORS 响应头配置**：
   - `Access-Control-Allow-Origin: *`（允许哪些域名跨域访问）
   - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type, Authorization`

---

### 2. 跨域请求时，为什么浏览器有时会先自动发一次 OPTIONS 请求？

> 💡 **【30 秒口试速记版】**：
> 这是浏览器的 **预检请求（Preflight Request）**。
> 当请求属于**非简单请求**时（比如请求头加了 `Authorization: Bearer token`，或者 `Content-Type: application/json`，或者用了 PUT/DELETE 方法），浏览器会在真正发请求之前，**自动先发一个 OPTIONS 请求去探路**，向服务端确认“我可不可以发、允许带哪些请求头”。
> 只有当服务端回复“允许（204/200）”后，浏览器才会立刻紧接着发送真正的业务请求。

---

### 3. 常见的 HTTP 状态码有哪些？分别代表什么含义？

| 分类 | 状态码 | 含义 | 业务典型场景 |
| :--- | :--- | :--- | :--- |
| **2xx 成功** | **`200 OK`** | 请求成功并正常返回数据 | 常规接口调用成功 |
| | **`204 No Content`** | 成功响应但没有数据返回 | OPTIONS 预检请求、DELETE 操作 |
| **3xx 重定向** | **`301`** | 永久重定向（配合 Location） | 旧域名永久废弃换新域名、http 跳转 https |
| | **`302`** | 临时重定向 | 网页未登录临时跳登录页 |
| | **`304 Not Modified`** | **命中协商缓存** | 资源未被修改，通知浏览器直接使用本地缓存 |
| **4xx 客户端错误** | **`400 Bad Request`** | 前端请求参数格式错误 | 传参少填字段、JSON 格式不对 |
| | **`401 Unauthorized`** | **未登录 / 认证失败** | 用户未登录、Token 过期被拦截器捕获 |
| | **`403 Forbidden`** | **无权限访问** | 已登录，但当前账号角色（如普通员工）无权访问管理员接口 |
| | **`404 Not Found`** | 路径不存在 / 资源找不到 | 接口 URL 拼写错误、页面不存在 |
| **5xx 服务端错误** | **`500 Internal Error`** | **后端内部代码崩溃** | 后端代码报空指针异常、SQL 报错 |
| | **`502 Bad Gateway`** | 网关错误 | Nginx 正常，但 Nginx 后面的 Java/Node 后端服务挂了 |
| | **`504 Gateway Timeout`**| 网关超时 | 后端数据库查询卡死、处理请求超时未响应 |

---

### 4. GET 请求与 POST 请求的核心区别是什么？

> 💡 **【核心对比要点】**：
> 1. **语义定位不同**：GET 用于**获取/读取**数据（幂等且安全）；POST 用于**提交/修改/创建**数据（非幂等）。
> 2. **传参位置不同**：
>    - GET 参数拼接在 **URL Query 后面**（如 `?id=1`），有长度限制（各浏览器限制在 2KB~8KB 左右），且暴露在地址栏和历史记录中，不适合传敏感数据；
>    - POST 参数放在 **Request Body（请求体）** 中，数据格式更丰富（支持 JSON、FormData 文件上传），理论上没有体积限制。
> 3. **缓存特性不同**：GET 请求默认**会被浏览器主动缓存**；POST 请求默认**不会被浏览器缓存**。

---

## Web 应用与浏览器安全（XSS & CSRF）
### 1. 什么是 XSS（跨站脚本攻击）？如何防御？Vue 中有什么相关风险？

> 💡 **【30 秒口试速记版】**：
> - **本质**：黑客把恶意的 JavaScript 脚本注入到网页中并在用户的浏览器里执行，用来偷 Cookie、窃取密码或盗取账号。
> - **常见类型**：**存储型**（最严重，代码存进后端数据库）、**反射型**（藏在 URL 参数里诱骗点击）、**DOM 型**（前端通过 innerHTML 直接渲染未经校验的用户输入）。
> - **核心防御手段**：
>   1. **Cookie 设置 `HttpOnly`**：即使 JS 被注入，黑客也无法通过 `document.cookie` 偷走登录凭证（终极底牌）；
>   2. **输入输出转义过滤**：将 `<`、`>`、`&` 等特殊字符转义为 HTML 实体；
>   3. **配置 CSP（内容安全策略）**：限制只允许执行同源或指定白名单域名的脚本。
> - **Vue 中的安全风险**：
>   - Vue 默认的插值 `{{ }}` 天然安全（会自动转义字符）；
>   - **唯一的高危入口是 `v-html`**（直接把字符串作为 HTML 渲染），如果渲染外部用户输入的内容极易引爆 XSS！必须配合 `DOMPurify` 库进行消毒清洗。

---

### 2. 什么是 CSRF（跨站请求伪造）？与 XSS 有什么区别？如何有效防御？

> 💡 **【30 秒口试速记版】**：
> - **本质（借刀杀人）**：利用用户在已登录目标网站的 Cookie 凭据，在第三方钓鱼网站诱骗用户点击，冒充受害者身份向目标服务器发起恶意转账或修改密码等请求。
> - **与 XSS 的本质区别**：
>   - **XSS 是直接在你的网页里执行黑客的代码**，黑客能看到、拿到你的数据；
>   - **CSRF 黑客根本拿不到、也看不到你的 Cookie**，黑客只是在第三方网站“借用”了你浏览器的身份凭证去发送破坏性请求。
> - **四大防御策略**：
>   1. **开启 Cookie 的 `SameSite` 属性**：设置 `SameSite=Lax`（现代浏览器默认）或 `Strict`，跨站请求默认不自动携带 Cookie；
>   2. **CSRF Token 验证**：服务端生成随机 Token，前端发请求时必须在 Header 或参数中携带，黑客在第三方网站无法跨域读取该 Token；
>   3. **验证请求来源（`Origin` / `Referer`）**：服务端检查请求来源是否为自家合法域名；
>   4. **关键敏感操作增加二次验证码**（短信、人脸）。

---

## 模块化规范
### 1. CommonJS（require）与 ES Module（import）的核心区别有哪些？（提示：加载时机、数据传递方式）
### 2. 为什么 ES Module 能够天然支持 Tree-Shaking（死代码消除），而 CommonJS 很难做到？

