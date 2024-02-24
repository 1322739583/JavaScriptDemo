//1.通过test方法验证是否匹配规则
//表示是否包含abc
const reg=/abc/ig
const result=reg.test("ghAbcdsdABC")
console.log(result)
//下面这样写才是表示正好完全是abc
//^表示a开头，$表示c结尾。中间是b
const reg2=/^abc$/
console.log(reg2.test("abc"));
console.log(reg2.test("abcABC"));

//2.通过exec执行代码，这个方法实际上用的比较少，一般用字符串的match方法
//这样写是不行的，只能匹配到一条数据
console.log(/abc/ig.exec("abchjfabcdAbchjkaBC"));
console.log(/abc/ig.exec("abchjfabcdAbchjkaBC"));
console.log(/abc/ig.exec("abchjfabcdAbchjkaBC"));
//这样写是可以匹配到多条数据的
var patt = new RegExp("abc","ig");
console.log(patt.exec("abchjfdAbchjkaBC"));
console.log(patt.exec("abchjfdAbchjkaBC"));
console.log(patt.exec("abchjfdAbchjkaBC"));

//3.使用字符串的match方法
//这个方法非常的好用，直接返回数组
console.log("abchjfdAbchjkaBC".match(/abc/ig));
//这个返回迭代对象，并且是包含位置索引的
//必须带g,不然直接报错
const results="abchjfdAbchjkaBC".matchAll(/abc/ig);
for(const item of results){
    console.log(item)
}

//4.replace和replaceAll
//前面介绍过了，可以使用正则表达式
const str="abchjfdAbchjkaBC".replace(/abc/ig,"123")
console.log(str)
//还不如用replace方法，replaceAll是必须添加g修饰符的
const newStr="abchjfdAbchjkaBC".replaceAll(/abc/ig,"123")
console.log(newStr)
//5.split
//前后会出现空格
console.log("abchjfdAbchjkaBC".split(/abc/i));

//6.search方法
//只会返回第一个位置索引，所以加g是没什么意义的
console.log("ccAbchjfdAbchjkaBC".search(/abc/ig));