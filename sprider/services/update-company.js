const Company = require('../models/company')
const Hash = require('../utils/hash')
const logger = require('../utils/log')
// const mongoose = require('mongoose')
module.exports = {
  createCompany: function (company, callback) {
    console.log('createCompany')
    console.log(company)
    const companyHash = Hash.make(company)
    console.log(companyHash)
    const oneCompany = {
      $set: {
        name: company,
        hash: companyHash
      }
    }
    let query = { hash: companyHash }
    let options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false
    }
    Company.findOneAndUpdate(query, oneCompany, options, function (err, res) {
      if (err) {
        logger.log('error', err, { label: 'DB_Company:all' })
        return false
      }
      logger.log('info', res, {
        label: 'DB_Company:all'
      })
      callback(null, company)
      // const callback = () => {
      //   mongoose.disconnect()
      //   console.log('MongoClient is closing...')
      // }
    })
  }
}
