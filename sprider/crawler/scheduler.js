'use strict'

const Crawler = require('crawler')
const logger = require('../utils/log')
// Scheduler 调度器
// 安排整体工作的各个任务安排
// 每一次抓取,要做的工作
class Scheduler {
  constructor() {
    this.tryTimes = 0
    this.taskQueue = []
    this.crawler = new Crawler({
      rateLimit: 1000, // between two tasks, minimum time gap is 1000 (ms)
      maxConnections: 1
    })
  }

  addTaskQueue(taskQueue) {
    this.taskQueue = taskQueue
  }
  /// 开始单次任务的调度
  schedule(task) {
    if (!task.success) {
      this.crawler.queue({
        uri: task.uri,
        headers: task.headers,
        callback: task.callback,
        task: task
      })
    }
  }

  // 入口
  // 整理出任务清单,并把任务传递给调度
  start() {
    // 整理任务清单
    this.taskQueue.forEach(task => {
      this.schedule(task)
    })
  }
}
module.exports = Scheduler
