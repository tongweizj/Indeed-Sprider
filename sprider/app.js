'use strict'
const spider = require('./controllers/fetch-indeed.js')
const schedule = require('node-schedule')
// Start.listStart()

const scheduleCronstyle = () => {
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('15 15 4 * * *', () => {
    console.log('scheduleCronstyle:' + new Date())
    spider()
  })
}
spider()
scheduleCronstyle()
