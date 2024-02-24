const obj = {
    name: "tom",
    age: 10,
    o: {
        a: 10
    }
}
let copy = {}
Object.assign(copy, obj)

console.log("copy.js copy :", copy)

copy.o.a = 11
copy.name = "Jack"
console.log("copy.js obj :", obj)
let aObj = {
    a: 1,
    b: 2,
    [Symbol.iterator]: function* () {
        for (let key in this) {
            yield this[key];
        }
    }
}
for (const copyElement of aObj) {
    console.log(copyElement)
}
