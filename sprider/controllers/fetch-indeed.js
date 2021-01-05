const async = require('async')
const Crawler = require('crawler')
const TaskQueue = require('../crawler/task.js')
const logger = require('../utils/log')
const Parse = require('../utils/parse')
const config = require('../config')
const DB = require('../services/mongo')
const fetchJD = require('./fetch-indeed-jd')

let count = 0 // 已采集总数

function spider() {
  let taskQueue = TaskQueue.from(config.titleList, 1, 'List')
  // console.log(taskQueue)
  console.log('Setp1: 共抓取关键词：' + taskQueue.count + '条')
  console.log('----------------------------')

  const crawler = new Crawler({
    rateLimit: 1000, // between two tasks, minimum time gap is 1000 (ms)
    maxConnections: 1,
    jQuery: false
  })

  /// List页面的回调
  let crawlerCallback = function (task, callback) {
    return function (error, res, done) {
      if (error) {
        // 默认情况下,当一个uri在 crawler 中运行 3 次都失败后,才会报error
        logger.log('error', error, { label: 'crawler:List' })
      } else {
        // 解析 html,找出 jd list
        const parsed = Parse(res.body, 'www.indeed.com', false)
        res.options.task.success = true

        console.log('共抓取职位:' + parsed.jobs.length)
        console.log(parsed)

        logger.log('info', parsed.jobs.length, {
          label: 'indeed:endxxxx'
        })

        callback(null, parsed.jobs)
        // callback(null, temp) // 把 list 页面的职位列表传给下一步的
      }
      done()
    }
  }

  // 使用async控制异步抓取
  // mapLimit(arr, limit, iterator, [callback])
  async.mapLimit(
    taskQueue.tasks,
    1,
    function (task, callback) {
      count++
      console.log(
        count + '/' + taskQueue.count + '.' + '开始抓取职位url:' + task.uri
      )
      crawler.queue({
        uri: task.uri,
        headers: task.headers,
        task: task,
        callback: crawlerCallback(task, callback)
      })
    },
    function (err, result) {
      console.log('一级页面抓取完成，共有数据：%j', result)
      // 将解析结果,保存到 mongo
      let jobList = []

      for (let i = 0; i < result.length; i++) {
        let temp = jobList
        jobList = temp.concat(result[i])
      }

      console.log('开始下一步xxx:' + jobList)
      DB.saveJDs(jobList)
      console.log('开始下一步')
      fetchJD(jobList)
    }
  )
}
module.exports = spider
