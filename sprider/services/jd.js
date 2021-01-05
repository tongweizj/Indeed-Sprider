const JD = require('../models/jd')
const Hash = require('../utils/hash')
const logger = require('../utils/log')
const MongoDo = require('./mongodb.js')
module.exports = {
  createJd: async function (job) {
    const toDo = doneCB => {
      const jdHash = Hash.make(job.company + job.title + job.summary)
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
        doneCB()
      })
    }
    MongoDo(toDo)
  },

  updateJdDes: async function (item, uri) {
    const query = { url: uri }
    const update = {
      content: item
    }
    const toDo = doneCB => {
      JD.updateOne(query, update, function (err, res) {
        if (err) {
          console.log(err)
          return false
        }
        logger.log('info', res, {
          label: 'DB_Jd:content'
        })
        doneCB()
      })
    }
    MongoDo(toDo)
  }
}
