let o={x:1,y:2,z:3}
console.log(o.propertyIsEnumerable("toString"));
for (const p in o) {
    console.log(p)
    console.log(o[p])
}