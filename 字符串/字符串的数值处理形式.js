let str="126677"
//字符串是可以当数组使用的
console.log(str[0])
console.log("......")
for (let i = 0; i < str.length; i++) {
    console.log(str[i])
}
console.log("......")

const newStr=str.replace("66","77")
console.log(str)
console.log(newStr)