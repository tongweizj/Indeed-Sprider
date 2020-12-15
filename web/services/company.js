const Company = require('../models/company')
const Hash = require('../utils/hash')
module.exports = {
  createCompany: function (company) {
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
        console.log('Error: ' + err)
        return false
      } else {
        console.log('Res: %o', res)
        return true
      }
    })
    return true
  }
}
