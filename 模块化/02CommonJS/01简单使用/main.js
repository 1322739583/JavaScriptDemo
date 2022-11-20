//方式一：
// const util=require("./css-util")

// console.log(util.mainColor);
// console.log(util.px2rem());
// console.log(util.rem2px());
// console.log(util);

//方式二：
const {mainColor,px2rem,rem2px}=require("./css-util")

console.log(mainColor);
console.log(px2rem());
console.log(rem2px());

