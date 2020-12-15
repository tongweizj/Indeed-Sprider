const Task = require('../crawler/indeed-task')
const logger = require('../utils/log')
/**
 * TaskQueue 任务队列
 *
 * @class TaskQueue
 */
class TaskQueue {
  constructor() {
    this.tasks = []
  }

  static from(uriList, callback) {
    // 建一个空列表
    var taskQueue = new TaskQueue()
    uriList.forEach(item => {
      // 加入 taskQueue
      // 循环是为了自动创建下翻页数的任务
      let i = 0
      while (i < 1) {
        taskQueue.addTask(new Task({ uri: item, page: i, callback: callback }))
        i = i + 1
      }
      logger.log('info', item, { label: 'addTask' })
    })

    return taskQueue.tasks
  }

  list() {
    return this.tasks
  }
  // 在Queue 的最后添加Task
  addTask(task) {
    this.tasks.push(task)
  }
  // 从 TaskQueue 中 取出最后一个任务
  popTask() {
    return this.tasks.pop()
  }

  // 判断Queue是否完成
  hasNext() {
    return this.tasks.length > 0
  }
}
module.exports = TaskQueue
