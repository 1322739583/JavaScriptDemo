// 为什么用生成器替代迭代器？
// 在手写可迭代对象（Iterable）时，必须手动维护索引 index、实现 next() 方法并返回 { value, done }。
// 代码冗长且容易出错。
// 而生成器函数天然返回一个迭代器对象，用它来实现自定义迭代极其优雅简洁！

// -------------------------------------------------------------
// 1. 传统迭代器 vs 生成器迭代器
// -------------------------------------------------------------

// 场景：自定义一个班级对象 classRoom，需要支持 for...of 遍历里面的所有学生 names

// 【方式一：传统手写迭代器】
const classRoom1 = {
  name: "高三一班",
  students: ["张三", "李四", "王五"],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.students.length) {
          return { value: this.students[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (const stu of classRoom1) {
  console.log("传统迭代器输出:", stu);
}

// 【方式二：使用生成器函数实现迭代器】
const classRoom2 = {
  name: "高三二班",
  students: ["小明", "小红", "小刚"],
  // 直接将 [Symbol.iterator] 声明为生成器方法！
  *[Symbol.iterator]() {
    for (const stu of this.students) {
      yield stu; // yield 会自动包装成 { value: stu, done: false }
    }
  }
};

for (const stu of classRoom2) {
  console.log("生成器迭代器输出:", stu);
}

// -------------------------------------------------------------
// 2. 使用 yield* 语法糖进一步简化！
// -------------------------------------------------------------
// yield* 后面接一个【可迭代对象】（如数组、字符串、另一个生成器等）
// 它会自动帮我们把该对象里面的每一个元素依次 yield 出来，相当于内置了一个遍历委托！

const classRoom3 = {
  name: "高三三班",
  students: ["牛顿", "爱因斯坦", "图灵"],
  *[Symbol.iterator]() {
    // 这一行等价于上面的 for...of 逐个 yield！
    yield* this.students;
  }
};

for (const stu of classRoom3) {
  console.log("yield* 简化输出:", stu);
}

