const jdListInit = require('./indeed/getJdList')
const logger = require('./config/log')
const start = async () => {
  logger.warn('Start ')
  jdListInit()
}
start()
