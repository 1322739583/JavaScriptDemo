//1.提供commonjs添加js
const {add,mult}=require("./js/mathUtils.js")
console.log(add(1,2))
console.log(mult(1,2))
//2.提供es6模块化添加js

//3.加载css,可以不写变量的
require("./css/normal.css")

require("./css/special.less")