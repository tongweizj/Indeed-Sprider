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
    this.uri = Task.spliceUri(task)
    this.jQuery = false
    this.tryTimes = 0
    this.callback = task.callback
    this.success = false
  }
  static spliceUri(task) {
    // 构造 Uri
    let q = 'https://www.indeed.ca/jobs'
    q += '?q=' + task.uri
    q += '&l=' + 'Toronto%2C+ON'
    q += '&radius=' + '50'
    q += '&fromage=' + '7' // 最近 7 天
    q += '&sort=' + 'date' // 按照日期
    q += '&start=' + 10 * task.page
    return q
  }
  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
}
module.exports = Task
