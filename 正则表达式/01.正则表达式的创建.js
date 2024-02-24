//方式一：通过new RegExp
//第一个参数表示匹配规则，第二个参数表示修饰符
const reg=new RegExp("hello","i")//匹配hello这个字符串，i表示忽略大小写。
//方式二：通过//,这个不是表示斜杠。中间写值就表示正则表达式。
const reg2=/hello/i