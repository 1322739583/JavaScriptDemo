var foo = require("./foo")

console.log(foo.name);

setTimeout(() => {
    console.log(foo.name);  
}, 4000);

