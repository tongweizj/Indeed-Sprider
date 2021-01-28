class UrlSplice {
  static indeedListPage(task) {
    // 构造 Uri
    let q = 'https://www.indeed.ca/jobs'
    q += '?q=title%3A' + task.uri
    q += '&l=' + 'Toronto%2C+ON'
    q += '&radius=' + '50'
    q += '&fromage=' + '7' // 最近 7 天
    q += '&sort=' + 'date' // 按照日期
    q += '&start=' + 10 * task.page
    return q
  }
}
module.exports = UrlSplice
