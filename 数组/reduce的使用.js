//1.数组求和
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, cur) => {
  console.log(acc, cur);
  return acc + cur;
}, 0);

console.log(sum);

//2.数组扁平化
const nestedArray = [[1, 2], [3], [4, 5]];
const flatArray = nestedArray.reduce((acc, cur) => acc.concat(cur), []);
console.log(flatArray);

//3.统计元素出现的次数
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1; // ||0的意思是，如果是undefiend,false,赋初值为0，后面就是取出这个数字累加
  return acc;
}, {});
console.log(count); // 输出: { apple: 3, banana: 2, orange: 1 }
