//1. 0-99整数
var reg = new RegExp("^(\\d|[1-9]\\d|100)$");
var a=+"00";
if(!reg.test(a)) {
    alert("请输入0-100的整数！")
}

//2.两位小数0.00-99.99
var regs = /^([0-9]{1}|^[1-9]{1}\d{1,1})(\.\d{1,2})?$/
console.log(regs.test(10.22));
console.log(regs.test(99.999));
console.log(regs.test(99.));
