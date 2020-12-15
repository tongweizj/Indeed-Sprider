'use strict'

const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(config.database.testUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
require('./models/company')
require('./models/jd')
mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open')
  })
  .on('error', err => {
    console.log(`Connection error: ${err.message}`)
  })
const Scheduler = require('./controllers/scheduler')
Scheduler.start()
