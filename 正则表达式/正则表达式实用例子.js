//1.匹配两位数字0-99
console.log(/\d{1,2}/g.test("999"));
console.log("999".match(/\d{1,2}/g));
console.log((/[1-9]{1,2}$|0/).test("1"));



