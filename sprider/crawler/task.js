const logger = require('../utils/log')
const randomUseragent = require('random-useragent')
const UrlSplice = require('../utils/url-splice')
/**
 * Task
 * TAsk = 采集某一个网站, 甚至特定页面的具体任务
 * 整理出每一次爬虫任务的各个细节
 * 如: 将 keyword 转化成标准可访问的 url
 * callback
 * success 任务状态,默认 false
 *
 * @class Task
 */

class Task {
  constructor(task) {
    this.uri = task.type == 'List' ? UrlSplice.indeedListPage(task) : task.uri
    this.jQuery = false
    this.tryTimes = 0
    this.success = false
    this.headers = randomUseragent.getRandom()
  }
}

class TaskQueue {
  constructor() {
    this.tasks = []
    this.count = 0
  }

  static from(uriList, pages, type, callback) {
    // 建一个空列表
    var taskQueue = new TaskQueue()
    uriList.forEach(item => {
      // 加入 taskQueue
      // 循环是为了自动创建下翻页数的任务
      let i = 0
      while (i < pages) {
        taskQueue.addTask(
          new Task({ uri: item, page: i, type, callback: callback })
        )
        i = i + 1
      }
    })
    taskQueue.count = uriList.length
    return taskQueue
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
