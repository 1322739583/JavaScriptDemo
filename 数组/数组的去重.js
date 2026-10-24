// 1.通过map实现去除
// 这种方式只支持基本数据类型，不支持对象
const arr = [1, 3, 2, 3, 3];
// const arr = [
//   { id: 1, name: "Tom" },
//   { id: 1, name: "Tom" },
//   { id: 2, name: "mike" },
// ];
const set = new Set(arr);
const newArr = Array.from(new Set(arr));
console.log(newArr);

//2.filter+indexOf
//只适用于基本类型
const arr2 = [1, 3, 2, 3, 3];
// 这里的核心原理是利用indexOf总是返回第一次出现的位置
const uniqueArr = arr2.filter((item, index) => arr2.indexOf(item) === index);
console.log(uniqueArr);

//3.reduce+includes
const arr3 = [1, 2, 2, 3, 3];
const uniArr = arr3.reduce(
  (acc, cur) => (acc.includes(cur) ? acc : acc.concat(cur)),
  []
);
console.log(uniArr);

//4.根据某个属性去重
const arr4 = [
  { id: 1, name: "Tom" },
  { id: 1, name: "Mike" },
  { id: 1, name: "Tom" },
  { id: 2, name: "Mike" },
];
const uniqueArr4 = arr4.filter(
  (item, index, self) => index === self.findIndex((t) => t.id === item.id)
);

console.log(uniqueArr4);
