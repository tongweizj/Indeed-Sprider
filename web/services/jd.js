const JD = require('../models/jd')
const Hash = require('../utils/hash')
module.exports = {
  createJd: async function (job) {
    console.log('createJd')
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
      content: '',
      jobTitle: '',
      hash: jdHash
    }
    let query = { hash: jdHash }
    let options = {
      upsert: true,
      new: true,
      useFindAndModify: false
    }
    JD.findOneAndUpdate(query, jd, options)
    // console.log(resp)
    return JD.findOneAndUpdate(query, jd, options)
  }
}
