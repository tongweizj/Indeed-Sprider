const DateFormat = require('dateformat')
var today = DateFormat(new Date(), 'yyyy/mm/dd')
const cheerio = require('cheerio')
const moment = require('moment')

function parseData(data, task) {
  const jsonObj = parseJsonObject(data)

  const fundItems = []
  for (const item of jsonObj['datas']) {
    let fundItem = {}
    const fundArray = item.split('|')

    fundItem['code'] = fundArray[0]
    fundItem['name'] = fundArray[1]
    fundItem['type'] = task.type
    fundItem['lastUpdate'] = today
    fundItem['unitNetWorth'] = fundArray[4]
    fundItem['dayOfGrowth'] = fundArray[5]
    fundItem['recent1Week'] = fundArray[6]
    fundItem['recent1Month'] = fundArray[7]
    fundItem['recent3Month'] = fundArray[8]
    fundItem['recent6Month'] = fundArray[9]
    fundItem['recent1Year'] = fundArray[10]
    fundItem['recent2Year'] = fundArray[11]
    fundItem['recent3Year'] = fundArray[12]
    fundItem['fromThisYear'] = fundArray[13]
    fundItem['fromBuild'] = fundArray[14]
    fundItem['serviceCharge'] = fundArray[20]
    fundItems.push(fundItem)
  }
  return fundItems
}
function parseJsonObject(data) {
  const start = data.indexOf('{')
  const end = data.indexOf('}') + 1
  const jsonStr = data.slice(start, end)
  const jsonObj = eval('(' + jsonStr + ')')

  return jsonObj
}

//www.indeed.ca/jobs?q=machine+learning+engineer&l=l=Toronto%2C+ON&radius=50&fromage=7&sort=date&start=0
/* Parses a page of jobs */
function parseJobsList(body, host, excludeSponsored) {
  const $ = cheerio.load(body)
  const jobTable = $('#resultsCol')
  const jobs = jobTable.find('.result')
  let cont = true

  // Filter out ads
  const filtered = excludeSponsored
    ? jobs.filter((_, e) => {
        const job = $(e)
        const footer = job.find('.jobsearch-SerpJobCard-footer')
        const spanText = Array.from(
          footer.find('span').map((_, span) => $(span).text())
        )
        const isSponsered = spanText.some(text =>
          text.toLowerCase().includes('sponsored')
        )
        return !isSponsered
      })
    : jobs

  // Create objects
  const jobObjects = filtered
    .map((i, e) => {
      const job = $(e)

      const jobtitle = job.find('.jobtitle').text().trim()

      const url = 'https://' + host + job.find('.jobtitle').attr('href')

      const summary = job.find('.summary').text().trim()

      const company = job.find('.company').text().trim() || null

      const location = job.find('.location').text().trim()

      let dateStr =
        job
          .find('.date')
          .text()
          .trim()
          .replace(/[^0-9]/gi, '') * 1 //修改
      const postDate = moment().subtract(dateStr, 'days').format('L') //修改

      const salary = job.find('.salary.no-wrap').text().trim()

      const isEasyApply = job.find('.iaLabel').text().trim() === 'Easily apply'

      return {
        title: jobtitle,
        summary: summary,
        url: url,
        company: company,
        location: location,
        postDate: postDate,
        salary: salary,
        isEasyApply: isEasyApply
      }
    })
    .get()

  if (jobTable.children().hasClass('dupetext')) {
    // We haven't seen all the results but indeed says the rest are duplicates
    cont = false
  } else if ($('.pagination > *:last-child').hasClass('np')) {
    // We have seen all the results
    cont = false
  } else if (!$('.pagination').length) {
    // No paging of results
    cont = false
  }

  return {
    error: null,
    continue: cont,
    jobs: jobObjects
  }
}
module.exports = parseJobsList
