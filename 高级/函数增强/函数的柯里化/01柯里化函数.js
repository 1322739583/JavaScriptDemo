// function foo(x,y,z){
//     return x+y+z
// }
// console.log(foo(10, 20, 30));

function foo(x) {
    return function (y) {
        return function (z) {
            return x + y + z
        }
    }
}

console.log(foo(10)(20)(30));


let foo = x => y => z => x + y + z


console.log(foo3(20)(20)(30));
let foo2 = x => y => z => x + y + z


foo(10)