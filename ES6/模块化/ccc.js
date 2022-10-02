import {age, isChange} from "./aaa.js";
import {name} from "./aaa.js";
import {sum} from "./aaa.js";
import {Person} from "./aaa.js";
import {foo} from "./aaa.js";
import * as data from "./aaa.js"

console.log("name:"+name)
console.log("age:"+age)
console.log(sum(1,2))
console.log(isChange)


foo(name)

let p=new Person("Mike")
p.run()

console.log(data.name);