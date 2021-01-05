const JD = require('../models/jd')
const Hash = require('../utils/hash')
const logger = require('../utils/log')
// const MongoDo = require('./mongodb.js')
module.exports = {
  createJd: async function (job) {
    console.log('保存数据:%j', job)

    const jdHash = Hash.make(job.company + job.title + job.summary)
    console.log('jdHash:' + jdHash)
    const jd = {
      title: job.title,
      summary: job.summary,
      url: job.url,
      company: {
        hash: Hash.make(job.company),
        name: job.company
      },
      postDate: job.postDate,
      salary: job.salary,
      isEasyApply: job.isEasyApply,
      hash: jdHash
    }
    let query = { hash: jdHash }
    let options = {
      upsert: true,
      new: true,
      useFindAndModify: false
    }
    JD.findOneAndUpdate(query, jd, options, function (err, res) {
      if (err) {
        // console.log('Error: ' + err)
        logger.log('error', err, { label: 'DB_Jd:all' })
        return false
      }
      // console.log('Res: %o', res)
      logger.log('info', res, {
        label: 'DB_Jd:all'
      })
    })
  },

  updateJdDes: async function (item, callback) {
    console.log('item:%j ', item)
    const query = { url: item.url }
    const update = {
      content: item.jdD
    }

    JD.updateOne(query, update, function (err, res) {
      if (err) {
        console.log(err)
        return false
      }
      logger.log('info', 'res', {
        label: 'DB_Jd:content'
      })
      callback(null, item)
    })
  }
}
