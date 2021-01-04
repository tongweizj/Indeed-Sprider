const async = require('async')
const Crawler = require('crawler')
const TaskQueue = require('../crawler/task.js')
const logger = require('../utils/log')
const config = require('../config')
const Parse = require('../utils/parse')
const cheerio = require('cheerio')
const DB = require('../services/mongo')

let count = 0 // 已采集总数

function spider(items) {
  let taskQueue = TaskQueue.from(config.titleList, 1, 'List')
  // console.log(taskQueue)
  console.log('Setp1: 共抓取关键词：' + taskQueue.count + '条')
  console.log('----------------------------')

  const crawler = new Crawler({
    rateLimit: 1000, // between two tasks, minimum time gap is 1000 (ms)
    maxConnections: 1,
    jQuery: false
  })

  /// jd页面的回调
  let crawlerCallback = function (task, callback) {
    return function (error, res, done) {
      if (error) {
        // 默认情况下,当一个uri在 crawler 中运行 3 次都失败后,才会报error
        logger.log('error', error, { label: 'Crawler:jd' })
      } else {
        logger.log('info', res.options.uri, {
          label: 'Crawler:jd'
        })
        const $ = cheerio.load(res.body)
        const jdD = $('#jobDescriptionText')
        // console.log('jd说明:' + jdD)
        task.jdD = jdD
        callback(null, task) // 把 list 页面的职位列表传给下一步的
      }
      done()
    }
  }
  // 使用async控制异步抓取
  // mapLimit(arr, limit, iterator, [callback])
  async.mapLimit(
    items,
    1,
    function (task, callback) {
      count++
      console.log(
        count + '/' + taskQueue.count + '.' + '开始抓取JD url:' + task.url
      )
      crawler.queue({
        uri: task.url,
        headers: task.headers,
        task: task,
        callback: crawlerCallback(task, callback)
      })
    },
    function (err, result) {
      // console.log('一级页面抓取完成，共有数据：%j', result)
      // 将解析结果,保存到 mongo
      console.log('开始下一步:' + result.length)
      DB.updateJdDes(result)
      console.log('开始下一步')
      // Spider2()
    }
  )
}
module.exports = spider
