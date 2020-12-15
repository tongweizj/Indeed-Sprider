'use strict'

const Crawler = require('crawler')
const async = require('async')
const TaskQueue = require('./task-queue')
const logger = require('../utils/log')
const config = require('../config')
const JD = require('../services/jd')
const Company = require('../services/company')
const parseJobsList = require('../crawler/indeed-list-parse')
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
    this.crawler.queue({ uri: task.uri, callback: task.callback, task: task })
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
// 开始
exports.start = function start() {
  /// 页面抓取后的回调
  let callback = function (error, res, done) {
    if (error) {
      // 默认情况下,当一个uri在 crawler 中运行 3 次都失败后,才会报error
      logger.log('error', error, { label: 'crawler' })
    } else {
      const parsed = parseJobsList(res.body, 'www.indeed.com', false)
      async.mapLimit(
        parsed.jobs,
        1,
        function (job, callback) {
          // 1) 存储职位的基本信息

          JD.createJd(job)
          Company.createCompany(job.company)
          callback(null, job.url)
        },
        function (err, jobs) {
          // 2) 存储 JD 详情页
          jobs.forEach(function (job) {
            console.log(job)
          })
        }
      )
      // jobs = jobs.concat(parsed.jobs)
      logger.log('info', res.options.task.uri, {
        label: 'crawler'
      })
    }
    done()
  }

  const scheduler = new Scheduler()
  let taskQueue = TaskQueue.from(config.titleList, callback)
  scheduler.addTaskQueue(taskQueue)
  scheduler.start()
}
