// const {module} = require("../../../webpack/03.webpack中CSS的配置/webpack.config");
const mainColor="#666666"

function px2rem(px) {
    return "px2rem";
}

function rem2px(rem) {
   return "rem2px";
}

//console.log("exports 1",exports);



module.exports.mainColor=mainColor;
module.exports.px2rem=px2rem;
module.exports.rem2px=rem2px;

//相当于上面的简写
// exports.mainColor=mainColor;
// exports.px2rem=px2rem;
// exports.rem2px=rem2px;

//console.log("exports 2",exports);

//错误写法
// module.exports={
//     mainColor,
//     px2rem,
//     rem2px
// }

//错误写法
// exports={
//     mainColor,
//     px2rem,
//     rem2px
// }
 

 




