//有两种方式使用正则表达式。
// 一种是通过new RegExp() 一种是string自带的方法。
//下面以string自带方法为例，因为比较好理解
//需求一：把下面字符串中的abc替换为123
const message="ghsdgabc hhAbchhhj ABC"
//必须加g,不然只会匹配第一个abc
const newMessage=message.replace(/abc/ig,"123")
console.log(newMessage)

//需求二：把下面的数字去除
const msg="hsdh21ggh8998jj123"
//\d表示数字，+表示一个或者多个
const newMsg=msg.replace(/\d+/g,"")
console.log(newMsg)