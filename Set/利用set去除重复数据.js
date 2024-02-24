//1.简单使用
const set=new Set()
set.add(1)
set.add(2)
set.add(1)

for (let s of set) {
    console.log(s)
}

console.log(".........")
//2.字符串 也没有问题
set.add("A")
set.add("B")
set.add("A")

for (let s of set) {
    console.log(s)
}

console.log(".........")

// 3.对象是不能去重的，只能去重简单类型
set.add({name:"Tom",age:20})
set.add({name:"Jack",age:22})
set.add({name:"Tom",age:20})

for (let s of set) {
    console.log(s)
}

console.log(".....3....")

//4.手动实现对象的去重
const set2=new Set()

set2.add({name:"Tom",age:20})
set2.add({name:"Jack",age:22})

const set3=new Set()

set3.add({name:"Tom",age:20})
set3.add({name:"Mike",age:23})

// set3.forEach(s3=>{
//     console.log("s3:",s3)
//     set2.forEach(s2=>{
//         console.log("s2:",s2)
//         if (s3.name!==s2.name){
//             set3.add(s2)
//         }
//     })
// })
//
// for (let s of set3) {
//     console.log(s)
// }

let arr = [
    { id: 0, name: "张三" },
    { id: 1, name: "李四" },
    { id: 2, name: "王五" },
    { id: 3, name: "赵六" },
    { id: 1, name: "孙七" },
    { id: 2, name: "周八" },
    { id: 2, name: "吴九" },
    { id: 3, name: "郑十" },
];

const removeDuplicateObj = (arr) => {
    let obj = {};
    arr = arr.reduce((newArr, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && newArr.push(next));
        return newArr;
    }, []);
    return arr;
};

const result=removeDuplicateObj(arr)
console.log(result)

