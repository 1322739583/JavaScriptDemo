// Promise.allSettled（ES2020）：老好人机制，永远不会走 catch！
// 它会耐心等待所有 Promise 任务全部结束（不论成功还是失败），返回每个任务的“成绩单”数组！
// 应用场景：批量上传文件、批量发邮件等彼此互不影响的独立批量操作

const p1 = Promise.resolve("上传图片 1 成功");
const p2 = Promise.reject("上传图片 2 失败：网络中断");
const p3 = Promise.resolve("上传图片 3 成功");
const p4 = Promise.reject("上传图片 4 失败：文件过大");

Promise.allSettled([p1, p2, p3, p4]).then((results) => {
  console.log("所有任务全部尘埃落定：\n", results);
  /**
   * 输出格式：
   * [
   *   { status: 'fulfilled', value: '上传图片 1 成功' },
   *   { status: 'rejected', reason: '上传图片 2 失败：网络中断' },
   *   { status: 'fulfilled', value: '上传图片 3 成功' },
   *   { status: 'rejected', reason: '上传图片 4 失败：文件过大' }
   * ]
   */

  // ----------------------------------------------------
  // 业务实战：过滤出成功与失败的清单
  const successes = results.filter((item) => item.status === "fulfilled");
  const failures = results.filter((item) => item.status === "rejected");

  console.log(`统计：成功 ${successes.length} 个，失败 ${failures.length} 个`);
  failures.forEach((fail, idx) => {
    console.error(`第 ${idx + 1} 个失败原因：`, fail.reason);
  });
});

