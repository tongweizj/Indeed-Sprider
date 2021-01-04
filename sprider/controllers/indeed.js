const async = require('async')
const cheerio = require('cheerio')
const config = require('../config')
const logger = require('../utils/log')

const Scheduler = require('../crawler/scheduler')
const TaskQueue = require('../crawler/task.js')
const Parse = require('../utils/parse')
const JD = require('../services/jd')
const Company = require('../services/company')

/// List页面的回调
let listCallback = function (error, res, done) {
  if (error) {
    // 默认情况下,当一个uri在 crawler 中运行 3 次都失败后,才会报error
    logger.log('error', error, { label: 'crawler:List' })
  } else {
    // 解析 html,找出 jd list
    const parsed = Parse(res.body, 'www.indeed.com', false)
    res.options.task.success = true
    console.log(res.body)
    async.mapLimit(
      parsed.jobs,
      1,
      (job, callback) => {
        // 1) 存储职位的基本信息
        JD.createJd(job)
        // 2) 存储公司的基本信息
        Company.createCompany(job.company)
        // 3) 把职位详情 url 放入 callback
        callback(null, job.url)
      },
      (err, jobs) => {
        if (err) throw err
        // 4) 开始抓取JD 详情页
        logger.log('info', jobs.length, {
          label: 'indeed:fake'
        })
        const resp = Start.jdStart(jobs)
        if (resp == true) {
          logger.log('info', 'jdstart', {
            label: 'indeed:fake'
          })
          return true
        } else {
          logger.log('info', 'jdstart err', {
            label: 'indeed:fake'
          })
          return false
        }
      }
    )

    logger.log('info', parsed.length, {
      label: 'indeed:endxxxx'
    })
  }
  done()
}

/// jd页面的回调
let jdCallback = function (error, res, done) {
  if (error) {
    // 默认情况下,当一个uri在 crawler 中运行 3 次都失败后,才会报error
    logger.log('error', error, { label: 'Crawler:jd' })
  } else {
    logger.log('info', res.options.uri, {
      label: 'Crawler:jd'
    })
    const $ = cheerio.load(res.body)
    const jdD = $('#jobDescriptionText')
    JD.updateJdDes(jdD, res.options.task.uri)
  }
  done()
}

class Start {
  static listStart() {
    const scheduler = new Scheduler()
    let taskQueue = TaskQueue.from(config.titleList, 1, 'List', listCallback)
    scheduler.addTaskQueue(taskQueue)
    logger.log('info', '开始抓取职位列表页', {
      label: 'indeed:List'
    })
    scheduler.start()
    // return true
  }
  static jdStart(uriList) {
    logger.log('info', '开始抓取职位详情页,一共:' + uriList.length, {
      label: 'indeed:jd'
    })
    if (uriList.length == 0) {
      logger.log('info', '开始抓取职位详情页,一共:' + uriList.length, {
        label: 'indeed:jdxxxx'
      })
      return false
    } else {
      const jdScheduler = new Scheduler()
      let jdQueue = TaskQueue.from(uriList, 1, 'jd', jdCallback)
      jdScheduler.addTaskQueue(jdQueue)
      jdScheduler.start()
    }
  }
}
module.exports = Start
